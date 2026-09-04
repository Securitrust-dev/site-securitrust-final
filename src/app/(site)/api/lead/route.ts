import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createLead, isDolibarrConfigured } from '@/lib/dolibarr';
import { createLeadInNotion, isNotionConfigured } from '@/lib/notion';

// Init paresseuse : une clé absente ne doit pas casser la route (ni le push Dolibarr).
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const { organisation, email, telephone } = await req.json();
    if (!organisation || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 1. Email de notification (best-effort)
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SecuriTrust <onboarding@resend.dev>',
          to: ['contact@securitrust.fr'],
          subject: `🎯 Nouveau lead — ${organisation}`,
          html: `
            <h2>Nouveau lead depuis le site (formulaire hero)</h2>
            <p><strong>Organisation :</strong> ${organisation}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
          `,
        });
      } catch (e) {
        console.error('[lead] envoi email échoué', e);
      }
    }

    // 2. Dolibarr (best-effort — n'interrompt pas le formulaire en cas d'échec)
    if (isDolibarrConfigured()) {
      try {
        await createLead({
          name: organisation || email,
          email,
          phone: telephone,
          source: 'Site — formulaire hero (audit cyber)',
        });
      } catch (e) {
        console.error('[lead] création Dolibarr échouée', e);
      }
    }

    // 3. Notion (best-effort — stockage principal des leads)
    if (isNotionConfigured()) {
      try {
        await createLeadInNotion({
          name: organisation || email,
          email,
          phone: telephone,
          company: organisation,
          source: 'Hero',
        });
      } catch (e) {
        console.error('[lead] création Notion échouée', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
