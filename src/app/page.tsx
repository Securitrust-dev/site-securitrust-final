import type { Metadata } from 'next';
import { SecuriTrustHome } from '@/components/accueil-v2/securitrust-home';
import './accueil.css';

// Accueil (export Lovable, validé le 12/11/2026). Remplace la page statique public/index.html,
// conservée dans le dépôt mais plus servie (/index.html redirige ici).
// Métadonnées reprises de src/routes/index.tsx de l'export.
export const metadata: Metadata = {
  title: { absolute: 'SecuriTrust — Cabinet de cybersécurité à Paris' },
  description:
    'Cabinet de cybersécurité à Paris : accompagnement ISO 27001, NIS2 et DORA, pentest et RSSI externalisé. Échangez avec les experts SecuriTrust.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SecuriTrust — Cabinet de cybersécurité à Paris',
    description: 'Partez de votre besoin : certification, conformité, tests d’intrusion ou pilotage de votre sécurité.',
    type: 'website',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
};

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
        precedence="default"
      />
      <SecuriTrustHome />
    </>
  );
}
