import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Audit de Code Source — Détection Vulnérabilités Applicatives | SecuriTrust',
  description: "Audit de code source pour détecter les vulnérabilités de sécurité, failles logiques et erreurs de programmation. Analyse manuelle approfondie et outils spécialisés. Certifiés OSCP.",
  keywords: ['audit code source', 'revue code sécurité', 'vulnérabilités applicatives', 'sécurité code', 'analyse code source', 'SAST'],
  alternates: {
    canonical: 'https://securitrust.fr/audit-code-source',
  },
  openGraph: {
    title: 'Audit de Code Source — Détection Vulnérabilités Applicatives',
    description: "Audit de code source : détection des vulnérabilités de sécurité et failles logiques. Analyse manuelle et automatisée. SecuriTrust.",
    url: 'https://securitrust.fr/audit-code-source',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
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
        url="https://securitrust.fr/audit-code-source"
      />
      {children}
    </>
  );
}
