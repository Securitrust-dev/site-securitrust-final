import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createLead, isDolibarrConfigured } from '@/lib/dolibarr';
import { createLeadInNotion, isNotionConfigured } from '@/lib/notion';

// Init paresseuse : une clé absente ne doit pas casser la route (ni le push Dolibarr).
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, subject, message, source } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 1. Email de notification (best-effort)
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SecuriTrust <onboarding@resend.dev>',
          to: ['contact@securitrust.fr'],
          subject: `✉️ Message contact — ${company || name}`,
          html: `
            <h2>Nouveau message depuis /contact</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
            <p><strong>Entreprise :</strong> ${company || 'Non renseignée'}</p>
            <p><strong>Sujet :</strong> ${subject || 'Non renseigné'}</p>
            <p><strong>Message :</strong><br/>${(message || '').replace(/\n/g, '<br/>')}</p>
          `,
        });
      } catch (e) {
        console.error('[contact] envoi email échoué', e);
      }
    }

    // 2. Dolibarr (best-effort)
    if (isDolibarrConfigured()) {
      try {
        const note = [
          `Contact : ${name}`,
          phone ? `Téléphone : ${phone}` : null,
          subject ? `Sujet : ${subject}` : null,
          message ? `Message :\n${message}` : null,
        ]
          .filter(Boolean)
          .join('\n');
        await createLead({
          name: company || name || email,
          email,
          phone,
          note,
          source: 'Site — formulaire /contact',
        });
      } catch (e) {
        console.error('[contact] création Dolibarr échouée', e);
      }
    }

    // 3. Notion (best-effort — stockage principal des leads)
    if (isNotionConfigured()) {
      try {
        await createLeadInNotion({
          name: name || company || email,
          email,
          phone,
          company,
          source: source === 'LP RSSI' ? 'LP RSSI' : 'Contact',
          subjectMessage: [subject, message].filter(Boolean).join(' — '),
        });
      } catch (e) {
        console.error('[contact] création Notion échouée', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
