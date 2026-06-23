import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Audit Flash Cybersécurité | Diagnostic Rapide en 1 à 2 Jours',
  description: 'Audit flash cybersécurité en 1 à 2 jours. Diagnostic express de votre posture sécurité, identification des risques critiques et premières recommandations. Idéal avant un pentest complet.',
  alternates: {
    canonical: 'https://www.securitrust.fr/audit-flash',
  },
};

export default function AuditFlashLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit Flash Cybersécurité | Diagnostic Rapide en 1 à 2 Jours"
        description="Audit flash cybersécurité en 1 à 2 jours. Diagnostic express de votre posture sécurité, identification des risques critiques et premières recommandations."
        url="https://www.securitrust.fr/audit-flash"
      />
      {children}
    </>
  );
}
