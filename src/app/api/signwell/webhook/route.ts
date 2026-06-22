import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { db } from '@/db';
import { signwellSignatures } from '@/db/schema';
import { eq } from 'drizzle-orm';

function verifySignwellSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.SIGNWELL_API_KEY;
  if (!secret || !signature) return false;
  try {
    const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(signature, 'utf8');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-signwell-signature');

  if (!verifySignwellSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  try {
    const body = JSON.parse(rawBody);
    const eventType = body?.event?.type;
    const document = body?.document;

    if (!document?.id) {
      return NextResponse.json({ ok: true });
    }

    if (eventType === 'document_completed') {
      await db
        .update(signwellSignatures)
        .set({
          status: 'completed',
          completedAt: new Date().toISOString(),
        })
        .where(eq(signwellSignatures.documentId, document.id));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
