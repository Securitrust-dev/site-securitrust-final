import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Audit de Configuration — Serveurs, Réseau & Systèmes',
  description: metaDescription('/audit-configuration'),
  alternates: {
    canonical: 'https://www.securitrust.fr/audit-configuration',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Audit de Configuration — Serveurs, Réseau & Systèmes',
    description: "Audit de configuration : identification des faiblesses de paramétrage réseau, serveurs et systèmes. SecuriTrust.",
    url: 'https://www.securitrust.fr/audit-configuration',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
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
