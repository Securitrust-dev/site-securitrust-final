import { Metadata } from 'next';
import { FAQSchema, BreadcrumbSchema, ServiceSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'GRC Cybersécurité — Gouvernance, Risques & Conformité',
  description: "Accompagnement GRC cybersécurité : ISO 27001, NIS2, DORA, HDS, TISAX. Analyse de risques EBIOS & ISO 27005. SecuriTrust, auditeur officiel AFNOR.",
  alternates: {
    canonical: 'https://securitrust.fr/grc-cyber',
  },
};

const faqs = [
  {
    question: "Qu'est-ce que la GRC en cybersécurité ?",
    answer: "La GRC (Gouvernance, Risques, Conformité) en cybersécurité est l'ensemble des pratiques permettant de piloter la sécurité de l'information de façon structurée : définir une gouvernance, gérer les risques (identifier, évaluer, traiter), et assurer la conformité aux normes et réglementations (ISO 27001, RGPD, NIS2, DORA).",
  },
  {
    question: "Pourquoi mettre en place un programme GRC cyber ?",
    answer: "Un programme GRC permet de prioriser les investissements sécurité selon les risques réels, de répondre aux exigences réglementaires, de démontrer votre maturité aux clients et partenaires, et de réduire le risque d'incident cyber significatif.",
  },
  {
    question: "Quelle est la différence entre GRC et audit de conformité ?",
    answer: "L'audit de conformité est une photographie à un instant T de votre niveau de respect d'une norme. La GRC est un programme continu qui inclut l'audit mais aussi la gouvernance permanente, la gestion des risques en temps réel et l'amélioration continue.",
  },
  {
    question: "Combien de temps prend la mise en place d'un programme GRC ?",
    answer: "La mise en place d'un programme GRC de base (registre des risques, tableau de bord, politique de sécurité) prend 3 à 6 mois. Un programme complet incluant la certification ISO 27001 nécessite 12 à 18 mois. SecuriTrust propose une approche progressive adaptée à votre maturité.",
  },
];

export default function GRCLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="GRC Cybersécurité — Gouvernance, Risques & Conformité"
        description="Accompagnement GRC cybersécurité : ISO 27001, NIS2, DORA, HDS, TISAX. Analyse de risques EBIOS & ISO 27005. SecuriTrust, auditeur officiel AFNOR."
        url="https://securitrust.fr/grc-cyber"
      />
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://securitrust.fr' },
        { name: 'GRC Cybersécurité', url: 'https://securitrust.fr/grc-cyber' },
      ]} />
      <FAQSchema faqs={faqs} />
      {children}
    </>
  );
}
