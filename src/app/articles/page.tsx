'use client';

import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { PromoBanner } from '@/components/sections/promo-banner';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import { SearchBar } from '@/components/search-bar';
import { CategoryTabs } from '@/components/category-tabs';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

interface Article {
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

function ArticlesContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
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
                  {/* Glow Effect */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden bg-black/50">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/90 backdrop-blur-sm rounded">
                      <span className="text-xs font-semibold text-black uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    {/* Meta Info */}
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

                    {/* Title */}
                    <h2 className="text-xl font-medium text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed font-light">
                      {article.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm group/btn hover:gap-3 transition-all uppercase tracking-wider">
                      <span>Lire l'article</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {articles.length >= 20 && !searchQuery && !currentCategory && (
            <div className="text-center mt-16">
              <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] rounded">
                Charger plus d'articles
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function ArticlesPage() {
  return (
    <>
      <PromoBanner />
      <div className="relative min-h-screen bg-[#030303]">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full bg-void opacity-60"></div>
          <div className="stars opacity-20"></div>
        </div>
        <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
        
        <ThreeBackground />
        <MatrixRain />
        <Navbar />
        
        {/* Hero Header */}
        <div className="relative z-10 pt-32 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-4 border-b border-white/10 pb-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
                Articles
              </h1>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // BLOG</span>
            </div>
            <p className="text-lg text-slate-400 max-w-2xl font-light tracking-wide mb-8">
              Découvrez nos dernières analyses et actualités en cybersécurité
            </p>
            
            <Suspense fallback={
              <div className="flex justify-center items-center py-20">
                <div className="h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
              </div>
            }>
              <ArticlesContent />
            </Suspense>
          </div>
        </div>

        <section className="py-16 px-6 text-center">
          <ExpertCTAButton />
        </section>

        <Footer />
      </div>
    </>
  );
}
