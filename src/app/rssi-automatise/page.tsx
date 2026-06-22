'use client';

import React from 'react';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import {
  CheckCircle,
  XCircle,
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
} from 'lucide-react';

interface Offer {
  id: string;
  name: string;
  target: string;
  priceMonthly: number;
  pricePrefix: string | null;
  badge: string | null;
  popular: boolean;
  value: string;
  ctaColor: string;
  headerColor: string;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
}

const OFFERS: Offer[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    target: 'Vous démarrez votre mise en conformité',
    priceMonthly: 1950,
    pricePrefix: null,
    badge: null,
    popular: false,
    value: 'Visibilité & conformité fondamentale',
    ctaColor: 'border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/5',
    headerColor: 'text-white',
    ctaLabel: 'Démarrer maintenant',
    ctaHref: '/rssi-automatise/souscrire/essentiel',
    features: [
      'Registre des risques automatisé',
      'Pilotage ISO 27001 (basique)',
      'Reporting RGPD & NIS2 partiel',
      'Scan vulnérabilités mensuel',
      'Monitoring SSL & ports 24/7',
      'KPI & dashboards mensuels',
      'Rapport mensuel',
      'Alertes hebdomadaires',
      'Support standard',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    target: 'Vous gérez un SI structuré avec des enjeux réglementaires forts',
    priceMonthly: 4500,
    pricePrefix: null,
    badge: 'POPULAIRE',
    popular: true,
    value: 'Pilotage automatisé & veille continue',
    ctaColor: 'border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20',
    headerColor: 'text-cyan-400',
    ctaLabel: 'Démarrer maintenant',
    ctaHref: '/rssi-automatise/souscrire/premium',
    features: [
      'Tout le pack Essentiel',
      'ISO 27001 automatisé & reporting complet',
      'Reporting RGPD & NIS2 complet',
      'Scan vulnérabilités 2× / mois',
      'Scan Cloud (AWS, Azure, GCP)',
      'Dark Web monitoring hebdomadaire',
      'OSINT & veille réputation hebdo',
      'KPI par service automatisés',
      'Outil de suivi standard',
      'Alertes quotidiennes',
      'Support prioritaire',
    ],
  },
  {
    id: 'enterprise',
    name: 'Entreprise',
    target: 'Vous pilotez plusieurs entités ou exigez un SLA garanti',
    priceMonthly: 8500,
    pricePrefix: 'Dès',
    badge: null,
    popular: false,
    value: 'Sécurité autonome & pilotage stratégique',
    ctaColor: 'border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/5',
    headerColor: 'text-white',
    ctaLabel: 'Démarrer maintenant',
    ctaHref: '/rssi-automatise/souscrire/enterprise',
    features: [
      'Tout le pack Premium',
      'ISO 27001 avancé multi-entités',
      'Reporting sur-mesure (Board / Comité)',
      'Scan vulnérabilités hebdomadaire',
      'Scan Cloud approfondi',
      'Dark Web & OSINT quotidiens',
      'Alertes en temps réel',
      'Escalade + cellule de crise dédiée',
      'Suivi de projet',
      'SLA garanti',
    ],
  },
];

type CellValue = string | boolean;

interface FeatureRow {
  label: string;
  values: [CellValue, CellValue, CellValue];
}

interface FeatureCategory {
  title: string;
  tag: string;
  rows: FeatureRow[];
}

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: 'Conformité & Gouvernance',
    tag: '01',
    rows: [
      { label: 'Enregistrement des risques', values: [true, true, 'Avancé multi-entités'] },
      { label: 'Pilotage ISO 27001', values: ['Basique', 'Automatisé', 'Avancé'] },
      { label: 'Pilotage réglementaire (RGPD, NIS2)', values: ['Partiel', 'Complet', 'Sur-mesure'] },
      { label: 'KPI & dashboards direction', values: ['Mensuel basique', 'Par service auto', 'Board / Comité'] },
      { label: 'Exercice de crise', values: [false, '1 par an', '2 par an'] },
      { label: 'Contrôle des mesures de sauvegarde', values: [false, '1 par an', '2 par an'] },
    ],
  },
  {
    title: 'Détection & Protection',
    tag: '02',
    rows: [
      { label: 'Scan de vulnérabilités', values: ['Mensuel', '2× / mois', 'Hebdomadaire'] },
      { label: 'Monitoring SSL & ports 24/7', values: [true, true, true] },
      { label: 'Scan Cloud (AWS, Azure, GCP)', values: [false, true, 'Approfondi'] },
      { label: 'Pentest', values: [false, false, 'Option'] },
    ],
  },
  {
    title: 'Pilotage & Reporting',
    tag: '03',
    rows: [
      { label: 'Outil de suivi cybersécurité', values: ['Rapport PDF', 'Outil de suivi standard', 'Outil de suivi sur mesure'] },
      { label: 'Alertes & notifications', values: ['Hebdo', 'Quotidien', 'Temps réel'] },
      { label: 'Escalade incidents automatisée', values: [true, true, '✔✔'] },
    ],
  },
  {
    title: 'Veille & Exposition Externe',
    tag: '04',
    rows: [
      { label: 'Dark Web monitoring', values: [false, 'Hebdomadaire', 'Quotidien'] },
      { label: 'OSINT & veille réputation', values: [false, 'Hebdomadaire', 'Quotidien'] },
      { label: 'Alertes fuite de données', values: [false, 'Temps réel', 'Temps réel'] },
    ],
  },
  {
    title: 'Accompagnement & Support',
    tag: '05',
    rows: [
      { label: 'Déploiement en 48h* après validation du plan', values: [true, true, 'Dédié'] },
      { label: 'Suivi de projet', values: [false, false, true] },
    ],
  },
];


const SHIELD_NODES = [
  { icon: FileCheck,  label: 'Conforme NIS2 & ISO 27001',                                    desc: 'Respect continu des normes légales (RGPD, ISO 27001).',    color: 'text-emerald-400', iconBg: 'rgba(52,211,153,0.15)',  dot: '#34d399' },
  { icon: Globe,      label: 'Vérifiez en temps réel votre E-Réputation',                    desc: '',                                                          color: 'text-cyan-400',    iconBg: 'rgba(6,182,212,0.15)',   dot: '#06b6d4' },
  { icon: Lock,       label: 'Vos serveurs et accès physiques sécurisés',                    desc: 'Nous détectons les failles dans vos serveurs et accès physiques pour que vous les corrigiez mieux.', color: 'text-amber-400',   iconBg: 'rgba(251,191,36,0.15)',  dot: '#fbbf24' },
  { icon: TrendingUp, label: 'Suivez votre évolution cyber',                                  desc: 'Tableau de bord qui retrace votre niveau de sécurité dans le temps', color: 'text-blue-400',    iconBg: 'rgba(96,165,250,0.15)',  dot: '#60a5fa' },
  { icon: Users,      label: 'Vos fournisseurs audités',                                     desc: 'Audit de vos fournisseurs pour éviter la fuite de données par ailleurs', color: 'text-violet-400',  iconBg: 'rgba(167,139,250,0.15)', dot: '#a78bfa' },
  { icon: Wrench,     label: 'Les hackers veulent trouver vos failles, on les trouve avant eux', desc: 'Détection de vulnérabilités en continue',                    color: 'text-rose-400',    iconBg: 'rgba(251,113,133,0.15)', dot: '#fb7185' },
];


