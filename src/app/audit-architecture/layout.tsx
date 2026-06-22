import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Audit d\'Architecture SI — Évaluation Réseau, Cloud & Applicatif | SecuriTrust',
  description: "Audit d'architecture système d'information : évaluation de la conception réseau, cloud et applicative pour identifier les failles structurelles. Rapport détaillé et plan de remédiation.",
  keywords: ['audit architecture SI', 'audit réseau', 'audit cloud', 'failles architecture', 'évaluation infrastructure', 'sécurité architecture'],
  alternates: {
    canonical: 'https://securitrust.fr/audit-architecture',
  },
  openGraph: {
    title: 'Audit d\'Architecture SI — Évaluation Réseau, Cloud & Applicatif',
    description: "Audit d'architecture SI : identification des failles structurelles réseau, cloud et applicatives. Rapport et plan de remédiation. SecuriTrust.",
    url: 'https://securitrust.fr/audit-architecture',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
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
        url="https://securitrust.fr/audit-architecture"
      />
      {children}
    </>
  );
}
