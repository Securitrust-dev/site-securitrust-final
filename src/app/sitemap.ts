import { MetadataRoute } from 'next';
import { categoryUrl, dbCategoriesWithArticles, listStoredArticleUrls } from '@/lib/blog';
import { CAS_CLIENTS } from '@/content/cas-clients';
import LASTMOD from '@/site-chrome/generated/lastmod.json';

// Date du dernier commit touchant la page (scripts/sitemap-lastmod.mjs, lancé avant le
// build). Route dynamique (/formations/xxx) : date de son gabarit [slug]. Sans date
// connue, pas de <lastmod> plutôt qu'une date fausse.
const lastmodOf = (route: string): Date | undefined => {
  const dates = LASTMOD as Record<string, string>;
  const key = route === '' ? '/' : route;
  const date = dates[key] ?? dates[key.replace(/\/[^/]+$/, '/[slug]')];
  return date ? new Date(date) : undefined;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.securitrust.fr';
  
  const staticRoutes = [
    '',
    '/articles',
    '/articles/veille',
    '/audit-code-source',
    '/audit-cybersecurite',
    '/audit-flash',
    '/audit-o365',
    '/audit-organisationnel',
    '/audit-securite-technique',
    '/cgv',
    '/contact',
    '/equipe',
    '/certifications',
    '/cybersecurite-operationnelle',
    '/dora',
    '/dpa-rgpd',
    '/dpo-externalise',
    '/ebios-rm',
    '/evaluation-maturite',
    '/formations',
    '/formations/construire-smsi-iso-27001',
    '/formations/hacking-ethique-fondamentaux',
    '/formations/pentest-web-owasp',
    '/formations/reponse-incidents-forensics',
    '/formations/rgpd-conformite-pratique',
    '/formations/securite-reseaux-entreprise',
    '/gap-analysis',
    '/gouvernance-conformite',
    '/gouvernance-conformite/accompagnement',
    '/grc-cyber',
    '/hds',
    '/ia-act',
    '/iso27001',
    '/mentions-legales',
    '/nis2',
    '/nous-rejoindre',
    '/nous-rejoindre/consultant-junior-cybersecurite',
    '/nous-rejoindre/consultant-senior-cybersecurite',
    '/nous-rejoindre/manager-cybersecurite',
    '/pcapra',
    '/pentest',
    '/pentest-ad',
    '/pentest-externe',
    '/pentest-interne',
    '/pentest-mobile',
    '/pentest-paris',
    '/pentest-physique',
    '/pentest-web',
    '/pilotage-smsi',
    '/politique-de-confidentialite',
    '/politique-de-cookies',
    '/cas-clients',
    '/prise-de-rdv',
    '/red-team',
    '/rgpd',
    '/rssi-externalise',
    '/secteurs',
    '/secteurs/banque-finance',
    '/secteurs/industrie',
    '/secteurs/public',
    '/secteurs/retail',
    '/secteurs/sante',
    '/secteurs/tech',
    '/sensibilisation-formation',
    '/services',
    '/tisax',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastmodOf(route),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Articles et catégories : copie du dépôt, complétée par la base si elle répond.
  const stored = await listStoredArticleUrls();
  const articleEntries: MetadataRoute.Sitemap = stored.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Pages catégories du blog ayant au moins un article (les vides sont en noindex).
  // Catégorie : date de son article le plus récent.
  const latestIn = (category: string) => {
    const dates = stored.filter((a) => a.category === category).map((a) => a.updatedAt).sort();
    return dates.length ? new Date(dates[dates.length - 1]) : undefined;
  };
  const categoryEntries: MetadataRoute.Sitemap = (await dbCategoriesWithArticles()).map((category) => ({
    url: `${baseUrl}${categoryUrl(category)}`,
    lastModified: latestIn(category),
    changeFrequency: 'daily',
    priority: 0.5,
  }));

  const casEntries: MetadataRoute.Sitemap = CAS_CLIENTS.map((c) => ({
    url: `${baseUrl}/cas-clients/${c.slug}`,
    lastModified: lastmodOf(`/cas-clients/${c.slug}`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...sitemapEntries, ...casEntries, ...categoryEntries, ...articleEntries];
}
