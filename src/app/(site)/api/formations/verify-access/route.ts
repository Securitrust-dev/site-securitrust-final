import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/db';
import { formationPurchases } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateAccessToken, setFormationAccessCookie } from '@/lib/formations-auth';
import { getFormationBySlug } from '@/lib/formations-data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

// POST: Called from success page to verify session and create access
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ success: false, error: 'Session ID manquant' }, { status: 400 });
    }

    // Check if already processed
    const existing = await db
      .select()
      .from(formationPurchases)
      .where(eq(formationPurchases.stripeSessionId, sessionId))
      .limit(1);

    if (existing.length > 0) {
      const purchase = existing[0];
      const formation = getFormationBySlug(purchase.formationSlug);
      // Set cookie again for the user
      await setFormationAccessCookie(purchase.formationSlug, purchase.accessToken);
      return NextResponse.json({
        success: true,
        formationSlug: purchase.formationSlug,
        formationTitle: formation?.title || '',
      });
    }

    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ success: false, error: 'Paiement non confirme' }, { status: 400 });
    }

    const formationSlug = session.metadata?.formation_slug;
    const purchaseType = session.metadata?.purchase_type || 'one_time';
    const customerName = session.metadata?.customer_name || '';
    const customerEmail = session.metadata?.customer_email || session.customer_email || '';

    if (!formationSlug) {
      return NextResponse.json({ success: false, error: 'Formation non identifiee' }, { status: 400 });
    }

    const formation = getFormationBySlug(formationSlug);
    if (!formation) {
      return NextResponse.json({ success: false, error: 'Formation introuvable' }, { status: 404 });
    }

    // Generate access token
    const token = await generateAccessToken(customerEmail, formationSlug);
    const now = new Date().toISOString();
    const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    // Save purchase
    await db.insert(formationPurchases).values({
      email: customerEmail,
      formationSlug,
      stripeSessionId: sessionId,
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

    // Set cookie
    await setFormationAccessCookie(formationSlug, token);

    return NextResponse.json({
      success: true,
      formationSlug,
      formationTitle: formation.title,
    });
  } catch (error) {
    console.error('[VERIFY_ACCESS_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Erreur interne' }, { status: 500 });
  }
}
