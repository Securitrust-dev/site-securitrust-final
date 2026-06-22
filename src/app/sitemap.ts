import { MetadataRoute } from 'next';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://securitrust.fr';
  
  const staticRoutes = [
    '',
    '/articles',
    '/audit',
    '/audit-architecture',
    '/audit-code-source',
    '/audit-configuration',
    '/audit-conformite',
    '/audit-cybersecurite',
    '/audit-flash',
    '/audit-organisationnel',
    '/audit-securite-technique',
    '/cgv',
    '/conformite',
    '/conformite-dora',
    '/conformite-nis2',
    '/contact',
    '/cyber-pilote',
    '/cyber-pilote2',
    '/cyber-vigilance-humaine',
    '/cybersecurite-operationnelle',
    '/dora',
    '/dpo-externalise',
    '/eligibilite',
    '/evaluation-maturite',
    '/formations',
    '/formations-paiement',
    '/gestion-risques',
    '/gouvernance-conformite',
    '/grc-cyber',
    '/hds-certification',
    '/informations-prestation',
    '/iso27001-hds',
    '/mentions-legales',
    '/mise-en-conformite-rgpd',
    '/non-eligible-offre-15',
    '/nous-rejoindre',
    '/osint',
    '/paiement',
    '/pcapra',
    '/pentest',
    '/pentest-au-resultat',
    '/pentest-externe',
    '/pentest-interne',
    '/pentest-paris',
    '/pentest-physique',
    '/pentest-web-mobile',
    '/politique-de-confidentialite',
    '/politique-de-cookies',
    '/portfolio',
    '/prise-de-rdv',
    '/proposition',
    '/proposition-commerciale',
    '/protection-ransomware',
    '/red-team',
    '/rssi-automatise',
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
    '/signature-complete',
    '/strategie-cybersecurite',
    '/tisax-security',
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

    return [...sitemapEntries, ...articleEntries];
  } catch (error) {
    console.error('Error generating article sitemap entries:', error);
    return sitemapEntries;
  }
}
