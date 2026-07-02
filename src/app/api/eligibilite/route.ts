import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createLead, isDolibarrConfigured } from '@/lib/dolibarr';
import { createLeadInNotion, isNotionConfigured } from '@/lib/notion';

// Init paresseuse : une clé absente ne doit pas casser la route (ni le push Dolibarr).
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const { company, contact, siret, email } = await req.json();
    const contactName = [contact?.prenom, contact?.nom].filter(Boolean).join(' ').trim();
    const name = company?.name || contactName || email || 'Lead éligibilité';

    // 1. Email de notification (best-effort)
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SecuriTrust <onboarding@resend.dev>',
          to: ['contact@securitrust.fr'],
          subject: `🔥 Lead éligibilité — ${name}`,
          html: `
            <h2>Nouveau lead qualifié depuis /eligibilite</h2>
            <p><strong>Entreprise :</strong> ${company?.name || 'Non renseignée'}</p>
            <p><strong>SIRET :</strong> ${siret || 'Non renseigné'}</p>
            <p><strong>Activité :</strong> ${company?.activityLabel || 'Non renseignée'}</p>
            <p><strong>Contact :</strong> ${contactName || 'Non renseigné'} — ${contact?.fonction || ''}</p>
            <p><strong>Téléphone :</strong> ${contact?.tel || 'Non renseigné'}</p>
            <p><strong>Email :</strong> ${email || 'Non renseigné'}</p>
          `,
        });
      } catch (e) {
        console.error('[eligibilite] envoi email échoué', e);
      }
    }

    // 2. Dolibarr (best-effort)
    if (isDolibarrConfigured()) {
      try {
        const note = [
          siret ? `SIRET : ${siret}` : null,
          company?.activityLabel ? `Activité : ${company.activityLabel}` : null,
          contactName ? `Contact : ${contactName}` : null,
          contact?.fonction ? `Fonction : ${contact.fonction}` : null,
        ]
          .filter(Boolean)
          .join('\n');
        await createLead({
          name,
          email,
          phone: contact?.tel,
          note,
          source: 'Site — tunnel /eligibilite',
        });
      } catch (e) {
        console.error('[eligibilite] création Dolibarr échouée', e);
      }
    }

    // 3. Notion (best-effort — stockage principal des leads)
    if (isNotionConfigured()) {
      try {
        await createLeadInNotion({
          name,
          email,
          phone: contact?.tel,
          company: company?.name,
          source: 'Éligibilité',
          siretActivity: [siret, company?.activityLabel].filter(Boolean).join(' — '),
          subjectMessage: contact?.fonction ? `Fonction : ${contact.fonction}` : undefined,
        });
      } catch (e) {
        console.error('[eligibilite] création Notion échouée', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
