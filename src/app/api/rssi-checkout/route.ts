import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const RSSI_PLANS: Record<string, { label: string; monthlyAmount: number; annualAmount: number }> = {
  essentiel: { label: 'Cyber-Pilote — Essentiel', monthlyAmount: 1950,  annualAmount: 23400  },
  pro:       { label: 'Cyber-Pilote — Pro',       monthlyAmount: 3500,  annualAmount: 42000  },
  business:  { label: 'Cyber-Pilote — Business',  monthlyAmount: 5800,  annualAmount: 69600  },
  premium:   { label: 'Cyber-Pilote — Premium',   monthlyAmount: 9500,  annualAmount: 114000 },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, email, name } = body;

    if (!plan || !email || !name) {
      return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 });
    }

    const planData = RSSI_PLANS[plan.toLowerCase()];
    if (!planData) {
      return NextResponse.json({ error: 'Offre invalide' }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_APP_URL || 'https://www.securitrust.fr';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: planData.label,
              description: `Mensualité — engagement annuel (${planData.annualAmount.toLocaleString('fr-FR')} € / an)`,
            },
            unit_amount: planData.monthlyAmount * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      payment_intent_data: {
        receipt_email: 'jad.joumblat@securitrust.fr',
      },
      metadata: {
        plan: planData.label,
        customer_name: name,
        type: 'rssi-automatise',
      },
      success_url: `${origin}/paiement/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}`,
      cancel_url: `${origin}/cyber-pilote/souscrire/${plan.toLowerCase()}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('RSSI Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Erreur interne' }, { status: 500 });
  }
}
