import { ReactNode } from 'react';
import '@/styles/static-theme.css';
import { staticThemeFontVars } from './fonts';
import { StaticNavbar, type StaticNavActive } from './StaticNavbar';
import { StaticFooter } from './StaticFooter';
import { StaticThemeFX } from '@/components/static-theme-fx';

/**
 * Enveloppe une page avec le design des pages statiques (public/*.html) :
 * polices, navbar, footer, grain/curseur/reveal. Le contenu de la page est
 * passé en `children` et n'a qu'à utiliser les classes de static-theme.css
 * (.sec, .hero-simple, .pilier, .crumb, .btn-primary, etc.).
 */
export function StaticThemeShell({
  children,
  active,
}: {
  children: ReactNode;
  active?: StaticNavActive;
}) {
  return (
    <div id="static-theme-root" className={`static-theme ${staticThemeFontVars}`}>
      <StaticThemeFX />
      <StaticNavbar active={active} />
      {children}
      <StaticFooter />
    </div>
  );
}
