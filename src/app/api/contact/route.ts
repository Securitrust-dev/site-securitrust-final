import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createLead, isDolibarrConfigured } from '@/lib/dolibarr';
import { createLeadInNotion, isNotionConfigured } from '@/lib/notion';

// Init paresseuse : une clé absente ne doit pas casser la route (ni le push Dolibarr).
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/** Sources (attribut data-source des formulaires) envoyées par e-mail seulement. */
const EMAIL_ONLY_SOURCES = ['NIS2'];

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

type LeadMail = { name?: string; email?: string; phone?: string; company?: string; subject?: string; message?: string; source?: string };

/**
 * Notification à expertise@securitrust.fr. Le formulaire d'origine figure dans l'objet et
 * le corps ; « Répondre » écrit directement au prospect. Renvoie false si l'envoi a échoué
 * (Resend signale ses erreurs dans sa réponse, sans lever d'exception).
 */
async function sendLeadEmail(lead: LeadMail): Promise<boolean> {
  if (!resend) {
    console.error('[contact] RESEND_API_KEY absente : e-mail non envoyé');
    return false;
  }
  const origin = lead.source || 'Formulaire /contact';
  try {
    const { error } = await resend.emails.send({
      from: 'SecuriTrust <noreply@securitrust.fr>',
      to: ['expertise@securitrust.fr'],
      replyTo: lead.email ? [String(lead.email)] : undefined,
      subject: `✉️ ${origin} — ${lead.company || lead.name}`,
      html: `
        <h2>Nouvelle demande depuis le site</h2>
        <p><strong>Formulaire :</strong> ${esc(origin)}</p>
        <p><strong>Nom :</strong> ${esc(lead.name)}</p>
        <p><strong>Email :</strong> ${esc(lead.email)}</p>
        <p><strong>Téléphone :</strong> ${esc(lead.phone) || 'Non renseigné'}</p>
        <p><strong>Entreprise :</strong> ${esc(lead.company) || 'Non renseignée'}</p>
        <p><strong>Sujet :</strong> ${esc(lead.subject) || 'Non renseigné'}</p>
        <p><strong>Message :</strong><br/>${esc(lead.message).replace(/\n/g, '<br/>') || '—'}</p>
      `,
    });
    if (error) {
      console.error('[contact] envoi email refusé par Resend', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[contact] envoi email échoué', e);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, subject, message, source, website } = await req.json();
    // Pot de miel des formulaires statiques : champ invisible, rempli par les seuls robots.
    if (website) return NextResponse.json({ success: true });
    if (!name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Formulaires de la page NIS2 : envoi direct par e-mail uniquement, ni Dolibarr ni
    // Notion. L'e-mail est alors obligatoire : s'il échoue, le visiteur voit l'erreur
    // (sa saisie est conservée, avec téléphone et adresse de repli) au lieu d'un faux
    // « merci » pour une demande que personne ne recevrait.
    const emailOnly = typeof source === 'string' && EMAIL_ONLY_SOURCES.some((prefix) => source.startsWith(prefix));

    // 1. Email de notification
    const emailSent = await sendLeadEmail({ name, email, phone, company, subject, message, source });
    if (emailOnly) {
      return emailSent
        ? NextResponse.json({ success: true })
        : NextResponse.json({ success: false, error: 'email_failed' }, { status: 502 });
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
