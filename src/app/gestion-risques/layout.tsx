import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Gestion des Risques Cyber | Analyse et Traitement des Risques SI',
  description: metaDescription('/gestion-risques'),
  alternates: {
    canonical: 'https://www.securitrust.fr/gestion-risques',
  },
};

export default function GestionRisquesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Gestion des Risques Cyber | Analyse et Traitement des Risques SI"
        description="Gestion professionnelle des risques cybersécurité avec SecuriTrust. Méthodes EBIOS RM et ISO 31000, registre des risques, plan de traitement et suivi des indicateurs."
        url="https://www.securitrust.fr/gestion-risques"
      />
      {children}
    </>
  );
}
