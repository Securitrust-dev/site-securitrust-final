import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { organisation, email, telephone } = await req.json();
    if (!organisation || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'SecuriTrust <onboarding@resend.dev>',
      to: ['contact@securitrust.fr'],
      subject: `🎯 Nouveau lead — ${organisation}`,
      html: `
        <h2>Nouveau lead depuis le site</h2>
        <p><strong>Organisation :</strong> ${organisation}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
