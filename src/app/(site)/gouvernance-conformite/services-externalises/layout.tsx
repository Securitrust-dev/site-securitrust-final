import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RSSI & DPO Externalisés — Services de Gouvernance SSI | SecuriTrust',
  description: "RSSI externalisé et DPO externalisé : accédez à l'expertise d'un directeur cybersécurité ou délégué à la protection des données à temps partagé. Économique et immédiatement opérationnel.",
  keywords: ['RSSI externalisé', 'DPO externalisé', 'CISO externe', 'délégué protection données', 'gouvernance SSI', 'sécurité externalisée'],
  alternates: {
    canonical: 'https://www.securitrust.fr/gouvernance-conformite/services-externalises',
  },
  openGraph: {
    title: 'RSSI & DPO Externalisés — Services de Gouvernance SSI',
    description: "RSSI externalisé et DPO externalisé à temps partagé : expertise immédiate, coût maîtrisé. SecuriTrust.",
    url: 'https://www.securitrust.fr/gouvernance-conformite/services-externalises',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RSSI & DPO Externalisés',
    description: "RSSI externalisé et DPO externalisé à temps partagé. Expertise immédiate, coût maîtrisé.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
