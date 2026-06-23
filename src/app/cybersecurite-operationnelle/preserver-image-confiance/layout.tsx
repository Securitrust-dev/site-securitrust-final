import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestion des Risques Cyber & Protection de la Réputation | SecuriTrust',
  description: 'Protégez la réputation de votre PME avec des audits cybersécurité OSINT, Red Team et campagnes de phishing. Gestion des risques cyber et protection de la réputation pour entreprises.',
  keywords: ['gestion risques cyber', 'protection réputation entreprise', 'OSINT entreprise', 'red team PME', 'phishing simulation', 'audit cybersécurité PME'],
  openGraph: {
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
