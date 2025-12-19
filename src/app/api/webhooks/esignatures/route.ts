import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { esignatureEvents } from '@/db/schema';
import nodemailer from 'nodemailer';

// Configuration SMTP OVH
const transporter = nodemailer.createTransport({
  host: 'ssl0.ovh.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('eSignatures.io webhook received:', JSON.stringify(body, null, 2));

    const eventType: string | undefined = body?.event_type;
    const contractId: string | undefined = body?.contract?.contract_id;
    const eventId: string =
      body?.event_id ?? `${contractId ?? 'unknown'}:${eventType ?? 'unknown'}:${Date.now()}`;

    if (!contractId) {
      return NextResponse.json(
        { error: 'Missing contract_id in webhook payload' },
        { status: 400 }
      );
    }

    // Persist the webhook event (idempotent via unique eventId)
    await db
      .insert(esignatureEvents)
      .values({
        eventId,
        contractId,
        eventType: eventType ?? 'unknown',
        payload: JSON.stringify(body),
        createdAt: new Date().toISOString(),
      })
      .onConflictDoNothing();

    // ============================================================
    // ENVOI D'EMAIL UNIQUEMENT SI LE CONTRAT EST SIGNÉ
    // ============================================================
    
    // Vérifier que l'événement correspond à une signature complétée
    if (eventType === 'contract.signed' || eventType === 'signature.completed') {
      console.log('📝 Contrat signé détecté, envoi des emails...');

      // Extraction des données du signataire
      const signer = body?.contract?.parties?.find((p: any) => p.role === 'signer' || p.role === 'customer');
      const customerEmail = signer?.email || body?.contract?.customer_email;
      const customerName = signer?.name || body?.contract?.customer_name || 'Client';
      const contractPdfUrl = body?.contract?.document_url || body?.contract?.pdf_url;

      if (!customerEmail) {
        console.error('❌ Pas d\'email client dans les données du contrat');
        return NextResponse.json({ received: true });
      }

      if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        console.error('❌ Paramètres SMTP manquants');
        return NextResponse.json({ received: true });
      }

      try {
        console.log('📧 Envoi du contrat signé à:', customerEmail);

        // Construction de l'email avec le contrat
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
                .contract-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .alert { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; border-radius: 4px; margin: 20px 0; }
                .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📝 Contrat Signé</h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px;">Votre contrat SecuriTrust</p>
                </div>
                
                <div class="content">
                  <p>Bonjour <strong>${customerName}</strong>,</p>
                  
                  <div class="alert">
                    ✅ Votre contrat a été signé avec succès !
                  </div>
                  
                  <p>Merci d'avoir complété la signature de votre contrat avec SecuriTrust.</p>
                  
                  <div class="contract-box">
                    <h3 style="color: #667eea; margin-top: 0;">📄 Votre Contrat</h3>
                    <p>Référence : <strong>${contractId}</strong></p>
                    <p>Date de signature : <strong>${new Date().toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</strong></p>
                    
                    ${contractPdfUrl ? `
                      <a href="${contractPdfUrl}" class="button" style="color: white;">
                        📥 Télécharger le contrat signé
                      </a>
                    ` : ''}
                  </div>
                  
                  <h3 style="color: #667eea;">📋 Prochaines étapes</h3>
                  <ul style="line-height: 1.8;">
                    <li>Votre contrat est maintenant actif</li>
                    <li>Vous allez recevoir un lien de paiement séparément</li>
                    <li>Après le paiement, nous planifierons l'intervention</li>
                    <li>Un expert SecuriTrust vous contactera dans les 24h</li>
                  </ul>
                  
                  <p style="margin-top: 30px;">Pour toute question :</p>
                  <p style="text-align: center;">
                    📧 <a href="mailto:jad.joumblat@securitrust.fr" style="color: #667eea;">jad.joumblat@securitrust.fr</a>
                  </p>
                  
                  <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe SecuriTrust</strong></p>
                </div>
                
                <div class="footer">
                  <p>Document contractuel - SecuriTrust</p>
                  <p>© ${new Date().getFullYear()} SecuriTrust - Tous droits réservés</p>
                </div>
              </div>
            </body>
          </html>
        `;

        // Envoi de l'email au client avec le contrat
        const clientEmailInfo = await transporter.sendMail({
          from: '"SecuriTrust" <jad.joumblat@securitrust.fr>',
          to: customerEmail,
          subject: '📝 Votre contrat SecuriTrust signé',
          html: htmlContent,
        });

        console.log('✅ Email contrat client envoyé:', clientEmailInfo.messageId);

        // Email à l'admin
        const adminEmailInfo = await transporter.sendMail({
          from: '"SecuriTrust Notifications" <jad.joumblat@securitrust.fr>',
          to: 'jad.joumblat@securitrust.fr',
          subject: '📝 Nouveau contrat signé',
          html: `
            <h2>📝 Nouveau Contrat Signé</h2>
            <p><strong>Client :</strong> ${customerName}</p>
            <p><strong>Email :</strong> ${customerEmail}</p>
            <p><strong>Référence :</strong> ${contractId}</p>
            <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
            ${contractPdfUrl ? `<p><a href="${contractPdfUrl}">Télécharger le contrat</a></p>` : ''}
          `,
        });

        console.log('✅ Email contrat admin envoyé:', adminEmailInfo.messageId);

      } catch (emailError: any) {
        console.error('❌ Erreur envoi email contrat:', emailError);
        // On ne fait pas échouer le webhook si l'email échoue
      }
    } else {
      console.log(`ℹ️ Événement ${eventType} ignoré (pas une signature complétée)`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Error processing eSignatures webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';