import { MetadataRoute } from 'next';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { categoryUrl, dbCategoriesWithArticles } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.securitrust.fr';
  
  const staticRoutes = [
    '',
    '/articles',
    '/audit-architecture',
    '/audit-code-source',
    '/audit-configuration',
    '/audit-conformite',
    '/audit-cybersecurite',
    '/audit-flash',
    '/audit-o365',
    '/audit-organisationnel',
    '/audit-securite-technique',
    '/cgv',
    '/contact',
    '/cyber-vigilance-humaine',
    '/cybersecurite-operationnelle',
    '/cybersecurite-operationnelle/exigences-reglementaires',
    '/cybersecurite-operationnelle/preserver-image-confiance',
    '/cybersecurite-operationnelle/proteger-chiffre-affaires',
    '/dora',
    '/dpa-rgpd',
    '/dpo-externalise',
    '/ebios-rm',
    '/evaluation-maturite',
    '/formations',
    '/formations/hacking-ethique-fondamentaux',
    '/formations/pentest-web-owasp',
    '/formations/reponse-incidents-forensics',
    '/formations/rgpd-conformite-pratique',
    '/formations/securite-reseaux-entreprise',
    '/gap-analysis',
    '/gestion-risques',
    '/gouvernance-conformite',
    '/gouvernance-conformite/accompagnement',
    '/gouvernance-conformite/audits',
    '/gouvernance-conformite/domaines-expertise',
    '/gouvernance-conformite/services-externalises',
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
    '/osint',
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
    '/portfolio',
    '/prise-de-rdv',
    '/protection-ransomware',
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
    '/strategie-cybersecurite',
    '/tisax',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch only internal indexable articles (DB)
    const dbArticles = await db
      .select({ slug: articles.slugFr, updatedAt: articles.updatedAt })
      .from(articles)
      .where(eq(articles.published, true));

    const articleEntries: MetadataRoute.Sitemap = dbArticles
      .filter((article) => article.slug != null)
      .map((article) => ({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));

    // Pages catégories du blog ayant au moins un article en base (les vides sont en noindex).
    const categoryEntries: MetadataRoute.Sitemap = (await dbCategoriesWithArticles()).map((category) => ({
      url: `${baseUrl}${categoryUrl(category)}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    }));

    return [...sitemapEntries, ...categoryEntries, ...articleEntries];
  } catch (error) {
    console.error('Error generating article sitemap entries:', error);
    return sitemapEntries;
  }
}
