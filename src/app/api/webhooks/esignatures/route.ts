import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { esignatureEvents } from '@/db/schema';

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

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing eSignatures webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
