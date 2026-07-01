'use client';

import { useState, useCallback, useEffect } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import {
  ArrowRight, ArrowLeft, CheckCircle, X, Car, Landmark, Stethoscope,
  Cloud, ShieldCheck, Plane, Brain, FileText, Lock, Users, ChevronRight,
} from 'lucide-react';

/* ────────── Types ────────── */

interface Sector {
  name: string;
  Icon: typeof Car;
  enjeux: string[];
  referentiels: string[];
}

interface Referentiel {
  acronyme: string;
  badge: string;
  traduction: string;
  resout: string;
  cta: string;
  ctaType: 'tofu' | 'mofu' | 'bofu';
}

interface FormStep {
  question: string;
  options: string[];
}

/* ────────── Data ────────── */

const sectors: Sector[] = [
  { name: 'Automobile', Icon: Car, enjeux: ["Sécuriser et maintenir l'accès aux appels d'offres des constructeurs", "Garantir la stricte confidentialité en R&D et chaîne de production"], referentiels: ['TISAX', 'ISO 21434', 'ISO 27001'] },
  { name: 'Finance & Assurance', Icon: Landmark, enjeux: ["Assurer une conformité stricte et immédiate au règlement DORA", "Garantir la résilience opérationnelle face aux risques tiers"], referentiels: ['DORA', 'ISO 27001', 'EBIOS RM', 'ISO 22301'] },
  { name: 'Santé', Icon: Stethoscope, enjeux: ["Atteindre une conformité réglementaire totale et opposable", "Protéger de bout en bout les données patients hautement sensibles"], referentiels: ['HDS', 'HIPAA', 'ISO 27001'] },
  { name: 'Services Numériques & ESN', Icon: Cloud, enjeux: ["Rassurer pleinement les clients et donneurs d'ordres grands comptes", "Respecter et prouver les engagements de niveau de service (SLA)"], referentiels: ['SOC2', 'ISO 27001', 'NIS2'] },
  { name: 'Entités Essentielles / Collectivités', Icon: ShieldCheck, enjeux: ["Mettre en œuvre la mise en conformité NIS2 sans perturber les métiers", "Réduire drastiquement la surface d'attaque face aux ransomwares"], referentiels: ['NIS2', 'EBIOS RM', 'ISO 27001'] },
  { name: 'Aéronautique & Défense', Icon: Plane, enjeux: ["Débloquer et maintenir l'accès aux marchés hautement classifiés", "Protéger l'intégrité des données industrielles et souveraines"], referentiels: ['Part-IS', 'AirCyber', 'ISO 27001'] },
  { name: 'Intelligence Artificielle', Icon: Brain, enjeux: ["Anticiper et valider la conformité aux exigences de l'IA Act", "Maîtriser et gouverner les risques de fuite de données liés aux LLM"], referentiels: ['IA Act', 'ISO 42001', 'RGPD'] },
];

const referentiels: Referentiel[] = [
  { acronyme: 'ISO/IEC 27001', badge: 'SMSI & Gouvernance', traduction: "Le sésame international pour rassurer vos grands comptes et signer de gros contrats.", resout: "Supprime 90% des questionnaires de sécurité fastidieux imposés par vos clients.", cta: "Télécharger la Checklist ISO 27001 (Gratuit)", ctaType: 'tofu' },
  { acronyme: 'TISAX®', badge: 'Filière Automobile', traduction: "L'exigence obligatoire pour maintenir ou activer vos contrats de fournisseur auto.", resout: "Évite le déréférencement immédiat auprès des grands constructeurs (Stellantis, BMW, Audi...).", cta: "Vérifier mon éligibilité TISAX (3 min)", ctaType: 'mofu' },
  { acronyme: 'Certification HDS', badge: 'Données de Santé', traduction: "Le bouclier légal obligatoire pour manipuler, traiter et héberger des données de santé.", resout: "Protège la responsabilité pénale des dirigeants et ouvre l'accès aux marchés des hôpitaux.", cta: "Obtenir le guide des 6 activités HDS", ctaType: 'tofu' },
  { acronyme: 'Directive NIS 2', badge: 'Législation Européenne', traduction: "Le nouveau standard légal européen contre le risque de cyberattaques systémiques.", resout: "Immunise l'entité contre des sanctions financières massives (jusqu'à 10M€) et élimine la mise en cause personnelle de la direction.", cta: "Simulateur : Suis-je soumis à NIS 2 ?", ctaType: 'mofu' },
  { acronyme: 'Règlement DORA', badge: 'Résilience Financière', traduction: "La conformité obligatoire pour les acteurs de la finance et leurs prestataires technologiques.", resout: "Valide avec succès les audits stricts des régulateurs (ACPR, BCE) concernant la maîtrise de vos risques tiers et IT.", cta: "Planifier un pré-audit DORA (Offert)", ctaType: 'bofu' },
];