function CellDisplay({ value }: { value: CellValue }) {
  if (value === true) return <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto" />;
  if (value === false) return <XCircle className="w-5 h-5 text-white/20 mx-auto" />;
  if (value === '✔✔') return (
    <span className="flex items-center justify-center gap-0.5 text-emerald-400">
      <CheckCircle className="w-4 h-4" /><CheckCircle className="w-4 h-4" />
    </span>
  );
  if (value === '✔✔✔') return (
    <span className="flex items-center justify-center gap-0.5 text-emerald-400">
      <CheckCircle className="w-4 h-4" /><CheckCircle className="w-4 h-4" /><CheckCircle className="w-4 h-4" />
    </span>
  );
  if (value === '—') return <span className="text-white/30 text-sm">—</span>;
  return <span className="text-sm text-white font-mono">{value}</span>;
}

const FAQ_ITEMS = [
  {
    q: 'Combien de temps pour déployer ?',
    a: '48h pour l\'onboarding, 2 semaines pour intégration complète.',
  },
  {
    q: 'Suis-je engagé ?',
    a: 'Mensuel ou annuel (-15%). Résiliable à tout moment avec préavis de 30j.',
  },
  {
    q: 'Ça remplace vraiment un RSSI ?',
    a: 'Oui pour 95% des PME/ETI. Pour les grands groupes, c\'est un excellent complément.',
  },
  {
    q: 'Que se passe-t-il en cas d\'incident grave ?',
    a: 'Escalade automatique sous 1h. Cellule de crise disponible (pack Entreprise). Support réactif sur tous les packs.',
  },
  {
    q: 'Compatible avec mon SI actuel ?',
    a: 'Solution agnostique — compatible cloud, on-premise, hybride. Intégration Microsoft 365, AWS, Azure, Google Workspace.',
  },
  {
    q: 'Puis-je changer de pack ?',
    a: 'Upgrade immédiat, sans interruption de service. Downgrade avec préavis de 30 jours.',
  },
  {
    q: 'Quelle différence avec un RSSI externalisé classique ?',
    a: 'Jusqu\'à 10× moins chère, disponible 24/7, scalable instantanément, zéro risque RH.',
  },
];

