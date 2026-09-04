import { Metadata } from "next";
import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

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
  description:
    "Cabinet de conseil en cybersécurité à Paris. RSSI externalisé à temps partagé, pentests au résultat garanti, mise en conformité ISO 27001, NIS2, DORA. Un pilotage stratégique de votre sécurité, sans le coût d'un plein temps.",
  alternates: {
    canonical: `${BASE_URL}/rssi-externalise`,
  },
  openGraph: {
    title: "RSSI externalisé, pilote de votre sécurité | SecuriTrust",
    description:
      "Un cabinet multi-certifié qui pilote la cybersécurité des organisations à forts enjeux depuis 2016. +2 500 jours-homme de RSSI externalisé, auditeur officiel AFNOR.",
    type: "website",
    locale: "fr_FR",
    url: `${BASE_URL}/rssi-externalise`,
  },
};

export default function RSSIExternaliseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="RSSI externalisé certifié à temps partagé"
        description="RSSI externalisé à temps partagé pour PME et ETI. Pilotage stratégique et opérationnel de votre sécurité SI, de l'audit à la conformité, du monitoring continu à la gestion de crise. +2 500 jours-homme de RSSI externalisé. Auditeur officiel AFNOR, certifié ISO 27001."
        url={`${BASE_URL}/rssi-externalise`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: BASE_URL },
          { name: "RSSI externalisé", url: `${BASE_URL}/rssi-externalise` },
        ]}
      />
      {children}
    </>
  );
}
