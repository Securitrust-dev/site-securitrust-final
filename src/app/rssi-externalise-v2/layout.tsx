import { Metadata } from "next";
import { FAQSchema, ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

/* ============================================================================
   BROUILLON — LP RSSI externalisé V2 (texte de la nouvelle home securitrust.fr).

   La route est en `noindex, nofollow` tant que Charles n'a pas validé : elle
   duplique /rssi-externalise et ne doit ni être indexée ni la cannibaliser.
   À la bascule : supprimer le bloc `robots` ci-dessous, remettre le
   `alternates.canonical`, puis remplacer le contenu de /rssi-externalise.

   Aucun montant n'apparaît plus (title, description, JSON-LD) : la nouvelle
   home ne communique plus de TJM.
   ============================================================================ */

export const metadata: Metadata = {
  title: "RSSI externalisé pour PME et ETI — pilotage complet, sans charge RH",
  description:
    "RSSI externalisé à temps partagé pour PME et ETI : un RSSI senior certifié pilote votre sécurité, de l'audit à la conformité, du monitoring continu à la gestion de crise. Continuité garantie, zéro turnover. Auditeur officiel AFNOR, réponse sous 2h.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "RSSI externalisé — expertise senior, sans charge RH interne | SecuriTrust",
    description:
      "Un cabinet multi-certifié qui pilote la cybersécurité des organisations à forts enjeux depuis 2016. +2 500 jours-homme de RSSI externalisé, auditeur officiel AFNOR.",
    type: "website",
  },
};

/* JSON-LD FAQ — aligné sur la FAQ affichée : plus aucun montant, et la mention
   des « formules Premium et Entreprise » (supprimées lors du passage au tarif
   journalier) est retirée. */
const faqs = [
  {
    question: "Combien coûte un RSSI externalisé ?",
    answer:
      "Le RSSI externalisé SecuriTrust est facturé à la journée. Vous ne payez que les jours réellement utiles et le volume s'ajuste mois après mois. Le nombre de jours exact est calé après l'audit préliminaire, à comparer aux 80-120 k€/an d'un RSSI interne à temps plein.",
  },
  {
    question: "Comment se déroule une mission de RSSI externalisé ?",
    answer:
      "Le premier mois est consacré à l'audit et au cadrage : état des lieux de votre sécurité et de vos obligations (NIS2, RGPD, HDS), cartographie des vulnérabilités et analyse de risques EBIOS RM, puis feuille de route priorisée. Du mois 2 au mois 6, le socle est mis en place (mesures prioritaires, PSSI et conformité ISO 27001 NIS2 DORA, sensibilisation des équipes). À partir du mois 6, le pilotage devient continu : monitoring des risques, tableaux de bord et reporting en comité de direction, gestion de crise et astreinte senior 24/7.",
  },
  {
    question: "Quels sont les avantages d'un RSSI externalisé ?",
    answer:
      "Une expertise de haut niveau immédiatement disponible, un budget cyber maîtrisé (vous ne payez que les jours réellement utiles, face à un RSSI interne à 80-120 k€/an), zéro charge RH avec une continuité garantie et zéro turnover, une vision indépendante et une flexibilité totale du volume d'intervention.",
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
      "L'astreinte senior 24/7 est incluse, avec un premier contact RSSI senior dans l'heure. Le RSSI externe active la cellule de crise et coordonne la réponse, le PCA/PRA et la communication. Les délais garantis (SLA) sont contractualisés selon le niveau d'exposition.",
  },
  {
    question: "Comment fonctionne un RSSI as a service ?",
    answer:
      "Un RSSI externe senior intervient de quelques jours par mois à plusieurs jours par semaine selon vos enjeux, sur site ou à distance, intégré au comité de direction. Il pilote la sécurité de l'information en continu : l'expertise quand vous en avez besoin, avec un volume de jours ajustable mois après mois.",
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

export default function RSSIExternaliseV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Les schemas visent l'URL de destination (/rssi-externalise) : cette route
          n'est qu'un brouillon de comparaison, en noindex. */}
      <ServiceSchema
        name="RSSI externalisé certifié à temps partagé"
        description="RSSI externalisé à temps partagé pour PME et ETI. Pilotage stratégique et opérationnel de votre sécurité SI, de l'audit à la conformité, du monitoring continu à la gestion de crise. +2 500 jours-homme de RSSI externalisé. Auditeur officiel AFNOR, certifié ISO 27001."
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
