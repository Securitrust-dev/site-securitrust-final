import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Audit Organisationnel Cybersécurité — Gouvernance & Processus',
  description: metaDescription('/audit-organisationnel'),
  alternates: {
    canonical: 'https://www.securitrust.fr/audit-organisationnel',
  },
  openGraph: {
    title: 'Audit Organisationnel Cybersécurité — Gouvernance & Processus',
    description: "Audit organisationnel SSI : gouvernance, processus, rôles et responsabilités en cybersécurité. SecuriTrust.",
    url: 'https://www.securitrust.fr/audit-organisationnel',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Audit Organisationnel Cybersécurité',
    description: "Évaluation des aspects humains et processuels de votre cybersécurité.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Audit Organisationnel Cybersécurité — Gouvernance & Processus"
        description="Audit organisationnel de cybersécurité : évaluation des aspects humains et processuels, gouvernance SSI, définition des rôles et responsabilités, politique de sécurité."
        url="https://www.securitrust.fr/audit-organisationnel"
      />
      {children}
    </>
  );
}
