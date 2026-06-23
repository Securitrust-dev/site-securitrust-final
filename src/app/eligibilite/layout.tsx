import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Éligibilité | SecuriTrust',
  alternates: { canonical: 'https://www.securitrust.fr/eligibilite' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