function FAQAccordion() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="space-y-3">
        {FAQ_ITEMS.filter((_, i) => i % 2 === 0).map((item, i) => {
          const idx = FAQ_ITEMS.indexOf(item);
          return (
            <details key={idx} className="group border border-white/[0.08] rounded-xl overflow-hidden transition-all duration-200 hover:border-cyan-500/25 hover:shadow-[0_0_18px_rgba(6,182,212,0.08)]">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-cyan-500/[0.03] transition-colors">
                <span className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="shrink-0 text-[0.6rem] font-mono text-cyan-500/60 w-5">Q{idx + 1}</span>
                  <span className="text-base font-medium text-white leading-snug">{item.q}</span>
                </span>
                <ChevronDown className="shrink-0 w-4 h-4 text-cyan-400 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-4 pt-2 border-t border-white/[0.06]">
                <p className="text-base text-white leading-relaxed pl-8">{item.a}</p>
              </div>
            </details>
          );
        })}
      </div>
      <div className="space-y-3">
        {FAQ_ITEMS.filter((_, i) => i % 2 !== 0).map((item, i) => {
          const idx = FAQ_ITEMS.indexOf(item);
          return (
            <details key={idx} className="group border border-white/[0.08] rounded-xl overflow-hidden transition-all duration-200 hover:border-cyan-500/25 hover:shadow-[0_0_18px_rgba(6,182,212,0.08)]">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-cyan-500/[0.03] transition-colors">
                <span className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="shrink-0 text-[0.6rem] font-mono text-cyan-500/60 w-5">Q{idx + 1}</span>
                  <span className="text-base font-medium text-white leading-snug">{item.q}</span>
                </span>
                <ChevronDown className="shrink-0 w-4 h-4 text-cyan-400 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-4 pt-2 border-t border-white/[0.06]">
                <p className="text-base text-white leading-relaxed pl-8">{item.a}</p>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

export default function RSSIAutomatisePage() {
  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-[0.65rem] font-mono uppercase tracking-[0.2em] transition-all duration-200 hover:bg-cyan-500/20 hover:border-cyan-500/70 hover:shadow-[0_0_14px_rgba(6,182,212,0.3)] cursor-default">
                Conformité ISO 27001
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white text-[0.65rem] font-mono uppercase tracking-[0.2em] transition-all duration-200 hover:bg-white/10 hover:border-white/25 cursor-default">
                Déploiement Rapide
              </span>
            </div>
            {/* Impact statement */}
            <div className="max-w-2xl mx-auto mb-8 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_0_20px_rgba(255,255,255,0.04)]">
              <p className="text-lg md:text-xl font-bold text-white leading-snug mb-2">
                60% des PME attaquées déposent le bilan dans les 18 mois.
              </p>
              <p className="text-sm text-white leading-relaxed">
                Vous n&apos;avez pas besoin d&apos;un RSSI à temps plein. Vous avez besoin d&apos;une protection qui tourne 24h/24 pendant que vous dirigez.
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-4">
              Nos Offres{' '}
              <span className="text-cyan-400">Cyber-Pilote</span>
            </h1>

            <p className="text-white text-xl md:text-2xl font-light mb-6 max-w-2xl mx-auto leading-relaxed">
              La combinaison de{' '}
              <span className="text-cyan-400 font-medium">RSSI externalisé</span>{' '}
              et de{' '}
              <span className="text-cyan-400 font-medium">sécurité opérationnelle</span>
              {' '}— piloté en continu pour votre entreprise.
            </p>
            <p className="text-sm text-white/40 font-mono uppercase tracking-widest mb-2">
              Choisissez le niveau de protection adapté
            </p>
          </div>
        </section>

        {/* ── SOCIAL PROOF BAR ── */}
        <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015] overflow-hidden">
          <style>{`
            @keyframes marqueeClients {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-clients { animation: marqueeClients 28s linear infinite; }
            .marquee-clients:hover { animation-play-state: paused; }
          `}</style>

          <div className="flex items-stretch h-20">
            {/* Label fixe */}
            <div className="shrink-0 flex items-center px-6 border-r border-white/[0.06] bg-white/[0.02]">
              <p className="text-sm font-semibold text-white/80 whitespace-nowrap">
                Ils nous font confiance
              </p>
            </div>

            {/* Marquee */}
            <div className="flex-1 overflow-hidden relative">
              {/* fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

              <div className="marquee-clients flex items-center h-full" style={{ width: 'max-content' }}>
                {[
                  { name: 'Société Générale', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-societe-generale2-e1436481313147-1764595764935.png?width=8000&height=8000&resize=contain' },
                  { name: 'Abeille Assurances', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/43-abeille-assurance-1764596006375.jpg?width=8000&height=8000&resize=contain' },
                  { name: 'Banque Française Mutualiste', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-150x150-1764596042844.png?width=8000&height=8000&resize=contain' },
                  { name: 'Ma Place en Crèche', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-4-150x150-1764596061442.png?width=8000&height=8000&resize=contain' },
                  { name: 'Affluens', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Af-150x150-1764596072367.png?width=8000&height=8000&resize=contain' },
                  { name: 'Veolia', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients-150x150-1764596078949.png?width=8000&height=8000&resize=contain' },
                  { name: 'Aviva', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-150x150-1764596094822.png?width=8000&height=8000&resize=contain' },
                  /* duplicate for seamless loop */
                  { name: 'Société Générale2', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-societe-generale2-e1436481313147-1764595764935.png?width=8000&height=8000&resize=contain' },
                  { name: 'Abeille Assurances2', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/43-abeille-assurance-1764596006375.jpg?width=8000&height=8000&resize=contain' },
                  { name: 'Banque Française Mutualiste2', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-150x150-1764596042844.png?width=8000&height=8000&resize=contain' },
                  { name: 'Ma Place en Crèche2', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-4-150x150-1764596061442.png?width=8000&height=8000&resize=contain' },
                  { name: 'Affluens2', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Af-150x150-1764596072367.png?width=8000&height=8000&resize=contain' },
                  { name: 'Veolia2', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients-150x150-1764596078949.png?width=8000&height=8000&resize=contain' },
                  { name: 'Aviva2', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-150x150-1764596094822.png?width=8000&height=8000&resize=contain' },
                ].map((client) => (
                  <div
                    key={client.name}
                    className="mx-4 h-14 w-28 bg-white rounded-md flex items-center justify-center shrink-0"
                    title={client.name.replace(/\d+$/, '')}
                  >
                    <img
                      src={client.logo}
                      alt={`Logo ${client.name.replace(/\d+$/, '')}`}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SÉCURITÉ 360° ── */}
        <section className="py-20 px-6 relative z-10 overflow-hidden">
          {/* CSS keyframes for glow + dot pulse */}
          <style>{`
            @keyframes glowPulse360 {
              0%,100% { box-shadow: 0 0 70px rgba(6,182,212,0.4), inset 0 0 30px rgba(6,182,212,0.08); }
              50%      { box-shadow: 0 0 120px rgba(6,182,212,0.75), inset 0 0 55px rgba(6,182,212,0.2); }
            }
            @keyframes dotPulse360 {
              0%,100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.85; }
              50%      { transform: translate(-50%,-50%) scale(1.7); opacity: 1; }
            }
            @keyframes cardFadeIn {
              from { opacity: 0; transform: translate(-50%, calc(-50% + 12px)); }
              to   { opacity: 1; transform: translate(-50%, -50%); }
            }
          `}</style>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 65%)' }} />
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                Développez votre entreprise,<br />
                <span className="text-cyan-400">nous pilotons votre sécurité</span>
              </h2>
              <p className="text-white max-w-xl mx-auto text-sm">
                Pendant que vous développez votre chiffre d&apos;affaires, notre système surveille, détecte, reporte et agit — en continu, sans interruption, sans que vous ayez à lever le petit doigt.
              </p>
            </div>

            {/* Desktop: radial layout */}
            <div className="hidden lg:flex justify-center">
              <div className="relative" style={{ width: '960px', height: '720px', flexShrink: 0 }}>

                {/* SVG: animated orbital rings + flowing dashed lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 960 720"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Inner orbital ring */}
                  <circle cx="480" cy="360" r="195" stroke="rgba(6,182,212,0.14)" strokeWidth="1.5" strokeDasharray="3 12">
                    <animateTransform attributeName="transform" type="rotate" from="0 480 360" to="360 480 360" dur="35s" repeatCount="indefinite" />
                  </circle>
                  {/* Outer orbital ring */}
                  <circle cx="480" cy="360" r="305" stroke="rgba(6,182,212,0.08)" strokeWidth="1" strokeDasharray="2 18">
                    <animateTransform attributeName="transform" type="rotate" from="360 480 360" to="0 480 360" dur="55s" repeatCount="indefinite" />
                  </circle>
                  {/* Center glow pulse ring */}
                  <circle cx="480" cy="360" r="72" fill="none" stroke="rgba(6,182,212,0.25)" strokeWidth="2">
                    <animate attributeName="r" values="62;75;62" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                  </circle>
                  {/* Flowing dashed connecting lines */}
                  {([
                    [115, 115], [480, 100], [845, 115],
                    [115, 615], [480, 630], [845, 615],
                  ] as [number, number][]).map(([x2, y2], i) => (
                    <line key={i} x1="480" y1="360" x2={x2} y2={y2}
                      stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeDasharray="7 5">
                      <animate attributeName="stroke-dashoffset" from="0" to="-24" dur={`${1.6 + i * 0.25}s`} repeatCount="indefinite" />
                    </line>
                  ))}
                  {/* Pulsing endpoint dots */}
                  {([
                    [115, 115], [480, 100], [845, 115],
                    [115, 615], [480, 630], [845, 615],
                  ] as [number, number][]).map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="4" fill="rgba(6,182,212,0.65)">
                      <animate attributeName="r" values="3;6;3" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                      <animate attributeName="opacity" values="0.55;1;0.55" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                    </circle>
                  ))}
                </svg>

                {/* Center shield */}
                <div className="absolute" style={{ left: '480px', top: '360px', transform: 'translate(-50%, -50%)' }}>
                  <div
                    className="w-[145px] h-[145px] rounded-full bg-[#030303] border-2 border-cyan-400/60 flex flex-col items-center justify-center text-center"
                    style={{ animation: 'glowPulse360 3s ease-in-out infinite' }}
                  >
                    <Shield className="w-10 h-10 text-cyan-400 mb-1.5" style={{ filter: 'drop-shadow(0 0 12px rgba(6,182,212,1))' }} />
                    <p className="text-[0.65rem] font-mono uppercase tracking-[0.14em] text-cyan-300 leading-tight px-2">VOTRE<br />ENTREPRISE</p>
                    <p className="text-[0.55rem] text-white mt-1">Au cœur du dispositif</p>
                  </div>
                </div>

                {/* Node cards — reduced size, no overflow */}
                {[
                  { icon: FileCheck,  label: 'Conforme NIS2 & ISO 27001',                                   desc: 'Respect continu des normes légales (RGPD, ISO 27001).',    px: 115, py: 115, color: 'text-emerald-400', iconBg: 'rgba(52,211,153,0.15)',  dot: '#34d399', delay: '0.1s' },
                  { icon: Globe,      label: 'Vérifiez en temps réel votre E-Réputation',                   desc: '',                                                          px: 480, py: 100, color: 'text-cyan-400',    iconBg: 'rgba(6,182,212,0.15)',   dot: '#06b6d4', delay: '0.2s' },
                  { icon: Lock,       label: 'Vos serveurs et accès physiques sécurisés',                   desc: 'Nous détectons les failles dans vos serveurs et accès physiques pour que vous les corrigiez mieux.', px: 845, py: 115, color: 'text-amber-400',   iconBg: 'rgba(251,191,36,0.15)',  dot: '#fbbf24', delay: '0.3s' },
                  { icon: TrendingUp, label: 'Suivez votre évolution cyber',                                 desc: 'Tableau de bord qui retrace votre niveau de sécurité dans le temps', px: 115, py: 615, color: 'text-blue-400',    iconBg: 'rgba(96,165,250,0.15)',  dot: '#60a5fa', delay: '0.4s' },
                  { icon: Users,      label: 'Vos fournisseurs audités',                                    desc: 'Audit de vos fournisseurs pour éviter la fuite de données par ailleurs', px: 480, py: 630, color: 'text-violet-400',  iconBg: 'rgba(167,139,250,0.15)', dot: '#a78bfa', delay: '0.5s' },
                  { icon: Wrench,     label: 'Les hackers veulent trouver vos failles, on les trouve avant eux', desc: 'Détection de vulnérabilités en continue',                    px: 845, py: 615, color: 'text-rose-400',    iconBg: 'rgba(251,113,133,0.15)', dot: '#fb7185', delay: '0.6s' },
                ].map((node) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.label}
                      className="absolute"
                      style={{ left: `${node.px}px`, top: `${node.py}px`, animation: `cardFadeIn 0.6s ease-out ${node.delay} both` }}
                    >
                      <div
                        className="group w-[200px] rounded-xl p-4 border border-white/25 hover:border-white/70 hover:-translate-y-2 hover:scale-[1.04] transition-all duration-300 relative"
                        style={{ background: 'rgba(3,3,3,0.88)', backdropFilter: 'blur(14px)', transform: 'translate(-50%, -50%)', boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 0 16px rgba(255,255,255,0.08)' }}
                      >
                        <div className="flex items-start gap-2.5">
                          <div
                            className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${node.color}`}
                            style={{ background: node.iconBg, border: '1px solid rgba(255,255,255,0.10)' }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-white mb-1 leading-tight">{node.label}</h4>
                            <p className="text-xs text-white leading-relaxed">{node.desc}</p>
                          </div>
                        </div>
                        <div
                          className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full"
                          style={{ background: node.dot, boxShadow: `0 0 6px ${node.dot}`, animation: 'dotPulse360 2.4s ease-in-out infinite' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile fallback grid */}
            <div className="lg:hidden">
              <div className="flex justify-center mb-8">
                <div
                  className="w-24 h-24 rounded-full bg-[#030303] border-2 border-cyan-400/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-cyan-400/80 hover:scale-105"
                  style={{ boxShadow: '0 0 40px rgba(6,182,212,0.3)' }}
                >
                  <Shield className="w-7 h-7 text-cyan-400 mb-1" />
                  <p className="text-[0.5rem] font-mono uppercase tracking-wider text-cyan-300 leading-tight">VOTRE<br />ENTREPRISE</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SHIELD_NODES.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div key={i} className="group rounded-xl p-4 border border-white/25 hover:border-white/70 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-200 relative"
                      style={{ background: 'rgba(3,3,3,0.88)', backdropFilter: 'blur(14px)', boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 0 16px rgba(255,255,255,0.08)' }}>
                      <div className="flex items-start gap-3">
                        <div
                          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${node.color}`}
                          style={{ background: node.iconBg, border: '1px solid rgba(255,255,255,0.10)' }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-1 leading-tight">{node.label}</h4>
                          <p className="text-xs text-white leading-relaxed">{node.desc}</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full"
                        style={{ background: node.dot, boxShadow: `0 0 6px ${node.dot}` }} />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[0.65rem] font-mono uppercase tracking-[0.2em] mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
                Questions fréquentes
              </h2>
              {/* "10x moins chère" highlight */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-5 transition-all duration-300 hover:scale-105 cursor-default"
                style={{ border: '1px solid rgba(6,182,212,0.35)', background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0.04) 100%)', boxShadow: '0 0 30px rgba(6,182,212,0.12)' }}>
                <span className="text-2xl font-black text-cyan-400" style={{ textShadow: '0 0 20px rgba(6,182,212,0.5)' }}>10×</span>
                <span className="text-sm font-semibold text-white">moins chère</span>
                <span className="text-white text-xs">qu&apos;un RSSI externalisé classique</span>
              </div>
            </div>

            <FAQAccordion />

            {/* Alert banner */}
            <div className="mt-10 flex items-start gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-6 py-4 transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/15 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]">
              <AlertTriangle className="shrink-0 w-5 h-5 text-amber-400 mt-0.5" />
              <p className="text-sm text-amber-200 leading-relaxed">
                <span className="font-bold">60% des PME</span> victimes d&apos;une cyberattaque déposent le bilan dans les 18 mois. NIS2 entre en application : sanctions jusqu&apos;à 10M€.
              </p>
            </div>
          </div>
        </section>

        {/* ── FEATURE TABLE ── */}
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Comparatif de nos packs{' '}
                <span className="text-white">Essentiel</span>,{' '}
                <span className="text-cyan-400">Premium</span>,{' '}
                <span className="text-violet-400">Entreprise</span>
              </h2>
            </div>

            {(() => {
              // Column styles — applied to EVERY cell in each plan column
              const C1 = 'border-l border-white/[0.07]'; // Essentiel
              const C2 = 'border-l-2 border-cyan-500/50 bg-cyan-500/[0.07]'; // Premium — cyan lane
              const C3 = 'border-l-2 border-violet-500/40 bg-violet-500/[0.06]'; // Entreprise — violet lane

              const levierRows: FeatureRow[] = [
                { label: 'Amélioration scoring assureur', values: [true, '✔✔', '✔✔✔'] },
                { label: 'Réduction prime estimée',       values: ["Jusqu'à -10%", "⭐ Jusqu'à -20%", "🔥 Jusqu'à -30%"] },
              ];
              const catDefs = [
                { title: 'Levier Assurance',         tag: '01', suffix: '🛡️ CYBER ASSURANCE', rows: levierRows,                bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', text: 'text-emerald-400' },
                { title: 'Conformité & Gouvernance', tag: '02', suffix: null, rows: FEATURE_CATEGORIES[0].rows, bg: 'bg-cyan-500/10',    border: 'border-cyan-500/25',    text: 'text-cyan-400'    },
                { title: 'Détection & Protection',   tag: '03', suffix: null, rows: FEATURE_CATEGORIES[1].rows, bg: 'bg-rose-500/10',    border: 'border-rose-500/25',    text: 'text-rose-400'    },
                { title: 'Pilotage & Reporting',     tag: '04', suffix: null, rows: FEATURE_CATEGORIES[2].rows, bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    text: 'text-blue-400'    },
                { title: 'Veille & Exposition',      tag: '05', suffix: null, rows: FEATURE_CATEGORIES[3].rows, bg: 'bg-violet-500/10',  border: 'border-violet-500/25',  text: 'text-violet-400'  },
                { title: 'Accompagnement & Support', tag: '06', suffix: null, rows: FEATURE_CATEGORIES[4].rows, bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   text: 'text-amber-400'   },
              ];

              return (
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[680px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-[#0a0a0a]">
                        <th className="text-left px-6 py-6 w-[40%] align-bottom">
                          <span className="text-[0.6rem] font-mono uppercase tracking-[0.2em] text-white/70 block mb-1">Comparatif</span>
                          <span className="text-xl font-bold text-white uppercase tracking-widest">Pack</span>
                        </th>
                        <th className={`px-5 py-6 text-center align-bottom ${C1}`}>
                          <span className="text-[0.6rem] font-mono uppercase tracking-widest text-white/70 block mb-1">Démarrage</span>
                          <span className="text-base font-bold uppercase tracking-widest text-white">Essentiel</span>
                        </th>
                        <th className={`px-5 py-6 text-center align-bottom ${C2}`}>
                          <span className="text-[0.5rem] text-cyan-400 font-mono uppercase tracking-[0.2em] block mb-1">★ Populaire</span>
                          <span className="text-base font-bold uppercase tracking-widest text-cyan-300">Premium</span>
                        </th>
                        <th className={`px-5 py-6 text-center align-bottom ${C3}`}>
                          <span className="text-[0.6rem] font-mono uppercase tracking-widest text-white/70 block mb-1">Avancé</span>
                          <span className="text-base font-bold uppercase tracking-widest text-violet-300">Entreprise</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {catDefs.map((section) => (
                        <React.Fragment key={section.tag}>
                          {/* Category separator row — 4 cells so column colors show through */}
                          <tr className={`border-b ${section.border}`}>
                            <td className={`px-6 py-3 ${section.bg}`}>
                              <span className={`text-[0.55rem] font-mono opacity-70 mr-2 ${section.text}`}>{section.tag} //</span>
                              <span className={`text-xs font-semibold uppercase tracking-widest ${section.text}`}>{section.title}</span>
                              {section.suffix && <span className={`ml-3 text-[0.55rem] font-mono opacity-70 ${section.text}`}>{section.suffix}</span>}
                            </td>
                            <td className={`${section.bg} ${C1}`} />
                            <td className={`${section.bg} ${C2}`} />
                            <td className={`${section.bg} ${C3}`} />
                          </tr>
                          {/* Data rows */}
                          {section.rows.map((row, ri) => (
                            <tr key={ri} className={`border-b border-white/[0.04] transition-colors duration-150 hover:bg-cyan-500/[0.04] ${ri % 2 === 1 ? 'bg-white/[0.015]' : ''}`}>
                              <td className="px-6 py-4 text-sm text-white font-medium">{row.label}</td>
                              <td className={`px-5 py-4 text-center ${C1}`}><CellDisplay value={row.values[0]} /></td>
                              <td className={`px-5 py-4 text-center ${C2}`}><CellDisplay value={row.values[1]} /></td>
                              <td className={`px-5 py-4 text-center ${C3}`}><CellDisplay value={row.values[2]} /></td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── TIMELINE / PARCOURS CLIENT ── */}
        <section className="py-24 px-6 relative z-10 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
              style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 65%)' }} />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Heading */}
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[0.65rem] font-mono uppercase tracking-[0.2em] mb-4">
                Parcours Client
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Votre chemin vers le <span className="text-cyan-400">Cyber-Pilote</span>
              </h2>
              <p className="text-white text-sm mt-3 max-w-md mx-auto">
                Un processus structuré en 3 étapes pour sécuriser votre entreprise durablement.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
                style={{ background: 'linear-gradient(180deg, rgba(6,182,212,0.6) 0%, rgba(6,182,212,0.3) 50%, rgba(6,182,212,0.1) 100%)' }} />

              {[
                {
                  step: '01',
                  tag: 'Prérequis obligatoire',
                  title: 'Audit Préliminaire',
                  desc: 'Établissement du niveau de maturité cyber de votre entreprise, calcul du Cyberscore et élaboration d\'un plan d\'action sur 12–18 mois. Cette étape est obligatoire avant toute souscription.',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M11 2L2 6v5c0 5.5 3.7 10.7 9 12 5.3-1.3 9-6.5 9-12V6L11 2z" stroke="#22d3ee" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(6,182,212,0.1)"/>
                      <path d="M7.5 11l2.5 2.5 5-5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  color: 'border-cyan-500/60',
                  dotColor: '#06b6d4',
                  tagColor: 'text-cyan-400 border-cyan-500/35 bg-cyan-500/10',
                  href: '/audit-flash',
                  cta: 'Démarrer l\'audit préliminaire →',
                },
                {
                  step: '02',
                  tag: 'Construction',
                  title: 'Plan d\'Action',
                  desc: 'Définition des priorités de sécurité, des jalons et des ressources nécessaires. Ce plan d\'action devient votre feuille de route cyber pour les 12–18 prochains mois.',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect x="3" y="3" width="16" height="16" rx="2" stroke="#a78bfa" strokeWidth="1.6"/>
                      <path d="M7 8h8M7 12h6M7 16h4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  color: 'border-violet-500/50',
                  dotColor: '#a78bfa',
                  tagColor: 'text-violet-400 border-violet-500/35 bg-violet-500/10',
                  href: null,
                  cta: null,
                },
                {
                  step: '03',
                  tag: 'Activation',
                  title: 'Mise en place du Cyber-Pilote',
                  desc: 'Déploiement complet de votre dispositif Cyber-Pilote : monitoring continu, dashboards, alertes automatiques, pilotage ISO 27001 et accompagnement expert — opérationnel en 48h.',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M4 12l5 5L18 6" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="11" cy="11" r="9" stroke="#34d399" strokeWidth="1.4"/>
                    </svg>
                  ),
                  color: 'border-emerald-500/60',
                  dotColor: '#34d399',
                  tagColor: 'text-emerald-400 border-emerald-500/35 bg-emerald-500/10',
                  href: '/rssi-automatise/souscrire/premium',
                  cta: 'Activer mon Cyber-Pilote →',
                },
              ].map((item, i) => (
                <div key={i} className={`relative flex gap-8 md:gap-0 mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot on timeline */}
                  <div className="absolute left-[28px] md:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-current"
                      style={{ color: item.dotColor, background: '#030303', boxShadow: `0 0 12px ${item.dotColor}80` }} />
                  </div>

                  {/* Card — alternating sides on desktop */}
                  <div className={`ml-14 md:ml-0 w-full md:w-[calc(50%-2.5rem)] group`}>
                    <div className={`relative rounded-2xl p-6 border transition-all duration-300 hover:shadow-[0_0_28px_rgba(6,182,212,0.12)] hover:-translate-y-1 ${item.color}`}
                      style={{ background: 'rgba(8,15,28,0.8)', backdropFilter: 'blur(12px)' }}>
                      {/* Step number */}
                      <span className="absolute top-3 right-4 text-[0.55rem] font-mono text-white/50 tracking-widest">{item.step}</span>
                      {/* Tag + icon */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: `${item.dotColor}18`, border: `1px solid ${item.dotColor}30` }}>
                          {item.icon}
                        </div>
                        <span className={`text-[0.6rem] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${item.tagColor}`}>
                          {item.tag}
                        </span>
                      </div>
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight">{item.title}</h3>
                      {/* Description */}
                      <p className="text-sm text-white leading-relaxed">{item.desc}</p>
                      {/* Optional CTA */}
                      {item.cta && item.href && (
                        <a href={item.href}
                          className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold transition-colors duration-200"
                          style={{ color: item.dotColor }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                        >
                          {item.cta}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block w-[5rem] shrink-0" />
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING CARDS ── */}
        <section className="py-16 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Choisissez votre offre
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">TARIFS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative z-10">
              {([
                {
                  id: 'essentiel',
                  icon: Shield,
                  iconCls: 'border-white/10 bg-white/5 text-white group-hover:border-white/20 group-hover:text-white',
                  name: 'Essentiel',
                  nameCls: 'text-white',
                  price: '1 950',
                  prefix: null,
                  priceSuffix: 'text-white/60',
                  sub: 'Démarrez votre mise en conformité',
                  subCls: 'text-white',
                  outerGrad: 'bg-gradient-to-b from-white/10 to-transparent hover:from-white/20',
                  innerBg: '#0a0a0a',
                  glowCls: 'bg-zinc-800/20 group-hover:bg-zinc-700/30',
                  dividerFrom: 'from-white/10',
                  checksCls: 'text-white/60 group-hover:text-white',
                  featureCls: 'text-white',
                  ctaCls: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
                  ctaLabel: 'Démarrer maintenant',
                  ctaHref: '/rssi-automatise/souscrire/essentiel',
                  popular: false,
                  badge: null,
                  features: [
                    'Registre des risques automatisé',
                    'Pilotage ISO 27001 (basique)',
                    'Reporting RGPD & NIS2 partiel',
                    'Scan vulnérabilités mensuel',
                    'Monitoring SSL & ports 24/7',
                    'KPI & dashboards mensuels',
                    'Rapport mensuel',
                    'Alertes hebdomadaires',
                    'Support standard',
                  ],
                },
                {
                  id: 'premium',
                  icon: Zap,
                  iconCls: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
                  name: 'Premium',
                  nameCls: 'text-cyan-300',
                  price: '4 500',
                  prefix: null,
                  priceSuffix: 'text-white/60',
                  sub: 'SI structuré avec enjeux réglementaires forts',
                  subCls: 'text-white',
                  outerGrad: 'bg-gradient-to-b from-cyan-500/50 via-cyan-500/10 to-transparent hover:from-cyan-400/60',
                  innerBg: '#0a0a0f',
                  glowCls: 'bg-cyan-600/15 group-hover:bg-cyan-500/20',
                  dividerFrom: 'from-cyan-500/30',
                  checksCls: 'text-cyan-400',
                  featureCls: 'text-white',
                  ctaCls: 'bg-white text-[#030303] hover:bg-zinc-200',
                  ctaLabel: 'Démarrer maintenant',
                  ctaHref: '/rssi-automatise/souscrire/premium',
                  popular: true,
                  badge: '★ POPULAIRE — Protection Active 360°',
                  features: [
                    'Registre des risques automatisé',
                    'Pilotage ISO 27001 (basique)',
                    'Reporting RGPD & NIS2 partiel',
                    'Scan vulnérabilités mensuel',
                    'Monitoring SSL & ports 24/7',
                    'KPI & dashboards mensuels',
                    'Rapport mensuel',
                    'Alertes hebdomadaires',
                    'Support standard',
                    'ISO 27001 automatisé & reporting complet',
                    'Reporting RGPD & NIS2 complet',
                    'Scan vulnérabilités 2× / mois',
                    'Scan Cloud (AWS, Azure, GCP)',
                    'Dark Web monitoring hebdomadaire',
                    'OSINT & veille réputation hebdo',
                    'KPI par service automatisés',
                    'Outil de suivi standard',
                    'Alertes quotidiennes',
                    'Support prioritaire',
                    'Analyse du besoin et documentation',
                    '1 exercice de crise par an',
                  ],
                },
                {
                  id: 'enterprise',
                  icon: Eye,
                  iconCls: 'border-violet-500/25 bg-violet-500/10 text-violet-400 group-hover:border-violet-500/40 group-hover:text-violet-300',
                  name: 'Entreprise',
                  nameCls: 'text-violet-300',
                  price: '8 500',
                  prefix: 'Dès',
                  priceSuffix: 'text-white/60',
                  sub: 'Plusieurs entités ou SLA garanti',
                  subCls: 'text-white',
                  outerGrad: 'bg-gradient-to-b from-violet-500/30 via-violet-500/[0.08] to-transparent hover:from-violet-400/40',
                  innerBg: '#0a0a0a',
                  glowCls: 'bg-violet-800/20 group-hover:bg-violet-700/30',
                  dividerFrom: 'from-violet-500/25',
                  checksCls: 'text-violet-400 group-hover:text-violet-200',
                  featureCls: 'text-white',
                  ctaCls: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
                  ctaLabel: 'Démarrer maintenant',
                  ctaHref: '/rssi-automatise/souscrire/enterprise',
                  popular: false,
                  badge: null,
                  features: [
                    'Registre des risques automatisé',
                    'Pilotage ISO 27001 (basique)',
                    'Reporting RGPD & NIS2 partiel',
                    'Scan vulnérabilités mensuel',
                    'Monitoring SSL & ports 24/7',
                    'KPI & dashboards mensuels',
                    'Rapport mensuel',
                    'Alertes hebdomadaires',
                    'Support standard',
                    'ISO 27001 automatisé & reporting complet',
                    'Reporting RGPD & NIS2 complet',
                    'Scan vulnérabilités 2× / mois',
                    'Scan Cloud (AWS, Azure, GCP)',
                    'Dark Web monitoring hebdomadaire',
                    'OSINT & veille réputation hebdo',
                    'KPI par service automatisés',
                    'Outil de suivi standard',
                    'Alertes quotidiennes',
                    'Support prioritaire',
                    'ISO 27001 avancé multi-entités',
                    'Reporting sur-mesure (Board / Comité)',
                    'Scan vulnérabilités hebdomadaire',
                    'Scan Cloud approfondi',
                    'Dark Web & OSINT quotidiens',
                    'Alertes en temps réel',
                    'Escalade + cellule de crise dédiée',
                    'Suivi de projet',
                    'SLA garanti',
                    'Mise en place d\'un PCA',
                    '2 exercices de crise par an',
                  ],
                },
              ]).map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className={`relative group p-[1px] rounded-[24px] transition-all duration-500 h-full flex ${card.outerGrad} ${
                      card.popular
                        ? 'md:-mt-4 md:-mb-4 shadow-[0_0_40px_rgba(6,182,212,0.18)] z-20'
                        : 'shadow-2xl mt-6 md:mt-0'
                    }`}
                  >
                    {/* Badge */}
                    {card.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 rounded-full z-30 shadow-[0_0_20px_rgba(6,182,212,0.4)] whitespace-nowrap">
                        <span className="text-[10px] text-[#030303] font-bold tracking-widest uppercase">{card.badge}</span>
                      </div>
                    )}

                    <div
                      className="relative h-full w-full rounded-[23px] p-8 md:p-10 flex flex-col items-start z-10 overflow-hidden"
                      style={{ background: card.innerBg }}
                    >
                      {/* Corner glow blob */}
                      <div className={`absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full pointer-events-none transition-colors duration-700 ${card.glowCls}`} />

                      {/* Icon + plan name */}
                      <div className="flex items-center gap-3 mb-6 relative">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors shadow-inner ${card.iconCls}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-sm font-medium tracking-wide ${card.nameCls}`}>{card.name}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 mb-2 relative">
                        {card.prefix && <span className="text-sm text-white font-normal">{card.prefix}</span>}
                        <span className="text-5xl font-normal tracking-tight text-white">{card.price}</span>
                        <span className={`text-sm font-normal ${card.priceSuffix}`}>€ / mois HT</span>
                      </div>
                      <p className={`text-sm mb-8 font-normal ${card.subCls}`}>{card.sub}</p>

                      {/* Divider */}
                      <div className={`w-full h-px mb-8 bg-gradient-to-r ${card.dividerFrom} to-transparent`} />

                      {/* Features */}
                      <ul className="flex flex-col gap-4 w-full text-left mb-10 flex-1 relative z-10">
                        {card.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-3 text-sm font-normal">
                            <div className={`mt-0.5 shrink-0 transition-colors ${card.checksCls}`}>
                              <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className={card.featureCls}>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <a
                        href={card.ctaHref}
                        className={`w-full py-3 rounded-xl transition-all duration-300 flex items-center justify-center text-xs font-medium tracking-widest uppercase ${card.ctaCls}`}
                      >
                        {card.ctaLabel}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes ctaDataFloat {
            0%   { opacity: 0;    transform: translateY(0px)   scale(0.7); }
            30%  { opacity: 0.85; transform: translateY(-10px) scale(1);   }
            70%  { opacity: 0.7;  transform: translateY(-20px) scale(0.9); }
            100% { opacity: 0;    transform: translateY(-32px) scale(0.6); }
          }
          @keyframes ctaBtnGlow {
            0%, 100% { box-shadow: 0 0 28px rgba(6,182,212,0.55), 0 4px 22px rgba(6,182,212,0.4), inset 0 1px 0 rgba(255,255,255,0.15); }
            50%       { box-shadow: 0 0 48px rgba(6,182,212,0.85), 0 6px 32px rgba(6,182,212,0.6), inset 0 1px 0 rgba(255,255,255,0.2); }
          }
          @keyframes ctaNocGlow {
            0%, 100% { opacity: 0.55; }
            50%       { opacity: 0.8; }
          }
          .cta-btn-cyber { animation: ctaBtnGlow 3s ease-in-out infinite; }
          .cta-btn-cyber:hover { animation: none; box-shadow: 0 0 64px rgba(6,182,212,1), 0 8px 40px rgba(6,182,212,0.7), inset 0 1px 0 rgba(255,255,255,0.25) !important; }
        ` }} />

        <section className="relative py-24 px-6 z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #03080f 0%, #020609 60%, #030303 100%)' }}>

          {/* ── SOC/NOC backdrop simulation ── multiple "screen glow" blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Left workstation cluster */}
            <div style={{ position:'absolute', left:'3%',  top:'15%', width:220, height:120, background:'radial-gradient(ellipse, rgba(14,60,140,0.5) 0%, transparent 70%)', filter:'blur(28px)', animation:'ctaNocGlow 4s ease-in-out infinite' }} />
            <div style={{ position:'absolute', left:'8%',  top:'45%', width:160, height:90,  background:'radial-gradient(ellipse, rgba(6,100,180,0.4) 0%, transparent 70%)', filter:'blur(24px)', animation:'ctaNocGlow 5s ease-in-out infinite 1s' }} />
            <div style={{ position:'absolute', left:'1%',  top:'65%', width:180, height:80,  background:'radial-gradient(ellipse, rgba(10,50,120,0.35) 0%, transparent 70%)', filter:'blur(20px)', animation:'ctaNocGlow 3.5s ease-in-out infinite 0.5s' }} />
            {/* Right workstation cluster */}
            <div style={{ position:'absolute', right:'3%', top:'20%', width:200, height:110, background:'radial-gradient(ellipse, rgba(14,60,140,0.5) 0%, transparent 70%)', filter:'blur(28px)', animation:'ctaNocGlow 4.5s ease-in-out infinite 0.8s' }} />
            <div style={{ position:'absolute', right:'9%', top:'50%', width:150, height:85,  background:'radial-gradient(ellipse, rgba(6,100,180,0.4) 0%, transparent 70%)', filter:'blur(24px)', animation:'ctaNocGlow 3.8s ease-in-out infinite 1.5s' }} />
            <div style={{ position:'absolute', right:'2%', top:'70%', width:170, height:75,  background:'radial-gradient(ellipse, rgba(10,50,120,0.3) 0%, transparent 70%)', filter:'blur(20px)', animation:'ctaNocGlow 5.2s ease-in-out infinite 0.3s' }} />
            {/* Central ambient ceiling glow */}
            <div style={{ position:'absolute', left:'50%', top:0, transform:'translateX(-50%)', width:800, height:260, background:'radial-gradient(ellipse at 50% 0%, rgba(6,60,110,0.35) 0%, transparent 65%)', filter:'blur(40px)' }} />
            {/* Floor reflection */}
            <div style={{ position:'absolute', left:'50%', bottom:0, transform:'translateX(-50%)', width:900, height:200, background:'radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.12) 0%, transparent 65%)', filter:'blur(20px)' }} />
          </div>

          {/* Subtle full-section hex grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]" aria-hidden="true" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92'%3E%3Cpolygon fill='none' stroke='rgba(6,182,212,1)' stroke-width='1' points='40,4 76,24 76,64 40,84 4,64 4,24'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 92px',
          }} />

          {/* ── Glass panel wrapper ── */}
          <div className="max-w-2xl mx-auto relative">

            {/* The two-tone cybernetic glass panel */}
            <div className="relative rounded-3xl overflow-hidden text-center"
              style={{
                background: 'linear-gradient(160deg, rgba(6,18,42,0.97) 0%, rgba(3,12,28,0.98) 45%, rgba(2,8,20,0.96) 100%)',
                border: '1px solid rgba(6,182,212,0.45)',
                boxShadow: '0 0 0 1px rgba(6,182,212,0.12), 0 0 60px rgba(6,182,212,0.18), 0 0 130px rgba(6,60,120,0.25), inset 0 1px 0 rgba(6,182,212,0.2), inset 0 -1px 0 rgba(6,182,212,0.08)',
              }}>

              {/* Hex texture on panel */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.14]" aria-hidden="true" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='64'%3E%3Cpolygon fill='none' stroke='rgba(6,182,212,1)' stroke-width='1' points='28,3 53,17 53,47 28,61 3,47 3,17'/%3E%3C/svg%3E")`,
                backgroundSize: '56px 64px',
              }} />
              {/* Panel inner top glow strip */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.7) 30%, rgba(6,182,212,0.7) 70%, transparent 100%)' }} />
              {/* Panel inner radial top-center glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.18) 0%, transparent 65%)', filter: 'blur(20px)' }} />

              {/* Panel content */}
              <div className="relative z-10 px-8 sm:px-14 py-12">

                {/* Top badge — ⚡ CONSULTATION OFFERTE */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
                  style={{ border: '1px solid rgba(6,182,212,0.55)', background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.06) 100%)', boxShadow: '0 0 22px rgba(6,182,212,0.25), inset 0 1px 0 rgba(6,182,212,0.2)' }}>
                  {/* Lightning bolt SVG */}
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                    <path d="M7 1L1 9h5l-1 6 6-8H6L7 1z" fill="#22d3ee" stroke="#22d3ee" strokeWidth="0.5" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-cyan-200 text-[0.6rem] font-mono uppercase tracking-[0.3em] font-semibold">Consultation offerte</span>
                </div>

                {/* Feature pills row */}
                <div className="flex items-center justify-center flex-wrap gap-3 mb-9">
                  {/* Shield + lightning pill */}
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.68rem] text-cyan-200 font-medium"
                    style={{ border: '1px solid rgba(6,182,212,0.38)', background: 'rgba(6,182,212,0.08)', boxShadow: '0 0 14px rgba(6,182,212,0.12)' }}>
                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                      <path d="M6.5 1L1 3.5V7c0 3 2.5 5.2 5.5 6 3-0.8 5.5-3 5.5-6V3.5L6.5 1z" stroke="#22d3ee" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(6,182,212,0.1)"/>
                      <path d="M7 4.5L5 7.5h2.5L5.5 10.5 9 7H6.5L7 4.5z" fill="#fbbf24"/>
                    </svg>
                    Protégée en 48h
                  </span>
                  {/* Gear pill */}
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.68rem] text-cyan-200 font-medium"
                    style={{ border: '1px solid rgba(34,211,238,0.35)', background: 'rgba(34,211,238,0.07)', boxShadow: '0 0 14px rgba(34,211,238,0.1)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="2.2" stroke="#22d3ee" strokeWidth="1.2"/>
                      <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.6 2.6l1.1 1.1M10.3 10.3l1.1 1.1M11.4 2.6l-1.1 1.1M3.7 10.3l-1.1 1.1" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    Conforme ISO 27001
                  </span>
                </div>

                {/* Main heading */}
                <h2 className="font-bold tracking-tight leading-tight mb-5">
                  <span className="block text-4xl md:text-5xl text-white mb-1.5">
                    Chaque semaine sans protection
                  </span>
                  <span className="block text-3xl md:text-[2.6rem]" style={{ color: '#22d3ee', textShadow: '0 0 35px rgba(6,182,212,0.6), 0 0 70px rgba(6,182,212,0.25)' }}>
                    est une semaine d&apos;exposition.
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-white text-sm leading-relaxed mb-10 max-w-md mx-auto">
                  Nos experts configurent l&apos;offre adaptée à votre entreprise en un appel de 20 minutes — sans jargon, sans engagement.
                </p>

                {/* ── CTA button — solid cyan with integrated circuit patterns ── */}
                <div className="flex justify-center mb-7">
                  <a
                    href="https://calendly.com/expert-securitrust"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn-cyber relative inline-flex items-center gap-3 px-10 py-[14px] rounded-xl font-bold text-sm text-[#040e1d] transition-all duration-200 select-none"
                    style={{
                      background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 40%, #22d3ee 60%, #06b6d4 100%)',
                    }}
                  >
                    {/* Integrated circuit traces — left side */}
                    <svg className="absolute left-0 top-0 h-full w-20 opacity-25 pointer-events-none" viewBox="0 0 80 48" preserveAspectRatio="none" fill="none">
                      <line x1="0" y1="12" x2="18" y2="12" stroke="#040e1d" strokeWidth="1"/>
                      <line x1="18" y1="12" x2="18" y2="6"  stroke="#040e1d" strokeWidth="1"/>
                      <circle cx="18" cy="5" r="1.5" fill="#040e1d"/>
                      <line x1="0" y1="36" x2="22" y2="36" stroke="#040e1d" strokeWidth="1"/>
                      <line x1="22" y1="36" x2="22" y2="42" stroke="#040e1d" strokeWidth="1"/>
                      <circle cx="22" cy="43" r="1.5" fill="#040e1d"/>
                      <circle cx="8"  cy="12" r="1.8" fill="#040e1d"/>
                      <circle cx="14" cy="36" r="1.8" fill="#040e1d"/>
                    </svg>
                    {/* Integrated circuit traces — right side */}
                    <svg className="absolute right-0 top-0 h-full w-20 opacity-25 pointer-events-none" viewBox="0 0 80 48" preserveAspectRatio="none" fill="none">
                      <line x1="80" y1="10" x2="62" y2="10" stroke="#040e1d" strokeWidth="1"/>
                      <line x1="62" y1="10" x2="62" y2="4"  stroke="#040e1d" strokeWidth="1"/>
                      <circle cx="62" cy="3" r="1.5" fill="#040e1d"/>
                      <line x1="80" y1="38" x2="58" y2="38" stroke="#040e1d" strokeWidth="1"/>
                      <line x1="58" y1="38" x2="58" y2="44" stroke="#040e1d" strokeWidth="1"/>
                      <circle cx="58" cy="45" r="1.5" fill="#040e1d"/>
                      <circle cx="72" cy="10" r="1.8" fill="#040e1d"/>
                      <circle cx="66" cy="38" r="1.8" fill="#040e1d"/>
                    </svg>
                    {/* Corner accent marks */}
                    <span className="absolute top-[3px]  left-[3px]  w-[6px] h-[6px] border-t border-l border-[#040e1d]/40 rounded-tl-sm" />
                    <span className="absolute top-[3px]  right-[3px] w-[6px] h-[6px] border-t border-r border-[#040e1d]/40 rounded-tr-sm" />
                    <span className="absolute bottom-[3px] left-[3px]  w-[6px] h-[6px] border-b border-l border-[#040e1d]/40 rounded-bl-sm" />
                    <span className="absolute bottom-[3px] right-[3px] w-[6px] h-[6px] border-b border-r border-[#040e1d]/40 rounded-br-sm" />
                    <span className="relative z-10">Réserver mon appel de 20 min</span>
                    <span className="relative z-10 text-base leading-none font-black">→</span>
                  </a>
                </div>

                {/* Micro-reassurance */}
                <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-1 text-xs text-white">
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#22d3ee" strokeWidth="1.2"/><path d="M3.5 6l2 2 3-3" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-white">Gratuit</span>
                  </span>
                  <span className="text-cyan-500/25 select-none">·</span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#22d3ee" strokeWidth="1.2"/><path d="M3.5 6l2 2 3-3" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-white">Sans engagement</span>
                  </span>
                  <span className="text-cyan-500/25 select-none">·</span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#22d3ee" strokeWidth="1.2"/><path d="M3.5 6l2 2 3-3" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-white">Disponible cette semaine</span>
                  </span>
                </div>

              </div>{/* /panel content */}

              {/* Panel bottom border glow */}
              <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.4) 30%, rgba(6,182,212,0.4) 70%, transparent 100%)' }} />
            </div>{/* /glass panel */}

            {/* ── Data-stream wave below panel ── animated cyan dots */}
            <div className="relative h-14 overflow-hidden pointer-events-none" aria-hidden="true">
              {[
                { x:'8%',  delay:0,    dur:2.2, size:3   },
                { x:'18%', delay:0.4,  dur:2.8, size:2.5 },
                { x:'27%', delay:0.9,  dur:2.4, size:4   },
                { x:'36%', delay:0.2,  dur:2.6, size:2   },
                { x:'44%', delay:1.1,  dur:2.1, size:3.5 },
                { x:'52%', delay:0.6,  dur:2.9, size:2.5 },
                { x:'60%', delay:1.4,  dur:2.3, size:3   },
                { x:'68%', delay:0.3,  dur:2.7, size:2   },
                { x:'76%', delay:0.8,  dur:2.5, size:4   },
                { x:'84%', delay:1.2,  dur:2.2, size:2.5 },
                { x:'92%', delay:0.5,  dur:2.8, size:3   },
              ].map((dot, i) => (
                <span key={i} style={{
                  position: 'absolute',
                  left: dot.x,
                  bottom: 0,
                  width:  dot.size,
                  height: dot.size,
                  borderRadius: '50%',
                  background: `rgba(6,182,212,${0.5 + (i % 3) * 0.15})`,
                  boxShadow: `0 0 ${dot.size * 2}px rgba(6,182,212,0.6)`,
                  animation: `ctaDataFloat ${dot.dur}s ease-in-out infinite ${dot.delay}s`,
                }} />
              ))}
            </div>

          </div>{/* /panel wrapper */}
        </section>

        <Footer />
      </div>
    </div>
  );
}
