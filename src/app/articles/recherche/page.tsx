import type { Metadata } from 'next';
import Link from 'next/link';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { ArticleGrid, BlogNav } from '@/components/blog/BlogIndex';
import { listBlogArticles } from '@/lib/blog';

// Résultats de recherche : rendus côté serveur mais exclus de l'index (contenu infini).
export const metadata: Metadata = {
  title: { absolute: 'Recherche — Blog cybersécurité | SecuriTrust' },
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.securitrust.fr/articles/recherche' },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q || '').slice(0, 100).trim();
  const items = q ? await listBlogArticles({ q, limit: 48 }) : [];
  return (
    <StaticThemeShell active="articles">
      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <Link href="/articles">Articles</Link>
            <span className="sep">›</span>
            <span className="now">Recherche</span>
          </p>
          <h1>{q ? `Résultats pour « ${q} »` : 'Rechercher un article'}</h1>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <BlogNav query={q} />
          {q && <ArticleGrid items={items} empty="Aucun article ne correspond à cette recherche." />}
        </div>
      </section>
    </StaticThemeShell>
  );
}
