// Événements de conversion poussés dans le dataLayer GTM (relayés en GA4).
// Même schéma que public/site-tracking.js, qui gère les clics Calendly / tel /
// mailto et le début de saisie (attribut data-lead-form sur le <form>).

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  // Relais PostHog défini par public/site-tracking.js (retire e-mail et téléphone).
  stPhCapture?: (event: string, props: Record<string, unknown>) => void;
};

export function trackEvent(event: string, params: Record<string, string | undefined> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  const payload = { event, form_location: window.location.pathname, ...params };
  w.dataLayer.push(payload);
  w.stPhCapture?.(event, payload);
}

/**
 * Lead enregistré par l'API (à n'appeler qu'après une réponse 2xx).
 *
 * - `lead_id` sert d'identifiant de transaction : Google Ads dédoublonne une même
 *   conversion envoyée deux fois (double clic, rechargement).
 * - `user_data` alimente les conversions améliorées Google Ads (GTM hache e-mail et
 *   téléphone en SHA-256 avant envoi). Les visiteurs ont coché le consentement du
 *   formulaire ; Consent Mode reste appliqué par GTM.
 * Le `user_data` est vidé juste après, pour qu'il ne se propage pas aux événements suivants.
 */
export function trackLead(
  formId: string,
  leadService?: string,
  extra: { leadId?: string; email?: string; phone?: string } = {},
) {
  if (typeof window === 'undefined') return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  const email = extra.email?.trim().toLowerCase() || undefined;
  const phone = normalizePhone(extra.phone);
  w.dataLayer.push({
    event: 'generate_lead',
    form_location: window.location.pathname,
    form_id: formId,
    lead_service: leadService,
    lead_id: extra.leadId,
    user_data: email || phone ? { email, phone_number: phone } : undefined,
  });
  w.dataLayer.push({ user_data: undefined });
  w.stPhCapture?.('generate_lead', {
    form_location: window.location.pathname,
    form_id: formId,
    lead_service: leadService,
    lead_id: extra.leadId,
  });
}

/** Téléphone au format E.164 attendu par Google (FR par défaut). */
function normalizePhone(raw?: string): string | undefined {
  const digits = (raw || '').replace(/[^\d+]/g, '');
  if (!digits) return undefined;
  if (digits.startsWith('+')) return digits;
  if (digits.startsWith('00')) return `+${digits.slice(2)}`;
  if (digits.startsWith('0') && digits.length === 10) return `+33${digits.slice(1)}`;
  return undefined;
}

/** Échec d'envoi : le lead aurait été perdu sans ce signal. */
export const trackLeadError = (formId: string, errorType: string) =>
  trackEvent('lead_form_error', { form_id: formId, error_type: errorType });
