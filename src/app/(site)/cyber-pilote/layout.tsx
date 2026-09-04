import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Cyber-Pilote — RSSI Externalisé | Pilotage Cybersécurité 24/7',
  description:
    'Cyber-Pilote par SecuriTrust : RSSI externalisé et cybersécurité opérationnelle. Conformité NIS2, RGPD, ISO 27001. Déploiement en 48h. Dès 1 950 €/mois.',
  alternates: {
    canonical: 'https://www.securitrust.fr/cyber-pilote',
  },
  openGraph: {
    title: 'Cyber-Pilote — Votre RSSI externalisé | SecuriTrust',
    description:
      "RSSI externalisé + cybersécurité opérationnelle. Conformité NIS2, RGPD, ISO 27001 garanties. Déploiement opérationnel en 48h pour moins de 15 000 €/an.",
    url: 'https://www.securitrust.fr/cyber-pilote',
  },
};

export default function CyberPiloteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Cyber-Pilote — RSSI Externalisé | SecuriTrust"
        description="RSSI externalisé et cybersécurité opérationnelle. Conformité NIS2, RGPD, ISO 27001. Déploiement en 48h. Dès 1 950 €/mois."
        url="https://www.securitrust.fr/cyber-pilote"
      />
      {children}
    </>
  );
}
