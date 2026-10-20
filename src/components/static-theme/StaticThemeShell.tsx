import { ReactNode } from 'react';
import '@/styles/static-theme.css';
import { staticThemeFontVars } from './fonts';
import { SiteHeader, SiteFooter } from '@/components/site-chrome';
import { StaticThemeFX } from '@/components/static-theme-fx';

/**
 * Enveloppe une page avec le design des pages statiques (public/*.html) :
 * polices, grain/curseur/reveal. Header et footer sont les composants communs
 * du site, rendus hors de #static-theme-root pour échapper aux styles du thème. Le contenu de la page est
 * passé en `children` et n'a qu'à utiliser les classes de static-theme.css
 * (.sec, .hero-simple, .pilier, .crumb, .btn-primary, etc.).
 */
export function StaticThemeShell({
  children,
}: {
  children: ReactNode;
  /** Conservé pour compatibilité des appels ; le header commun n'a pas d'état actif. */
  active?: string;
}) {
  return (
    <>
      <SiteHeader position="fixed" />
      <div id="static-theme-root" className={`static-theme ${staticThemeFontVars}`}>
        <StaticThemeFX />
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
