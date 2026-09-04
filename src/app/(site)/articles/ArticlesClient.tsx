'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { SearchBar } from '@/components/search-bar';
import { CategoryTabs } from '@/components/category-tabs';

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string;
  author: string;
  category: string;
  slug: string;
}

function ArticlesContent({ initialArticles }: { initialArticles: ArticleItem[] }) {
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    fetchArticles();
  }, [currentCategory, searchQuery]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentCategory) params.set('category', currentCategory);
      if (searchQuery) params.set('q', searchQuery);

      const response = await fetch(`/api/articles?${params.toString()}`);
      if (!response.ok) throw new Error('Erreur lors du chargement des articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Impossible de charger les articles');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <SearchBar />
      <div style={{ marginTop: 32 }}>
        <CategoryTabs />
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
          <div
            className="animate-spin"
            style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '4px solid rgba(118,166,209,.3)', borderTopColor: 'var(--cyan)',
            }}
          />
        </div>
      ) : articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <p>Aucun article trouvé pour cette sélection.</p>
        </div>
      ) : (
        <>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="article-card reveal">
                <div className="thumb">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="cat">{article.category}</span>
                </div>

                <div className="body">
                  <div className="meta">
                    <span><Calendar size={13} />{formatDate(article.createdAt)}</span>
                    <span><User size={13} />{article.author}</span>
                  </div>

                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>

                  <span className="more">
                    Lire l&apos;article
                    <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {articles.length >= 20 && !searchQuery && !currentCategory && (
            <div style={{ textAlign: 'center', marginTop: 56 }}>
              <button className="btn-primary">Charger plus d&apos;articles</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export function ArticlesClient({ initialArticles }: { initialArticles: ArticleItem[] }) {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <div
          className="animate-spin"
          style={{
            width: 48, height: 48, borderRadius: '50%',
            border: '4px solid rgba(118,166,209,.3)', borderTopColor: 'var(--cyan)',
          }}
        />
      </div>
    }>
      <ArticlesContent initialArticles={initialArticles} />
    </Suspense>
  );
}
