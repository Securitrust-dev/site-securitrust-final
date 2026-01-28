import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://site-web-aura-3d-s-curitrust.vercel.app';
  
  const staticRoutes = [
    '',
    '/articles',
    '/audit-architecture',
    '/audit-code-source',
    '/audit-configuration',
    '/audit-conformite',
    '/audit-cybersecurite',
    '/audit-flash',
    '/audit-organisationnel',
    '/audit-securite-technique',
    '/cgv',
    '/contact',
    '/cyber-vigilance-humaine',
    '/dora',
    '/dpo-externalise',
    '/eligibilite',
    '/evaluation-maturite',
    '/gestion-risques',
    '/grc-cyber',
    '/hds-certification',
    '/iso27001-hds',
    '/mentions-legales',
    '/mise-en-conformite-rgpd',
    '/nous-rejoindre',
    '/osint',
    '/pcapra',
    '/pentest-externe',
    '/pentest-interne',
    '/pentest-physique',
    '/pentest-web-mobile',
    '/politique-de-confidentialite',
    '/politique-de-cookies',
    '/portfolio',
    '/prise-de-rdv',
    '/protection-ransomware',
    '/red-team',
    '/rssi-externalise',
    '/sensibilisation-formation',
    '/strategie-cybersecurite',
    '/tisax-security',
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
