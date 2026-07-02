import { Metadata } from "next";
import Script from "next/script";
import { FAQSchema, ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  // Reprend le <title> exact de la LP (le template racine ajoute « | SecuriTrust »).
  title: "RSSI externalisé pour PME et ETI, à partir de 1 100 €/jour",
  description:
    "RSSI externalisé à temps partagé pour PME et ETI : pilotez votre sécurité de l'information avec un RSSI externe senior certifié, à partir de 1 100 €/jour, sans le coût d'un RSSI interne (80-120 k€/an). Audit, conformité ISO 27001, NIS2 DORA, gestion de crise 24/7. Auditeur officiel AFNOR, réponse sous 2h.",
  alternates: {
    canonical: "https://www.securitrust.fr/rssi-externalise",
  },
  openGraph: {
    title: "RSSI externalisé certifié à temps partagé, à partir de 1 100 €/jour | SecuriTrust",
    description:
      "Externalisez la fonction RSSI avec une expertise de haut niveau, à coût maîtrisé. Auditeur officiel AFNOR. +2 500 jours-homme de RSSI externalisé.",
    type: "website",
  },
};

// JSON-LD FAQ — repris à l'identique de la LP source (10 questions).
const faqs = [
  {
    question: "Combien coûte un RSSI externalisé ?",
    answer:
      "Le RSSI externalisé SecuriTrust est facturé à la journée, à partir de 1 100 €/jour HT. Vous ne payez que les jours réellement utiles et le volume s'ajuste mois après mois. Le nombre de jours exact est calé après l'audit préliminaire, à comparer aux 80-120 k€/an d'un RSSI interne à temps plein.",
  },
  {
    question: "Comment se déroule une mission de RSSI externalisé ?",
    answer:
      "Le premier mois est consacré à l'audit préliminaire et au cadrage : état des lieux de la sécurité, des risques et des obligations (NIS2, RGPD, HDS), puis feuille de route priorisée. Du mois 2 au mois 12, le RSSI externe assure le pilotage continu (socle de cybersécurité, monitoring des risques, conformité, tableaux de bord en comité de direction, gestion de crise). Le volume de jours s'ajuste mois après mois selon vos priorités.",
  },
  {
    question: "Quels sont les avantages d'un RSSI externalisé ?",
    answer:
      "Une expertise de haut niveau immédiatement disponible, un budget cyber maîtrisé à partir de 1 100 €/jour face à un RSSI interne à 80-120 k€/an, zéro charge RH, une vision indépendante et une flexibilité totale du volume d'intervention.",
  },
  {
    question: "Quelles sont les missions d'un RSSI externalisé ?",
    answer:
      "Analyse des risques et remédiation, PSSI et conformité ISO 27001 RGPD NIS2 DORA, coordination de la gestion de crise et des incidents, supervision des projets IT sensibles, veille réglementaire et sensibilisation des équipes, avec feuille de route et tableaux de bord en comité de direction.",
  },
  {
    question: "Pourquoi externaliser la fonction RSSI plutôt que recruter ?",
    answer:
      "Un RSSI interne coûte 80 000 à 120 000 €/an, prend des mois à recruter et expose au turnover. L'externalisation du RSSI offre la même séniorité immédiatement, à temps partagé, sans charge RH et avec une indépendance vis-à-vis des enjeux internes.",
  },
  {
    question: "Le RSSI externalisé remplace-t-il mon responsable IT ou mon infogérant ?",
    answer:
      "Non. Le RSSI externalisé porte la gouvernance, la stratégie et la conformité, tandis que votre responsable IT et votre infogérant gardent l'exploitation. Une matrice RACI claire répartit les responsabilités dès le cadrage de la mission.",
  },
  {
    question: "Quelle réactivité en cas d'incident avec un RSSI externalisé ?",
    answer:
      "Sur les formules Premium et Entreprise, l'astreinte 24/7 est incluse avec un premier contact RSSI senior dans l'heure. Le RSSI externe active la cellule de crise et coordonne la réponse, le PCA/PRA et la communication. Les délais garantis (SLA) sont contractualisés selon le niveau d'exposition.",
  },
  {
    question: "Comment fonctionne un RSSI as a service ?",
    answer:
      "Un RSSI externe senior intervient quelques jours par mois, sur site ou à distance, intégré au comité de direction. Il pilote la sécurité de l'information en continu : l'expertise quand vous en avez besoin, à coût maîtrisé, avec un volume de jours ajustable mois après mois.",
  },
  {
    question: "Quels sont les risques d'une non-externalisation ?",
    answer:
      "Sans pilotage dédié, l'entreprise s'expose aux sanctions NIS2 (jusqu'à 10 M€), au refus de couverture des assureurs et à un incident potentiellement fatal : 60% des PME victimes d'une cyberattaque cessent leur activité sous 18 mois.",
  },
  {
    question: "Comment choisir et évaluer un RSSI externalisé ?",
    answer:
      "Vérifiez les certifications (ISO 27001, OSCP, CEH, EBIOS RM, auditeur AFNOR), l'expérience réelle en jours-homme, la transparence tarifaire, la clarté des livrables (feuille de route, tableaux de bord, analyse des risques) et la capacité à siéger en comité de direction.",
  },
];

export default function RSSIExternaliseLPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google Tag Manager — chargé uniquement sur la LP /rssi-externalise */}
      <Script id="gtm-P5D5S5WJ" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5D5S5WJ');`}
      </Script>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-P5D5S5WJ"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <ServiceSchema
        name="RSSI externalisé certifié à temps partagé"
        description="RSSI externalisé à temps partagé pour PME et ETI, à partir de 1 100 €/jour. Pilotage stratégique et opérationnel de votre sécurité SI. +2 500 jours-homme d'expérience. Auditeur officiel AFNOR, certifié ISO 27001."
        url="https://www.securitrust.fr/rssi-externalise"
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "https://www.securitrust.fr" },
          { name: "RSSI externalisé", url: "https://www.securitrust.fr/rssi-externalise" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      {children}
    </>
  );
}
