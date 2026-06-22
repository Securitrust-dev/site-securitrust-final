'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import {
  TrendingUp, Eye, FileCheck, ArrowRight, CheckCircle, Shield
} from 'lucide-react';

const pillars = [
  {
    id: 1,
    icon: TrendingUp,
    tag: 'Pilier 1',
    title: 'Pentest & Sécurité des Systèmes Critiques',
    accroche: 'Évitez la paralysie opérationnelle avant qu\'elle ne coûte des millions.',
    services: ['Pentest Interne', 'Pentest Externe', 'Pentest Web / Mobile', 'Test de Résistance Ransomware'],
    logique: 'Tester tout ce qui peut bloquer la production.',
    href: '/cybersecurite-operationnelle/proteger-chiffre-affaires',
    border: 'border-cyan-500/30',
    tagBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    iconBg: 'bg-cyan-500/10 text-cyan-400',
    checkColor: 'text-cyan-400',
    gradient: 'from-cyan-500/10 to-cyan-500/5',
    arrowColor: 'text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/50',
  },
  {
    id: 2,
    icon: Eye,
    tag: 'Pilier 2',
    title: 'Gestion des Risques Cyber & Protection de la Réputation',
    accroche: 'Anticipez les incidents avant qu\'ils n\'atteignent la presse ou vos clients.',
    services: ['OSINT', 'Campagnes de Phishing', 'Pentest Externe', 'Red Team'],
    logique: 'Prévenir ce qui peut fuiter publiquement ou être weaponisé contre votre marque.',
    href: '/cybersecurite-operationnelle/preserver-image-confiance',
    border: 'border-violet-500/30',
    tagBg: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    iconBg: 'bg-violet-500/10 text-violet-400',
    checkColor: 'text-violet-400',
    gradient: 'from-violet-500/10 to-violet-500/5',
    arrowColor: 'text-violet-400',
    hoverBorder: 'hover:border-violet-500/50',
  },
  {
    id: 3,
    icon: FileCheck,
    tag: 'Pilier 3',
    title: 'Audit de Conformité & Cybersécurité Réglementaire',
    accroche: 'Soyez prêt pour chaque audit, appel d\'offres et obligation légale.',
    services: ['Audit de Configuration', 'Audit d\'Architecture', 'Audit de Code Source', 'Audit Flash', 'Restitution COMEX', 'Documentation Conformité'],
    logique: 'Rassurer les partenaires, assureurs et investisseurs avec des livrables certifiables.',
    href: '/cybersecurite-operationnelle/exigences-reglementaires',
    border: 'border-emerald-500/30',
    tagBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
    checkColor: 'text-emerald-400',
    gradient: 'from-emerald-500/10 to-emerald-500/5',
    arrowColor: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/50',
  },
];

export default function CybersecuriteOperationnellePage() {
  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60" />
        <div className="stars opacity-20" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Cybersécurité Opérationnelle
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Pentest Entreprise & Audit Cybersécurité en France —{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Testez, Anticipez, Protégez.
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-10 leading-relaxed">
              Nos prestations de cybersécurité offensive sont structurées autour de trois enjeux business critiques. Chaque test livré correspond à un risque réel — financier, réputationnel ou réglementaire.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
              {['6 services spécialisés', 'Livrables COMEX-ready', 'Experts certifiés OSCP / CEH'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 Piliers — cartes cliquables */}
        <section className="relative pb-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={pillar.id}
                  href={pillar.href}
                  className={`group relative flex flex-col rounded-2xl border ${pillar.border} ${pillar.hoverBorder} bg-gradient-to-br ${pillar.gradient} p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
                >
                  {/* Icon + Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl ${pillar.iconBg} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${pillar.tagBg}`}>
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-black text-white mb-3 leading-snug">
                    {pillar.title}
                  </h2>

                  {/* Accroche */}
                  <p className="text-amber-300 text-sm font-semibold mb-5 leading-snug">
                    {pillar.accroche}
                  </p>

                  {/* Services liste */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {pillar.services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-white">
                        <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${pillar.checkColor}`} />
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* Logique métier */}
                  <p className="text-xs text-white italic border-t border-white/5 pt-4 mb-5 leading-relaxed">
                    {pillar.logique}
                  </p>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 text-sm font-semibold ${pillar.arrowColor} group-hover:gap-3 transition-all`}>
                    Découvrir ce pilier
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* CTA final */}
        <section className="relative pb-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-10">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                Quel est votre enjeu prioritaire ?
              </h2>
              <p className="text-white mb-8 leading-relaxed">
                Chaque organisation a ses propres risques. Échangeons sur vos priorités pour identifier les tests les plus pertinents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/prise-de-rdv"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-sm hover:from-cyan-400 hover:to-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-500/20"
                >
                  Échanger avec un expert
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/proposition-commerciale"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-bold text-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                >
                  Voir une proposition type
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <ExpertCTAButton />
        <InternalLinks pageKey="cybersecurite-operationnelle" />
        <Footer />
      </div>
    </div>
  );
}
