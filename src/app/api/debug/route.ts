import { NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Check if DB is accessible
    const count = await db
      .select({ count: articles.id })
      .from(articles)
      .limit(1);

    const allPublished = await db
      .select({ count: articles.id })
      .from(articles)
      .where(eq(articles.published, true));

    return NextResponse.json({
      dbAccessible: true,
      tursoUrlSet: !!process.env.TURSO_CONNECTION_URL,
      tursoUrlPrefix: process.env.TURSO_CONNECTION_URL?.split('://')[0],
      nodeEnv: process.env.NODE_ENV,
      dbQueryWorks: count.length > 0,
      publishedCount: allPublished.length,
    });
  } catch (error: any) {
    return NextResponse.json({
      dbAccessible: false,
      tursoUrlSet: !!process.env.TURSO_CONNECTION_URL,
      tursoUrlPrefix: process.env.TURSO_CONNECTION_URL?.split('://')[0],
      nodeEnv: process.env.NODE_ENV,
      error: error?.message || 'Unknown error',
    });
  }
}