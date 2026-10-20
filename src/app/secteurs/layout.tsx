import { ReactNode } from 'react';
import { SiteHeader, SiteFooter } from '@/components/site-chrome';

// Les landing pages sectorielles n'avaient ni en-tête ni pied de page :
// on leur applique le header/footer communs du site.
export default function SecteursLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader position="sticky" />
      {children}
      <SiteFooter />
    </>
  );
}
