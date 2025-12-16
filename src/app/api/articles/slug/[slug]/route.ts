import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { 
          error: 'Slug is required',
          code: 'INVALID_SLUG' 
        },
        { status: 400 }
      );
    }

    const parser = new Parser();
    const feed = await parser.parseURL('https://feeds.feedburner.com/TheHackersNews');
    
    // Find the article with matching slug
    let foundArticle = null;
    
    for (let index = 0; index < feed.items.length; index++) {
      const item = feed.items[index];
      
      // Generate slug from title
      const itemSlug = item.title
        ?.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || `article-${index}`;
      
      if (itemSlug === slug) {
        // Extract image from content or use a default
        let imageUrl = 'https://thehackernews.com/images/default-article.jpg';
        if (item.enclosure && item.enclosure.url) {
          imageUrl = item.enclosure.url;
        } else if (item.content) {
          const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }
        
        // Extract excerpt from description or content
        let excerpt = '';
        if (item.contentSnippet) {
          excerpt = item.contentSnippet.slice(0, 200) + '...';
        } else if (item.description) {
          const cleanDesc = item.description.replace(/<[^>]*>/g, '').slice(0, 200) + '...';
          excerpt = cleanDesc;
        }
        
        foundArticle = {
          id: index + 1,
          title: item.title || 'Sans titre',
          excerpt: excerpt,
          content: item.content || item.description || '',
          image: imageUrl,
          createdAt: item.pubDate || item.isoDate || new Date().toISOString(),
          author: item.creator || 'The Hacker News',
          category: 'Cybersécurité',
          slug: itemSlug,
          published: true
        };
        
        break;
      }
    }

    if (!foundArticle) {
      return NextResponse.json(
        { 
          error: 'Article not found',
          code: 'ARTICLE_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(foundArticle, { status: 200 });
  } catch (error) {
    console.error('GET article by slug error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}
