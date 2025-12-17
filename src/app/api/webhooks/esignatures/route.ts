import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { proposals } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log('eSignatures.io webhook received:', JSON.stringify(body, null, 2));

    const eventType = body.event_type;
    const contractId = body.contract?.contract_id;
    const status = body.contract?.status;

    if (!contractId) {
      return NextResponse.json(
        { error: 'Missing contract_id in webhook payload' },
        { status: 400 }
      );
    }

    const [proposal] = await db
      .select()
      .from(proposals)
      .where(eq(proposals.contractId, contractId))
      .limit(1);

    if (!proposal) {
      console.warn(`No proposal found for contract_id: ${contractId}`);
      return NextResponse.json({ received: true, message: 'Contract not found' });
    }

    if (eventType === 'signer_viewed') {
      await db
        .update(proposals)
        .set({ 
          contractStatus: 'viewed',
          updatedAt: new Date()
        })
        .where(eq(proposals.id, proposal.id));
      
      console.log(`Contract ${contractId} marked as viewed`);
    }

    if (eventType === 'contract_signed' || eventType === 'all_signers_completed') {
      await db
        .update(proposals)
        .set({ 
          contractStatus: 'completed',
          updatedAt: new Date()
        })
        .where(eq(proposals.id, proposal.id));
      
      console.log(`Contract ${contractId} marked as completed`);
    }

    if (status) {
      console.log(`Contract ${contractId} status updated to: ${status}`);
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
