import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'PCA/PRA — Plan de Continuité et Reprise d\'Activité | SecuriTrust',
  description: "Élaborez votre Plan de Continuité d'Activité (PCA) et Plan de Reprise d'Activité (PRA) avec SecuriTrust. Garantissez la résilience de votre organisation face aux sinistres et incidents critiques.",
  keywords: ['PCA', 'PRA', 'plan continuité activité', 'plan reprise activité', 'continuité business', 'résilience cyber', 'gestion crise'],
  alternates: {
    canonical: 'https://securitrust.fr/pcapra',
  },
  openGraph: {
    title: 'PCA/PRA — Plan de Continuité et Reprise d\'Activité',
    description: "Élaborez votre PCA/PRA avec SecuriTrust pour garantir la résilience de votre organisation face aux sinistres et incidents majeurs.",
    url: 'https://securitrust.fr/pcapra',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
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
        url="https://securitrust.fr/pcapra"
      />
      {children}
    </>
  );
}
