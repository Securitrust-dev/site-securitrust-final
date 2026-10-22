import { MetadataRoute } from 'next';
import { listStoredArticleUrls } from '@/lib/blog';

// Articles du blog : copie du dépôt, complétée par la base si elle répond.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await listStoredArticleUrls()).map((article) => ({
    url: `https://www.securitrust.fr/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
}
