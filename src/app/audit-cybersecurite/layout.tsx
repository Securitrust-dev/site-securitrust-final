import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Audit de cybersécurité et de sécurité informatique à Paris',
  description: metaDescription('/audit-cybersecurite'),
  alternates: {
    canonical: '/audit-cybersecurite',
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit de cybersécurité et de sécurité informatique à Paris"
        description="Réalisez un audit complet de votre sécurité informatique : architecture réseau, dispositifs de sécurité, droits d'accès et conformité."
        url="https://www.securitrust.fr/audit-cybersecurite"
      />
      {children}
    </>
  );
}
