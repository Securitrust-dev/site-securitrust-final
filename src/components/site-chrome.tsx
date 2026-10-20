import { renderHeader, renderFooter } from '@/site-chrome/chrome.mjs';

// Wrappers React du header/footer communs (voir src/site-chrome/chrome.mjs).
// `display: contents` : le wrapper ne crée pas de boîte, le header « sticky »
// colle donc bien en haut de la page et pas seulement de ce div.

export function SiteHeader({ position = 'fixed' }: { position?: 'fixed' | 'sticky' }) {
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: renderHeader({ position }) }} />;
}

export function SiteFooter() {
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: renderFooter() }} />;
}
