'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackLead, trackLeadError } from '@/lib/analytics';

// Formulaire de demande commun aux pages d'offre (charte RSSI, thème statique).
// Envoie vers /api/contact (e-mail + Dolibarr + Notion) avec la source de la page.

const PERSONAL = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.fr', 'hotmail.com', 'hotmail.fr', 'outlook.com', 'outlook.fr',
  'live.com', 'live.fr', 'msn.com', 'icloud.com', 'me.com', 'aol.com', 'gmx.com', 'gmx.fr', 'free.fr', 'orange.fr',
  'wanadoo.fr', 'sfr.fr', 'laposte.net', 'protonmail.com', 'proton.me', 'yopmail.com',
]);

type Props = {
  /** Identifiant du formulaire pour GA4 (ex. pentest_externe). */
  formId: string;
  /** Source transmise à /api/contact (visible dans l'e-mail de notification). */
  source: string;
  title?: string;
  subtitle?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
};

export function LeadForm({
  formId,
  source,
  title = 'Recevoir un devis',
  subtitle = 'Un consultant vous rappelle pour cadrer votre besoin.',
  messageLabel = 'Votre besoin (facultatif)',
  messagePlaceholder = 'Périmètre, échéance, contexte…',
  submitLabel = 'Être rappelé sous 2 h',
}: Props) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim();
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && PERSONAL.has(domain)) {
      setError('Merci d’indiquer une adresse e-mail professionnelle.');
      return;
    }
    setError(null);
    setSending(true);
    let res: Response;
    try {
      res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email,
          phone: fd.get('phone'),
          company: fd.get('company'),
          message: fd.get('message'),
          subject: `Demande ${source}`,
          source,
          website: fd.get('website'),
        }),
      });
    } catch {
      res = new Response(null, { status: 599 });
    }
    setSending(false);
    if (!res.ok) {
      trackLeadError(formId, res.status === 599 ? 'network' : `http_${res.status}`);
      setError('L’envoi a échoué. Appelez-nous au 01 86 04 44 31 ou écrivez à expertise@securitrust.fr.');
      return;
    }
    trackLead(formId, source);
    setDone(true);
  }

  if (done) {
    return (
      <div className="form-card lead-done" role="status">
        <CheckCircle2 size={28} />
        <h3>Demande bien reçue</h3>
        <p className="fc-sub">Un consultant vous rappelle sous 2 heures ouvrées.</p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate={false}>
      <h3>{title}</h3>
      <p className="fc-sub">{subtitle}</p>
      <div className="field">
        <label htmlFor={`${formId}-name`}>Nom et prénom</label>
        <input id={`${formId}-name`} name="name" autoComplete="name" required placeholder="Votre nom et prénom" />
      </div>
      <div className="field">
        <label htmlFor={`${formId}-email`}>E-mail professionnel</label>
        <input id={`${formId}-email`} name="email" type="email" autoComplete="email" required placeholder="prenom@entreprise.fr" />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor={`${formId}-phone`}>Téléphone</label>
          <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" />
        </div>
        <div className="field">
          <label htmlFor={`${formId}-company`}>Entreprise</label>
          <input id={`${formId}-company`} name="company" autoComplete="organization" placeholder="Votre entreprise" />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${formId}-message`}>{messageLabel}</label>
        <textarea id={`${formId}-message`} name="message" rows={3} placeholder={messagePlaceholder} />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>J’accepte que SecuriTrust utilise ces informations pour me recontacter dans le cadre de ma demande. Aucun transfert à des tiers.</span>
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="btn-primary" disabled={sending}>
        {sending ? 'Envoi…' : submitLabel} {!sending && <ArrowRight size={16} />}
      </button>
      <p className="form-note">Réponse sous 2 h · NDA dès le premier échange</p>
      <p className="rgpd-note">
        Données traitées par SecuriTrust sur la base de votre consentement, pour répondre à votre demande, conservées 24 mois.
        Droits d’accès, de rectification et d’opposition : <a href="mailto:dpo@securitrust.fr">dpo@securitrust.fr</a>.{' '}
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>.
      </p>
    </form>
  );
}
