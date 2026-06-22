'use client';

import React from 'react';

const ACCENT = '#74a2cd';

const nodes = [
  {
    col: 'left',
    label: 'Réunion de Lancement',
    desc: 'Kick-off',
    color: ACCENT,
    glow: 'rgba(116,162,205,0.3)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    col: 'left',
    label: 'Reconnaissance & Analyse',
    desc: 'J1 — Phase 1',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.3)',
    offset: 'md:translate-x-12',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    col: 'left',
    label: "Compromission d'Identité",
    desc: 'J2 — Phase 2',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.3)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    col: 'right',
    label: 'Mouvement Latéral',
    desc: 'J3 — Phase 3',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.3)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    col: 'right',
    label: 'Persistance & Exfiltration',
    desc: 'J4 — Phase 4',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.3)',
    offset: 'md:-translate-x-12',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    col: 'right',
    label: 'Restitution & Accompagnement',
    desc: 'J5 — Phase 5',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.3)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

function Node({ node }: { node: typeof nodes[0] }) {
  return (
    <div className={`group relative ${node.offset ?? ''}`}>
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${node.glow}, transparent 60%)` }}
      />
      <div
        className="relative flex h-[76px] w-[76px] md:h-[88px] md:w-[88px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06]"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
        <span style={{ color: node.color, filter: `drop-shadow(0 0 10px ${node.glow})` }}>
          {node.icon}
        </span>
      </div>
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono tracking-wider text-white uppercase">
        {node.label}
      </div>
    </div>
  );
}

export function PropositionObjectifs() {
  return (
    <>
      {/* ── Section Objectifs ── */}
        <section id="objectifs" className="relative py-20 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 md:p-14">
              <p className="text-white text-xl md:text-2xl font-medium mb-10">
                L&apos;objectif des prestations vise à améliorer le niveau de cybersécurité de l&apos;entreprise, et notamment :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  "Évaluer la sécurité de l'Active Directory.",
                  "Identifier les vulnérabilités exploitables.",
                  "Simuler une attaque interne réaliste.",
                  "Détecter les escalades de privilèges possibles.",
                  "Classifier les failles selon CVSS.",
                  "Fournir des recommandations de correction.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                    <span className="text-white text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* ── Section Roadmap (hub diagram) ── */}
      <section id="roadmap" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, ${ACCENT}08, transparent 70%)` }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 bg-gradient-to-br from-white/[0.06] via-white/0 to-white/[0.06] rounded-3xl border border-white/[0.06] py-10">
          <div className="flex flex-col gap-10 w-full mb-12">
            <div className="flex items-center gap-6">
              <span className="text-xs font-mono tracking-widest" style={{ color: ACCENT }}>02</span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="uppercase text-xs tracking-widest text-white font-sans">Périmètre Technique</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <div className="max-w-3xl flex flex-col gap-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white font-sans font-bold">
                  Audit Active Directory.{' '}
                  <span className="block font-light text-white">Boîte grise, vecteurs réels.</span>
                </h2>
                <p className="text-white text-base max-w-xl">
                  Simulation depuis un poste utilisateur authentifié — les mêmes vecteurs qu&apos;un attaquant interne disposant d&apos;un compte domaine standard.
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[560px] flex w-full relative items-center justify-center mt-8">
            <svg
              className="absolute inset-0 hidden h-full w-full pointer-events-none md:block"
              viewBox="0 0 1000 560"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="stWire" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.00" />
                  <stop offset="25%" stopColor="#ffffff" stopOpacity="0.10" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.18" />
                  <stop offset="75%" stopColor="#ffffff" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="stNoodle" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
                  <stop offset="50%" stopColor={ACCENT} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                </linearGradient>
                <filter id="stWireGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="stDotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path d="M 165 130 L 290 130 Q 360 130 360 200 V 255 Q 360 280 390 280 L 440 280" stroke="url(#stWire)" strokeWidth="1.5" fill="none" filter="url(#stWireGlow)" opacity="0.5" />
              <path d="M 165 430 L 290 430 Q 360 430 360 360 V 305 Q 360 280 390 280 L 440 280" stroke="url(#stWire)" strokeWidth="1.5" fill="none" filter="url(#stWireGlow)" opacity="0.5" />
              <path d="M 229 280 L 440 280" stroke="url(#stWire)" strokeWidth="1.5" fill="none" filter="url(#stWireGlow)" opacity="0.5" />
              <path d="M 440 280 L 560 280" stroke="url(#stWire)" strokeWidth="1.5" fill="none" filter="url(#stWireGlow)" opacity="0.3" />
              <path d="M 560 280 L 771 280" stroke="url(#stWire)" strokeWidth="1.5" fill="none" filter="url(#stWireGlow)" opacity="0.5" />
              <path d="M 835 130 L 710 130 Q 640 130 640 200 V 255 Q 640 280 610 280 L 560 280" stroke="url(#stWire)" strokeWidth="1.5" fill="none" filter="url(#stWireGlow)" opacity="0.5" />
              <path d="M 835 430 L 710 430 Q 640 430 640 360 V 305 Q 640 280 610 280 L 560 280" stroke="url(#stWire)" strokeWidth="1.5" fill="none" filter="url(#stWireGlow)" opacity="0.5" />
              <path d="M 165 130 L 290 130 Q 360 130 360 200 V 255 Q 360 280 390 280 L 440 280" stroke="url(#stNoodle)" strokeWidth="2" fill="none" filter="url(#stWireGlow)" className="st-noodle" />
              <path d="M 165 430 L 290 430 Q 360 430 360 360 V 305 Q 360 280 390 280 L 440 280" stroke="url(#stNoodle)" strokeWidth="2" fill="none" filter="url(#stWireGlow)" className="st-noodle" />
              <path d="M 229 280 L 440 280" stroke="url(#stNoodle)" strokeWidth="2" fill="none" filter="url(#stWireGlow)" className="st-noodle-delayed" />
              <path d="M 835 130 L 710 130 Q 640 130 640 200 V 255 Q 640 280 610 280 L 560 280" stroke="url(#stNoodle)" strokeWidth="2" fill="none" filter="url(#stWireGlow)" className="st-noodle" />
              <path d="M 835 430 L 710 430 Q 640 430 640 360 V 305 Q 640 280 610 280 L 560 280" stroke="url(#stNoodle)" strokeWidth="2" fill="none" filter="url(#stWireGlow)" className="st-noodle" />
              <path d="M 440 280 L 560 280" stroke="url(#stNoodle)" strokeWidth="2" fill="none" filter="url(#stWireGlow)" className="st-noodle-delayed" />
              <path d="M 560 280 L 771 280" stroke="url(#stNoodle)" strokeWidth="2" fill="none" filter="url(#stWireGlow)" className="st-noodle-delayed" />
              <circle cx="440" cy="280" r="3" fill={ACCENT} filter="url(#stDotGlow)" className="animate-pulse" />
              <circle cx="560" cy="280" r="3" fill={ACCENT} filter="url(#stDotGlow)" className="animate-pulse" />
            </svg>

            <div className="relative z-10 grid h-full w-full grid-cols-1 gap-14 md:grid-cols-3 md:gap-0">
              <div className="flex h-full flex-row items-center justify-center gap-8 px-4 md:flex-col md:gap-14 md:px-12">
                {nodes.filter(n => n.col === 'left').map((node, i) => (
                  <Node key={i} node={node} />
                ))}
              </div>
              <div className="flex items-center justify-center py-10 md:py-0">
                <div className="relative">
                  <div className="absolute -inset-10 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${ACCENT}40, transparent 65%)` }} />
                  <div
                    className="absolute -inset-[20%] rounded-full opacity-40 pointer-events-none st-beam-spin"
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, ${ACCENT}66 360deg)`,
                      maskImage: 'radial-gradient(transparent 55%, black 60%)',
                      WebkitMaskImage: 'radial-gradient(transparent 55%, black 60%)',
                    }}
                  />
                  <div
                    className="absolute -inset-[15%] rounded-full opacity-20 pointer-events-none st-beam-spin-reverse"
                    style={{
                      background: `conic-gradient(from 180deg at 50% 50%, transparent 0deg, transparent 240deg, ${ACCENT}99 360deg)`,
                      maskImage: 'radial-gradient(transparent 55%, black 60%)',
                      WebkitMaskImage: 'radial-gradient(transparent 55%, black 60%)',
                    }}
                  />
                  <div
                    className="relative flex h-[110px] w-[110px] md:h-[132px] md:w-[132px] items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl"
                    style={{ boxShadow: `0 40px 100px -40px ${ACCENT}bb` }}
                  >
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
                    <div className="absolute inset-[10px] rounded-full border border-white/[0.10]" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ color: ACCENT, filter: `drop-shadow(0 0 20px ${ACCENT}99)` }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex h-full flex-row items-center justify-center gap-8 px-4 md:flex-col md:gap-14 md:px-12">
                {nodes.filter(n => n.col === 'right').map((node, i) => (
                  <Node key={i} node={node} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes st-noodle-flow {
            0%   { stroke-dashoffset: 400; opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
          .st-noodle { stroke-dasharray: 80 320; animation: st-noodle-flow 3s linear infinite; }
          .st-noodle-delayed { stroke-dasharray: 80 320; animation: st-noodle-flow 3s linear 1.5s infinite; }
          @keyframes st-beam-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .st-beam-spin { animation: st-beam-spin 8s linear infinite; }
          .st-beam-spin-reverse { animation: st-beam-spin 12s linear infinite reverse; }
        `}</style>
      </section>
    </>
  );
}