/* ────────── Modal Component ────────── */

function Modal({ open, onClose, title, steps }: { open: boolean; onClose: () => void; title: string; steps: FormStep[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const handleSelect = useCallback((option: string) => {
    const next = [...answers, option];
    setAnswers(next);
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      setDone(true);
    }
  }, [answers, step, steps.length]);

  const reset = useCallback(() => {
    setStep(0);
    setAnswers([]);
    setDone(false);
  }, []);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#111827] border border-[#1f2937] rounded-2xl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94a3b8] hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {!done ? (
          <>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-[#94a3b8] mb-2">
                <span>Question {step + 1} sur {steps.length}</span>
                <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#1f2937] rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-[#e2e8f0] mb-6">{steps[step].question}</p>

            <div className="space-y-3">
              {steps[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left px-5 py-4 rounded-xl bg-[#141b2d] border border-[#1f2937] text-[#e2e8f0] hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
                >
                  <span className="flex items-center justify-between">
                    {opt}
                    <ChevronRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Merci !</h3>
            <p className="text-[#e2e8f0] mb-6">Un expert SecuriTrust vous recontacte sous 24h avec vos résultats personnalisés.</p>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded font-medium transition-all"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────── Page ────────── */

export default function DomainesExpertisePage() {
  const [modal, setModal] = useState<{ open: boolean; title: string; steps: FormStep[] }>({ open: false, title: '', steps: [] });

  const openModal = (title: string, steps: FormStep[]) => setModal({ open: true, title, steps });
  const closeModal = () => setModal({ open: false, title: '', steps: [] });

  const ctaHandler = (r: Referentiel) => {
    if (r.ctaType === 'mofu') {
      if (r.acronyme === 'TISAX®') {
        openModal('Éligibilité TISAX', [
          { question: "Quel est votre secteur d'activité principal ?", options: ['Constructeur automobile', 'Équipementier / Fournisseur', 'Services / Conseil en mobilité', 'Autre'] },
          { question: "Quel est le volume annuel de vos contrats avec des constructeurs ?", options: ['Moins de 1 M€', 'Entre 1 et 10 M€', 'Plus de 10 M€', 'Je ne sais pas'] },
          { question: "Avez-vous déjà un SMSI (ISO 27001) en place ?", options: ['Oui, certifié', 'Oui, en cours de déploiement', 'Non, pas encore', 'Je ne sais pas'] },
        ]);
      } else if (r.acronyme === 'Directive NIS 2') {
        openModal('Simulateur NIS 2', [
          { question: "Quelle est la taille de votre organisation ?", options: ['Moins de 50 salariés', 'Entre 50 et 250 salariés', 'Entre 250 et 1000 salariés', 'Plus de 1000 salariés'] },
          { question: "Dans quel secteur opérez-vous ?", options: ['Énergie / Transport', 'Santé / Eau', 'Infrastructures numériques', 'Services financiers', 'Administration publique', 'Autre secteur critique'] },
          { question: "Votre organisation est-elle déjà soumise à des obligations de cybersécurité ?", options: ['Oui (NIS1, DORA, etc.)', 'Oui, partiellement', 'Non, c\'est nouveau', 'Je ne sais pas'] },
        ]);
      }
    }
  };

  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-cyan-500 selection:text-black" style={{ background: '#0a0a0a' }}>
      {/* Scanlines */}
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60" />
        <div className="stars opacity-20" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* ───── SECTION 1 : HERO ───── */}
        <section className="pt-28 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
            <a href="/gouvernance-conformite" className="inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-cyan-400 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Gouvernance &amp; Conformité
            </a>
          </div>
        </section>
        <section className="relative pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
              Secteurs &amp; Référentiels GRC
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-light text-white tracking-tight leading-[1.05] mb-6">
              Transformez vos obligations de cybersécurité en avantage concurrentiel.
            </h1>
            <p className="text-lg md:text-xl text-[#e2e8f0] font-light max-w-3xl mx-auto mb-10">
              Ne subissez plus la réglementation. Sélectionnez votre secteur ou votre référentiel pour découvrir vos obligations et en faire un levier de croissance et de confiance.
            </p>
            <a
              href="#secteurs"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              Identifier mes obligations
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* ───── SECTION 2 : GRILLE DES SECTEURS ───── */}
        <section id="secteurs" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">Secteurs à forts enjeux stratégiques</h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // SECTEURS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((sector) => {
                const SectorIcon = sector.Icon;
                return (
                  <div
                    key={sector.name}
                    className="group relative bg-[#111827] border border-[#1f2937] rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/30 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.08)]"
                  >
                    {/* Icon */}
                    <div className="mb-4 w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <SectorIcon className="w-6 h-6 text-cyan-400" />
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3">{sector.name}</h3>

                    {/* Enjeux */}
                    <ul className="space-y-2 mb-5">
                      {sector.enjeux.map((enjeu, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#e2e8f0]">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {enjeu}
                        </li>
                      ))}
                    </ul>

                    {/* Référentiels badges */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1f2937]">
                      {sector.referentiels.map((ref) => (
                        <span key={ref} className="px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider rounded border bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── SECTION 3 : RÉFÉRENTIELS ET NORMES ───── */}
        <section className="py-24 relative z-10 bg-black/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                Nos expertises réglementaires :<br />
                <span className="text-[#94a3b8] text-2xl md:text-3xl">Du jargon technique au ROI business</span>
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // RÉFÉRENTIELS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {referentiels.map((r) => (
                <div
                  key={r.acronyme}
                  className="group relative bg-[#111827] border border-[#1f2937] rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/30 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.08)] flex flex-col"
                >
                  {/* Acronyme très gros */}
                  <div className="mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white/10 select-none leading-none">
                      {r.acronyme}
                    </span>
                  </div>

                  {/* Badge */}
                  <span className="inline-block self-start px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-widest rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-4">
                    {r.badge}
                  </span>

                  {/* Traduction business */}
                  <p className="text-[#e2e8f0] text-sm mb-4 leading-relaxed">
                    <span className="text-cyan-400 font-semibold">Traduction : </span>
                    {r.traduction}
                  </p>

                  {/* Ce que ça résout */}
                  <div className="mb-6 flex-grow">
                    <p className="text-[#94a3b8] text-xs uppercase tracking-wider font-semibold mb-2">Ce que ça résout</p>
                    <p className="text-white text-sm leading-relaxed">{r.resout}</p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => ctaHandler(r)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-medium text-xs uppercase tracking-widest transition-all group/btn ${
                      r.ctaType === 'bofu'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : r.ctaType === 'mofu'
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:text-white bg-transparent hover:bg-cyan-500/10'
                    }`}
                  >
                    {r.cta}
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── SECTION 4 : CONVERSION ───── */}
        <section className="py-24 relative z-10">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="bg-[#111827] border border-[#1f2937] rounded-2xl p-10 md:p-16 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl" />

              <h2 className="text-3xl md:text-4xl font-light text-white mb-4 relative z-10">
                Besoin d&apos;un accompagnement sur-mesure pour votre gouvernance ?
              </h2>
              <p className="text-lg md:text-xl text-[#e2e8f0] font-light mb-10 max-w-2xl mx-auto relative z-10">
                Échangez pendant 30 minutes avec un expert GRC pour cartographier vos risques et tracer votre feuille de route.
              </p>

              <a
                href="/contact?service=accompagnement"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] relative z-10"
              >
                Planifier mon cadrage GRC (30 min offertes)
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Réassurance */}
              <div className="mt-10 space-y-4 relative z-10">
                <p className="text-xs text-[#94a3b8] flex items-center justify-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Données protégées. Aucun partage tiers conformément au RGPD. Vos informations restent strictement confidentielles.
                </p>
                <p className="text-sm text-[#94a3b8] flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Déjà plus de <span className="text-white font-semibold">50 entreprises</span> accompagnées vers leur certification sans paralyser leurs équipes métiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Modal */}
      <Modal open={modal.open} onClose={closeModal} title={modal.title} steps={modal.steps} />
    </div>
  );
}