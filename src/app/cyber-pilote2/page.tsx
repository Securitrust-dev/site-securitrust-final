'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import {
  CheckCircle,
  Shield,
  Globe,
  Wrench,
  Users,
  FileCheck,
  Zap,
  TrendingUp,
  Eye,
  AlertTriangle,
  Lock,
  ChevronDown,
  ChevronRight,
  Play,
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */

const FAQ_ITEMS = [
  { q: 'Combien de temps pour déployer ?', a: "Après validation de la roadmap de l'audit préliminaire." },
  { q: "Comment se déroule l'intégration de votre Cyber-Pilote ?", a: "L'intégration se déroule en 3 phases : audit préliminaire, déploiement des outils et procédures, puis phase de run (pilotage continu)." },
  { q: 'Suis-je engagé ?', a: "Engagement annuel de 12 mois. Résiliation avec préavis de 4 mois avant échéance. Reconduction automatique pour garantir la continuité de votre sécurité." },
  { q: 'Ça remplace vraiment un RSSI ?', a: "Pour 95% des PME et ETI : oui, complètement. Un RSSI senior coûte entre 80 000 et 120 000€/an, prend 3 à 6 mois à recruter. Notre solution est opérationnelle en 48h." },
  { q: "Que se passe-t-il en cas d'incident grave ?", a: "Accompagnement en gestion de crise facturé au temps passé par demi-journée — non compris dans nos packs." },
  { q: 'Compatible avec mon SI actuel ?', a: 'Solution agnostique — compatible cloud, on-premise, hybride. Intégration Microsoft 365, AWS, Azure, Google Workspace.' },
];

