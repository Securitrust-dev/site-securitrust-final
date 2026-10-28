import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Audit de Sécurité Technique — Infrastructure IT & Vulnérabilités',
  description: metaDescription('/audit-securite-technique'),
  alternates: {
    canonical: 'https://www.securitrust.fr/audit-securite-technique',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Audit de Sécurité Technique — Infrastructure IT & Vulnérabilités',
    description: "Audit de sécurité technique : configurations, architecture, vulnérabilités système et procédures. Experts certifiés. SecuriTrust.",
    url: 'https://www.securitrust.fr/audit-securite-technique',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Audit de Sécurité Technique',
    description: "Audit technique complet : configurations, architecture, vulnérabilités système.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit de Sécurité Technique — Infrastructure IT & Vulnérabilités"
        description="Audit de sécurité technique complet de votre infrastructure IT : analyse des configurations, architecture, vulnérabilités système et procédures de sécurité."
        url="https://www.securitrust.fr/audit-securite-technique"
      />
      {children}
    </>
  );
}
