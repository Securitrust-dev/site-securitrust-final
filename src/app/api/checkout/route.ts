import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { checkoutSchema } from '@/lib/validation';
import { handleApiError, AppError } from '@/lib/errorHandler';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Strict validation
    const validated = checkoutSchema.parse(body);

    // Security: Prices must be defined server-side (NEVER trust client)
    const allowedPlans: Record<string, number> = {
      'Starter': 2499,
      'Pro': 4999,
      'Team': 9999,
    };

    // Verify plan exists and amount matches
    if (!allowedPlans[validated.plan]) {
      throw new AppError('Invalid plan', 400, 'INVALID_PLAN');
    }

    if (validated.amount !== allowedPlans[validated.plan]) {
      throw new AppError('Amount mismatch', 400, 'AMOUNT_MISMATCH');
    }

    const origin = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/') || 'http://localhost:3000';
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Audit Cybersécurité SECURITRUST - ${validated.plan}`,
              description: 'Test d\'intrusion complet, OSINT, Rapport détaillé',
            },
            unit_amount: validated.amount * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: validated.email,
      metadata: {
        plan: validated.plan,
        customer_name: validated.name,
      },
        success_url: `${origin}/paiement/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(validated.email)}`,
      cancel_url: `${origin}/paiement?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return handleApiError(error);
  }
}