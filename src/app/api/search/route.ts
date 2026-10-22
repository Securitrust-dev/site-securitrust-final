import { NextRequest, NextResponse } from 'next/server';

import { listDbArticles } from '@/lib/blog';

interface PageData {
  title: string;
  url: string;
  excerpt: string;
  category: string;
  keywords: string[];
}

const pages: PageData[] = [
  // ... (previous static pages)
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query || query.length < 2 || query.length > 100) {
    return NextResponse.json([]);
  }

  // 1. Search in static pages
  const staticResults = pages.filter((page) => {
    const titleMatch = page.title.toLowerCase().includes(query);
    const excerptMatch = page.excerpt.toLowerCase().includes(query);
    const keywordsMatch = page.keywords.some(keyword => 
      keyword.toLowerCase().includes(query) || query.includes(keyword.toLowerCase())
    );
    
    return titleMatch || excerptMatch || keywordsMatch;
  });

  // 2. Articles du blog (copie du dépôt + base si elle répond)
  const formattedArticleResults = (await listDbArticles({ q: query, limit: 10 })).map((article) => ({
    title: article.title,
    url: `/articles/${article.slug}`,
    excerpt: article.excerpt,
    category: `Article - ${article.category}`,
  }));

  const allResults = [...staticResults, ...formattedArticleResults];

  // Sort results: exact title matches first
  allResults.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(query) ? 1 : 0;
    const bTitle = b.title.toLowerCase().includes(query) ? 1 : 0;
    return bTitle - aTitle;
  });

  return NextResponse.json(allResults.slice(0, 15));
}

