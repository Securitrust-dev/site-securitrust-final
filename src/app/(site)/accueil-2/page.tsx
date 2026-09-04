import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { HeroSectionV2 } from '@/components/sections/hero-section-v2';
import { SegmentationBar } from '@/components/sections/segmentation-bar';
import { ServicesSectionV2 } from '@/components/sections/services-section-v2';
import { SectorsSection } from '@/components/sections/sectors-section';
import { CertsBanner } from '@/components/sections/certs-banner';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Metadata } from 'next';
import { FAQSchema, OrganizationSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Cabinet d'expertise en Cybersécurité - Pentest - RSSI à Paris | SecuriTrust",
  description: "Cabinet de cybersécurité à Paris. Pentest au résultat : remboursé si aucune faille trouvée. Audit de sécurité, RSSI externalisé, RGPD, ISO 27001. Auditeur AFNOR.",
  robots: 'noindex',
};

const homeFaqs = [
  {
    question: "Qu'est-ce qu'un test d'intrusion (pentest) ?",
    answer: "Un test d'intrusion est une simulation d'attaque réaliste sur votre système d'information, réalisée par des experts certifiés, pour identifier les vulnérabilités exploitables avant qu'un attaquant ne le fasse.",
  },
  {
    question: "Qu'est-ce que le pentest au résultat proposé par SecuriTrust ?",
    answer: "C'est une offre unique en France : si notre équipe ne détecte aucune vulnérabilité lors du test d'intrusion, vous êtes intégralement remboursé. C'est notre garantie de qualité et de rigueur.",
  },
  {
    question: "Combien coûte un pentest ?",
    answer: "Le coût dépend du périmètre et de la complexité. Avec notre offre au résultat, vous ne payez que si des vulnérabilités sont trouvées. Contactez-nous pour un devis personnalisé et gratuit.",
  },
  {
    question: "Quelle différence entre un RSSI interne et un RSSI externalisé ?",
    answer: "Un RSSI externalisé offre la même expertise qu'un RSSI interne mais à coût réduit, sans charges salariales fixes, avec une disponibilité immédiate et une vision enrichie par l'expérience de nombreux clients.",
  },
  {
    question: "SecuriTrust peut-il nous aider à nous conformer à NIS2 et au RGPD ?",
    answer: "Oui. Nos experts accompagnent les entreprises dans leur mise en conformité NIS2 et RGPD : analyse de risques, mise en place des mesures techniques et organisationnelles, documentation et formation des équipes.",
  },
  {
    question: "Êtes-vous auditeur certifié ISO 27001 ?",
    answer: "Oui. SecuriTrust est auditeur officiel AFNOR certifié ISO 27001 Lead Auditor et Lead Implementer. Nos experts accompagnent les entreprises dans l'obtention et le maintien de la certification ISO 27001.",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#020817]">
      <OrganizationSchema />
      <FAQSchema faqs={homeFaqs} />

      <Navbar />

      {/* 01 — Hero with lead form */}
      <HeroSectionV2 />

      {/* Certifications strip — just below hero */}
      <CertsBanner />

      {/* 02 — Segmentation bar */}
      <SegmentationBar />

      {/* Services grid */}
      <ServicesSectionV2 />

      {/* Secteurs d'activité */}
      <SectorsSection />

      {/* CTA */}
      <section className="relative py-16 px-6 text-center bg-[#020817]">
        <ExpertCTAButton />
      </section>

      <Footer />
    </div>
  );
}
