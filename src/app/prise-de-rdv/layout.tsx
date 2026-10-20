import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prise de Rendez-vous',
  alternates: { canonical: 'https://www.securitrust.fr/prise-de-rdv' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
