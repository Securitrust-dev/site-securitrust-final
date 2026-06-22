'use client';

import Link from 'next/link';
import { ArrowRight, Eye, Lock, FileText, ShieldCheck } from 'lucide-react';

/* Risk badge */
const RiskBadge = ({ grade, label, color }: { grade: string; label: string; color: string }) => {
  const colors: Record<string, string> = {
    green:  'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    yellow: 'bg-amber-500/15  border-amber-500/30  text-amber-400',
    red:    'bg-red-500/15    border-red-500/30    text-red-400',
    cyan:   'bg-cyan-500/15   border-cyan-500/30   text-cyan-400',
  };
  return (
    <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${colors[color]} text-xs`}>
      <span className="text-slate-300 font-medium">{label}</span>
      <span className={`font-bold text-sm ${colors[color].split(' ')[2]}`}>{grade}</span>
    </div>
  );
};

export const ScorecardSection = () => (
  <section className="relative py-24 bg-[#020817] overflow-hidden">
    {/* Section number */}
    <div className="pointer-events-none absolute top-8 left-8 text-[9rem] font-black text-white/[0.025] leading-none select-none"
      style={{ fontFamily: "'Sora', sans-serif" }}>02</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — explanation */}
        <div className="space-y-6">
          <div className="text-cyan-500/70 text-xs uppercase tracking-widest font-semibold">
            Le livrable concret
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}>
            Votre <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#22d3ee,#0891b2)' }}>ScoreCard</span> sécurité<br />livrée en 48h
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Après chaque audit, vous recevez un rapport structuré avec un score de maturité sur 100, une vue attaquant externe, et des recommandations priorisées par niveau de risque.
          </p>
          <ul className="space-y-2.5">
            {[
              '10 facteurs analysés (réseau, apps, IAM, cloud, RGPD…)',
              "Vue attaquant externe — ce qu'un hacker voit de vous",
              'Criticité A/B/C/D par vulnérabilité',
              "Plan d'action priorisé + estimation de remédiation",
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                <span className="text-cyan-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Orange CTA */}
          <a
            href="https://calendly.com/expert-securitrust"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              boxShadow: '0 0 32px rgba(249,115,22,.4), 0 4px 20px rgba(249,115,22,.25)',
            }}
          >
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            Demander ma ScoreCard gratuite
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>

          <Link href="/pentest-au-resultat"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Voir un exemple de rapport <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right — ScoreCard mockup */}
        <div className="relative">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -inset-8 -z-10"
            style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.07) 0%, transparent 70%)' }} />

          {/* Card */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur p-6 shadow-[0_0_60px_rgba(2,8,23,.9)]">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Rapport ScoreCard</p>
                <p className="text-white font-semibold text-sm">Exemple Entreprise SAS</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800 px-2.5 py-1.5 rounded-full border border-slate-700">
                <Eye className="w-3 h-3" />
                Vue attaquant
              </div>
            </div>

            {/* ── Attractive score visual ── */}
            <div className="relative mb-5 rounded-xl overflow-hidden border border-slate-700/40"
              style={{ background: 'rgba(15,23,42,0.8)' }}>

              {/* Blurred fake report data (underneath) */}
              <div className="p-5 blur-sm select-none pointer-events-none" aria-hidden>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full flex-shrink-0"
                    style={{ border: '3px solid #22d3ee', background: 'rgba(34,211,238,0.1)' }} />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full rounded-full w-[62%]" style={{ background: 'linear-gradient(90deg,#22d3ee,#0891b2)' }} />
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500 w-[38%]" />
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-red-500 w-[15%]" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-slate-700 rounded w-full" />
                  <div className="h-2 bg-slate-700 rounded w-4/5" />
                  <div className="h-2 bg-slate-700 rounded w-3/5" />
                  <div className="h-2 bg-slate-700 rounded w-2/3" />
                </div>
              </div>

              {/* Frosted overlay with score badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: 'rgba(2,8,23,0.6)', backdropFilter: 'blur(3px)' }}>

                {/* Score ring */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      border: '3px solid #22d3ee',
                      boxShadow: '0 0 28px rgba(34,211,238,0.55), 0 0 56px rgba(34,211,238,0.18)',
                      background: 'rgba(2,8,23,0.92)',
                    }}>
                    <div className="text-center">
                      <span className="text-white font-black text-3xl leading-none"
                        style={{ fontFamily: "'Sora', sans-serif" }}>62</span>
                      <span className="text-cyan-400 text-xs block leading-none font-semibold">/100</span>
                    </div>
                  </div>
                  {/* Pulsing outer ring */}
                  <div className="absolute inset-0 rounded-full animate-ping opacity-[0.18]"
                    style={{ border: '2px solid #22d3ee' }} />
                </div>

                <p className="text-cyan-300 text-xs font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Score de maturité cyber
                </p>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 border border-slate-700/80 rounded-full px-3 py-1 bg-slate-900/70">
                  <Lock className="w-2.5 h-2.5" />
                  RAPPORT CONFIDENTIEL
                </div>
              </div>
            </div>

            {/* Risk factors grid */}
            <div className="grid grid-cols-2 gap-2">
              <RiskBadge grade="A" label="Authentification"  color="cyan"   />
              <RiskBadge grade="B" label="Réseau périmètre"  color="green"  />
              <RiskBadge grade="C" label="Applications web"  color="yellow" />
              <RiskBadge grade="D" label="Gestion des accès" color="red"    />
              <RiskBadge grade="B" label="Sauvegarde & DR"   color="green"  />
              <RiskBadge grade="C" label="Conformité RGPD"   color="yellow" />
            </div>

            {/* Bottom note */}
            <p className="text-center text-slate-600 text-xs mt-4 pt-4 border-t border-slate-800">
              10 facteurs analysés · Livré sous 48h
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
);
