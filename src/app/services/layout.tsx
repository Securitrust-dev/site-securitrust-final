import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services Cybersécurité : Pentest, Audit, RGPD, RSSI',
  description: "Découvrez nos services : tests d'intrusion au résultat, audits de sécurité, conformité RGPD, RSSI externalisé, ISO 27001, NIS2, DORA. Experts certifiés.",
  alternates: {
    canonical: 'https://www.securitrust.fr/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
