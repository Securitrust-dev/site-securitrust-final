/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://securitrust.fr',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/api/*',
    '/admin-stats',
    '/prise-de-rdv',
    '/proposition',
    '/proposition-commerciale',
    '/eligibilite',
    '/non-eligible-offre-15',
    '/formations-paiement',
    '/formations-paiement/success',
    '/paiement',
    '/paiement/success',
    '/signature-complete',
    '/signer-signwell',
    '/signer-proposition',
    '/signer-proposition/success',
    '/cyber-pilote/souscrire/*',
    '/informations-prestation',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin-stats', '/prise-de-rdv', '/proposition', '/eligibilite', '/paiement', '/signature-complete', '/signer-signwell', '/signer-proposition', '/informations-prestation'],
      },
    ],
  },
  transform: async (config, path) => {
    const highPriority = [
      '/', '/services', '/contact',
      '/pentest-externe', '/pentest-interne', '/pentest-web-mobile', '/red-team',
      '/pentest-paris', '/pentest-au-resultat',
      '/audit-cybersecurite', '/rssi-externalise', '/cyber-pilote',
      '/grc-cyber', '/mise-en-conformite-rgpd', '/iso27001-hds',
      '/conformite-nis2', '/conformite-dora',
      '/gouvernance-conformite',
      '/cybersecurite-operationnelle',
    ];
    const mediumPriority = [
      '/articles', '/formations', '/nous-rejoindre', '/portfolio',
      '/audit-flash', '/audit-conformite', '/audit-organisationnel',
      '/audit-architecture', '/audit-configuration', '/audit-securite-technique', '/audit-code-source',
      '/pentest-physique', '/osint', '/protection-ransomware',
      '/strategie-cybersecurite', '/gestion-risques', '/dpo-externalise',
      '/dora', '/hds-certification', '/tisax-security', '/pcapra',
      '/cyber-vigilance-humaine', '/sensibilisation-formation', '/evaluation-maturite',
      '/gouvernance-conformite/accompagnement', '/gouvernance-conformite/audits',
      '/gouvernance-conformite/domaines-expertise', '/gouvernance-conformite/services-externalises',
      '/cybersecurite-operationnelle/proteger-chiffre-affaires',
      '/cybersecurite-operationnelle/preserver-image-confiance',
      '/cybersecurite-operationnelle/exigences-reglementaires',
      '/secteurs', '/secteurs/banque-finance', '/secteurs/sante',
      '/secteurs/tech', '/secteurs/public', '/secteurs/retail', '/secteurs/industrie',
      '/conformite', '/audit', '/pentest', '/pentest-paris',
      '/rssi-automatise', '/cyber-pilote2', '/informations-prestation',
    ];

    let priority = config.priority;
    if (highPriority.includes(path)) priority = 1.0;
    else if (mediumPriority.includes(path)) priority = 0.8;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default config;
