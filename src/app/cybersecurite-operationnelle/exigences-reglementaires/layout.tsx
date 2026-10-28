import type { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Audit de Conformité & Cybersécurité Réglementaire | SecuriTrust',
  description: metaDescription('/cybersecurite-operationnelle/exigences-reglementaires'),
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Audit de Conformité & Cybersécurité Réglementaire | SecuriTrust',
    description: 'Services d\'audit cybersécurité et de conformité pour PME et ETI françaises. Configuration, architecture, code source, flash, COMEX. Experts certifiés.',
    url: 'https://www.securitrust.fr/cybersecurite-operationnelle/exigences-reglementaires',
  },
  alternates: {
    canonical: 'https://www.securitrust.fr/cybersecurite-operationnelle/exigences-reglementaires',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
