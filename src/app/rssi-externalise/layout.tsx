import { Metadata } from "next";
import { preload } from "react-dom";
import { ServiceSchema } from "@/components/StructuredData";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

/* ============================================================================
   /rssi-externalise — page de référence SEO (refonte du 2026-11-02).

   Contenu 100 % RSSI externalisé (définition, missions, cas clients, comparatif,
   prix, déroulé, guide + FAQ), rendu par <RssiLanding variant="seo">. La page
   d'atterrissage Google Ads est /lp/rssi-externalise (même composant, noindex).
   Aucun montant affiché (arbitrage de Charles).
   ============================================================================ */

const BASE_URL = "https://www.securitrust.fr";

export const metadata: Metadata = {
  title: "RSSI externalisé à temps partagé pour PME et ETI",
  description: metaDescription('/rssi-externalise'),
  alternates: {
    canonical: `${BASE_URL}/rssi-externalise`,
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "RSSI externalisé à temps partagé pour PME et ETI | SecuriTrust",
    description: metaDescription('/rssi-externalise'),
    type: "website",
    locale: "fr_FR",
    url: `${BASE_URL}/rssi-externalise`,
  },
};

export default function RSSIExternaliseLayout({ children }: { children: React.ReactNode }) {
  // Fond du hero = élément LCP, déclaré dans lp.css : sans preload, le navigateur ne le
  // découvre qu'après avoir téléchargé et analysé la feuille de style.
  preload("/rssi-lp/hero-bg.webp", { as: "image", fetchPriority: "high" });
  return (
    <>
      <ServiceSchema
        name="RSSI externalisé certifié à temps partagé"
        description="Un RSSI senior mis à disposition à temps partagé pilote la cybersécurité et la conformité (NIS2, DORA, ISO 27001) des PME et ETI : gouvernance, analyse de risques, sécurité des tiers, sensibilisation et gestion de crise. Cabinet certifié ISO 27001, +2 500 jours-homme de RSSI externalisé."
        serviceType="RSSI externalisé"
        url={`${BASE_URL}/rssi-externalise`}
      />
      {children}
    </>
  );
}
