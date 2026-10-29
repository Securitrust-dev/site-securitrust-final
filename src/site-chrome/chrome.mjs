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

// Conteneur GTM (GA4, Google Ads et bandeau de consentement Axeptio y sont configurés).
export const GTM_ID = 'GTM-P5D5S5WJ';

/**
 * Balises de <head> des landing pages statiques : feuille commune, GTM et suivi
 * des leads (public/site-tracking.js). Les pages React chargent l'équivalent
 * dans src/app/layout.tsx.
 * @param {{ css?: string }} [opts] css : contenu de public/site-chrome.css, intégré
 *   en <style> pour éviter une requête bloquante (LCP mobile) ; à défaut, <link>.
 */
export function renderHeadTags({ css } = {}) {
  return (css ? `<style id="site-chrome-css">\n${css.trim()}\n</style>\n` : '<link rel="stylesheet" href="/site-chrome.css">\n')
    + `<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});</script>\n`
    + `<script async src="https://www.googletagmanager.com/gtm.js?id=${GTM_ID}"></script>\n`
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
    + `<a href="mailto:${NAP.email}">${NAP.email}</a><br />${esc(NAP.hours)}</address></div>`
    + `${cols}</div>`
    + `<div class="sc-fbottom"><span>© 2016–${year} ${NAP.name}. Tous droits réservés.</span>`
    + `<a href="${NAP.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>`
    + '</div></footer>';
}
