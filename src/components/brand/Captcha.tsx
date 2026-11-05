'use client';

import { useEffect, useRef } from 'react';

// Captcha anti-spam Cloudflare Turnstile pour les formulaires React.
// - Sans clé publique (NEXT_PUBLIC_TURNSTILE_SITE_KEY), le composant ne rend rien.
// - Le script Cloudflare n'est chargé qu'au premier focus ou clic dans le formulaire
//   (aucun impact sur le chargement de la page).
// - appearance « interaction-only » : invisible sauf si Cloudflare exige une interaction.
// - Changer `resetKey` relance le défi (à faire après chaque échec d'envoi).

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const TOKEN_FIELD = 'cf-turnstile-response';

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let scriptPromise: Promise<Turnstile | null> | null = null;

function loadTurnstile(): Promise<Turnstile | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      // api.js peut définir window.turnstile juste après onload : on attend brièvement.
      let tries = 0;
      const check = () => {
        if (window.turnstile) return resolve(window.turnstile);
        if (++tries > 50) return resolve(null);
        setTimeout(check, 50);
      };
      check();
    };
    s.onerror = () => {
      scriptPromise = null;
      resolve(null);
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/**
 * Jeton Turnstile du formulaire (champ cf-turnstile-response). Attend jusqu'à 6 s
 * qu'il soit prêt ; renvoie une chaîne vide sans captcha ou si le jeton n'arrive pas.
 */
export async function captchaToken(el: HTMLElement | null, timeoutMs = 6000): Promise<string> {
  if (!SITE_KEY || !el) return '';
  const read = () => (el.querySelector<HTMLInputElement>(`input[name="${TOKEN_FIELD}"]`)?.value || '').trim();
  const start = Date.now();
  let token = read();
  while (!token && Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 150));
    token = read();
  }
  return token;
}

export function Captcha({ resetKey = 0, language = 'fr' }: { resetKey?: number | string; language?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const started = useRef(false);

  // Chargement différé au premier focus ou clic dans le formulaire parent.
  useEffect(() => {
    if (!SITE_KEY) return;
    const box = boxRef.current;
    // Formulaire parent, ou à défaut le conteneur direct (formulaire sans balise <form>).
    const form = box?.closest('form') || box?.parentElement;
    if (!box || !form) return;

    const start = () => {
      if (started.current) return;
      started.current = true;
      form.removeEventListener('focusin', start);
      form.removeEventListener('pointerdown', start);
      form.removeEventListener('click', start);
      loadTurnstile().then((ts) => {
        if (!ts || !boxRef.current || widgetId.current) return;
        try {
          widgetId.current = ts.render(boxRef.current, {
            sitekey: SITE_KEY,
            appearance: 'interaction-only',
            language,
            action: 'lead',
          });
        } catch (e) {
          console.error('[captcha] affichage du widget impossible', e);
        }
      });
    };
    form.addEventListener('focusin', start);
    form.addEventListener('pointerdown', start);
    form.addEventListener('click', start);
    return () => {
      form.removeEventListener('focusin', start);
      form.removeEventListener('pointerdown', start);
      form.removeEventListener('click', start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nouveau défi quand resetKey change (après un échec d'envoi).
  const firstReset = useRef(true);
  useEffect(() => {
    if (firstReset.current) {
      firstReset.current = false;
      return;
    }
    if (widgetId.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetId.current);
      } catch {
        /* widget déjà retiré */
      }
    }
  }, [resetKey]);

  // Retrait du widget au démontage (formulaire remplacé par le message de succès).
  useEffect(
    () => () => {
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* rien */
        }
      }
      widgetId.current = null;
    },
    [],
  );

  if (!SITE_KEY) return null;
  return <div ref={boxRef} className="captcha-box" style={{ maxWidth: '100%', overflow: 'hidden' }} />;
}
