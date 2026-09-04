import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Audit de Cybersécurité | Expertises Techniques & Organisationnelles',
  description: "Réalisez un audit complet de votre sécurité informatique : architecture réseau, dispositifs de sécurité, droits d'accès et conformité. Expert en audit cybersécurité.",
  alternates: {
    canonical: '/audit-cybersecurite',
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit de Cybersécurité | Expertises Techniques & Organisationnelles"
        description="Réalisez un audit complet de votre sécurité informatique : architecture réseau, dispositifs de sécurité, droits d'accès et conformité."
        url="https://www.securitrust.fr/audit-cybersecurite"
      />
      {children}
    </>
  );
}
