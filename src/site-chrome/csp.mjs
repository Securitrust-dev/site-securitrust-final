// Content-Security-Policy du site, sans 'unsafe-inline' pour les scripts.
//
// Deux façons d'autoriser les scripts inline, selon le type de page :
//  - pages React (rendues à chaque requête) : un nonce aléatoire par réponse, généré
//    par middleware.ts et appliqué par Next.js à ses propres scripts ;
//  - landing pages statiques public/*.html (servies telles quelles, en cache CDN) : les
//    empreintes SHA-256 de leurs scripts inline, calculées par scripts/sync-site-chrome.mjs
//    (src/site-chrome/generated/static-csp.json) et posées par next.config.js.
//
// Domaines limités à ce que le site charge réellement :
//  - GTM, GA4 et Google Ads (AW-704286147) : liste CSP officielle de Google, mode
//    Preview de Tag Assistant compris (tagmanager.google.com, gstatic) ;
//  - Axeptio (bandeau de consentement, injecté par GTM) ;
//  - Calendly (widget de /prise-de-rdv) ;
//  - images : stockage Supabase du site, Unsplash et images du flux de veille ;
//  - YouTube : vidéos des formations.
//
// styles : 'unsafe-inline' reste nécessaire. Les composants React posent des attributs
// style="…" (qu'aucun nonce ne peut couvrir) et Axeptio, Calendly et GTM injectent leurs
// propres balises <style>. Le risque est faible : une feuille de style n'exécute pas de code.

const SCRIPT_HOSTS = [
  'https://*.googletagmanager.com',
  'https://tagmanager.google.com',
  'https://www.googleadservices.com',
  'https://www.google.com',
  'https://pagead2.googlesyndication.com',
  'https://googleads.g.doubleclick.net',
  'https://static.axept.io',
  'https://assets.calendly.com',
];

const GOOGLE_PIXELS = [
  'https://*.google-analytics.com',
  'https://*.googletagmanager.com',
  'https://www.google.com',
  'https://www.google.fr',
  'https://google.com',
  'https://*.g.doubleclick.net',
  'https://www.googleadservices.com',
  'https://pagead2.googlesyndication.com',
];

/**
 * @param {{ nonce?: string, hashes?: string[], dev?: boolean }} opts
 *   nonce : pages React ; hashes : empreintes 'sha256-…' des pages statiques.
 */
export function buildCsp({ nonce, hashes = [], dev = false } = {}) {
  const inline = [...(nonce ? [`'nonce-${nonce}'`] : []), ...hashes.map((h) => `'${h}'`)];
  return [
    "default-src 'self'",
    // 'unsafe-eval' en développement seulement : le rafraîchissement à chaud de Next l'exige.
    ['script-src', "'self'", ...inline, ...(dev ? ["'unsafe-eval'"] : []), ...SCRIPT_HOSTS].join(' '),
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com https://assets.calendly.com https://fonts.axept.io",
    "font-src 'self' https://fonts.gstatic.com https://fonts.axept.io",
    [
      "img-src 'self' data: blob:",
      'https://slelguoygbfzlpylpxfs.supabase.co',
      'https://images.unsplash.com',
      'https://blogger.googleusercontent.com',
      'https://thehackernews.com',
      ...GOOGLE_PIXELS,
      'https://ssl.gstatic.com',
      'https://www.gstatic.com',
      'https://*.axept.io',
      'https://axeptio.imgix.net',
    ].join(' '),
    [
      "connect-src 'self'",
      ...(dev ? ['ws:'] : []),
      'https://*.axept.io',
      'https://*.analytics.google.com',
      ...GOOGLE_PIXELS,
      'https://ad.doubleclick.net',
    ].join(' '),
    "frame-src https://www.googletagmanager.com https://td.doubleclick.net https://calendly.com https://www.youtube.com",
    "object-src 'none'",
    // Équivalent moderne de X-Frame-Options (conservé pour les anciens navigateurs).
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}

/** Pages servies depuis public/*.html (réécritures de next.config.js) : CSP par empreintes. */
export const STATIC_PAGES = {
  '/': 'index.html',
  '/dora': 'dora.html',
  '/iso27001': 'iso27001.html',
  '/nis2': 'nis2.html',
  '/hds': 'hds.html',
  '/tisax': 'tisax.html',
  '/audit-o365': 'audit-o365.html',
  '/pentest-web': 'pentest-web.html',
  '/pentest-ad': 'pentest-ad.html',
  '/pentest-mobile': 'pentest-mobile.html',
  '/rgpd': 'rgpd.html',
};
