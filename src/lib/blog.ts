// Données du blog, côté serveur : articles en base (éditoriaux et veille synthétisée)
// fusionnés avec le flux RSS de veille (The Hacker News, titre et extrait traduits).
// Partagé par les pages /articles (rendu serveur, indexable) et par /api/articles.

import Parser from 'rss-parser';
import { unstable_cache } from 'next/cache';
import { and, desc, eq, like, or } from 'drizzle-orm';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { CYBER_CATEGORIES, classifyArticle } from '@/lib/articles';
import { rssCache, CACHE_TTL } from '@/lib/rss-cache';
import { DUPLICATE_SLUGS, STORED_ARTICLES, isHidden, isVeille, type StoredArticle } from '@/lib/blog-store';
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
  /** Article d'expertise rédigé par SecuriTrust (et non article de veille). */
  editorial: boolean;
  sourceUrl: string | null;
}

export const categorySlug = (category: string) => generateSlug(category);

export const categoryFromSlug = (slug: string) =>
  CYBER_CATEGORIES.find((c) => categorySlug(c) === slug);

export const categoryUrl = (category: string) => `/articles/categorie/${categorySlug(category)}`;

/** Rubrique « Veille » : synthèses d'actualités, séparées des articles d'expertise. */
export const VEILLE_PATH = '/articles/veille';

/** editorial : articles d'expertise seuls ; veille : veille seule ; absent : tout. */
export type BlogKind = 'editorial' | 'veille';

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

type ListRow = Pick<
  StoredArticle,
  'id' | 'title' | 'titleFr' | 'excerpt' | 'excerptFr' | 'image' | 'author' | 'category' | 'slug' | 'slugFr' | 'source' | 'sourceUrl' | 'createdAt' | 'updatedAt'
>;

const toListItem = (r: ListRow): BlogListItem => ({
  key: `db-${r.slugFr || r.slug}`,
  title: r.titleFr || r.title,
  excerpt: r.excerptFr || r.excerpt,
  image: r.image,
  author: r.author,
  category: r.category,
  slug: r.slugFr || r.slug,
  publishedAt: toIsoDate(r.createdAt),
  updatedAt: toIsoDate(r.updatedAt || r.createdAt),
  sourceType: 'db',
  editorial: !isVeille(r),
  sourceUrl: r.sourceUrl,
});

/**
 * Articles enregistrés : copie du dépôt (toujours disponible), complétée par la base
 * pour la veille synthétisée depuis la dernière copie. Base injoignable = copie seule.
 */
async function loadDbArticles(opts: { category?: string; q?: string; limit: number; kind?: BlogKind }): Promise<BlogListItem[]> {
  const q = opts.q?.toLowerCase();
  const ofKind = (a: Pick<StoredArticle, 'source' | 'sourceUrl' | 'author'>) =>
    !opts.kind || (opts.kind === 'veille') === isVeille(a);
  const stored = STORED_ARTICLES.filter(
    (a) =>
      ofKind(a) &&
      (!opts.category || a.category === opts.category) &&
      (!q || [a.titleFr, a.excerptFr, a.category, a.tags].some((v) => v?.toLowerCase().includes(q))),
  );

  let fromDb: ListRow[] = [];
  const conditions = [eq(articles.published, true)];
  if (opts.category) conditions.push(eq(articles.category, opts.category));
  if (q) {
    const like_ = `%${q}%`;
    conditions.push(or(like(articles.titleFr, like_), like(articles.excerptFr, like_), like(articles.category, like_), like(articles.tags, like_))!);
  }
  try {
    fromDb = (await db.select(listColumns).from(articles).where(and(...conditions)).orderBy(desc(articles.createdAt)).limit(opts.limit)).filter(ofKind);
  } catch (error) {
    console.error('[blog] base injoignable, copie du dépôt seule', error);
  }

  // Une même source peut avoir été synthétisée plusieurs fois : la copie du dépôt
  // (versions de référence) passe en premier, les doublons de la base sont écartés.
  const seenSlugs = new Set<string>();
  const seenSources = new Set<string>();
  return [...stored, ...fromDb]
    .filter((r) => {
      const slug = r.slugFr || r.slug;
      if (isHidden(r) || DUPLICATE_SLUGS.has(slug) || seenSlugs.has(slug) || (r.sourceUrl && seenSources.has(r.sourceUrl))) return false;
      seenSlugs.add(slug);
      if (r.sourceUrl) seenSources.add(r.sourceUrl);
      return true;
    })
    .map(toListItem)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, opts.limit);
}

