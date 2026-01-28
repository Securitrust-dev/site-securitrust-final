import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Cybersécurité | Analyses, Actualités & Conseils Experts',
  description: 'Découvrez nos dernières analyses, actualités et conseils d\'experts en cybersécurité. Restez informé des nouvelles menaces et des meilleures pratiques de protection.',
  alternates: {
    canonical: '/articles',
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
