import { Metadata } from "next";
import { preload } from "react-dom";
import { ServiceSchema } from "@/components/StructuredData";
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

/* ============================================================================
   /rssi-externalise — page canonique, refondue le 2026-09-04.

   Le contenu est celui de la nouvelle page d'accueil securitrust.fr
   (public/index.html), habillé du design de la LP. Aucun montant n'est
   affiché : la nouvelle home ne communique plus de TJM.

   ⚠️ Cette page n'a plus de FAQ : la home dont le texte est repris n'en a pas.
   Le FAQSchema de 10 questions qui vivait ici a donc disparu avec elle
   (perte de rich snippets signalée à Charles, arbitrage assumé). Si on veut
   la récupérer un jour, elle est dans l'historique git au commit a043b97.
   ============================================================================ */

const BASE_URL = "https://www.securitrust.fr";

export const metadata: Metadata = {
  title: "RSSI externalisé — reprenez le contrôle de votre sécurité",
  description: metaDescription('/rssi-externalise'),
  alternates: {
    canonical: `${BASE_URL}/rssi-externalise`,
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: "RSSI externalisé, pilote de votre sécurité | SecuriTrust",
    description:
      "Un cabinet multi-certifié qui pilote la cybersécurité des organisations à forts enjeux depuis 2016. +2 500 jours-homme de RSSI externalisé, auditeur officiel AFNOR.",
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
        description="RSSI externalisé à temps partagé pour PME et ETI. Pilotage stratégique et opérationnel de votre sécurité SI, de l'audit à la conformité, du monitoring continu à la gestion de crise. +2 500 jours-homme de RSSI externalisé. Auditeur officiel AFNOR, certifié ISO 27001."
        url={`${BASE_URL}/rssi-externalise`}
      />
      {children}
    </>
  );
}