/** Flux de veille, traduit et classé (cache mémoire d'une heure, partagé avec l'API). */
async function loadRssArticles(limit: number): Promise<BlogListItem[]> {
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

// Les pages du blog sont rendues à chaque requête (nonce CSP, voir middleware.ts) : la
// base et le flux de veille sont mis en cache 30 min, comme l'était le rendu (ISR).
export const listDbArticles = unstable_cache(loadDbArticles, ['blog-db-articles'], { revalidate: 1800 });
export const listRssArticles = unstable_cache(loadRssArticles, ['blog-rss-articles'], { revalidate: 1800 });

/**
 * Articles du blog, du plus récent au plus ancien. Les articles en base priment :
 * un élément RSS déjà synthétisé (même source ou même slug) n'est pas répété.
 */
export async function listBlogArticles(opts: { category?: string; q?: string; limit?: number; kind?: BlogKind } = {}): Promise<BlogListItem[]> {
  const limit = opts.limit ?? 24;
  const q = opts.q?.trim().toLowerCase();
  const [dbItems, rssItems] = await Promise.all([
    listDbArticles({ category: opts.category, q, limit, kind: opts.kind }),
    opts.kind === 'editorial' ? Promise.resolve([]) : listRssArticles(limit * 2),
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

/** Articles d'expertise rédigés par SecuriTrust, en tête de /articles. */
export const listEditorialArticles = (limit = 24) => listDbArticles({ limit, kind: 'editorial' });

/** Catégories ayant au moins un article enregistré (pour le sitemap). */
export async function dbCategoriesWithArticles(): Promise<string[]> {
  return [...new Set((await listStoredArticleUrls()).map((a) => a.category))].filter((c) => categoryFromSlug(categorySlug(c)));
}

/** Articles enregistrés (dépôt + base) pour les sitemaps. */
export async function listStoredArticleUrls(): Promise<{ slug: string; category: string; updatedAt: string }[]> {
  const rows: Pick<StoredArticle, 'slug' | 'slugFr' | 'category' | 'sourceUrl' | 'updatedAt' | 'createdAt'>[] = [...STORED_ARTICLES];
  try {
    rows.push(
      ...(await db
        .select({ slug: articles.slug, slugFr: articles.slugFr, category: articles.category, sourceUrl: articles.sourceUrl, updatedAt: articles.updatedAt, createdAt: articles.createdAt })
        .from(articles)
        .where(eq(articles.published, true))),
    );
  } catch (error) {
    console.error('[blog] base injoignable, sitemap depuis la copie du dépôt', error);
  }
  // Une seule adresse par actualité : la copie du dépôt (versions de référence) passe en premier.
  const seen = new Set<string>();
  return rows
    .filter((r) => {
      const keys = [r.slugFr || r.slug, r.sourceUrl].filter((k): k is string => !!k);
      if (isHidden(r) || DUPLICATE_SLUGS.has(r.slugFr || r.slug) || keys.some((k) => seen.has(k))) return false;
      keys.forEach((k) => seen.add(k));
      return true;
    })
    .map((r) => ({ slug: r.slugFr || r.slug, category: r.category, updatedAt: toIsoDate(r.updatedAt || r.createdAt) }));
}
