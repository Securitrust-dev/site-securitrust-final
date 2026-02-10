import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/db';
import { formationPurchases } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateAccessToken } from '@/lib/formations-auth';
import { getFormationBySlug } from '@/lib/formations-data';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('[WEBHOOK] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const formationSlug = session.metadata?.formation_slug;
        if (!formationSlug) break; // Not a formation purchase

        const customerEmail = session.metadata?.customer_email || session.customer_email || '';
        const customerName = session.metadata?.customer_name || '';
        const purchaseType = session.metadata?.purchase_type || 'one_time';

        // Check if already processed
        const existing = await db
          .select()
          .from(formationPurchases)
          .where(eq(formationPurchases.stripeSessionId, session.id))
          .limit(1);

        if (existing.length > 0) break;

        const formation = getFormationBySlug(formationSlug);
        if (!formation) break;

        // Generate access token
        const token = await generateAccessToken(customerEmail, formationSlug);
        const now = new Date().toISOString();
        const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

        // Save purchase
        await db.insert(formationPurchases).values({
          email: customerEmail,
          formationSlug,
          stripeSessionId: session.id,
          stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
          stripeSubscriptionId: typeof session.subscription === 'string' ? session.subscription : null,
          purchaseType,
          accessToken: token,
          accessTokenExpiry: expiry,
          status: 'active',
          customerName,
          createdAt: now,
          updatedAt: now,
        });

        // Send confirmation email
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        try {
          await resend.emails.send({
            from: 'SecuriTrust <onboarding@resend.dev>',
            to: customerEmail,
            subject: `Confirmation - ${formation.title}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e2e8f0; padding: 40px; border-radius: 12px;">
                <h1 style="color: #22d3ee; font-size: 24px; margin-bottom: 20px;">Paiement confirme !</h1>
                <p style="margin-bottom: 16px;">Bonjour ${customerName},</p>
                <p style="margin-bottom: 16px;">Votre acces a la formation <strong style="color: white;">${formation.title}</strong> est maintenant actif.</p>
                <div style="background: #111; border: 1px solid #1e293b; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <p style="margin: 0 0 8px 0;"><strong style="color: #22d3ee;">Formation :</strong> ${formation.title}</p>
                  <p style="margin: 0 0 8px 0;"><strong style="color: #22d3ee;">Duree :</strong> ${formation.duration}</p>
                  <p style="margin: 0;"><strong style="color: #22d3ee;">Modules :</strong> ${formation.modules.length} modules video</p>
                </div>
                <a href="${appUrl}/formations-paiement/success?session_id=${session.id}" style="display: inline-block; background: #0891b2; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px;">
                  Acceder a ma formation
                </a>
                <p style="margin-top: 32px; font-size: 12px; color: #64748b;">
                  SecuriTrust - Cabinet d'audit en cybersecurite
                </p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('[WEBHOOK] Email send error:', emailError);
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        // Deactivate access for cancelled subscriptions
        const purchases = await db
          .select()
          .from(formationPurchases)
          .where(eq(formationPurchases.stripeSubscriptionId, subscription.id));

        for (const purchase of purchases) {
          await db
            .update(formationPurchases)
            .set({ status: 'cancelled', updatedAt: new Date().toISOString() })
            .where(eq(formationPurchases.id, purchase.id));
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        if (!invoice.subscription) break;

        // Renew access for subscription payments
        const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription.id;
        const purchases = await db
          .select()
          .from(formationPurchases)
          .where(eq(formationPurchases.stripeSubscriptionId, subId));

        const newExpiry = new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(); // 35 days

        for (const purchase of purchases) {
          await db
            .update(formationPurchases)
            .set({
              accessTokenExpiry: newExpiry,
              status: 'active',
              updatedAt: new Date().toISOString(),
            })
            .where(eq(formationPurchases.id, purchase.id));
        }
        break;
      }
    }
  } catch (error) {
    console.error('[WEBHOOK] Processing error:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
