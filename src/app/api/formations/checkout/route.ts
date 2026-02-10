import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import { handleApiError, AppError } from '@/lib/errorHandler';
import { getFormationBySlug } from '@/lib/formations-data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const formationCheckoutSchema = z.object({
  formationSlug: z.string().min(1, 'Le slug de la formation est requis'),
  email: z.string().email('Email invalide'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  purchaseType: z.enum(['one_time', 'subscription'], {
    errorMap: () => ({ message: 'Type d\'achat invalide' }),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = formationCheckoutSchema.parse(body);

    const formation = getFormationBySlug(validated.formationSlug);

    if (!formation) {
      throw new AppError('Formation introuvable', 404, 'FORMATION_NOT_FOUND');
    }

    if (!formation.published) {
      throw new AppError('Cette formation n\'est pas disponible', 400, 'FORMATION_NOT_PUBLISHED');
    }

    const price = validated.purchaseType === 'one_time' 
      ? formation.price 
      : formation.priceMonthly;

    const origin = req.headers.get('origin') 
      || req.headers.get('referer')?.split('/').slice(0, 3).join('/') 
      || 'http://localhost:3000';

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      customer_email: validated.email,
      metadata: {
        formation_slug: validated.formationSlug,
        purchase_type: validated.purchaseType,
        customer_name: validated.name,
        customer_email: validated.email,
      },
      success_url: `${origin}/formations-paiement/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/formations-paiement?formation=${validated.formationSlug}&canceled=true`,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: formation.title,
              description: formation.shortDescription,
            },
            unit_amount: price,
            ...(validated.purchaseType === 'subscription' && {
              recurring: {
                interval: 'month',
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: validated.purchaseType === 'one_time' ? 'payment' : 'subscription',
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return handleApiError(error);
  }
}
