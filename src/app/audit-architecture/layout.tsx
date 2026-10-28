import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Audit d\'Architecture SI — Évaluation Réseau, Cloud & Applicatif',
  description: metaDescription('/audit-architecture'),
  alternates: {
    canonical: 'https://www.securitrust.fr/audit-architecture',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Audit d\'Architecture SI — Évaluation Réseau, Cloud & Applicatif',
    description: "Audit d'architecture SI : identification des failles structurelles réseau, cloud et applicatives. Rapport et plan de remédiation. SecuriTrust.",
    url: 'https://www.securitrust.fr/audit-architecture',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Audit d\'Architecture SI',
    description: "Évaluation de l'architecture réseau, cloud et applicative. Failles structurelles et plan de remédiation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit d'Architecture SI — Évaluation Réseau, Cloud & Applicatif"
        description="Audit d'architecture système d'information : évaluation de la conception réseau, cloud et applicative pour identifier les failles structurelles."
        url="https://www.securitrust.fr/audit-architecture"
      />
      {children}
    </>
  );
}
