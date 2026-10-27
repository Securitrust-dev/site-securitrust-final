import Link from 'next/link';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { InternalLinks } from '@/components/InternalLinks';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { ArticleGrid, BlogNav, blogListJsonLd } from '@/components/blog/BlogIndex';
import { JsonLd } from '@/components/StructuredData';
import { BLOG_URL, VEILLE_PATH, listBlogArticles, listEditorialArticles } from '@/lib/blog';

// Rendu serveur à chaque requête (nonce CSP) ; les données sont en cache 30 min (lib/blog).

export default async function ArticlesPage() {
  // Articles d'expertise en tête ; la veille (une dizaine de synthèses par jour) a sa
  // propre rubrique, /articles/veille, dont on ne montre ici que les dernières.
  const [editorial, veille] = await Promise.all([listEditorialArticles(), listBlogArticles({ limit: 6, kind: 'veille' })]);
  const jsonLd = blogListJsonLd(editorial, {
    name: 'Blog Cybersécurité SecuriTrust',
    url: BLOG_URL,
    description: 'Analyses et guides en cybersécurité par les experts SecuriTrust',
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <StaticThemeShell active="articles">
        <section className="hero-simple">
          <div className="wrap">
            <p className="crumb">
              <Link href="/">Accueil</Link>
              <span className="sep">›</span>
              <span className="now">Articles</span>
            </p>
            <h1>Articles</h1>
            <p className="hero-sub">Analyses et guides de nos experts, et veille sur l&apos;actualité de la cybersécurité</p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <BlogNav />
            <h2 style={{ marginTop: 48 }}>Analyses et guides SecuriTrust</h2>
            <ArticleGrid items={editorial} empty="Aucun article pour le moment." />
            {veille.length > 0 && (
              <>
                <h2 style={{ marginTop: 56 }}>Dernières veilles cybersécurité</h2>
                <ArticleGrid items={veille} empty="" />
                <p style={{ marginTop: 32, textAlign: 'center' }}>
                  <Link href={VEILLE_PATH} className="btn-primary">Toute la veille cybersécurité →</Link>
                </p>
              </>
            )}
          </div>
        </section>

        <section className="sec sec--dark" style={{ textAlign: 'center' }}>
          <ExpertCTAButton />
        </section>

        <InternalLinks pageKey="articles" />
      </StaticThemeShell>
    </>
  );
}
