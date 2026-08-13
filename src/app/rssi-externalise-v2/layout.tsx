import { Metadata } from "next";
import { ServiceSchema } from "@/components/StructuredData";

/* ============================================================================
   BROUILLON — la home securitrust.fr habillée du design de la LP.

   `noindex, nofollow` tant que Charles n'a pas validé : la page duplique le
   contenu de la vraie home (public/index.html) et ne doit pas la cannibaliser.

   Title et description sont ceux de la home, au mot près. Aucun montant :
   la home ne communique plus de TJM.
   ============================================================================ */

export const metadata: Metadata = {
  // Le template racine ajoute « | SecuriTrust » — la home s'appelle
  // « SecuriTrust — Votre RSSI externalisé, pilote de votre sécurité ».
  title: "Votre RSSI externalisé, pilote de votre sécurité",
  description:
    "Cabinet de conseil en cybersécurité à Paris. RSSI externalisé à temps partagé, pentests au résultat garanti, mise en conformité ISO 27001, NIS2, DORA. Un pilotage stratégique de votre sécurité, sans le coût d'un plein temps.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "SecuriTrust — Votre RSSI externalisé, pilote de votre sécurité",
    description:
      "Cabinet de conseil en cybersécurité à Paris. RSSI externalisé à temps partagé, pentests au résultat garanti, mise en conformité ISO 27001, NIS2, DORA. Un pilotage stratégique de votre sécurité, sans le coût d'un plein temps.",
    type: "website",
  },
};

export default function HomeDesignLPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Pas de FAQSchema : la home n'a pas de FAQ. Pas de BreadcrumbSchema
          non plus — c'est une page d'accueil, elle est la racine. */}
      <ServiceSchema
        name="Cabinet de conseil en cybersécurité"
        description="Cabinet de conseil en cybersécurité à Paris depuis 2016 : RSSI externalisé à temps partagé, Cyber-Pilote, pentests au résultat garanti, conformité ISO 27001, NIS2, DORA et RGPD. Auditeur officiel AFNOR."
        url="https://www.securitrust.fr/"
      />
      {children}
    </>
  );
}
