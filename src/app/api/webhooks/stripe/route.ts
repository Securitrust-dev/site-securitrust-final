import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { db } from '@/db';
import { pentestOrders } from '@/db/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function handlePentestPaymentIntent(paymentIntent: Stripe.PaymentIntent) {
  const metadata = paymentIntent.metadata;
  if (metadata?.type !== 'pentest_authorization') return;

  const orderId = metadata.order_id;
  if (!orderId) return;

  let newStatus: string;
  const updateData: { status: string; capturedAt?: string; canceledAt?: string } = { status: '' };

  switch (paymentIntent.status) {
    case 'requires_capture':
      newStatus = 'requires_capture';
      break;
    case 'succeeded':
      newStatus = 'succeeded';
      updateData.capturedAt = new Date().toISOString();
      break;
    case 'canceled':
      newStatus = 'canceled';
      updateData.canceledAt = new Date().toISOString();
      break;
    default:
      newStatus = paymentIntent.status;
  }

  updateData.status = newStatus;

  await db.update(pentestOrders)
    .set(updateData)
    .where(eq(pentestOrders.orderId, orderId));

  console.log(`✅ Pentest order ${orderId} updated to status: ${newStatus}`);
}

export async function POST(req: NextRequest) {
  console.log('🔔 Webhook Stripe reçu');
  
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    console.error('❌ Signature ou webhook secret manquant');
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    console.log('✅ Webhook vérifié:', event.type);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Erreur vérification signature:', message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log('💳 Paiement réussi:', {
      sessionId: session.id,
      email: session.customer_details?.email,
      amount: session.amount_total,
    });
    
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Client';
    const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
    const currency = session.currency?.toUpperCase() || 'EUR';
    
    if (!customerEmail) {
      console.error('❌ Pas d\'email client dans la session');
      return NextResponse.json({ received: true });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('❌ Paramètres SMTP manquants');
      return NextResponse.json({ received: true });
    }

    try {
      console.log('📧 Envoi récapitulatif de paiement à:', customerEmail);
      
      // ============================================================
      // EMAIL CLIENT : RÉCAPITULATIF DE PAIEMENT UNIQUEMENT
      // ============================================================
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .payment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
              .detail-row:last-child { border-bottom: none; }
              .detail-label { font-weight: 600; color: #666; }
              .amount { font-size: 28px; font-weight: 700; color: #667eea; text-align: center; margin: 20px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
              .alert { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; border-radius: 4px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🧾 Paiement Confirmé</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Récapitulatif de votre transaction</p>
              </div>
              
              <div class="content">
                <p>Bonjour <strong>${customerName}</strong>,</p>
                
                <div class="alert">
                  ✅ Votre paiement a été traité avec succès !
                </div>
                
                <p>Nous vous confirmons la bonne réception de votre paiement.</p>
                
                <div class="amount">
                  ${amountTotal.toFixed(2)} ${currency}
                </div>
                
                <div class="payment-details">
                  <div class="detail-row">
                    <span class="detail-label">📋 Référence de transaction</span>
                    <span>${session.id}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">📧 Email</span>
                    <span>${customerEmail}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">📅 Date du paiement</span>
                    <span>${new Date().toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">💳 Statut du paiement</span>
                    <span style="color: #28a745; font-weight: bold;">Payé</span>
                  </div>
                </div>
                
                <h3 style="color: #667eea;">📋 Prochaines étapes</h3>
                <ul style="line-height: 1.8;">
                  <li>Votre paiement est enregistré dans nos systèmes</li>
                  <li>Notre équipe vous contactera dans les <strong>24 heures</strong> pour planifier l'intervention</li>
                  <li>Vous recevrez une confirmation avec la date et les détails de l'audit</li>
                  <li>Un expert SecuriTrust sera assigné à votre dossier</li>
                </ul>
                
                <p style="margin-top: 30px; padding: 15px; background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 4px;">
                  💡 <strong>Conservez cet email</strong> comme reçu de paiement pour vos dossiers comptables.
                </p>
                
                <p style="margin-top: 30px;">Pour toute question concernant votre paiement :</p>
                <p style="text-align: center;">
                  📧 <a href="mailto:jad.joumblat@securitrust.fr" style="color: #667eea;">jad.joumblat@securitrust.fr</a>
                </p>
                
                <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe SecuriTrust</strong></p>
              </div>
              
              <div class="footer">
                <p>Reçu de paiement - SecuriTrust</p>
                <p>Ce document peut servir de justificatif pour votre comptabilité</p>
                <p>© ${new Date().getFullYear()} SecuriTrust - Tous droits réservés</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Envoi au client
      const clientEmailInfo = await transporter.sendMail({
        from: '"SecuriTrust" <jad.joumblat@securitrust.fr>',
        to: customerEmail,
        subject: '🧾 Récapitulatif de paiement - SecuriTrust',
        html: htmlContent,
      });
      
      console.log('✅ Récapitulatif de paiement envoyé au client:', clientEmailInfo.messageId);

      // ============================================================
      // EMAIL ADMIN : NOTIFICATION DE PAIEMENT
      // ============================================================
      const adminEmailInfo = await transporter.sendMail({
        from: '"SecuriTrust Notifications" <jad.joumblat@securitrust.fr>',
        to: 'jad.joumblat@securitrust.fr',
        subject: '💰 Paiement reçu - SecuriTrust',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                .info-row:last-child { border-bottom: none; }
                .label { font-weight: bold; color: #666; }
                .highlight { background: #d4edda; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; color: #155724; text-align: center; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>💰 Paiement Reçu</h1>
                </div>
                <div class="content">
                  <div class="info-box">
                    <h2 style="margin-top: 0; color: #2c3e50;">📊 Détails du paiement</h2>
                    <div class="info-row">
                      <span class="label">ID Transaction Stripe :</span>
                      <span>${session.id}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Client :</span>
                      <span>${customerName}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Email :</span>
                      <span><a href="mailto:${customerEmail}">${customerEmail}</a></span>
                    </div>
                    <div class="info-row">
                      <span class="label">Date et heure :</span>
                      <span>${new Date().toLocaleString('fr-FR')}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Statut :</span>
                      <span style="color: #28a745; font-weight: bold;">✅ Payé</span>
                    </div>
                  </div>

                  <div class="highlight">
                    💰 Montant encaissé : ${amountTotal.toFixed(2)} ${currency}
                  </div>

                  <div class="info-box">
                    <h3 style="margin-top: 0; color: #2c3e50;">📋 Actions à effectuer :</h3>
                    <ol>
                      <li><strong>Contacter le client</strong> sous 24h pour planifier l'intervention</li>
                      <li><strong>Vérifier</strong> que le contrat a bien été signé</li>
                      <li><strong>Assigner</strong> un expert au dossier</li>
                      <li><strong>Envoyer</strong> la confirmation de rendez-vous</li>
                      <li><strong>Préparer</strong> les outils d'audit nécessaires</li>
                    </ol>
                  </div>

                  <p style="text-align: center; margin-top: 30px;">
                    <a href="https://dashboard.stripe.com/test/payments/${session.payment_intent}" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">
                      Voir dans Stripe Dashboard
                    </a>
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      
      console.log('✅ Notification admin envoyée:', adminEmailInfo.messageId);
      
} catch (error: unknown) {
        const err = error as { message?: string; code?: string; command?: string };
        console.error('❌ Erreur envoi email:', {
          message: err.message,
          code: err.code,
          command: err.command,
        });
      }
    }

  if (event.type.startsWith('payment_intent.')) {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    await handlePentestPaymentIntent(paymentIntent);
  }

    return NextResponse.json({ received: true });
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';