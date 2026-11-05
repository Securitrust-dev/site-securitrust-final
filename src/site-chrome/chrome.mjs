// En-tête et pied de page communs à TOUS les gabarits du site.
//
// Source unique de la navigation, des coordonnées (NAP) et des liens légaux :
//  - les pages React les affichent via <SiteHeader /> et <SiteFooter />
//    (src/components/site-chrome.tsx) ;
//  - les landing pages statiques (public/*.html) les reçoivent par
//    `npm run chrome:sync` (scripts/sync-site-chrome.mjs), lancé aussi avant
//    chaque build.
// Le rendu est du HTML + CSS pur (public/site-chrome.css), sans JavaScript :
// le menu mobile repose sur une case à cocher, les sous-menus sur :hover et
// :focus-within. Modifier un lien ou une coordonnée ici le change partout.

export const NAP = {
  name: 'SecuriTrust',
  street: '11 rue Saint-Didier',
  postalCode: '75116',
  city: 'Paris',
  phoneDisplay: '01 86 04 44 31',
  phoneHref: '+33186044431',
  phoneSchema: '+33-1-86-04-44-31',
  email: 'expertise@securitrust.fr',
  hours: 'Lun–Ven · 09:00–18:30',
  linkedin: 'https://www.linkedin.com/company/securitrust',
  calendly: 'https://calendly.com/expert-securitrust',
};

