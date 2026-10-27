import type { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Pentest & Sécurité des Systèmes Critiques | SecuriTrust',
  description: metaDescription('/cybersecurite-operationnelle/proteger-chiffre-affaires'),
  openGraph: {
    title: 'Pentest & Sécurité des Systèmes Critiques | SecuriTrust',
    description: 'Tests d\'intrusion professionnels pour PME et ETI françaises. Pentest interne, externe, web/mobile, ransomware. Livrables COMEX-ready.',
    url: 'https://www.securitrust.fr/cybersecurite-operationnelle/proteger-chiffre-affaires',
  },
  alternates: {
    canonical: 'https://www.securitrust.fr/cybersecurite-operationnelle/proteger-chiffre-affaires',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
