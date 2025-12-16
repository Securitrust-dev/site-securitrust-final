import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';
import Parser from 'rss-parser';

// Helper function to generate URL-friendly slugs
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens
    .replace(/^-|-$/g, ''); // Trim hyphens from start and end
}

// Authentication middleware
function authenticateRequest(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.ARTICLE_API_KEY;
  
  if (!apiKey || !validApiKey || apiKey !== validApiKey) {
    return false;
  }
  
  return true;
}

// GET handler - Fetch articles from The Hacker News RSS feed
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    const parser = new Parser();
    const feed = await parser.parseURL('https://feeds.feedburner.com/TheHackersNews');
    
    // Transform RSS items to match our Article interface
    let transformedArticles = feed.items.map((item, index) => {
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
      
      // Generate slug from title
      const slug = item.title
        ?.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || `article-${index}`;
      
      return {
        id: index + 1,
        title: item.title || 'Sans titre',
        excerpt: excerpt,
        content: item.content || item.description || '',
        image: imageUrl,
        createdAt: item.pubDate || item.isoDate || new Date().toISOString(),
        author: item.creator || 'The Hacker News',
        category: 'Cybersécurité',
        slug: slug,
        published: true
      };
    });
    
    // Apply filters
    if (search) {
      transformedArticles = transformedArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      transformedArticles = transformedArticles.filter(article =>
        article.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply limit
    transformedArticles = transformedArticles.slice(0, limit);
    
    return NextResponse.json(transformedArticles);
  } catch (error) {
    console.error('GET articles error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

// POST handler - Create new article (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Authentication check
    if (!authenticateRequest(request)) {
      return NextResponse.json(
        { 
          error: 'Unauthorized: Invalid or missing API key',
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { title, excerpt, content, image, category, author, published, slug } = body;
    
    // Validate required fields
    if (!title || !excerpt || !content || !image || !category) {
      return NextResponse.json(
        { 
          error: 'Missing required fields: title, excerpt, content, image, category',
          code: 'MISSING_REQUIRED_FIELDS' 
        },
        { status: 400 }
      );
    }
    
    // Generate slug if not provided
    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);
    
    const now = new Date().toISOString();
    
    const newArticle = await db.insert(articles).values({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      image: image.trim(),
      category: category.trim(),
      author: author?.trim() || 'SecuriTrust',
      slug: finalSlug,
      published: published !== undefined ? published : false,
      createdAt: now,
      updatedAt: now,
    }).returning();
    
    return NextResponse.json(newArticle[0], { status: 201 });
  } catch (error) {
    console.error('POST article error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

// PUT handler - Update article (requires authentication)
export async function PUT(request: NextRequest) {
  try {
    // Authentication check
    if (!authenticateRequest(request)) {
      return NextResponse.json(
        { 
          error: 'Unauthorized: Invalid or missing API key',
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid article ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }
    
    const updates = await request.json();
    
    // Generate slug if slug is being updated
    if (updates.slug) {
      updates.slug = generateSlug(updates.slug);
    }
    
    // Trim string fields
    if (updates.title) updates.title = updates.title.trim();
    if (updates.excerpt) updates.excerpt = updates.excerpt.trim();
    if (updates.content) updates.content = updates.content.trim();
    if (updates.image) updates.image = updates.image.trim();
    if (updates.category) updates.category = updates.category.trim();
    if (updates.author) updates.author = updates.author.trim();
    
    // Always update updatedAt
    updates.updatedAt = new Date().toISOString();
    
    const updatedArticle = await db
      .update(articles)
      .set(updates)
      .where(eq(articles.id, parseInt(id)))
      .returning();
    
    if (updatedArticle.length === 0) {
      return NextResponse.json(
        { 
          error: 'Article not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedArticle[0]);
  } catch (error) {
    console.error('PUT article error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete article (requires authentication)
export async function DELETE(request: NextRequest) {
  try {
    // Authentication check
    if (!authenticateRequest(request)) {
      return NextResponse.json(
        { 
          error: 'Unauthorized: Invalid or missing API key',
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid article ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }
    
    const deletedArticle = await db
      .delete(articles)
      .where(eq(articles.id, parseInt(id)))
      .returning();
    
    if (deletedArticle.length === 0) {
      return NextResponse.json(
        { 
          error: 'Article not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
      article: deletedArticle[0]
    });
  } catch (error) {
    console.error('DELETE article error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}