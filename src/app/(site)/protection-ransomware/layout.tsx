import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Protection Anti-Ransomware | Prévention et Réponse aux Cyberattaques',
  description: 'Protégez votre entreprise contre les ransomwares avec SecuriTrust. Stratégie de défense, détection précoce, sauvegardes sécurisées, réponse à incident et plan de reprise d\'activité.',
  alternates: {
    canonical: 'https://www.securitrust.fr/protection-ransomware',
  },
};

export default function ProtectionRansomwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Protection Anti-Ransomware | Prévention et Réponse aux Cyberattaques"
        description="Protégez votre entreprise contre les ransomwares avec SecuriTrust. Stratégie de défense, détection précoce, sauvegardes sécurisées, réponse à incident et plan de reprise d'activité."
        url="https://www.securitrust.fr/protection-ransomware"
      />
      {children}
    </>
  );
}
