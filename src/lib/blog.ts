// Données du blog, côté serveur : articles en base (éditoriaux et veille synthétisée)
// fusionnés avec le flux RSS de veille (The Hacker News, titre et extrait traduits).
// Partagé par les pages /articles (rendu serveur, indexable) et par /api/articles.

import Parser from 'rss-parser';
import { and, desc, eq, like, ne, or } from 'drizzle-orm';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { CYBER_CATEGORIES, classifyArticle } from '@/lib/articles';
import { rssCache, CACHE_TTL } from '@/lib/rss-cache';
import { RSS_FEED_URL, generateSlug } from '@/lib/rss-utils';
import { translateToFrench, generateFrenchSlug } from '@/lib/translate';

export const BLOG_URL = 'https://www.securitrust.fr/articles';

export interface BlogListItem {
  key: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  slug: string;
  /** Dates ISO 8601 (le flux RSS fournit du RFC 822). */
  publishedAt: string;
  updatedAt: string;
  sourceType: 'db' | 'rss';
  /** Article rédigé par SecuriTrust (et non issu de la veille RSS). */
  editorial: boolean;
  sourceUrl: string | null;
}

export const categorySlug = (category: string) => generateSlug(category);

export const categoryFromSlug = (slug: string) =>
  CYBER_CATEGORIES.find((c) => categorySlug(c) === slug);

export const categoryUrl = (category: string) => `/articles/categorie/${categorySlug(category)}`;

export function toIsoDate(value: string | null | undefined): string {
  const d = value ? new Date(value) : new Date(NaN);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

/** Le flux RSS fournit « info@thehackernews.com (The Hacker News) » : on garde le nom. */
export const cleanAuthor = (raw: string | null | undefined) =>
  (raw || '').match(/\(([^)]+)\)/)?.[1]?.trim() || (raw || '').replace(/\S+@\S+/, '').trim() || 'The Hacker News';

export const formatFrDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' });

// Colonnes lues explicitement : la liste n'a pas besoin du contenu ni des colonnes
// impacts / remediation (migration 0004), absentes de certaines bases.
const listColumns = {
  id: articles.id,
  title: articles.title,
  titleFr: articles.titleFr,
  excerpt: articles.excerpt,
  excerptFr: articles.excerptFr,
  image: articles.image,
  author: articles.author,
  category: articles.category,
  slug: articles.slug,
  slugFr: articles.slugFr,
  source: articles.source,
  sourceUrl: articles.sourceUrl,
  createdAt: articles.createdAt,
  updatedAt: articles.updatedAt,
};

async function listDbArticles(opts: { category?: string; q?: string; limit: number; editorialOnly?: boolean }): Promise<BlogListItem[]> {
  const conditions = [eq(articles.published, true)];
  if (opts.editorialOnly) conditions.push(ne(articles.source, 'rss'));
  if (opts.category) conditions.push(eq(articles.category, opts.category));
  if (opts.q) {
    const q = `%${opts.q}%`;
    conditions.push(or(like(articles.titleFr, q), like(articles.excerptFr, q), like(articles.category, q), like(articles.tags, q))!);
  }
  try {
    const rows = await db
      .select(listColumns)
      .from(articles)
      .where(and(...conditions))
      .orderBy(desc(articles.createdAt))
      .limit(opts.limit);
    // Une même source peut avoir été synthétisée plusieurs fois : on garde la plus récente.
    const seen = new Set<string>();
    return rows
      .filter((r) => !r.sourceUrl || (!seen.has(r.sourceUrl) && seen.add(r.sourceUrl)))
      .map((r) => ({
        key: `db-${r.id}`,
        title: r.titleFr || r.title,
        excerpt: r.excerptFr || r.excerpt,
        image: r.image,
        author: r.author,
        category: r.category,
        slug: r.slugFr || r.slug,
        publishedAt: toIsoDate(r.createdAt),
        updatedAt: toIsoDate(r.updatedAt || r.createdAt),
        sourceType: 'db' as const,
        editorial: r.source !== 'rss',
        sourceUrl: r.sourceUrl,
      }));
  } catch (error) {
    console.error('[blog] lecture des articles en base échouée', error);
    return [];
  }
}

/** Flux de veille, traduit et classé (cache mémoire d'une heure, partagé avec l'API). */
export async function listRssArticles(limit: number): Promise<BlogListItem[]> {
  try {
    const feed = await new Parser().parseURL(RSS_FEED_URL);
    return await Promise.all(
      feed.items.slice(0, limit).map(async (item, index) => {
        const cacheKey = item.guid || item.link || item.title || '';
        const cached = rssCache[cacheKey];
        if (cached && Date.now() - cached.timestamp < CACHE_TTL && cached.data.publishedAt) return cached.data as BlogListItem;

        let image = 'https://thehackernews.com/images/default-article.jpg';
        if (item.enclosure?.url) image = item.enclosure.url;
        else if (item.content) image = item.content.match(/<img[^>]+src="([^">]+)"/)?.[1] || image;

        const excerptEn = item.contentSnippet?.slice(0, 200) || item.description?.replace(/<[^>]*>/g, '').slice(0, 200) || '';
        const titleFr = await translateToFrench(item.title || '');
        const excerptFr = await translateToFrench(excerptEn);
        const { category } = classifyArticle(titleFr || item.title || '', excerptFr || excerptEn, item.content || item.description || '');
        const date = toIsoDate(item.isoDate || item.pubDate);

        const data: BlogListItem = {
          key: `rss-${index}`,
          title: titleFr || item.title || 'Sans titre',
          excerpt: excerptFr || excerptEn,
          image,
          author: cleanAuthor(item.creator),
          category,
          slug: generateFrenchSlug(titleFr || item.title || ''),
          publishedAt: date,
          updatedAt: date,
          sourceType: 'rss',
          editorial: false,
          sourceUrl: item.link || null,
        };
        rssCache[cacheKey] = { timestamp: Date.now(), data };
        return data;
      }),
    );
  } catch (error) {
    console.error('[blog] lecture du flux RSS échouée', error);
    return [];
  }
}

/**
 * Articles du blog, du plus récent au plus ancien. Les articles en base priment :
 * un élément RSS déjà synthétisé (même source ou même slug) n'est pas répété.
 */
export async function listBlogArticles(opts: { category?: string; q?: string; limit?: number } = {}): Promise<BlogListItem[]> {
  const limit = opts.limit ?? 24;
  const q = opts.q?.trim().toLowerCase();
  const [dbItems, rssItems] = await Promise.all([
    listDbArticles({ category: opts.category, q, limit }),
    listRssArticles(limit * 2),
  ]);
  const dbSources = new Set(dbItems.map((a) => a.sourceUrl).filter(Boolean));
  const dbSlugs = new Set(dbItems.map((a) => a.slug));
  const rss = rssItems.filter(
    (a) =>
      !dbSources.has(a.sourceUrl) &&
      !dbSlugs.has(a.slug) &&
      (!opts.category || a.category === opts.category) &&
      (!q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)),
  );
  return [...dbItems, ...rss].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit);
}

/** Articles rédigés par SecuriTrust, mis en avant au-dessus du flux de veille. */
export const listEditorialArticles = (limit = 6) => listDbArticles({ limit, editorialOnly: true });

/** Catégories ayant au moins un article en base (pour le sitemap). */
export async function dbCategoriesWithArticles(): Promise<string[]> {
  try {
    const rows = await db.selectDistinct({ category: articles.category }).from(articles).where(eq(articles.published, true));
    return rows.map((r) => r.category).filter((c) => categoryFromSlug(categorySlug(c)));
  } catch {
    return [];
  }
}
