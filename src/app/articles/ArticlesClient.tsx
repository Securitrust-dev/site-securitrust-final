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
      <div className="mt-8">
        <CategoryTabs />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 font-light italic">Aucun article trouvé pour cette sélection.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="tilt-card group relative block"
              >
                <div className="glass-panel h-full rounded-xl overflow-hidden relative">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>

                  <div className="relative h-48 overflow-hidden bg-black/50">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                    <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/90 backdrop-blur-sm rounded">
                      <span className="text-xs font-semibold text-black uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-slate-400 uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(article.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span>{article.author}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-medium text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed font-light">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm group/btn hover:gap-3 transition-all uppercase tracking-wider">
                      <span>Lire l'article</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {articles.length >= 20 && !searchQuery && !currentCategory && (
            <div className="text-center mt-16">
              <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)] hover:shadow-[0_0_30px_rgba(118,166,209,0.5)] rounded">
                Charger plus d'articles
              </button>
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
      <div className="flex justify-center items-center py-20">
        <div className="h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    }>
      <ArticlesContent initialArticles={initialArticles} />
    </Suspense>
  );
}
