import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Audit Flash Cybersécurité | Diagnostic Rapide en 1 à 2 Jours',
  description: metaDescription('/audit-flash'),
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
