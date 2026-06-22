import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { PromoBanner } from '@/components/sections/promo-banner';
import { SkyCTAButton } from '@/components/ui/sky-cta-button';
import ThreeBackground from '@/components/three-background';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    alternates: { canonical: `https://securitrust.fr/nous-rejoindre/${slug}` },
  };
}
import MatrixRain from '@/components/matrix-rain';
import { BrainCircuit, Hammer, Rocket, MapPin, Calendar, Briefcase, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface JobSection {
  title: string;
  emoji: string;
  items: string[];
}

interface JobPosting {
  icon: any;
  category: string;
  title: string;
  shortDescription?: string;
  description?: string;
  deadline: string;
  location: string;
  contractType: string;
  missions?: string[];
  profile?: string[];
  benefits?: string[];
  sections?: JobSection[];
}

const jobData: { [key: string]: JobPosting } = {
  'consultant-junior-cybersecurite': {
    icon: BrainCircuit,
    category: 'Junior',
    title: 'Consultant(e) Junior Cybersécurité',
    shortDescription: 'Pour les talents en début de parcours, motivés à apprendre et à relever de nouveaux défis techniques et stratégiques.',
    deadline: 'novembre 22, 2025',
    location: 'Paris (avec télétravail possible)',
    contractType: 'CDI',
    missions: [
      'Participer aux missions de cybersécurité auprès de nos clients',
      'Contribuer aux analyses de risques et audits de sécurité',
      'Accompagner les clients dans leurs démarches de conformité',
      'Rédiger des livrables clients sous supervision',
      'Développer vos compétences techniques et méthodologiques'
    ],
    profile: [
      'Diplômé(e) d\'une formation en cybersécurité ou informatique',
      'Première expérience en cybersécurité (stage ou alternance)',
      'Motivé(e) pour apprendre et évoluer rapidement',
      'Bonnes capacités rédactionnelles et relationnelles',
      'Certifications appréciées : ISO 27001 Foundation, EBIOS RM, etc.'
    ],
    benefits: [
      'Formation continue et accompagnement personnalisé',
      'Projets variés dans des secteurs à fort enjeu',
      'Mentorat par des consultants seniors',
      'Ambiance collaborative et bienveillante',
      'Opportunités d\'évolution rapide'
    ]
  },
  'consultant-senior-cybersecurite': {
    icon: Hammer,
    category: 'Senior',
    title: 'Consultant(e) Senior Cybersécurité',
    shortDescription: 'Tu veux évoluer dans un environnement dynamique, au cœur des enjeux cyber des grandes organisations ?',
    deadline: 'novembre 22, 2025',
    location: 'Paris (avec télétravail possible jusqu\'à 2 jours/semaine)',
    contractType: 'CDI',
    missions: [
      'Piloter des missions de cybersécurité auprès de nos clients (audit, gouvernance, conformité, sécurité opérationnelle)',
      'Encadrer des consultants juniors et participer à leur montée en compétence',
      'Réaliser et/ou superviser des analyses de risques (EBIOS RM, ISO 27005…)',
      'Accompagner les clients dans la mise en conformité (ISO 27001, SecNumCloud, NIS2, DORA…)',
      'Rédiger et valider les livrables clients (rapports, plans d\'actions, schémas directeurs, etc.)',
      'Assurer une veille active sur les évolutions technologiques et réglementaires',
      'Participer activement à l\'amélioration continue des offres internes'
    ],
    profile: [
      'Un(e) consultant(e) expérimenté(e) (3 à 5 ans d\'expérience en cybersécurité)',
      'Une expérience en cabinet de conseil, idéalement chez un Big Four ou cabinet spécialisé en cyber',
      'Capacité à gérer un projet client en autonomie, de la phase de cadrage à la restitution',
      'Excellentes capacités rédactionnelles et relationnelles',
      'Certifications appréciées : ISO 27001 Lead Implementer / Auditor, EBIOS RM, CISM, CISSP, etc.'
    ],
    benefits: [
      'De vrais sujets à fort enjeu (secteurs régulés, cloud de confiance, conformité européenne)',
      'De l\'autonomie dans la gestion de tes missions et de tes idées',
      'Une ambiance bienveillante, collaborative, et orientée excellence',
      'Une équipe où l\'expertise est valorisée et partagée',
      'Et toujours : de l\'impact, de la vision et de la reconnaissance !'
    ]
  },
  'manager-cybersecurite': {
    title: 'Manager Cybersécurité',
    category: 'Manager',
    icon: Rocket,
    description: 'Tu veux prendre part à des projets stratégiques, piloter des missions, être l\'interface clé avec le client, encadrer des consultants, tout en restant proche des sujets techniques et opérationnels ?',
    deadline: 'novembre 22, 2025',
    sections: [
      {
        title: 'Tes missions',
        emoji: '🎯',
        items: [
          'Piloter des missions complexes en cybersécurité (GRC, sécurité offensive, audits, schémas directeurs, accompagnement à la conformité, analyse d\'écarts, etc.)',
          'Gérer la relation client : cadrage, restitution, suivi de mission, fidélisation',
          'Encadrer, coacher et faire monter en compétence les consultants de l\'équipe et participer aux recrutements',
          'Contribuer au développement de l\'offre cybersécurité (veille, outils, méthodologies)',
          'Participer activement à la stratégie de croissance de Sécuritrust : Réponse à des appels d\'offre, formalisation de propositions commerciales, contribution au développement des offres cyber de l\'entreprise',
          'Être un référent interne sur des sujets clés (ISO 27001, NIS2, SecNumCloud, EBIOS, etc.)'
        ]
      },
      {
        title: 'Ce qu\'on cherche',
        emoji: '📌',
        items: [
          'Professionnalisme et rigueur',
          'Un(e) professionnel(le) avec au moins 5 ans d\'expérience en cybersécurité',
          'Un profil ayant évolué en cabinet de conseil ou chez un acteur reconnu du secteur de type Big Four (KPMG, EY, etc.)',
          'Un excellent relationnel client et une vraie capacité à fédérer une équipe',
          'De solides compétences en Gouvernance, Risques et Conformité (GRC)',
          'Une capacité à piloter plusieurs projets en parallèle, avec rigueur et leadership',
          'Certifications appréciées : ISO 27001, EBIOS RM, CISM, CISSP, PMP…'
        ]
      },
      {
        title: 'Ce qu\'on t\'offre',
        emoji: '🎁',
        items: [
          'Un poste à forte responsabilité et fort impact',
          'Une équipe experte, humaine, engagée',
          'Une culture d\'entreprise où l\'initiative et l\'autonomie est valorisée',
          'Un environnement stimulant avec de vraies perspectives d\'évolution',
          'Une rémunération attractive et adaptée à ton niveau d\'expérience et une possibilité de participation',
          'Possibilité d\'entrer au capital de l\'entreprise'
        ]
      }
    ],
    location: 'Paris (2 jours de télétravail / semaine possibles)',
    contractType: 'CDI'
  }
};

export function generateStaticParams() {
  return Object.keys(jobData).map((slug) => ({
    slug: slug,
  }));
}

export default async function JobPostingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobData[slug as keyof typeof jobData];

  if (!job) {
    notFound();
  }

  const Icon = job.icon;

  const displaySections = job.sections || [
    ...(job.missions ? [{ title: 'Missions', emoji: '', items: job.missions }] : []),
    ...(job.profile ? [{ title: 'Profil recherché', emoji: '', items: job.profile }] : []),
    ...(job.benefits ? [{ title: 'Ce qu\'on vous offre', emoji: '', items: job.benefits }] : []),
  ];

  return (
    <>
      <PromoBanner />
      <div className="relative min-h-screen bg-[#030303]">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full bg-void opacity-60"></div>
          <div className="stars opacity-20"></div>
        </div>
        <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
        
        <ThreeBackground />
        <MatrixRain />
        <Navbar />

        <section className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <Link 
              href="/nous-rejoindre" 
              className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Retour aux offres</span>
            </Link>

            <div className="glass-panel p-8 md:p-12 rounded-2xl">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-black/50 text-cyan-400">
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="flex-grow">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 rounded text-xs text-cyan-400 font-semibold mb-3 uppercase tracking-wider">
                    {job.category}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
                    {job.title}
                  </h1>
                  <p className="text-lg text-slate-400 font-light leading-relaxed mb-6">
                    {job.description || job.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-500" />
                      <span>{job.contractType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-500" />
                      <span>Date limite: {job.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 space-y-8">
                {displaySections.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-medium text-white mb-4">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-3 text-slate-300 leading-relaxed">
                          <span className="text-cyan-500 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8 mt-8">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <SkyCTAButton href="/contact" text="Postuler maintenant" className="w-full sm:w-auto" />
                  <Link 
                    href="/nous-rejoindre" 
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Voir toutes les offres
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}