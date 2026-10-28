import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Audit de Code Source — Détection Vulnérabilités Applicatives',
  description: metaDescription('/audit-code-source'),
  alternates: {
    canonical: 'https://www.securitrust.fr/audit-code-source',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Audit de Code Source — Détection Vulnérabilités Applicatives',
    description: "Audit de code source : détection des vulnérabilités de sécurité et failles logiques. Analyse manuelle et automatisée. SecuriTrust.",
    url: 'https://www.securitrust.fr/audit-code-source',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Audit de Code Source',
    description: "Détection des vulnérabilités applicatives et failles logiques par analyse de code source.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit de Code Source — Détection Vulnérabilités Applicatives"
        description="Audit de code source pour détecter les vulnérabilités de sécurité, failles logiques et erreurs de programmation. Analyse manuelle approfondie et outils spécialisés."
        url="https://www.securitrust.fr/audit-code-source"
      />
      {children}
    </>
  );
}
