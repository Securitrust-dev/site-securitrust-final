import type { Metadata } from 'next';
import { SecuriTrustHome } from '@/components/accueil-v2/securitrust-home';
import './accueil-v2.css';

// Accueil v2 (export Lovable) en préproduction : non indexée, hors plan du site,
// jusqu'au feu vert de la direction. L'accueil actuel (public/index.html) n'est pas modifié.
// Métadonnées reprises de src/routes/accueil-v2.tsx de l'export.
export const metadata: Metadata = {
  title: { absolute: 'SecuriTrust — Nouvel accueil du cabinet de cybersécurité' },
  description:
    'Découvrez l’accueil SecuriTrust : vos besoins cyber, les missions clients, l’équipe et les réponses à vos questions sur ISO 27001, NIS2 et le pentest.',
  openGraph: {
    title: 'SecuriTrust — Nouvel accueil',
    description: 'Votre cybersécurité commence par votre besoin. Rencontrez les experts SecuriTrust à Paris.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AccueilV2Page() {
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
