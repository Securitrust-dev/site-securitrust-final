import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Audit de Configuration — Serveurs, Réseau & Systèmes | SecuriTrust',
  description: "Audit de configuration de vos équipements réseau, serveurs, systèmes d'exploitation et applications : identification des faiblesses de paramétrage, rapport détaillé et plan de remédiation.",
  keywords: ['audit configuration', 'audit serveurs', 'audit réseau', 'configuration sécurisée', 'hardening', 'faiblesses paramétrage'],
  alternates: {
    canonical: 'https://www.securitrust.fr/audit-configuration',
  },
  openGraph: {
    title: 'Audit de Configuration — Serveurs, Réseau & Systèmes',
    description: "Audit de configuration : identification des faiblesses de paramétrage réseau, serveurs et systèmes. SecuriTrust.",
    url: 'https://www.securitrust.fr/audit-configuration',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audit de Configuration',
    description: "Identification des faiblesses de configuration : réseau, serveurs, systèmes d'exploitation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit de Configuration — Serveurs, Réseau & Systèmes"
        description="Audit de configuration de vos équipements réseau, serveurs, systèmes d'exploitation et applications : identification des faiblesses de paramétrage, rapport détaillé et plan de remédiation."
        url="https://www.securitrust.fr/audit-configuration"
      />
      {children}
    </>
  );
}
