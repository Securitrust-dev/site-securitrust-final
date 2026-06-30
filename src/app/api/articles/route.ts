import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc, or, like, and } from 'drizzle-orm';
import Parser from 'rss-parser';
import { translateToFrench, generateFrenchSlug } from '@/lib/translate';
import { rssCache, CACHE_TTL } from '@/lib/rss-cache';
import { classifyArticle, CYBER_CATEGORIES } from '@/lib/articles';
import { RSS_RSS_SANITIZE_OPTIONS, RSS_FEED_URL, generateSlug } from '@/lib/rss-utils';

// Authenticate API key for write operations
function authenticateRequest(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const expected = process.env.ARTICLE_API_KEY;
  return !!expected && apiKey === expected;
}

// Helper function to generate URL-friendly slugs (imported from rss-utils)

// GET handler - Fetch articles from DB and RSS
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const categorySlug = searchParams.get('category')?.toLowerCase() || '';
    
    // Find matching category from slug
    const targetCategory = CYBER_CATEGORIES.find(cat => generateSlug(cat) === categorySlug);

    // 1. Fetch from DB (Internal expertise)
    let whereClause = eq(articles.published, true);
    
    const conditions = [eq(articles.published, true)];
    
    if (query) {
      conditions.push(
        or(
          like(articles.titleFr, `%${query}%`),
          like(articles.excerptFr, `%${query}%`),
          like(articles.category, `%${query}%`),
          like(articles.tags, `%${query}%`)
        )!
      );
    }
    
    if (targetCategory) {
      conditions.push(eq(articles.category, targetCategory));
    }

    const dbArticlesData = await db
      .select()
      .from(articles)
      .where(and(...conditions))
      .orderBy(desc(articles.createdAt))
      .limit(limit);

    // 2. Fetch from RSS (External veille)
    const parser = new Parser();
    const feed = await parser.parseURL(RSS_FEED_URL);
    
    // Process RSS items with translation and caching
    const rssArticles = await Promise.all(feed.items.slice(0, limit * 2).map(async (item, index) => {
      const cacheKey = item.guid || item.link || item.title || '';
      const cached = rssCache[cacheKey];
      
      let article;
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        article = cached.data;
      } else {
        // Extract image
        let imageUrl = 'https://thehackernews.com/images/default-article.jpg';
        if (item.enclosure?.url) {
          imageUrl = item.enclosure.url;
        } else if (item.content) {
          const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) imageUrl = imgMatch[1];
        }

        // Extract excerpt
        const excerptEn = item.contentSnippet?.slice(0, 200) || item.description?.replace(/<[^>]*>/g, '').slice(0, 200) || '';
        
        // Translate to French
        const titleFr = await translateToFrench(item.title || '');
        const excerptFr = await translateToFrench(excerptEn);
        const contentEn = item.content || item.description || '';
        
        // Classification
        const classification = classifyArticle(titleFr || item.title || '', excerptFr || excerptEn, contentEn);
        
        article = {
          id: `rss-${index}`,
          title: titleFr || item.title || 'Sans titre',
          titleEn: item.title,
          excerpt: excerptFr || excerptEn,
          excerptEn: excerptEn,
          content: contentEn,
          image: imageUrl,
          createdAt: item.pubDate || item.isoDate || new Date().toISOString(),
          author: item.creator || 'The Hacker News',
          category: classification.category,
          tags: JSON.stringify(classification.tags),
          slug: generateFrenchSlug(titleFr || item.title || ''),
          sourceType: 'rss',
          sourceUrl: item.link,
          published: true
        };

        rssCache[cacheKey] = {
          timestamp: Date.now(),
          data: article
        };
      }

      return article;
    }));

    // Filter RSS articles by query and category if needed
    const filteredRssArticles = rssArticles.filter(a => {
      const matchesQuery = !query || (
        a.title.toLowerCase().includes(query) || 
        a.excerpt.toLowerCase().includes(query) || 
        a.category.toLowerCase().includes(query) ||
        (a.tags && a.tags.toLowerCase().includes(query))
      );
      
      const matchesCategory = !targetCategory || a.category === targetCategory;
      
      return matchesQuery && matchesCategory;
    });

    // Get all source URLs from DB articles to avoid duplicates
    const dbSourceUrls = new Set(
      dbArticlesData.filter(a => a.sourceUrl).map(a => a.sourceUrl)
    );

    // 3. Deduplicate DB articles: keep only the latest entry per sourceUrl
    const dedupedDbMap = new Map<string, typeof dbArticlesData[0]>();
    const seenSourceUrls = new Set<string>();
    for (const article of dbArticlesData) {
      // Always include articles without sourceUrl
      if (!article.sourceUrl) {
        dedupedDbMap.set(`no-url-${article.id}`, article);
      } else if (!seenSourceUrls.has(article.sourceUrl)) {
        seenSourceUrls.add(article.sourceUrl);
        dedupedDbMap.set(article.sourceUrl, article);
      }
    }
    const dedupedDbData = Array.from(dedupedDbMap.values());

    // 4. Format DB articles to match the same interface
    const formattedDbArticles = dedupedDbData.map(article => ({
      ...article,
      id: `db-${article.id}`,
      title: article.titleFr || article.title,
      titleEn: article.title,
      excerpt: article.excerptFr || article.excerpt,
      excerptEn: article.excerpt,
      content: article.contentFr || article.content,
      slug: article.slugFr || article.slug,
      sourceType: 'db',
      tags: article.tags || '[]'
    }));

    // 4. Filter RSS articles: skip those already in DB (same sourceUrl)
    const dedupedRssArticles = filteredRssArticles.filter(
      a => !dbSourceUrls.has(a.sourceUrl)
    );

    // 5. Merge and sort by date
    const allArticles = [...formattedDbArticles, ...dedupedRssArticles]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);

    return NextResponse.json(allArticles);
  } catch (error) {
    console.error('GET articles error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST handler - Create new article with automatic translation and classification
export async function POST(request: NextRequest) {
  try {
    if (!authenticateRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { title, excerpt, content, image, author, published, slug, sourceUrl } = body;
    
    if (!title || !excerpt || !content || !image) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    // Automatic translation if not provided
    const titleFr = body.titleFr || await translateToFrench(title);
    const excerptFr = body.excerptFr || await translateToFrench(excerpt);
    const contentFr = body.contentFr || await translateToFrench(content);
    
    // Automatic classification if category/tags not provided
    let { category, tags } = body;
    if (!category || !tags) {
      const classification = classifyArticle(titleFr, excerptFr, contentFr);
      category = category || classification.category;
      tags = tags || JSON.stringify(classification.tags);
    }
    
    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);
    const finalSlugFr = body.slugFr || generateFrenchSlug(titleFr);
    
    const now = new Date().toISOString();
    
    const newArticle = await db.insert(articles).values({
      title: title.trim(),
      titleFr: titleFr.trim(),
      excerpt: excerpt.trim(),
      excerptFr: excerptFr.trim(),
      content: sanitizeHtml(content.trim(), RSS_SANITIZE_OPTIONS),
      contentFr: sanitizeHtml(contentFr.trim(), RSS_SANITIZE_OPTIONS),
      image: image.trim(),
      category: category.trim(),
      tags: typeof tags === 'string' ? tags : JSON.stringify(tags),
      author: author?.trim() || 'SecuriTrust',
      slug: finalSlug,
      slugFr: finalSlugFr,
      source: 'internal',
      sourceUrl: sourceUrl,
      lang: body.lang || 'fr',
      published: published !== undefined ? published : false,
      createdAt: now,
      updatedAt: now,
    }).returning();
    
    return NextResponse.json(newArticle[0], { status: 201 });
  } catch (error) {
    console.error('POST article error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT handler - Update article with automatic translation and classification
export async function PUT(request: NextRequest) {
  try {
    if (!authenticateRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    }
    
    const updates = await request.json();
    
    // Handle translation if original fields are updated but French ones aren't
    if (updates.title && !updates.titleFr) updates.titleFr = await translateToFrench(updates.title);
    if (updates.excerpt && !updates.excerptFr) updates.excerptFr = await translateToFrench(updates.excerpt);
    if (updates.content && !updates.contentFr) updates.contentFr = await translateToFrench(updates.content);
    
    // Re-classify if content changes and no category/tags provided
    if ((updates.titleFr || updates.excerptFr || updates.contentFr) && !updates.category && !updates.tags) {
      const current = await db.select().from(articles).where(eq(articles.id, parseInt(id))).limit(1);
      if (current[0]) {
        const title = updates.titleFr || current[0].titleFr || '';
        const excerpt = updates.excerptFr || current[0].excerptFr || '';
        const content = updates.contentFr || current[0].contentFr || '';
        const classification = classifyArticle(title, excerpt, content);
        updates.category = classification.category;
        updates.tags = JSON.stringify(classification.tags);
      }
    }
    
    if (updates.slug) updates.slug = generateSlug(updates.slug);
    if (updates.titleFr && !updates.slugFr) updates.slugFr = generateFrenchSlug(updates.titleFr);
    
    if (updates.tags && typeof updates.tags !== 'string') {
        updates.tags = JSON.stringify(updates.tags);
    }
    
    updates.updatedAt = new Date().toISOString();
    
    const updatedArticle = await db
      .update(articles)
      .set(updates)
      .where(eq(articles.id, parseInt(id)))
      .returning();
    
    if (updatedArticle.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedArticle[0]);
  } catch (error) {
    console.error('PUT article error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    if (!authenticateRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    }
    
    const deletedArticle = await db
      .delete(articles)
      .where(eq(articles.id, parseInt(id)))
      .returning();
    
    if (deletedArticle.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE article error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