export const NAV = [
  {
    label: 'Pentest',
    href: '/pentest',
    children: [
      { label: 'Pentest web', href: '/pentest-web' },
      { label: 'Pentest mobile', href: '/pentest-mobile' },
      { label: 'Pentest Active Directory', href: '/pentest-ad' },
      { label: 'Audit Microsoft 365', href: '/audit-o365' },
    ],
  },
  {
    label: 'Gouvernance',
    href: '/gouvernance-conformite',
    children: [
      { label: 'NIS2', href: '/nis2' },
      { label: 'ISO 27001', href: '/iso27001' },
      { label: 'HDS', href: '/hds' },
      { label: 'TISAX', href: '/tisax' },
      { label: 'RGPD', href: '/rgpd' },
      { label: 'DORA', href: '/dora' },
    ],
  },
  {
    label: 'Formations',
    href: '/formations',
    children: [
      { label: 'Construire un SMSI ISO 27001', href: '/formations/construire-smsi-iso-27001' },
    ],
  },
  { label: 'RSSI externalisé', href: '/rssi-externalise' },
  { label: 'Articles', href: '/articles' },
  { label: 'Nous rejoindre', href: '/nous-rejoindre' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Pentest',
    links: [
      { label: 'Tous nos pentests', href: '/pentest' },
      { label: 'Pentest web', href: '/pentest-web' },
      { label: 'Pentest mobile', href: '/pentest-mobile' },
      { label: 'Pentest Active Directory', href: '/pentest-ad' },
      { label: 'Audit Microsoft 365', href: '/audit-o365' },
      { label: 'Red Team', href: '/red-team' },
    ],
  },
  {
    title: 'Gouvernance & conformité',
    links: [
      { label: 'NIS2', href: '/nis2' },
      { label: 'ISO 27001', href: '/iso27001' },
      { label: 'HDS', href: '/hds' },
      { label: 'TISAX', href: '/tisax' },
      { label: 'RGPD', href: '/rgpd' },
      { label: 'DORA', href: '/dora' },
      { label: 'RSSI externalisé', href: '/rssi-externalise' },
    ],
  },
  {
    title: 'Cabinet',
    links: [
      { label: 'Équipe', href: '/equipe' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Cas clients', href: '/cas-clients' },
      { label: 'Secteurs', href: '/secteurs' },
      { label: 'Articles', href: '/articles' },
      { label: 'Nous rejoindre', href: '/nous-rejoindre' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Informations légales',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
      { label: 'Politique de cookies', href: '/politique-de-cookies' },
      { label: 'CGV', href: '/cgv' },
    ],
  },
];

// Conteneur GTM : GA4, Google Ads et événements de leads (compte « Analyse SEO »,
// géré par SecuriTrust). Remplace GTM-P5D5S5WJ, inaccessible, le 2 novembre 2026.
// Import de la configuration : docs/tracking/gtm-NB64TX95-import.json.
export const GTM_ID = 'GTM-NB64TX95';

// Bandeau de consentement Axeptio, chargé directement par le site (il était
// auparavant injecté par l'ancien conteneur GTM). Même projet, même version de cookies.
export const AXEPTIO_CLIENT_ID = '6a4cbef4ca068258325d3336';
export const AXEPTIO_COOKIES_VERSION = '8673893a-20ef-4cee-bf5f-cf7b8975182c';

/**
 * Script inline commun (pages statiques et React), placé en tête de page :
 *
 * 1. Mode consentement Google v2 : tout est refusé par défaut, avant tout tag.
 *    Axeptio met à jour le consentement quand le visiteur fait son choix
 *    (option googleConsentMode de axeptioSettings).
 * 2. Chargement différé d'Axeptio puis de GTM (GA4, Google Ads) : à la première
 *    interaction (scroll, toucher, clic, clavier, souris) ou, à défaut, 5 s après
 *    l'événement load. Ces scripts (~800 Ko) bloquaient le fil principal 3 à 4 s
 *    sur mobile. Les événements poussés avant (generate_lead…) restent dans le
 *    dataLayer et sont traités dès l'arrivée de GTM. Aucun cookie n'est déposé
 *    avant le consentement.
 * Domaines static.axept.io et googletagmanager.com autorisés par la CSP : pas de nonce requis.
 */
const CONSENT_DEFAULT = '{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",wait_for_update:500}';
export const GTM_LOADER =
  'window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};'
  + `gtag("consent","default",${CONSENT_DEFAULT});`
  + "window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});"
  + `window.axeptioSettings={clientId:"${AXEPTIO_CLIENT_ID}",cookiesVersion:"${AXEPTIO_COOKIES_VERSION}",googleConsentMode:{default:${CONSENT_DEFAULT}}};`
  + '(function(w,d){var done=0,ev=["pointerdown","keydown","touchstart","scroll","mousemove"];'
  + 'function add(src){var s=d.createElement("script");s.async=true;s.src=src;d.head.appendChild(s)}'
  + 'function load(){if(done)return;done=1;ev.forEach(function(e){w.removeEventListener(e,load,{passive:true})});'
  + `add("https://static.axept.io/sdk.js");add("https://www.googletagmanager.com/gtm.js?id=${GTM_ID}")}`
  + 'ev.forEach(function(e){w.addEventListener(e,load,{passive:true})});'
  + 'if(d.readyState==="complete")setTimeout(load,5000);else w.addEventListener("load",function(){setTimeout(load,5000)})'
  + '})(window,document);';

/**
 * Balises de <head> des landing pages statiques : feuille commune, consentement,
 * Axeptio + GTM différés et suivi des leads (public/site-tracking.js). Les pages
 * React chargent l'équivalent dans src/app/layout.tsx.
 * @param {{ css?: string }} [opts] css : contenu de public/site-chrome.css, intégré
 *   en <style> pour éviter une requête bloquante (LCP mobile) ; à défaut, <link>.
 */
export function renderHeadTags({ css } = {}) {
  return (css ? `<style id="site-chrome-css">\n${css.trim()}\n</style>\n` : '<link rel="stylesheet" href="/site-chrome.css">\n')
    + `<script>${GTM_LOADER}</script>\n`
    + '<script defer src="/site-tracking.js"></script>';
}

export function renderGtmNoscript() {
  return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
}

const LOGO = '<img src="/assets/logo-securitrust.png" alt="SecuriTrust – Accueil" width="160" height="33" />';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const link = ({ label, href }, cls = '') =>
  `<a${cls ? ` class="${cls}"` : ''} href="${esc(href)}">${esc(label)}</a>`;

/**
 * @param {{ position?: 'fixed' | 'sticky' }} [opts]
 *   fixed : superposé au contenu (pages React qui réservent déjà la place en haut) ;
 *   sticky : dans le flux, collé en haut au défilement (landing pages).
 */
export function renderHeader({ position = 'sticky' } = {}) {
  const items = NAV.map((item) =>
    item.children
      ? `<div class="sc-item">${link(item, 'sc-top sc-has-drop')}<div class="sc-drop">${item.children
          .map((c) => link(c))
          .join('')}</div></div>`
      : link(item, 'sc-top'),
  ).join('');

  return `<header id="sc-header" class="sc-header sc-header--${position}"><div class="sc-wrap sc-bar">`
    + `<a class="sc-brand" href="/">${LOGO}</a>`
    // Téléphone cliquable, visible seulement quand le menu est replié (mobile, tablette).
    + `<a class="sc-tel" href="tel:${NAP.phoneHref}" aria-label="Appeler SecuriTrust au ${NAP.phoneDisplay}">`
    + '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
    + `<span>${NAP.phoneDisplay}</span></a>`
    + '<input type="checkbox" id="sc-menu" class="sc-menu-toggle" aria-label="Ouvrir le menu" />'
    + '<label for="sc-menu" class="sc-burger" aria-hidden="true"><span></span></label>'
    + `<nav class="sc-nav" aria-label="Navigation principale">${items}`
    + `<a class="sc-cta" href="${NAP.calendly}" target="_blank" rel="noopener noreferrer">Parler à un expert</a>`
    + '</nav></div></header>';
}

export function renderFooter({ year = new Date().getFullYear() } = {}) {
  const cols = FOOTER_COLUMNS.map(
    (col) => `<div class="sc-fcol"><p class="sc-ftitle">${esc(col.title)}</p>${col.links.map((l) => link(l)).join('')}</div>`,
  ).join('');

  return '<footer id="sc-footer" class="sc-footer"><div class="sc-wrap">'
    + '<div class="sc-fgrid">'
    + `<div class="sc-fbrand"><a class="sc-brand" href="/">${LOGO}</a>`
    + '<p>Cabinet de conseil en cybersécurité à Paris depuis 2016 : pentest, audit, conformité et RSSI externalisé.</p>'
    + `<address>${esc(NAP.street)}<br />${NAP.postalCode} ${esc(NAP.city)}<br />`
    + `<a href="tel:${NAP.phoneHref}">${NAP.phoneDisplay}</a><br />`
    + `<a href="mailto:${NAP.email}">${NAP.email}</a><br />${esc(NAP.hours)}</address>`
    + '<a class="sc-badge" href="/certifications"><img src="/afaq-iso27001-securite-trimmed.png" width="58" height="60" loading="lazy" alt="Certifié ISO/IEC 27001 (sécurité de l’information) par AFAQ, AFNOR Certification" /><span>Cabinet certifié ISO&nbsp;27001<br />AFAQ · AFNOR Certification</span></a></div>'
    + `${cols}</div>`
    + `<div class="sc-fbottom"><span>© 2016–${year} ${NAP.name}. Tous droits réservés.</span>`
    + `<a href="${NAP.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>`
    + '</div></footer>';
}
