// PostHog côté navigateur (pages React). Les pages statiques public/*.html, qui ne
// chargent pas Next.js, sont couvertes par public/site-tracking.js avec les mêmes réglages.
//
// Consentement (bandeau Axeptio) :
//  - par défaut, mode sans cookie (cookieless_mode « on_reject » + opt-out par défaut) :
//    aucun cookie ni stockage local, visiteurs comptés par une empreinte quotidienne
//    calculée par PostHog (« Cookieless server hash mode » à activer dans le projet).
//    Pas d'enregistrement de session ni d'identification dans ce mode ;
//  - service « posthog » accepté dans Axeptio : opt-in (cookies, enregistrement de
//    session avec saisies masquées, heatmaps) ; refusé ou retiré : retour sans cookie.
// Initialisation différée (première interaction ou 5 s après load), comme GTM, pour ne
// pas pénaliser l'affichage mobile. Inactif sans NEXT_PUBLIC_POSTHOG_KEY.
import posthog from 'posthog-js';

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';
const AXEPTIO_VENDOR = 'posthog';

type AxeptioSdk = { on: (event: string, cb: (choices: Record<string, unknown>) => void) => void };
type PhWindow = Window & {
  posthog?: typeof posthog;
  _axcb?: Array<(sdk: AxeptioSdk) => void>;
};

function init() {
  posthog.init(posthogKey!, {
    api_host: posthogHost,
    defaults: '2025-05-24',
    person_profiles: 'identified_only',
    cookieless_mode: 'on_reject',
    opt_out_capturing_by_default: true,
    capture_exceptions: true,
    enable_heatmaps: true,
    session_recording: { maskAllInputs: true, maskTextSelector: 'form' },
    debug: process.env.NODE_ENV === 'development',
  });

  const w = window as PhWindow;
  // Utilisé par public/site-tracking.js pour relayer les événements de leads.
  w.posthog = posthog;
  w._axcb = w._axcb || [];
  w._axcb.push((axeptio) => {
    axeptio.on('cookies:complete', (choices) => {
      if (choices?.[AXEPTIO_VENDOR] === true) posthog.opt_in_capturing();
      else posthog.opt_out_capturing();
    });
  });
}

if (!posthogKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[posthog] NEXT_PUBLIC_POSTHOG_KEY absente : PostHog désactivé.');
  }
} else if (typeof window !== 'undefined') {
  const events = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove'] as const;
  let done = false;
  const start = () => {
    if (done) return;
    done = true;
    events.forEach((e) => window.removeEventListener(e, start));
    init();
  };
  events.forEach((e) => window.addEventListener(e, start, { passive: true }));
  if (document.readyState === 'complete') setTimeout(start, 5000);
  else window.addEventListener('load', () => setTimeout(start, 5000));
}
