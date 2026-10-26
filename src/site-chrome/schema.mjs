// Données structurées Schema.org (JSON-LD) communes à TOUS les gabarits.
//
// Source unique de la fiche du cabinet (Organization + ProfessionalService) et
// des fils d'Ariane :
//  - les pages React les reçoivent via src/components/StructuredData.tsx ;
//  - les landing pages statiques (public/*.html) via `npm run chrome:sync`.
// Les autres blocs (Service, FAQPage, Article…) restent propres à chaque page et
// pointent vers la fiche du cabinet par son @id, sans la recopier.
// Faits contrôlables : mentions légales (SIREN, siège) et NAP de chrome.mjs.

import { NAP } from './chrome.mjs';

export const SITE_URL = 'https://www.securitrust.fr';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_URL = `${SITE_URL}/apple-icon.png`;

export const absoluteUrl = (path) => (path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '/' : path}`);

/** Le cabinet : une seule entité, à la fois organisation et prestataire de services local. */
export function organizationNode() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: NAP.name,
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: LOGO_URL, width: 180, height: 180 },
    image: `${SITE_URL}/og-image.png`,
    description:
      'Cabinet de conseil en cybersécurité à Paris : RSSI externalisé, tests d’intrusion (pentest), audits de sécurité et mise en conformité ISO 27001, NIS2, DORA, HDS, TISAX et RGPD.',
    foundingDate: '2016',
    founder: { '@type': 'Person', name: 'Jad Joumblat', jobTitle: 'Président' },
    // SIREN (code ICD 0002 = répertoire SIRENE).
    iso6523Code: '0002:818187825',
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.street,
      postalCode: NAP.postalCode,
      addressLocality: NAP.city,
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.8649, longitude: 2.2856 },
    telephone: NAP.phoneSchema,
    email: NAP.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: NAP.phoneSchema,
      email: NAP.email,
      areaServed: 'FR',
      availableLanguage: ['fr', 'en'],
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:30',
    },
    priceRange: '€€€',
    areaServed: { '@type': 'Country', name: 'France' },
    sameAs: [NAP.linkedin],
    knowsAbout: [
      'Test d’intrusion',
      'RSSI externalisé',
      'ISO/IEC 27001',
      'Directive NIS2',
      'Règlement DORA',
      'Hébergement de données de santé (HDS)',
      'TISAX',
      'RGPD',
      'EBIOS Risk Manager',
    ],
    hasCredential: ['ISO 27001 Lead Auditor', 'ISO 27001 Lead Implementer', 'OSCP', 'CEH', 'EBIOS Risk Manager', 'CRTE', 'CRTP'].map(
      (name) => ({ '@type': 'EducationalOccupationalCredential', name }),
    ),
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: NAP.name,
    inLanguage: 'fr-FR',
    publisher: { '@id': ORG_ID },
  };
}

export function serviceNode({ name, description, url, serviceType = name }) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(url)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(url),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'France' },
  };
}

/** items : [{ name, url }] du plus général au plus précis, Accueil compris. */
export function breadcrumbNode(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function faqNode(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Sérialise pour un <script type="application/ld+json"> (« < » échappé contre </script>). */
export function serializeJsonLd(nodes) {
  const data = Array.isArray(nodes)
    ? { '@context': 'https://schema.org', '@graph': nodes }
    : { '@context': 'https://schema.org', ...nodes };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export const renderJsonLdScript = (nodes) => `<script type="application/ld+json">${serializeJsonLd(nodes)}</script>`;

// ---------------------------------------------------------------------------
// Fils d'Ariane des pages React : chemin → [libellé, chemin du parent].
// Les landing pages statiques ont le leur, écrit d'après leur fil d'Ariane visible ;
// le blog (articles, catégories) construit le sien à partir de l'article.

const PAGES = {
  '/articles': ['Articles', '/'],
  '/contact': ['Contact', '/'],
  '/equipe': ['Équipe', '/'],
  '/certifications': ['Certifications', '/'],
  '/prise-de-rdv': ['Prise de rendez-vous', '/'],
  '/portfolio': ['Références', '/'],
  '/services': ['Services', '/'],
  '/rssi-externalise': ['RSSI externalisé', '/'],
  '/cgv': ['Conditions générales de vente', '/'],
  '/mentions-legales': ['Mentions légales', '/'],
  '/politique-de-confidentialite': ['Politique de confidentialité', '/'],
  '/politique-de-cookies': ['Politique de cookies', '/'],

  '/pentest': ['Pentest', '/'],
  '/pentest-externe': ['Pentest externe', '/pentest'],
  '/pentest-interne': ['Pentest interne', '/pentest'],
  '/pentest-physique': ['Pentest physique', '/pentest'],
  '/pentest-paris': ['Pentest à Paris', '/pentest'],
  '/pentest-web-mobile': ['Pentest web & mobile', '/pentest'],
  '/red-team': ['Red Team', '/pentest'],
  '/osint': ['Audit OSINT', '/pentest'],

  '/audit-cybersecurite': ['Audit de cybersécurité', '/'],
  '/audit-architecture': ['Audit d’architecture', '/audit-cybersecurite'],
  '/audit-code-source': ['Audit de code source', '/audit-cybersecurite'],
  '/audit-configuration': ['Audit de configuration', '/audit-cybersecurite'],
  '/audit-conformite': ['Audit de conformité', '/audit-cybersecurite'],
  '/audit-flash': ['Audit flash', '/audit-cybersecurite'],
  '/audit-organisationnel': ['Audit organisationnel', '/audit-cybersecurite'],
  '/audit-securite-technique': ['Audit de sécurité technique', '/audit-cybersecurite'],
  '/evaluation-maturite': ['Évaluation de maturité', '/audit-cybersecurite'],
  '/gap-analysis': ['Audit d’écart (gap analysis)', '/gouvernance-conformite/audits'],

  '/gouvernance-conformite': ['Gouvernance & conformité', '/'],
  '/gouvernance-conformite/accompagnement': ['Accompagnement', '/gouvernance-conformite'],
  '/gouvernance-conformite/audits': ['Audits', '/gouvernance-conformite'],
  '/gouvernance-conformite/domaines-expertise': ['Domaines d’expertise', '/gouvernance-conformite'],
  '/gouvernance-conformite/services-externalises': ['Services externalisés', '/gouvernance-conformite'],
  '/grc-cyber': ['GRC cybersécurité', '/gouvernance-conformite'],
  '/ebios-rm': ['Analyse de risques EBIOS RM', '/gouvernance-conformite'],
  '/gestion-risques': ['Gestion des risques cyber', '/gouvernance-conformite'],
  '/pilotage-smsi': ['Pilotage SMSI', '/gouvernance-conformite/services-externalises'],
  '/strategie-cybersecurite': ['Stratégie de cybersécurité', '/gouvernance-conformite'],
  '/pcapra': ['PCA / PRA', '/gouvernance-conformite'],
  '/ia-act': ['IA Act', '/gouvernance-conformite'],
  '/dpo-externalise': ['DPO externalisé', '/gouvernance-conformite'],
  '/dpa-rgpd': ['DPA & sous-traitance RGPD', '/gouvernance-conformite/services-externalises'],

  '/cybersecurite-operationnelle': ['Cybersécurité opérationnelle', '/'],
  '/cybersecurite-operationnelle/exigences-reglementaires': ['Exigences réglementaires', '/cybersecurite-operationnelle'],
  '/cybersecurite-operationnelle/preserver-image-confiance': ['Préserver l’image et la confiance', '/cybersecurite-operationnelle'],
  '/cybersecurite-operationnelle/proteger-chiffre-affaires': ['Protéger le chiffre d’affaires', '/cybersecurite-operationnelle'],
  '/protection-ransomware': ['Protection anti-ransomware', '/cybersecurite-operationnelle'],
  '/cyber-vigilance-humaine': ['Cyber-vigilance humaine', '/cybersecurite-operationnelle'],
  '/sensibilisation-formation': ['Sensibilisation & formation', '/cybersecurite-operationnelle'],

  '/formations': ['Formations', '/'],
  '/formations/hacking-ethique-fondamentaux': ['Hacking éthique : les fondamentaux', '/formations'],
  '/formations/pentest-web-owasp': ['Pentest web & OWASP Top 10', '/formations'],
  '/formations/reponse-incidents-forensics': ['Réponse aux incidents & forensics', '/formations'],
  '/formations/rgpd-conformite-pratique': ['RGPD & conformité en pratique', '/formations'],
  '/formations/securite-reseaux-entreprise': ['Sécurité des réseaux d’entreprise', '/formations'],

  '/secteurs': ['Secteurs', '/'],
  '/secteurs/banque-finance': ['Banque & finance', '/secteurs'],
  '/secteurs/industrie': ['Industrie', '/secteurs'],
  '/secteurs/public': ['Secteur public', '/secteurs'],
  '/secteurs/retail': ['Retail & e-commerce', '/secteurs'],
  '/secteurs/sante': ['Santé', '/secteurs'],
  '/secteurs/tech': ['Tech & SaaS', '/secteurs'],

  '/nous-rejoindre': ['Nous rejoindre', '/'],
  '/nous-rejoindre/consultant-junior-cybersecurite': ['Consultant junior cybersécurité', '/nous-rejoindre'],
  '/nous-rejoindre/consultant-senior-cybersecurite': ['Consultant senior cybersécurité', '/nous-rejoindre'],
  '/nous-rejoindre/manager-cybersecurite': ['Manager cybersécurité', '/nous-rejoindre'],
};

/** Fil d'Ariane d'une page React, ou null si la page n'en déclare pas. */
export function breadcrumbTrail(path) {
  const clean = path.length > 1 ? path.replace(/\/$/, '') : path;
  if (!PAGES[clean]) return null;
  const trail = [];
  for (let p = clean; p && p !== '/'; p = PAGES[p]?.[1]) {
    if (!PAGES[p]) return null;
    trail.unshift({ name: PAGES[p][0], url: p });
  }
  return [{ name: 'Accueil', url: '/' }, ...trail];
}
