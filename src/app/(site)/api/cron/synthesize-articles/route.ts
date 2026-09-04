import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { db, client } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { synthesizeArticle } from '@/lib/claude';
import sanitizeHtml from 'sanitize-html';
import { RSS_SANITIZE_OPTIONS, RSS_FEED_URL, generateSlug, extractImage } from '@/lib/rss-utils';

const SANITIZE_OPTIONS = RSS_SANITIZE_OPTIONS;

export async function GET(request: NextRequest) {
  try {
    // Authenticate with CRON_SECRET
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parser = new Parser();
    const feed = await parser.parseURL(RSS_FEED_URL);
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
        .select({ id: articles.id, slug: articles.slug })
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

      // Store in DB with schema-agnostic fallback
      const publishedDate = item.pubDate || item.isoDate || new Date().toISOString();
      const updatedAt = new Date().toISOString();
      const impactsJson = synthesized.impacts?.length ? JSON.stringify(synthesized.impacts) : null;

      try {
        // Try full INSERT (with impacts + remediation)
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
            publishedDate,
            updatedAt,
          ],
        });
      } catch {
        // Fallback: try without impacts/remediation columns
        try {
          await client.execute({
            sql: `INSERT INTO articles (title, title_fr, excerpt, excerpt_fr, content, content_fr, image, author, category, tags, lang, source, source_url, slug, slug_fr, published, created_at, updated_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
              publishedDate,
              updatedAt,
            ],
          });
        } catch {
          // Final fallback: slug might already exist, try UPDATE by sourceUrl instead
          if (existing.length === 0) {
            // Check if slug exists
            const slugCheck = await db
              .select({ id: articles.id })
              .from(articles)
              .where(eq(articles.slug, slug))
              .limit(1);

            if (slugCheck.length > 0) {
              await client.execute({
                sql: `UPDATE articles SET title = ?, title_fr = ?, excerpt = ?, excerpt_fr = ?, content = ?, content_fr = ?, image = ?, category = ?, tags = ?, source_url = ?, updated_at = ? WHERE id = ?`,
                args: [
                  item.title || '',
                  synthesized.titleFr,
                  item.contentSnippet?.slice(0, 200) || '',
                  synthesized.excerptFr,
                  sanitizeHtml(item.content || item.description || '', SANITIZE_OPTIONS),
                  sanitizeHtml(synthesized.contentFr, SANITIZE_OPTIONS),
                  imageUrl,
                  synthesized.category,
                  JSON.stringify(synthesized.tags),
                  sourceUrl,
                  updatedAt,
                  slugCheck[0].id,
                ],
              });
              results.push({ title: synthesized.titleFr, status: 'updated' });
              continue;
            }
          }
          results.push({ title: synthesized.titleFr, status: 'error', reason: 'DB write failed' });
          continue;
        }
      }

      results.push({ title: synthesized.titleFr, status: 'created' });
    }

    return NextResponse.json({
      processed: results.length,
      created: results.filter((r) => r.status === 'created').length,
      updated: results.filter((r) => r.status === 'updated').length,
      skipped: results.filter((r) => r.status === 'skipped').length,
      errors: results.filter((r) => r.status === 'error').length,
      articles: results,
    });
  } catch (error) {
    console.error('Cron synthesis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}