import Link from 'next/link';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { InternalLinks } from '@/components/InternalLinks';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { ArticleGrid, BlogNav, blogListJsonLd } from '@/components/blog/BlogIndex';
import { JsonLd } from '@/components/StructuredData';
import { BLOG_URL, listBlogArticles, listEditorialArticles } from '@/lib/blog';

// Rendu serveur mis en cache (ISR) : la liste est dans le HTML, régénérée toutes les 30 min.
export const revalidate = 1800;

export default async function ArticlesPage() {
  // Les analyses maison sont mises en avant : triées par date avec la veille (une
  // dizaine d'articles par jour), elles quitteraient la page en quelques jours.
  const [editorial, latest] = await Promise.all([listEditorialArticles(6), listBlogArticles({ limit: 24 })]);
  const editorialKeys = new Set(editorial.map((a) => a.key));
  const items = latest.filter((a) => !editorialKeys.has(a.key));
  const jsonLd = blogListJsonLd([...editorial, ...items], {
    name: 'Blog Cybersécurité SecuriTrust',
    url: BLOG_URL,
    description: 'Analyses et actualités en cybersécurité par les experts SecuriTrust',
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
            <p className="hero-sub">Découvrez nos dernières analyses et actualités en cybersécurité</p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <BlogNav />
            {editorial.length > 0 && (
              <>
                <h2 style={{ marginTop: 48 }}>Analyses SecuriTrust</h2>
                <ArticleGrid items={editorial} empty="" />
              </>
            )}
            <h2 style={{ marginTop: 56 }}>Veille cybersécurité</h2>
            <ArticleGrid items={items} empty="Aucun article pour le moment." />
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
