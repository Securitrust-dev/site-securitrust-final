import { Metadata } from 'next';
import { FAQSchema, BreadcrumbSchema, ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'RSSI Externalisé à Paris — Pilotage Cybersécurité',
  description: "RSSI externalisé ou à temps partagé. Pilotage stratégique et opérationnel de votre sécurité SI. +2500 jours-homme d'expérience. Certifié ISO 27001 Lead Auditor.",
  alternates: {
    canonical: 'https://securitrust.fr/rssi-externalise',
  },
};

const faqs = [
  {
    question: "Qu'est-ce qu'un RSSI externalisé ?",
    answer: "Un RSSI externalisé est un Responsable de la Sécurité des Systèmes d'Information mis à disposition de votre entreprise à temps partagé. Il pilote votre stratégie cybersécurité, supervise les audits, gère les incidents et assure la conformité réglementaire sans les coûts d'un recrutement interne.",
  },
  {
    question: "Quelle est la différence entre un RSSI externalisé et un RSSI interne ?",
    answer: "Un RSSI externalisé offre la même expertise qu'un RSSI interne mais avec plus de flexibilité : pas de charges salariales fixes, accès à une équipe multi-compétences, et une vision enrichie par l'expérience acquise auprès de multiples clients et secteurs d'activité.",
  },
  {
    question: "Combien de jours par mois intervient un RSSI externalisé ?",
    answer: "Chez SecuriTrust, le format est flexible et adapté à vos besoins : de 2 jours par mois pour une PME à un temps plein pour des missions de transition. Nous avons cumulé plus de 2500 jours-homme de RSSI externalisé.",
  },
  {
    question: "Un RSSI externalisé peut-il nous aider pour la conformité NIS2 ?",
    answer: "Oui. Le RSSI externalisé SecuriTrust pilote l'ensemble de votre démarche de conformité : évaluation de votre exposition à NIS2, analyse de risques, mise en place des mesures techniques et organisationnelles, et préparation aux audits.",
  },
];

export default function RSSIExternaliseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="RSSI Externalisé à Paris — Pilotage Cybersécurité"
        description="RSSI externalisé ou à temps partagé. Pilotage stratégique et opérationnel de votre sécurité SI. +2500 jours-homme d'expérience. Certifié ISO 27001 Lead Auditor."
        url="https://securitrust.fr/rssi-externalise"
      />
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://securitrust.fr' },
        { name: 'RSSI Externalisé', url: 'https://securitrust.fr/rssi-externalise' },
      ]} />
      <FAQSchema faqs={faqs} />
      {children}
    </>
  );
}
