import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Certification TISAX — Conformité Automobile & Sécurité Information | SecuriTrust',
  description: "Accompagnement TISAX pour fournisseurs et sous-traitants du secteur automobile. Diagnostic, mise en conformité et préparation à l'audit TISAX final. Experts certifiés SecuriTrust.",
  keywords: ['TISAX', 'certification TISAX', 'conformité automobile', 'sécurité information automobile', 'audit TISAX', 'fournisseurs automobile'],
  alternates: {
    canonical: 'https://www.securitrust.fr/tisax-security',
  },
  openGraph: {
    title: 'Certification TISAX — Conformité Automobile & Sécurité Information',
    description: "Accompagnement TISAX de A à Z pour fournisseurs et sous-traitants automobiles : diagnostic, mise en conformité, audit final. SecuriTrust.",
    url: 'https://www.securitrust.fr/tisax-security',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certification TISAX — Conformité Automobile',
    description: "Accompagnement TISAX pour fournisseurs et sous-traitants du secteur automobile.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Certification TISAX — Conformité Automobile & Sécurité Information"
        description="Accompagnement TISAX pour fournisseurs et sous-traitants du secteur automobile. Diagnostic, mise en conformité et préparation à l'audit TISAX final."
        url="https://www.securitrust.fr/tisax-security"
      />
      {children}
    </>
  );
}
