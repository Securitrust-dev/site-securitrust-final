import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { db, client } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { synthesizeArticle } from '@/lib/claude';
import sanitizeHtml from 'sanitize-html';

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'img', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'pre', 'code', 'blockquote',
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['class'],
    'a': ['href', 'target', 'rel', 'title'],
    'img': ['src', 'alt', 'width', 'height', 'loading'],
    'td': ['colspan', 'rowspan'],
    'th': ['colspan', 'rowspan', 'scope'],
  },
  allowedSchemes: ['https', 'http', 'mailto'],
  allowedSchemesByTag: { img: ['https', 'data'] },
};

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractImage(item: any): string {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item.content) {
    const match = item.content.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
  }
  return 'https://thehackernews.com/images/default-article.jpg';
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate with CRON_SECRET
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parser = new Parser();
    const feed = await parser.parseURL('https://feeds.feedburner.com/TheHackersNews');
    const results: { title: string; status: string; reason?: string }[] = [];

    // Limit to 10 articles per run to avoid timeout + excessive costs
    const items = feed.items.slice(0, 10);

    for (const item of items) {
      const sourceUrl = item.link || item.guid;
      if (!sourceUrl) {
        results.push({ title: item.title || 'Unknown', status: 'skipped', reason: 'no URL' });
        continue;
      }

      // Deduplication: check if source_url already exists in DB
      const existing = await db
        .select({ id: articles.id })
        .from(articles)
        .where(eq(articles.sourceUrl, sourceUrl))
        .limit(1);

      if (existing.length > 0) {
        results.push({ title: item.title || 'Unknown', status: 'skipped', reason: 'already exists' });
        continue;
      }

      // Synthesize via Claude
      const synthesized = await synthesizeArticle({
        title: item.title || '',
        content: item.content || item.description || '',
        excerpt: item.contentSnippet?.slice(0, 300) || '',
        sourceUrl,
      });

      if (!synthesized) {
        results.push({ title: item.title || 'Unknown', status: 'error', reason: 'Claude synthesis failed' });
        continue;
      }

      // Generate slugs
      const slug = generateSlug(synthesized.titleFr);
      const slugFr = slug;

      // Extract image
      const imageUrl = extractImage(item);

      // Store in DB using raw SQL to avoid Drizzle autoIncrement issues
      const impactsJson = synthesized.impacts?.length ? JSON.stringify(synthesized.impacts) : null;
      await client.execute({
        sql: `INSERT INTO articles (title, title_fr, excerpt, excerpt_fr, content, content_fr, image, author, category, tags, lang, source, source_url, slug, slug_fr, published, impacts, remediation, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          item.title || '',
          synthesized.titleFr,
          item.contentSnippet?.slice(0, 200) || '',
          synthesized.excerptFr,
          sanitizeHtml(item.content || item.description || '', SANITIZE_OPTIONS),
          sanitizeHtml(synthesized.contentFr, SANITIZE_OPTIONS),
          imageUrl,
          'SecuriTrust',
          synthesized.category,
          JSON.stringify(synthesized.tags),
          'fr',
          'rss',
          sourceUrl,
          slug,
          slugFr,
          1,
          impactsJson,
          synthesized.action || null,
          item.pubDate || item.isoDate || new Date().toISOString(),
          new Date().toISOString(),
        ],
      });

      results.push({ title: synthesized.titleFr, status: 'created' });
    }

    return NextResponse.json({
      processed: results.length,
      created: results.filter((r) => r.status === 'created').length,
      skipped: results.filter((r) => r.status === 'skipped').length,
      errors: results.filter((r) => r.status === 'error').length,
      articles: results,
    });
  } catch (error) {
    console.error('Cron synthesis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}