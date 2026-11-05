// Captcha anti-spam Cloudflare Turnstile, côté serveur.
// Tant que TURNSTILE_SECRET_KEY n'est pas définie, la vérification est désactivée
// (les formulaires fonctionnent comme avant). Clés de test Cloudflare (toujours valides) :
// site 1x00000000000000000000AA, secret 1x0000000000000000000000000000000AA.

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TIMEOUT_MS = 8000;

export type CaptchaResult = { ok: true; skipped?: 'disabled' | 'unreachable' } | { ok: false; reason: string };

/** Clé publique du widget (vide si le captcha n'est pas configuré). */
export function captchaSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
}

/** Adresse IP du visiteur, transmise à Cloudflare pour la vérification. */
export function clientIp(headers: Headers): string | undefined {
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf.trim();
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]?.trim() || undefined;
  return undefined;
}

/**
 * Vérifie un jeton Turnstile.
 * - clé secrète absente : vérification désactivée (ok) ;
 * - jeton absent ou refusé par Cloudflare : refus ;
 * - Cloudflare injoignable (délai de 8 s, erreur réseau ou HTTP) : la demande est acceptée,
 *   l'incident est journalisé (on ne perd pas un prospect pour une panne du service).
 */
export async function verifyCaptcha(token: unknown, ip?: string): Promise<CaptchaResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, skipped: 'disabled' };
  if (typeof token !== 'string' || !token.trim()) return { ok: false, reason: 'missing_token' };

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body, signal: controller.signal, cache: 'no-store' });
    if (!res.ok) {
      console.error(`[captcha] siteverify HTTP ${res.status} : demande acceptée sans vérification`);
      return { ok: true, skipped: 'unreachable' };
    }
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (data.success) return { ok: true };
    return { ok: false, reason: (data['error-codes'] || []).join(',') || 'invalid_token' };
  } catch (e) {
    console.error('[captcha] Cloudflare injoignable : demande acceptée sans vérification', e);
    return { ok: true, skipped: 'unreachable' };
  } finally {
    clearTimeout(timer);
  }
}
