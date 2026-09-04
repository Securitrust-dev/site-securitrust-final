'use client';

import Link from 'next/link';
import {
  Shield, ShieldCheck, FileLock, Building2, Award, GraduationCap,
} from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'RSSI Externalisé',
    desc: 'Pilotage stratégique et opérationnel de la sécurité, avec un expert dédié selon un format flexible ou entièrement externalisé.',
    href: '/rssi-externalise',
  },
  {
    icon: ShieldCheck,
    title: 'Audits & Pentests',
    desc: 'Évaluation approfondie de vos environnements IT, tests d\'intrusion réalistes et analyses détaillées des vulnérabilités.',
    href: '/services',
  },
  {
    icon: FileLock,
    title: 'Conformité RGPD',
    desc: 'Accompagnement global pour structurer votre conformité et sécuriser vos traitements avec la prise en charge par un DPO externalisé.',
    href: '/mise-en-conformite-rgpd',
  },
  {
    icon: Building2,
    title: 'Gouvernance SSI',
    desc: 'Conception et implémentation de politiques de sécurité adaptées à vos enjeux métier et à vos exigences réglementaires.',
    href: '/grc-cyber',
  },
  {
    icon: Award,
    title: 'ISO 27001 & 27701',
    desc: 'Préparation complète à la conformité et à la certification de vos systèmes de management de la sécurité et de la confidentialité.',
    href: '/iso27001-hds',
  },
  {
    icon: GraduationCap,
    title: 'Formations Cyber',
    desc: 'Sensibilisation, entraînement et montée en compétence des équipes face aux menaces opérationnelles.',
    href: '/sensibilisation-formation',
  },
];

export const ServicesSectionV2 = () => (
  <section className="relative py-24 overflow-hidden bg-[#020817]" id="services">
    {/* Background glow */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-[0.12]"
        style={{ background: 'radial-gradient(ellipse, #7c3aed 0%, #be185d 50%, transparent 70%)' }} />
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
            Notre accompagnement
          </h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed max-w-sm md:text-right">
          Nous répondons aux enjeux majeurs de la cybersécurité avec une méthodologie structurée et des normes de référence, assurant une protection robuste et durable.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(({ icon: Icon, title, desc, href }) => (
          <Link key={title} href={href}
            className="group relative flex flex-col gap-5 p-7 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(124,58,237,.12)]"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,.08) 0%, rgba(190,24,93,.06) 100%)' }} />

            {/* Icon box */}
            <div className="relative w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="relative">
              <h3 className="text-white font-bold text-lg leading-snug mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {desc}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
              style={{ background: 'linear-gradient(90deg, #7c3aed, #be185d)' }} />
          </Link>
        ))}
      </div>
    </div>
  </section>
);
