import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pentest & Sécurité des Systèmes Critiques | SecuriTrust',
  description: 'Pentest entreprise en France à partir de 3 500 €. Test d\'intrusion interne, externe, web/mobile et ransomware pour PME et ETI. Experts certifiés OSCP. Rapport en 5–10 jours.',
  keywords: ['pentest entreprise', 'test intrusion France', 'pentest entreprise prix', 'sécurité systèmes critiques', 'pentest PME', 'audit sécurité informatique'],
  openGraph: {
    title: 'Pentest & Sécurité des Systèmes Critiques | SecuriTrust',
    description: 'Tests d\'intrusion professionnels pour PME et ETI françaises. Pentest interne, externe, web/mobile, ransomware. Livrables COMEX-ready.',
    url: 'https://securitrust.fr/cybersecurite-operationnelle/proteger-chiffre-affaires',
  },
  alternates: {
    canonical: 'https://securitrust.fr/cybersecurite-operationnelle/proteger-chiffre-affaires',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
