import { Metadata } from 'next';
import { ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'DORA Compliance | Résilience Opérationnelle Numérique pour le Secteur Financier',
  description: 'Mise en conformité DORA pour entités financières. Gestion des risques TIC, tests TLPT, gestion des tiers, reporting réglementaire. Experts certifiés SecuriTrust.',
  alternates: {
    canonical: 'https://securitrust.fr/dora',
  },
  openGraph: {
    title: 'Conformité DORA — SecuriTrust',
    description: 'Accompagnement DORA pour entités financières : gestion des risques TIC, tests TLPT, tiers fournisseurs, reporting ACPR/AMF.',
    url: 'https://securitrust.fr/dora',
  },
};

export default function DoraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="DORA Compliance | Résilience Opérationnelle Numérique pour le Secteur Financier"
        description="Mise en conformité DORA pour entités financières. Gestion des risques TIC, tests TLPT, gestion des tiers, reporting réglementaire. Experts certifiés SecuriTrust."
        url="https://securitrust.fr/dora"
      />
      {children}
    </>
  );
}
