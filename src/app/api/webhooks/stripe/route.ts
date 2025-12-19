import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Configuration SMTP OVH (Sécurisée SSL Port 465)
const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net',
  port: 465,   // Port SSL recommandé pour OVH
  secure: true, // "true" obligatoire pour le port 465
  auth: {
    // IMPORTANT : Assurez-vous que SMTP_USER dans .env est bien 'rayen.ben-ghorbal@securitrust.fr'
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASSWORD, 
  },
});

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
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log('✅ Webhook vérifié:', event.type);
  } catch (err: any) {
    console.error('❌ Erreur vérification signature:', err.message);
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
      console.log('📧 Envoi email via OVH SMTP à:', customerEmail);
      
      // Email HTML pour le Client
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
                <h1>✅ Paiement Confirmé</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Merci pour votre confiance</p>
              </div>
              
              <div class="content">
                <p>Bonjour <strong>${customerName}</strong>,</p>
                
                <div class="alert">
                  ✅ Votre paiement a été traité avec succès !
                </div>
                
                <p>Nous avons bien reçu votre paiement. Voici le récapitulatif de votre transaction :</p>
                
                <div class="amount">
                  ${amountTotal.toFixed(2)} ${currency}
                </div>
                
                <div class="payment-details">
                  <div class="detail-row">
                    <span class="detail-label">📋 Numéro de transaction</span>
                    <span>${session.id}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">📧 Email</span>
                    <span>${customerEmail}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">📅 Date</span>
                    <span>${new Date().toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">💳 Statut</span>
                    <span style="color: #28a745; font-weight: bold;">Payé</span>
                  </div>
                </div>
                
                <h3 style="color: #667eea;">📋 Prochaines étapes</h3>
                <ul style="line-height: 1.8;">
                  <li>Notre équipe vous contactera dans les <strong>24 heures</strong></li>
                  <li>Un expert SecuriTrust sera assigné à votre dossier</li>
                  <li>Vous recevrez un email de confirmation avec les détails de l'intervention</li>
                </ul>
                
                <p style="margin-top: 30px;">Si vous avez des questions, n'hésitez pas à nous contacter :</p>
                <p style="text-align: center;">
                  📧 <a href="mailto:rayen.ben-ghorbal@securitrust.fr" style="color: #667eea;">rayen.ben-ghorbal@securitrust.fr</a>
                </p>
                
                <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe SecuriTrust</strong></p>
              </div>
              
              <div class="footer">
                <p>Cet email a été envoyé automatiquement suite à votre paiement.</p>
                <p>© ${new Date().getFullYear()} SecuriTrust - Tous droits réservés</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // 1. Envoi au CLIENT
      const clientEmailInfo = await transporter.sendMail({
        // L'expéditeur DOIT correspondre au user SMTP
        from: '"SecuriTrust" <rayen.ben-ghorbal@securitrust.fr>',
        to: customerEmail,
        subject: '✅ Confirmation de paiement - SecuriTrust',
        html: htmlContent,
      });
      
      console.log('✅ Email client envoyé:', clientEmailInfo.messageId);

      // 2. Envoi à L'ADMIN (Rayen)
      const adminEmailInfo = await transporter.sendMail({
        from: '"SecuriTrust Notifications" <rayen.ben-ghorbal@securitrust.fr>',
        // C'est Rayen qui reçoit l'alerte
        to: 'rayen.ben-ghorbal@securitrust.fr',
        subject: '🔔 Nouvelle commande SecuriTrust',
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
                  <h1>🔔 Nouvelle Commande Reçue</h1>
                </div>
                <div class="content">
                  <div class="info-box">
                    <h2 style="margin-top: 0; color: #2c3e50;">📊 Informations de la commande</h2>
                    <div class="info-row">
                      <span class="label">ID Session Stripe :</span>
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
                    💰 Montant : ${amountTotal.toFixed(2)} ${currency}
                  </div>

                  <div class="info-box">
                    <h3 style="margin-top: 0; color: #2c3e50;">📋 Prochaines actions :</h3>
                    <ol>
                      <li>Contacter le client dans les 24h</li>
                      <li>Planifier l'audit de cybersécurité</li>
                      <li>Assigner un expert au dossier</li>
                      <li>Envoyer la confirmation d'intervention</li>
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
      
      console.log('✅ Email admin envoyé:', adminEmailInfo.messageId);
      
    } catch (error: any) {
      console.error('❌ Erreur envoi email:', {
        message: error.message,
        code: error.code,
        command: error.command,
      });
    }
  }

  return NextResponse.json({ received: true });
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';