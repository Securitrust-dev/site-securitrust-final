import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'PCA/PRA — Plan de Continuité et Reprise d\'Activité',
  description: metaDescription('/pcapra'),
  alternates: {
    canonical: 'https://www.securitrust.fr/pcapra',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'PCA/PRA — Plan de Continuité et Reprise d\'Activité',
    description: "Élaborez votre PCA/PRA avec SecuriTrust pour garantir la résilience de votre organisation face aux sinistres et incidents majeurs.",
    url: 'https://www.securitrust.fr/pcapra',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'PCA/PRA — Plan de Continuité et Reprise d\'Activité',
    description: "Élaborez votre PCA/PRA pour garantir la résilience de votre organisation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="PCA/PRA — Plan de Continuité et Reprise d'Activité"
        description="Élaborez votre Plan de Continuité d'Activité (PCA) et Plan de Reprise d'Activité (PRA) avec SecuriTrust. Garantissez la résilience de votre organisation face aux sinistres et incidents critiques."
        url="https://www.securitrust.fr/pcapra"
      />
      {children}
    </>
  );
}
