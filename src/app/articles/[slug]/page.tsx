import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { PromoBanner } from '@/components/sections/promo-banner';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/articles/slug/${slug}`, {
    next: { revalidate: 3600 }
  });
  
  if (!response.ok) {
    return null;
  }
  
  return response.json();
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${article.title} | SecuriTrust`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article || !article.published) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

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
        
        {/* Article Hero */}
        <div className="relative z-10 pt-40 pb-12">
          <div className="max-w-5xl mx-auto px-6">
            {/* Back Button */}
            <Link 
              href="/articles"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm uppercase tracking-wider font-medium">Retour aux articles</span>
            </Link>

            {/* Category Badge */}
            <div className="inline-block px-4 py-2 bg-cyan-500/90 backdrop-blur-sm rounded mb-6">
              <span className="text-xs font-semibold text-black uppercase tracking-wider">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-tight mb-8">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-slate-400 mb-10 pb-10 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Image */}
        <div className="relative z-10 mb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-panel">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="relative z-10 pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-panel rounded-2xl p-8 md:p-12 lg:p-16">
              {/* Excerpt */}
              <p className="text-xl text-slate-300 font-light leading-relaxed mb-12 pb-12 border-b border-white/10 italic">
                {article.excerpt}
              </p>

              {/* Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-light prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-white prose-strong:font-medium
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                  prose-code:text-cyan-400 prose-code:bg-black/50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10
                  prose-ul:text-slate-300 prose-ol:text-slate-300
                  prose-li:my-2
                  prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:text-slate-300 prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Back to Articles CTA */}
            <div className="text-center mt-16">
              <Link 
                href="/articles"
                className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] rounded group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>Tous les articles</span>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}