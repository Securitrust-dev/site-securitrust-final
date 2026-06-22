import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Demandez votre Devis Cybersécurité',
  description: 'Contactez SecuriTrust pour un devis pentest, audit cybersécurité, RSSI externalisé ou mise en conformité. Cabinet basé à Paris 16e. Réponse sous 24h.',
  alternates: {
    canonical: 'https://securitrust.fr/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
