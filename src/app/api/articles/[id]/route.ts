import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';

// --- GET ---
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // <-- Changement ici (Promise)
) {
  try {
    const { id } = await params; // <-- Changement ici (await)

    if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const article = await db
      .select()
      .from(articles)
      .where(eq(articles.id, parseInt(id)))
      .limit(1);

    if (article.length === 0) {
      return NextResponse.json(
        { 
          error: 'Article not found',
          code: 'ARTICLE_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(article[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}

// --- PUT ---
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // <-- Changement ici (Promise)
) {
  try {
    const { id } = await params; // <-- Changement ici (await)

    if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existingArticle = await db
      .select()
      .from(articles)
      .where(eq(articles.id, parseInt(id)))
      .limit(1);

    if (existingArticle.length === 0) {
      return NextResponse.json(
        { 
          error: 'Article not found',
          code: 'ARTICLE_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    const updates: any = {};

    if (body.title !== undefined) {
      const trimmedTitle = body.title.trim();
      if (trimmedTitle === '') {
        return NextResponse.json(
          { 
            error: 'Title cannot be empty',
            code: 'INVALID_TITLE' 
          },
          { status: 400 }
        );
      }
      updates.title = trimmedTitle;
    }

    if (body.excerpt !== undefined) {
      const trimmedExcerpt = body.excerpt.trim();
      if (trimmedExcerpt === '') {
        return NextResponse.json(
          { 
            error: 'Excerpt cannot be empty',
            code: 'INVALID_EXCERPT' 
          },
          { status: 400 }
        );
      }
      updates.excerpt = trimmedExcerpt;
    }

    if (body.content !== undefined) {
      const trimmedContent = body.content.trim();
      if (trimmedContent === '') {
        return NextResponse.json(
          { 
            error: 'Content cannot be empty',
            code: 'INVALID_CONTENT' 
          },
          { status: 400 }
        );
      }
      updates.content = trimmedContent;
    }

    if (body.category !== undefined) {
      const trimmedCategory = body.category.trim();
      if (trimmedCategory === '') {
        return NextResponse.json(
          { 
            error: 'Category cannot be empty',
            code: 'INVALID_CATEGORY' 
          },
          { status: 400 }
        );
      }
      updates.category = trimmedCategory;
    }

    if (body.image !== undefined) {