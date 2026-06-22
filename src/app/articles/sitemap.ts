import { MetadataRoute } from 'next';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const dbArticles = await db
      .select({
        slug: articles.slug,
        slugFr: articles.slugFr,
        updatedAt: articles.updatedAt,
        createdAt: articles.createdAt,
      })
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.updatedAt));

    return dbArticles
      .filter(article => article.slugFr || article.slug)
      .map(article => ({
        url: `https://securitrust.fr/articles/${article.slugFr || article.slug}`,
        lastModified: new Date(article.updatedAt || article.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  } catch {
    return [];
  }
}
