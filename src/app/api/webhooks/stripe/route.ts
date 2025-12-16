import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment succeeded:', session.id);
      
      const customerEmail = session.customer_details?.email;
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
      const currency = session.currency?.toUpperCase() || 'EUR';
      
      if (customerEmail) {
        if (!resend) {
          console.error('RESEND_API_KEY is missing; skipping email send for session:', session.id);
          break;
        }

        try {
          await resend.emails.send({
            from: 'Securitrust <onboarding@resend.dev>',
            to: [customerEmail, 'jad.joumblat@securitrust.fr'],
            subject: 'Confirmation de paiement - Securitrust',
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                    .payment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                    .detail-label { font-weight: 600; }
                    .amount { font-size: 24px; font-weight: 700; color: #667eea; }
                    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1>✅ Paiement confirmé</h1>
                      <p>Merci pour votre confiance</p>
                    </div>
                    <div class="content">
                      <p>Bonjour,</p>
                      <p>Nous avons bien reçu votre paiement. Voici les détails de votre transaction :</p>
                      
                      <div class="payment-details">
                        <div class="detail-row">
                          <span class="detail-label">Numéro de transaction</span>
                          <span>${session.id}</span>
                        </div>
                        <div class="detail-row">
                          <span class="detail-label">Montant</span>
                          <span class="amount">${amountTotal.toFixed(2)} ${currency}</span>
                        </div>
                        <div class="detail-row">
                          <span class="detail-label">Email</span>
                          <span>${customerEmail}</span>
                        </div>
                        <div class="detail-row">
                          <span class="detail-label">Date</span>
                          <span>${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      
                      <p>Notre équipe vous contactera prochainement pour la suite de votre projet.</p>
                      
                      <p>Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:jad.joumblat@securitrust.fr">jad.joumblat@securitrust.fr</a></p>
                      
                      <p>Cordialement,<br><strong>L'équipe Securitrust</strong></p>
                    </div>
                    <div class="footer">
                      <p>© ${new Date().getFullYear()} Securitrust. Tous droits réservés.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          });
          
          console.log('Confirmation email sent to:', customerEmail, 'and jad.joumblat@securitrust.fr');
        } catch (error) {
          console.error('Failed to send confirmation email:', error);
        }
      }
      break;
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent failed:', paymentIntent.id);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
