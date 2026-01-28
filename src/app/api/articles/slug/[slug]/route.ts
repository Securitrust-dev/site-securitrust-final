import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import Parser from 'rss-parser';
import { translateToFrench, generateFrenchSlug } from '@/lib/translate';
import { rssCache, CACHE_TTL } from '@/lib/rss-cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // 1. Check in DB first (Internal expertise)
    const dbArticle = await db
      .select()
      .from(articles)
      .where(or(eq(articles.slug, slug), eq(articles.slugFr, slug)))
      .limit(1);

    if (dbArticle.length > 0) {
      const article = dbArticle[0];
      return NextResponse.json({
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
      });
    }

    // 2. Check in RSS (External veille)
    const parser = new Parser();
    const feed = await parser.parseURL('https://feeds.feedburner.com/TheHackersNews');
    
    let foundArticle = null;
    
    for (let index = 0; index < feed.items.length; index++) {
      const item = feed.items[index];
      const cacheKey = item.guid || item.link || item.title || '';
      const cached = rssCache[cacheKey];
      
      let articleData;
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        articleData = cached.data;
      } else {
        // Not in cache or expired, we need to process it
        const titleFr = await translateToFrench(item.title || '');
        const itemSlug = generateFrenchSlug(titleFr || item.title || '');
        
        // If this is the one we're looking for, we process it fully
        if (itemSlug === slug) {
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
          const excerptFr = await translateToFrench(excerptEn);
          
          articleData = {
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
            slug: itemSlug,
            sourceType: 'rss',
            sourceUrl: item.link,
            published: true
          };
          
          rssCache[cacheKey] = {
            timestamp: Date.now(),
            data: articleData
          };
        }
      }
      
      if (articleData && articleData.slug === slug) {
        foundArticle = articleData;
        break;
      }
    }

    if (!foundArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(foundArticle);
  } catch (error) {
    console.error('GET article by slug error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
