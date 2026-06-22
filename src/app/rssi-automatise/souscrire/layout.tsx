import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Souscrire — Cyber-Pilote | SecuriTrust',
  description: 'Souscription à une offre Cyber-Pilote SecuriTrust. Signature électronique du contrat et paiement sécurisé en ligne.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SouscrireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
