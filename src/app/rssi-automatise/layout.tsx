import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cyber-Pilote | Pilotage Sécurité & SMSI 100% Automatisé',
  description: 'Offres Cyber-Pilote de SecuriTrust : pilotage complet de votre sécurité et SMSI, 100% automatisé. Starter, Standard, Advanced, Enterprise. Conformité ISO 27001 incluse.',
  alternates: {
    canonical: 'https://www.securitrust.fr/rssi-automatise',
  },
  openGraph: {
    title: 'Cyber-Pilote — SecuriTrust',
    description: 'Pilotage complet de votre sécurité & SMSI 100% automatisé. 4 offres de 500€ à 4167€/mois.',
    url: 'https://www.securitrust.fr/rssi-automatise',
  },
};

export default function RSSIAutomatiseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
