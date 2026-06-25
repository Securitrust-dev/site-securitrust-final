import { Metadata } from "next";
import { FAQSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  // Reprend le <title> exact de la LP (le template racine ajoute « | SecuriTrust »).
  title: "RSSI externalisé pour PME et ETI, à partir de 1 950 €/mois",
  description:
    "RSSI externalisé à temps partagé pour PME et ETI : pilotez votre sécurité de l'information avec un RSSI externe senior à partir de 1 950 €/mois, sans le coût d'un RSSI interne (80-120 k€/an). Audit, conformité ISO 27001, NIS2 DORA, gestion de crise 24/7. Auditeur officiel AFNOR. Sans engagement, réponse sous 2h.",
  openGraph: {
    title: "RSSI externalisé à temps partagé, à partir de 1 950 €/mois | SecuriTrust",
    description:
      "Externalisez la fonction RSSI avec une expertise de haut niveau, à coût réduit et sans engagement. Auditeur officiel AFNOR. +2 500 jours-homme de RSSI externalisé.",
    type: "website",
  },
  // LP Google Ads : noindex pour ne pas concurrencer la page SEO /rssi-externalise.
  // (Réversible — retirer ce bloc pour rendre la page indexable.)
  robots: { index: false, follow: true },
};

// JSON-LD FAQ — repris à l'identique de la LP source (10 questions).
const faqs = [
  {
    question: "Combien coûte un RSSI externalisé ?",
    answer:
      "Les formules de RSSI externalisé démarrent à 1 950 €/mois HT pour une PME jusqu'à 50 salariés, 4 500 €/mois HT pour une PME ou ETI de 50 à 300 salariés, et dès 8 500 €/mois HT pour les enjeux forts (HDS, DORA, multi-sites). Le prix exact est calé après un audit préliminaire offert, à comparer aux 80-120 k€/an d'un RSSI interne.",
  },
  {
    question: "Y a-t-il un engagement de durée avec un RSSI externalisé ?",
    answer:
      "Non. Les missions de RSSI externalisé SecuriTrust sont sans engagement de durée : le contrat est résiliable à tout moment avec 30 jours de préavis, sans pénalité de sortie, et le volume de jours est ajustable mois après mois.",
  },
  {
    question: "Quels sont les avantages d'un RSSI externalisé ?",
    answer:
      "Une expertise de haut niveau immédiatement disponible, un budget cyber maîtrisé à partir de 1 950 €/mois face à un RSSI interne à 80-120 k€/an, zéro charge RH, une vision indépendante et une flexibilité totale du volume d'intervention.",
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
      "Un RSSI externe senior intervient quelques jours par mois, sur site ou à distance, intégré au comité de direction. Il pilote la sécurité de l'information en continu : l'expertise quand vous en avez besoin, à coût réduit, sans engagement de durée.",
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
      <FAQSchema faqs={faqs} />
      {children}
    </>
  );
}