const LOGOS = [
  { name: 'Société Générale', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-societe-generale2-e1436481313147-1764595764935.png?width=8000&height=8000&resize=contain' },
  { name: 'Abeille Assurances', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/43-abeille-assurance-1764596006375.jpg?width=8000&height=8000&resize=contain' },
  { name: 'Banque Française Mutualiste', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-150x150-1764596042844.png?width=8000&height=8000&resize=contain' },
  { name: 'Ma Place en Crèche', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-4-150x150-1764596061442.png?width=8000&height=8000&resize=contain' },
  { name: 'Affluens', logo: 'https://slelguoygbfzlpylxfs.supabase.co/storage/v1/render/image/public/document-uploads/Af-150x150-1764596072367.png?width=8000&height=8000&resize=contain' },
  { name: 'Veolia', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients-150x150-1764596078949.png?width=8000&height=8000&resize=contain' },
  { name: 'Aviva', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-150x150-1764596094822.png?width=8000&height=8000&resize=contain' },
];

const OFFERS = [
  { id: 'essentiel', name: 'Essentiel', price: '1 950', desc: 'Visibilité & conformité fondamentale', href: '/cyber-pilote/souscrire/essentiel', popular: false, prefix: null },
  { id: 'premium', name: 'Premium', price: '4 500', desc: 'Pilotage automatisé & veille continue', href: '/cyber-pilote/souscrire/premium', popular: true, prefix: null },
  { id: 'enterprise', name: 'Entreprise', price: '8 500', desc: 'Sécurité autonome & pilotage stratégique', href: '/cyber-pilote/souscrire/enterprise', popular: false, prefix: 'Dès' },
];

const FEATURE_CARDS = [
  { icon: Shield,     label: 'Conformité continue',    desc: 'ISO 27001, RGPD, NIS2 — pilotage réglementaire automatisé.',     color: 'text-cyan-400' },
  { icon: Eye,        label: 'Détection des menaces',   desc: 'Scan de vulnérabilités, Dark Web monitoring, OSINT en continu.',   color: 'text-violet-400' },
  { icon: Users,      label: 'RSSI externalisé',        desc: 'Expertise senior disponible 24/7 sans coût de recrutement.',       color: 'text-emerald-400' },
  { icon: TrendingUp, label: 'Veille & Intelligence',   desc: 'Alertes temps réel, threat intel et surveillance e-réputation.',   color: 'text-amber-400' },
];

const EXCELLENCE_CARDS = [
  { tag: 'Leader en Croissance',  title: 'Référencé ANSSI',        desc: "Nos experts sont certifiés et référencés par l'Agence Nationale de la Sécurité des Systèmes d'Information.", highlight: false },
  { tag: "Choix des Assureurs",   title: 'Réduction de Prime',     desc: "Notre certification de pilotage valorise votre maturité et réduit vos primes d'assurance cyber jusqu'à -30%.", highlight: true },
  { tag: "Évaluation Top-Tier",   title: 'Conformité EBIOS RM',    desc: "Identification de risque selon la méthode ANSSI EBIOS RM, reconnue par les plus hautes instances réglementaires.", highlight: false },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function CyberPilote2Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const allLogos = [...LOGOS, ...LOGOS];

  return (
    <div className="min-h-screen antialiased text-white" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen z-0" />
      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* ══════════════════════════════════════════════
            § 1 — HERO  (dark, headline left + stat card right)
        ══════════════════════════════════════════════ */}
        <section className="relative pt-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #030303 0%, #050a14 60%, #030303 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(6,182,212,0.10) 0%, transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[82vh] pb-12">
            {/* Left */}
            <div className="relative z-10 py-10">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 mb-5">
                Cyber-Pilote · Détection, Réponse et Pilotage
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.3rem] font-bold leading-[1.08] tracking-tight text-white mb-6">
                Voir Plus Loin.{' '}
                <span className="text-cyan-400">Agir Plus Vite.</span>
                <br />Transformer la Réaction<br />en Résilience.
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
                Restez en avance sur les menaces et concentrez-vous sur votre business grâce à nos services de détection, réponse et pilotage cyber issus d&apos;un seul partenaire de confiance.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://calendly.com/expert-securitrust" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#030303] font-bold text-sm rounded-full transition-all duration-200 hover:scale-[1.03]">
                  Obtenir une démo
                </a>
                <a href="#showcase" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold text-sm rounded-full transition-all duration-200 hover:bg-white/5"
                  onClick={(e) => { e.preventDefault(); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <Play className="w-3.5 h-3.5" />
                  Voir l&apos;aperçu
                </a>
              </div>
            </div>
            {/* Right — stat card */}
            <div className="relative z-10 flex items-center justify-center pb-0 pt-4 lg:pt-0">
              <div className="w-full max-w-md relative">
                <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(118,166,209,0.25)', background: 'linear-gradient(135deg, rgba(118,166,209,0.06) 0%, rgba(15,15,20,0.97) 50%, rgba(6,182,212,0.06) 100%)' }}>
                  <span className="absolute top-4 right-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                  </span>
                  <div className="px-7 py-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.62rem] font-mono uppercase tracking-widest border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 mb-4">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
                      Source ANSSI
                    </span>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      c&apos;est le coût moyen subi par une entreprise victime d&apos;une cyber-attaque en France —{' '}
                      <strong className="text-white font-bold">466&nbsp;000&nbsp;€</strong>
                      {' '}— selon l&apos;Agence Nationale de la Sécurité des Systèmes d&apos;Information.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Production arrêtée', 'Données volées', 'Amendes RGPD', 'Réputation détruite'].map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-xs text-white/50 border border-white/10 bg-white/5">✕ {t}</span>
                      ))}
                    </div>
                    <p className="text-white/55 text-sm">Soit entre <strong className="text-white">5% et 10% de votre CA annuel</strong> — en une seule attaque.</p>
                  </div>
                  <a href="/prise-de-rdv" className="group flex items-center justify-between px-7 py-3.5 hover:bg-cyan-500/10 transition-all" style={{ borderTop: '1px solid rgba(6,182,212,0.15)', background: 'rgba(6,182,212,0.04)' }}>
                    <span className="text-sm font-semibold text-cyan-400">Évaluez votre niveau de sécurité — résultat immédiat</span>
                    <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl border border-cyan-500/30 bg-[#030303]/90 backdrop-blur-sm">
                  <p className="text-xs font-mono text-cyan-400 font-semibold">/10 sur votre budget cyber</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 2 — INTRO TEXT  (light bg, 2 lines)
        ══════════════════════════════════════════════ */}
        <section className="py-20 px-6" style={{ background: '#f9fafb' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-2xl md:text-3xl font-light text-slate-700 leading-relaxed mb-5">
              Gérer votre cybersécurité tout en développant votre activité, c&apos;est difficile.
            </p>
            <p className="text-2xl md:text-3xl font-light text-slate-700 leading-relaxed">
              Reprenez le contrôle avec Cyber-Pilote — transformez la gestion réactive en défense proactive et scalable.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 3 — PRODUCT SHOWCASE  (dark, dashboard + 4 cards)
        ══════════════════════════════════════════════ */}
        <section id="showcase" className="py-20 px-6" style={{ background: '#0b0f1a' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Cyber-Pilote par SecuriTrust<br />
                <span className="text-cyan-400">Détection, Réponse et Pilotage</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Threat hunting, pilotage managé et réponse. Une résilience opérationnelle complète — issus d&apos;un seul partenaire de confiance.
              </p>
            </div>
            {/* Dashboard mockup */}
            <div className="relative rounded-2xl overflow-hidden mb-10 border border-white/8" style={{ background: 'linear-gradient(180deg, #111827 0%, #0d1117 100%)' }}>
              <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
                <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-green-500/60" /></div>
                <span className="text-xs font-mono text-white/25 ml-2">Cyber-Pilote Dashboard · Tableau de Bord Exécutif</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/[0.05]">
                {[
                  { label: 'Score Cyber', value: '87/100', delta: '+12 ce mois', color: '#22d3ee' },
                  { label: 'Vulnérabilités', value: '3', delta: 'critiques détectées', color: '#f87171' },
                  { label: 'Conformité ISO', value: '94%', delta: 'objectif 100%', color: '#34d399' },
                  { label: 'Dark Web alerts', value: '0', delta: 'fuite détectée', color: '#a78bfa' },
                ].map((stat, i) => (
                  <div key={i} className="px-6 py-6">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest font-mono mb-2">{stat.label}</p>
                    <p className="text-3xl font-black leading-none mb-1" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-xs text-white/30">{stat.delta}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/[0.05]">
                {[
                  { label: 'Sécurité Basique', desc: "Nous gérons votre cyber, libérant votre équipe pour se concentrer sur votre cœur de métier." },
                  { label: 'Réduire les risques', desc: "Surveillance continue et réponse pour réduire vos risques et consolider vos défenses." },
                  { label: 'Limiter les disruptions', desc: "Nos experts gèrent toutes les situations imprévues, limitant l'impact sur vos opérations." },
                  { label: 'Contrôle Total', desc: "Automatisez tout : des alertes à la conformité réglementaire complète." },
                ].map(({ label, desc }, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1.5">{label}</p>
                    <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* 4 feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURE_CARDS.map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="rounded-xl border border-white/[0.07] p-5 hover:border-white/15 transition-all duration-200 hover:bg-white/[0.02]">
                  <Icon className={`w-5 h-5 ${color} mb-3`} />
                  <p className="text-sm font-semibold text-white mb-1.5">{label}</p>
                  <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 4 — COMPREHENSIVE APPROACH  (light, title left + accordion right)
        ══════════════════════════════════════════════ */}
        <section className="py-24 px-6" style={{ background: '#f9fafb' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                Une approche plus complète de la cybersécurité.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Nous fédérons des experts cybersécurité senior, des technologies de détection avancées et une intelligence des menaces propriétaire pour vous offrir une protection complète — tout cela via un seul contrat, un seul interlocuteur.
              </p>
              <a href="https://calendly.com/expert-securitrust" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition-all duration-200">
                Parler à un expert <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="space-y-2">
              {[
                { q: 'Renseignement sur les Menaces Non Appairé', a: "Notre plateforme intègre des flux de threat intel en temps réel, croisant données OSINT, Dark Web et honeypots pour anticiper les attaques avant qu'elles n'atteignent votre SI." },
                { q: "IA Définissant l'Industrie", a: "Nos algorithmes ML analysent des milliards d'événements pour réduire le bruit et détecter les vraies menaces — sans faux positifs qui saturent vos équipes." },
                { q: 'Experts de Classe Mondiale', a: "Nos analystes certifiés (OSCP, CEH, Lead Auditor ISO 27001) sont disponibles 24/7 pour piloter votre sécurité et répondre à chaque incident." },
                ...FAQ_ITEMS.slice(0, 3),
              ].map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-slate-800 font-medium text-sm pr-4">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 pt-1 border-t border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 5 — PORTFOLIO FEATURE  (light, visual left + text right)
        ══════════════════════════════════════════════ */}
        <section className="py-24 px-6 border-t border-slate-100" style={{ background: '#f9fafb' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — shield diagram */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto" style={{ background: 'linear-gradient(135deg, #0b0f1a 0%, #111827 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)', border: '2px solid rgba(6,182,212,0.4)' }}>
                        <Shield className="w-10 h-10 text-cyan-400" />
                      </div>
                    </div>
                    {[
                      { icon: FileCheck, color: '#34d399', label: 'Conformité', angle: 0 },
                      { icon: Globe,     color: '#22d3ee', label: 'E-Réputation', angle: 60 },
                      { icon: Lock,      color: '#f59e0b', label: 'Accès sécurisés', angle: 120 },
                      { icon: TrendingUp,color: '#60a5fa', label: 'Évolution cyber', angle: 180 },
                      { icon: Users,     color: '#a78bfa', label: 'Fournisseurs', angle: 240 },
                      { icon: Wrench,    color: '#fb7185', label: 'Vulnérabilités', angle: 300 },
                    ].map(({ icon: Icon, color, label, angle }) => {
                      const rad = (angle - 90) * (Math.PI / 180);
                      const r = 42;
                      const x = 50 + r * Math.cos(rad);
                      const y = 50 + r * Math.sin(rad);
                      return (
                        <div key={label} className="absolute flex flex-col items-center gap-1" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${color}20`, border: `1.5px solid ${color}50` }}>
                            <Icon style={{ color }} className="w-4 h-4" />
                          </div>
                          <span className="text-[8px] text-white/50 whitespace-nowrap">{label}</span>
                        </div>
                      );
                    })}
                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Right */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-500 mb-4">Le Portfolio Cyber-Pilote</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                Tout ce dont vous avez besoin pour Prendre de l&apos;Avance.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Notre portfolio unique couvre la totalité du spectre : de la conformité réglementaire à la détection offensive, en passant par la gestion des risques et la veille stratégique — pour rester en avance sur les menaces de demain.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Shield,       label: 'Pilotage ISO 27001 & RGPD',      color: 'text-cyan-500' },
                  { icon: Eye,          label: 'Dark Web & OSINT monitoring',     color: 'text-violet-500' },
                  { icon: AlertTriangle,label: 'Scan de vulnérabilités continu',  color: 'text-amber-500' },
                  { icon: Users,        label: 'Audit fournisseurs & supply chain', color: 'text-emerald-500' },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                    <span className="text-slate-700 text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 6 — PILOTEZ L'INVISIBLE  (dark, text left + stats right)
        ══════════════════════════════════════════════ */}
        <section className="py-24 px-6" style={{ background: '#0b0f1a' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Essentiel', 'Premium', 'Entreprise'].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold text-white/50 border border-white/10">{t}</span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                Pilotez l&apos;Invisible.<br />
                <span className="text-cyan-400">Maîtrisez les Menaces.</span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Notre service de Cyber-Pilote vous offre la capacité de détecter et neutraliser les menaces les plus sophistiquées — avec une expertise que vos équipes internes seules ne peuvent pas atteindre.
              </p>
              <a href="https://calendly.com/expert-securitrust" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#030303] font-bold text-sm rounded-full transition-all duration-200">
                Démarrer mon pilotage cyber <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(160deg, #111827 0%, #0d1117 100%)' }}>
              <div className="p-8 grid grid-cols-2 gap-0 divide-x divide-y divide-white/[0.05]">
                {[
                  { val: '/10', label: 'sur votre budget cyber', color: '#22d3ee' },
                  { val: '-30%', label: "prime d'assurance", color: '#34d399' },
                  { val: 'J+1', label: 'déploiement opérationnel', color: '#a78bfa' },
                  { val: '24/7', label: 'disponibilité experts', color: '#f59e0b' },
                ].map(({ val, label, color }) => (
                  <div key={val} className="p-6">
                    <p className="text-4xl font-black leading-none mb-1" style={{ color }}>{val}</p>
                    <p className="text-sm text-white/45 leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 7 — INTELLIGENCE  (dark left alerts + right text)
        ══════════════════════════════════════════════ */}
        <section className="py-24 px-6" style={{ background: '#030303' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #080d1a 0%, #0f1824 100%)', border: '1px solid rgba(255,255,255,0.06)', minHeight: 320 }}>
              <div className="p-8 flex flex-col justify-between min-h-[320px]">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-5">Threat Intelligence Cyber-Pilote</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Fuite de credentials détectée',  type: 'CRITIQUE', color: '#ef4444' },
                      { label: 'Tentative intrusion bloquée',    type: 'HAUTE',    color: '#f59e0b' },
                      { label: 'Cert SSL expirant dans 12j',     type: 'MOYENNE',  color: '#22d3ee' },
                      { label: 'Rapport conformité généré',      type: 'INFO',     color: '#34d399' },
                    ].map(({ label, type, color }) => (
                      <div key={label} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="text-sm text-white/65 flex-1">{label}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <p className="text-xs text-white/25 font-mono">Dernière mise à jour : il y a 2 minutes · 1 247 événements analysés</p>
                </div>
              </div>
            </div>
            {/* Right */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-4">Threat Intelligence en Continu</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                Gagnez chaque avantage avec une intelligence cyber inégalée.
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Notre service de Threat Intelligence est alimenté par notre réseau de senseurs propriétaires — nos experts accèdent aux données les plus fraîches et corrélées pour anticiper, contextualiser et neutraliser chaque menace avant qu&apos;elle n&apos;impacte votre business.
              </p>
              <a href="https://calendly.com/expert-securitrust" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-cyan-500/50 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:bg-cyan-500/8">
                Voir la démo live →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 8 — EXCELLENCE  (light, 3 cards)
        ══════════════════════════════════════════════ */}
        <section className="py-24 px-6" style={{ background: '#f9fafb' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">La Référence en Excellence Cybersécurité</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">Approuvé et certifié par les acteurs les plus exigeants du secteur</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EXCELLENCE_CARDS.map(({ tag, title, desc, highlight }) => (
                <div key={title} className={`rounded-2xl p-8 border transition-all duration-200 hover:shadow-lg ${highlight ? 'border-violet-300 bg-violet-50' : 'border-slate-200 bg-white'}`}>
                  {highlight && <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-violet-600 border border-violet-300 bg-violet-100 px-2 py-0.5 rounded-full mb-4">Recommandé</span>}
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">{tag}</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 9 — TRUSTED  (light, logo marquee)
        ══════════════════════════════════════════════ */}
        <section className="py-16 px-6 border-t border-slate-100" style={{ background: '#f9fafb' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Ils nous font confiance</h2>
              <p className="text-slate-500 text-sm">Les plus grandes organisations françaises nous font confiance</p>
            </div>
            <style>{`@keyframes mq2{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.mq2-anim{animation:mq2 28s linear infinite}.mq2-anim:hover{animation-play-state:paused}`}</style>
            <div className="overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f9fafb] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f9fafb] to-transparent z-10 pointer-events-none" />
              <div className="mq2-anim flex items-center gap-6" style={{ width: 'max-content' }}>
                {allLogos.map((c, i) => (
                  <div key={i} className="w-28 h-14 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img src={c.logo} alt={c.name} className="h-10 w-full object-contain p-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 10 — OFFRES / RESOURCES  (light, 3 cards)
        ══════════════════════════════════════════════ */}
        <section id="packs" className="py-24 px-6 border-t border-slate-100" style={{ background: '#f9fafb' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Nos Offres Cyber-Pilote</h2>
              <p className="text-slate-500 text-lg">Choisissez le niveau de protection adapté à votre maturité</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OFFERS.map((offer) => (
                <div key={offer.id} className={`rounded-2xl p-8 flex flex-col ${offer.popular ? 'border-2 border-cyan-400 bg-[#030303]' : 'border border-slate-200 bg-white'}`}>
                  {offer.popular && (
                    <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 rounded-full mb-4 self-start">
                      ★ Populaire
                    </span>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${offer.popular ? 'text-white' : 'text-slate-900'}`}>{offer.name}</h3>
                  <p className={`text-sm mb-5 ${offer.popular ? 'text-white/55' : 'text-slate-500'}`}>{offer.desc}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    {offer.prefix && <span className={`text-sm ${offer.popular ? 'text-white/55' : 'text-slate-500'}`}>{offer.prefix}</span>}
                    <span className={`text-4xl font-black ${offer.popular ? 'text-white' : 'text-slate-900'}`}>{offer.price}</span>
                    <span className={`text-sm ${offer.popular ? 'text-white/45' : 'text-slate-400'}`}>€/mois HT</span>
                  </div>
                  <div className="mt-auto">
                    <a href={offer.href}
                      className={`block w-full text-center py-3 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-200 ${offer.popular ? 'bg-cyan-500 hover:bg-cyan-400 text-[#030303]' : 'border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700'}`}>
                      Démarrer maintenant
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            § 11 — FINAL CTA  (dark banner)
        ══════════════════════════════════════════════ */}
        <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#030303' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(6,182,212,0.10) 0%, transparent 70%)' }} />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Obtenez l&apos;Évaluation Cyber<br />
              <span className="text-cyan-400">la Plus Avancée de France</span>
            </h2>
            <p className="text-white/55 text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
              Découvrez comment notre plateforme de pilotage cyber intelligente exploite la puissance de l&apos;IA et de nos experts pour protéger votre organisation dès aujourd&apos;hui.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://calendly.com/expert-securitrust" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#030303] font-bold rounded-full text-sm transition-all duration-200 hover:scale-[1.03]"
                style={{ boxShadow: '0 0 32px rgba(6,182,212,0.35)' }}>
                Obtenir une démo gratuite
              </a>
              <a href="/eligibilite"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-full text-sm transition-all duration-200 hover:bg-white/5">
                Tester mon éligibilité
              </a>
            </div>
            <p className="text-white/20 text-xs mt-8">Premier échange sans engagement · Résultat concret dès la première semaine</p>
          </div>
        </section>

        <InternalLinks pageKey="cyber-pilote2" />
        <Footer />
      </div>
    </div>
  );
}
