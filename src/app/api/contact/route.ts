import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createLead, isDolibarrConfigured } from '@/lib/dolibarr';
import { createLeadInNotion, isNotionConfigured } from '@/lib/notion';
import { saveLead, markLeadEmail } from '@/lib/leads-store';

// Init paresseuse : une clé absente ne doit pas casser la route (ni le push Dolibarr).
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/** Sources (attribut data-source des formulaires) envoyées par e-mail seulement. */
const EMAIL_ONLY_SOURCES = ['NIS2'];

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

type LeadMail = { leadId: string; name?: string; email?: string; phone?: string; company?: string; subject?: string; message?: string; source?: string; page?: string };

/** Résultat d'envoi : `reason` = code d'erreur Resend (ex. invalid_api_key), jamais de détail sensible. */
type MailResult = { ok: true } | { ok: false; reason: string };

/**
 * Notification à expertise@securitrust.fr. Le formulaire d'origine figure dans l'objet et
 * le corps ; « Répondre » écrit directement au prospect. Renvoie false si l'envoi a échoué
 * (Resend signale ses erreurs dans sa réponse, sans lever d'exception).
 */
async function sendLeadEmail(lead: LeadMail): Promise<MailResult> {
  if (!resend) {
    console.error('[contact] RESEND_API_KEY absente : e-mail non envoyé');
    return { ok: false, reason: 'missing_api_key' };
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
        <p><strong>Page :</strong> ${esc(lead.page) || 'Non renseignée'}</p>
        <p style="color:#888;font-size:12px">Référence du lead : ${esc(lead.leadId)}</p>
      `,
    });
    if (error) {
      console.error('[contact] envoi email refusé par Resend', error);
      return { ok: false, reason: String((error as { name?: string }).name || 'resend_error') };
    }
    return { ok: true };
  } catch (e) {
    console.error('[contact] envoi email échoué', e);
    return { ok: false, reason: 'exception' };
  }
}

/** Codes Resend sans risque à renvoyer au navigateur (diagnostic depuis l'extérieur). */
const PUBLIC_REASONS = new Set([
  'missing_api_key', 'invalid_api_key', 'restricted_api_key', 'validation_error',
  'daily_quota_exceeded', 'rate_limit_exceeded', 'resend_error', 'exception',
]);
const publicReason = (r: string) => (PUBLIC_REASONS.has(r) ? r : 'resend_error');

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, subject, message, source, page, website } = await req.json();
    // Pot de miel des formulaires statiques : champ invisible, rempli par les seuls robots.
    if (website) return NextResponse.json({ success: true });
    if (!name || !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const leadId = crypto.randomUUID();
    const pagePath = typeof page === 'string' ? page : (req.headers.get('referer') || '').replace(/^https?:\/\/[^/]+/, '') || undefined;

    // 0. Sauvegarde du lead (Turso) AVANT tout envoi : aucune demande perdue,
    //    même si l'e-mail, Notion et Dolibarr échouent. Visible dans /admin-stats.
    let stored = false;
    try {
      await saveLead({ id: leadId, name, email, phone, company, subject, message, source, page: pagePath });
      stored = true;
    } catch (e) {
      console.error('[contact] sauvegarde Turso échouée', e);
    }

    // Formulaires de la page NIS2 : envoi direct par e-mail uniquement, ni Dolibarr ni
    // Notion. L'e-mail est alors obligatoire : s'il échoue, le visiteur voit l'erreur
    // (sa saisie est conservée, avec téléphone et adresse de repli) au lieu d'un faux
    // « merci » pour une demande que personne ne recevrait.
    const emailOnly = typeof source === 'string' && EMAIL_ONLY_SOURCES.some((prefix) => source.startsWith(prefix));

    // 1. E-mail de notification à expertise@securitrust.fr
    const mail = await sendLeadEmail({ leadId, name, email, phone, company, subject, message, source, page: pagePath });
    if (stored) {
      try {
        await markLeadEmail(leadId, mail.ok, mail.ok ? undefined : mail.reason);
      } catch (e) {
        console.error('[contact] mise à jour Turso échouée', e);
      }
    }
    if (emailOnly) {
      return mail.ok
        ? NextResponse.json({ success: true, leadId })
        : NextResponse.json({ success: false, error: 'email_failed', reason: publicReason(mail.reason) }, { status: 502 });
    }

    // 2. Dolibarr (best-effort)
    let inCrm = false;
    if (isDolibarrConfigured()) {
      try {
        const note = [
          `Contact : ${name}`,
          phone ? `Téléphone : ${phone}` : null,
          subject ? `Sujet : ${subject}` : null,
          message ? `Message :\n${message}` : null,
          pagePath ? `Page : ${pagePath}` : null,
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
        inCrm = true;
      } catch (e) {
        console.error('[contact] création Dolibarr échouée', e);
      }
    }

    // 3. Notion (best-effort)
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
        inCrm = true;
      } catch (e) {
        console.error('[contact] création Notion échouée', e);
      }
    }

    // Le visiteur ne voit « merci » que si la demande est arrivée quelque part.
    // Sinon : erreur, saisie conservée, téléphone et e-mail de repli affichés.
    if (!mail.ok && !stored && !inCrm) {
      return NextResponse.json({ success: false, error: 'lead_not_saved' }, { status: 502 });
    }
    return NextResponse.json({ success: true, leadId });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
