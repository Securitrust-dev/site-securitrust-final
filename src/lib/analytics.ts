// Événements de conversion poussés dans le dataLayer GTM (relayés en GA4).
// Même schéma que public/site-tracking.js, qui gère les clics Calendly / tel /
// mailto et le début de saisie (attribut data-lead-form sur le <form>).

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackEvent(event: string, params: Record<string, string | undefined> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, form_location: window.location.pathname, ...params });
}

/** Lead enregistré par l'API (à n'appeler qu'après une réponse 2xx). */
export const trackLead = (formId: string, leadService?: string) =>
  trackEvent('generate_lead', { form_id: formId, lead_service: leadService });

/** Échec d'envoi : le lead aurait été perdu sans ce signal. */
export const trackLeadError = (formId: string, errorType: string) =>
  trackEvent('lead_form_error', { form_id: formId, error_type: errorType });
