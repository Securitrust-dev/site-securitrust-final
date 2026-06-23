import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'DPO Externalisé | Délégué à la Protection des Données RGPD',
  description: 'Externalisez votre DPO avec SecuriTrust. Délégué à la Protection des Données certifié, désignation CNIL, registre des traitements, conformité RGPD et gestion des violations.',
  alternates: {
    canonical: 'https://www.securitrust.fr/dpo-externalise',
  },
  openGraph: {
    title: 'DPO Externalisé — SecuriTrust',
    description: 'DPO externalisé certifié : désignation CNIL, conformité RGPD, registre des traitements, gestion des violations et formation des équipes.',
    url: 'https://www.securitrust.fr/dpo-externalise',
  },
};

export default function DPOExternaliseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="DPO Externalisé | Délégué à la Protection des Données RGPD"
        description="Externalisez votre DPO avec SecuriTrust. Délégué à la Protection des Données certifié, désignation CNIL, registre des traitements, conformité RGPD et gestion des violations."
        url="https://www.securitrust.fr/dpo-externalise"
      />
      {children}
    </>
  );
}
