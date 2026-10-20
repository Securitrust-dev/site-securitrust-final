import { SiteHeader } from '@/components/site-chrome';

// En-tête commun à tous les gabarits (src/site-chrome/chrome.mjs). Fixe : les
// pages qui utilisent ce composant réservent déjà la place en haut (64/80 px).
export const Navbar = () => <SiteHeader position="fixed" />;
