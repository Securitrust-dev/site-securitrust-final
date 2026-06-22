'use client';

import Link from 'next/link';
import { Search, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';

const segments = [
  {
    icon: Search,
    title: 'Tester ma sécurité',
    sub: 'Pentest · Audit',
    desc: 'Identifiez vos failles avant les attaquants. Garantie au résultat : remboursé si aucune vulnérabilité trouvée.',
    href: '/pentest-au-resultat',
    badge: 'Garantie au résultat',
    besoin: 'tester',
  },
  {
    icon: ShieldCheck,
    title: 'Piloter ma sécurité',
    sub: 'Cyber-Pilote · RSSI externalisé',
    desc: 'Un RSSI expert dédié à votre PME, sans les charges d\'un recrutement. Stratégie, pilotage, gouvernance.',
    href: '/rssi-externalise',
    badge: null,
    besoin: 'piloter',
  },
  {
    icon: FileCheck,
    title: 'Être conforme',
    sub: 'NIS2 · RGPD · ISO 27001',
    desc: 'Accompagnement complet pour votre mise en conformité réglementaire. Auditeurs AFNOR certifiés.',
    href: '/conformite-nis2',
    badge: 'NIS2 en vigueur',
    besoin: 'conformite',
  },
];

export const SegmentationBar = () => (
  <section className="relative py-14 bg-[#020817] border-y border-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <p className="text-center text-slate-500 text-xs uppercase tracking-widest font-semibold mb-8">
        Quel est votre besoin ?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {segments.map(({ icon: Icon, title, sub, desc, href, badge }) => (
          <Link key={title} href={href}
            className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 hover:bg-slate-900/70 transition-all duration-200 hover:shadow-[0_0_32px_rgba(34,211,238,.06)]">

            {/* Badge */}
            {badge && (
              <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                {badge}
              </span>
            )}

            {/* Icon */}
            <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-200">
              <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-200" strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-base mb-0.5" style={{ fontFamily: "'Sora', sans-serif" }}>
                {title}
              </h3>
              <p className="text-cyan-500/70 text-xs font-medium tracking-wide mb-3">{sub}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-cyan-400 transition-colors duration-200 font-medium">
              En savoir plus <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
