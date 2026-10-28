import type { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Gestion des Risques Cyber & Protection de la Réputation | SecuriTrust',
  description: metaDescription('/cybersecurite-operationnelle/preserver-image-confiance'),
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Gestion des Risques Cyber & Protection de la Réputation | SecuriTrust',
    description: 'OSINT, Red Team, phishing et pentest externe pour protéger la réputation de votre PME. Experts certifiés, livrables COMEX-ready.',
    url: 'https://www.securitrust.fr/cybersecurite-operationnelle/preserver-image-confiance',
  },
  alternates: {
    canonical: 'https://www.securitrust.fr/cybersecurite-operationnelle/preserver-image-confiance',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
