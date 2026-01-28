import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import Parser from 'rss-parser';
import { translateToFrench, generateFrenchSlug } from '@/lib/translate';
import { rssCache, CACHE_TTL } from '@/lib/rss-cache';

// Helper function to generate URL-friendly slugs
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Authentication middleware
function authenticateRequest(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.ARTICLE_API_KEY;
  return !!(apiKey && validApiKey && apiKey === validApiKey);
}

// GET handler - Fetch articles from DB and RSS
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    
    // 1. Fetch from DB (Internal expertise)
    const dbArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt))
      .limit(limit);

    // 2. Fetch from RSS (External veille)
    const parser = new Parser();
    const feed = await parser.parseURL('https://feeds.feedburner.com/TheHackersNews');
    
    // Process RSS items with translation and caching
    const rssArticles = await Promise.all(feed.items.slice(0, limit).map(async (item, index) => {
      const cacheKey = item.guid || item.link || item.title || '';
      const cached = rssCache[cacheKey];
      
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.data;
      }

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
      
      const article = {
        id: `rss-${index}`,
        title: titleFr || item.title || 'Sans titre',
        titleEn: item.title,
        excerpt: excerptFr || excerptEn,
        excerptEn: excerptEn,
        content: item.content || item.description || '',
        image: imageUrl,
        createdAt: item.pubDate || item.isoDate || new Date().toISOString(),
        author: item.creator || 'The Hacker News',
        category: 'Veille Cybersécurité',
        slug: generateFrenchSlug(titleFr || item.title || ''),
        sourceType: 'rss',
        sourceUrl: item.link,
        published: true
      };

      rssCache[cacheKey] = {
        timestamp: Date.now(),
        data: article
      };

      return article;
    }));

    // 3. Format DB articles to match the same interface
    const formattedDbArticles = dbArticles.map(article => ({
      ...article,
      id: `db-${article.id}`,
      title: article.titleFr || article.title,
      titleEn: article.title,
      excerpt: article.excerptFr || article.excerpt,
      excerptEn: article.excerpt,
      content: article.contentFr || article.content,
      slug: article.slugFr || article.slug,
      sourceType: 'db',
      category: 'Expertise Cybersécurité'
    }));

    // 4. Merge and sort by date
    const allArticles = [...formattedDbArticles, ...rssArticles]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);

    return NextResponse.json(allArticles);
  } catch (error) {
    console.error('GET articles error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST handler - Create new article with automatic translation
export async function POST(request: NextRequest) {
  try {
    if (!authenticateRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { title, excerpt, content, image, category, author, published, slug } = body;
    
    if (!title || !excerpt || !content || !image || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    // Automatic translation if not provided
    const titleFr = body.titleFr || await translateToFrench(title);
    const excerptFr = body.excerptFr || await translateToFrench(excerpt);
    const contentFr = body.contentFr || await translateToFrench(content);
    
    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);
    const finalSlugFr = body.slugFr || generateFrenchSlug(titleFr);
    
    const now = new Date().toISOString();
    
    const newArticle = await db.insert(articles).values({
      title: title.trim(),
      titleFr: titleFr.trim(),
      excerpt: excerpt.trim(),
      excerptFr: excerptFr.trim(),
      content: content.trim(),
      contentFr: contentFr.trim(),
      image: image.trim(),
      category: category.trim(),
      author: author?.trim() || 'SecuriTrust',
      slug: finalSlug,
      slugFr: finalSlugFr,
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

// PUT handler - Update article with automatic translation
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
    
    if (updates.slug) updates.slug = generateSlug(updates.slug);
    if (updates.titleFr && !updates.slugFr) updates.slugFr = generateFrenchSlug(updates.titleFr);
    
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
