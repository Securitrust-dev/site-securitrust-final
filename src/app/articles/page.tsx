import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { PromoBanner } from '@/components/sections/promo-banner';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import { ArticlesClient, type ArticleItem } from './ArticlesClient';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

async function getInitialArticles(): Promise<ArticleItem[]> {
  try {
    const dbArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt))
      .limit(20);

    return dbArticles.map(a => ({
      id: `db-${a.id}`,
      title: a.titleFr || a.title,
      excerpt: a.excerptFr || a.excerpt || '',
      content: '',
      image: a.image,
      createdAt: a.createdAt,
      author: a.author,
      category: a.category,
      slug: a.slugFr || a.slug,
    }));
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const initialArticles = await getInitialArticles();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Cybersécurité SecuriTrust',
    description: 'Analyses et actualités en cybersécurité par les experts SecuriTrust',
    url: 'https://www.securitrust.fr/articles',
    publisher: {
      '@type': 'Organization',
      name: 'SecuriTrust',
      url: 'https://www.securitrust.fr',
    },
    blogPost: initialArticles.map(a => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      url: `https://www.securitrust.fr/articles/${a.slug}`,
      datePublished: a.createdAt,
      author: { '@type': 'Organization', name: a.author },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

            <ArticlesClient initialArticles={initialArticles} />
          </div>
        </div>

        <section className="py-16 px-6 text-center">
          <ExpertCTAButton />
        </section>

        <InternalLinks pageKey="articles" />
        <Footer />
      </div>
    </>
  );
}
