import { Metadata } from 'next';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

export const metadata: Metadata = {
  title: 'Prise de Rendez-vous',
  description: metaDescription('/prise-de-rdv'),
  alternates: { canonical: 'https://www.securitrust.fr/prise-de-rdv' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
