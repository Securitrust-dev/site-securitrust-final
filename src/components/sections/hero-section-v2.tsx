'use client';

import { useState } from 'react';
import { ArrowRight, Shield, CheckCircle2, Eye, Lock, FileText } from 'lucide-react';
import Image from 'next/image';

const clientLogos = [
  { src: '/clients/abeille-assurance.jpg', alt: 'Abeille Assurance' },
  { src: '/clients/axa.webp',              alt: 'AXA' },
  { src: '/clients/bollore.webp',          alt: 'Bolloré Logistics' },
  { src: '/clients/cegedim.jpg',           alt: 'Cegedim' },
  { src: '/clients/malakoff.jpg',          alt: 'Malakoff Médéric' },
  { src: '/clients/lyvoc.png',             alt: 'Lyvoc' },
  { src: '/clients/thales.jpg',            alt: 'Thales' },
  { src: '/clients/natixis.jpg',           alt: 'Natixis' },
  { src: '/clients/munich-re.svg',         alt: 'Munich Re' },
  { src: '/clients/backupta.png',          alt: 'BackupTa' },
];

/* ── ScoreCard mini-mockup ─────────────────────────────── */
const riskBadges = [
  { grade: 'A', label: 'Authentification',  color: 'cyan'   },
  { grade: 'B', label: 'Réseau périmètre',  color: 'green'  },
  { grade: 'C', label: 'Applications web',  color: 'yellow' },
  { grade: 'D', label: 'Gestion des accès', color: 'red'    },
  { grade: 'B', label: 'Sauvegarde & DR',   color: 'green'  },
  { grade: 'C', label: 'Conformité RGPD',   color: 'yellow' },
];
const badgeColors: Record<string, string> = {
  cyan:   'border text-[#76a6d1]',
  green:  'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  yellow: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
  red:    'bg-red-500/15 border-red-500/30 text-red-400',
};

const ScoreCardPreview = () => (
  <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 overflow-hidden mb-5">
    {/* Mini header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
      <div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Rapport ScoreCard</p>
        <p className="text-white font-semibold text-xs mt-0.5">Exemple Entreprise SAS</p>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
        <Eye className="w-2.5 h-2.5" />
        Vue attaquant
      </div>
    </div>

    {/* Score visual */}
    <div className="relative py-4 flex flex-col items-center gap-2" style={{ background: 'rgba(15,23,42,0.8)' }}>
      {/* Blurred background */}
      <div className="absolute inset-0 pointer-events-none select-none blur-sm opacity-30 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2" style={{ borderColor: '#76a6d1' }} />
      </div>
      {/* Score badge */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            border: '2.5px solid #76a6d1',
            boxShadow: '0 0 20px rgba(118,166,209,0.45), 0 0 40px rgba(118,166,209,0.12)',
            background: 'rgba(2,8,23,0.92)',
          }}>
          <div className="text-center">
            <span className="text-white font-black text-xl leading-none" style={{ fontFamily: "'Sora', sans-serif" }}>62</span>
            <span className="text-[9px] block leading-none font-semibold" style={{ color: '#76a6d1' }}>/100</span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-[0.15]" style={{ border: '1.5px solid #76a6d1' }} />
      </div>
      <p className="text-[10px] font-semibold flex items-center gap-1" style={{ color: '#76a6d1' }}>
        <FileText className="w-3 h-3" />Score de maturité cyber
      </p>
      <div className="flex items-center gap-1 text-[9px] text-slate-400 border border-slate-700/80 rounded-full px-2.5 py-0.5 bg-slate-900/70">
        <Lock className="w-2 h-2" />RAPPORT CONFIDENTIEL
      </div>
    </div>

    {/* Risk badges */}
    <div className="grid grid-cols-3 gap-px bg-slate-800/40">
      {riskBadges.map(({ grade, label, color }) => (
        <div key={label} className={`flex items-center justify-between px-2.5 py-2 bg-[#020817] text-[10px] border-t border-slate-800/40`}>
          <span className="text-slate-400 truncate pr-1">{label}</span>
          <span className={`font-bold text-xs flex-shrink-0 px-1.5 py-0.5 rounded border ${badgeColors[color]}`}>{grade}</span>
        </div>
      ))}
    </div>

    <p className="text-center text-slate-600 text-[10px] py-2 border-t border-slate-800">
      10 facteurs analysés · Livré sous 48h
    </p>
  </div>
);

/* ── Lead Form ─────────────────────────────────────────── */
const LeadForm = () => {
  const [fields, setFields] = useState({ url: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const update = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(prev => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!fields.email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organisation: fields.url, email: fields.email }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inp = "w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-400 transition-colors";

  if (status === 'done') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">Audit en cours !</h3>
        <p className="text-slate-400 text-sm">Votre diagnostic cyber est en cours d&apos;analyse. Les résultats vous seront envoyés par email.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <input type="url" placeholder="URL de votre site (ex: monentreprise.fr)" value={fields.url} onChange={update('url')} className={inp} />
      <input type="email" placeholder="Email professionnel *" value={fields.email} onChange={update('email')} className={inp} />
      <button
        onClick={submit}
        disabled={status === 'loading' || !fields.email}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          boxShadow: '0 0 32px rgba(249,115,22,.5), 0 4px 20px rgba(249,115,22,.3)',
        }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 48px rgba(249,115,22,.7), 0 6px 28px rgba(249,115,22,.4)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(249,115,22,.5), 0 4px 20px rgba(249,115,22,.3)')}
      >
        {status === 'loading' ? 'Analyse en cours…' : <>Lancer mon audit gratuit maintenant <ArrowRight className="w-4 h-4" /></>}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs text-center">Une erreur s&apos;est produite. Réessayez.</p>}
      <p className="text-slate-500 text-xs text-center">Résultats immédiats · Sans engagement · RGPD conforme</p>
    </div>
  );
};

/* ── Hero V2 ─────────────────────────────────────────────── */
export const HeroSectionV2 = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 overflow-hidden bg-[#020817]">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #76a6d1 0%, transparent 65%)' }} />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #5a90be 0%, transparent 65%)' }} />
        {/* Grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-[0.025]" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 items-start">

          {/* LEFT — Promise */}
          <div className="space-y-6">
            {/* Label pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide border"
              style={{ background: 'rgba(118,166,209,0.08)', borderColor: 'rgba(118,166,209,0.25)', color: '#76a6d1' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#76a6d1' }} />
              Pentest · Audit · RSSI Externalisé
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.12] text-white text-left"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              Votre pentest gratuit,{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #76a6d1, #5a90be)' }}>
                vous payez seulement si nous détectons des failles dans votre SI.
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
              Cabinet de cybersécurité certifié — nous sécurisons votre SI, assurons votre conformité NIS2 / RGPD / ISO 27001, et prenons le risque avec vous.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: 'Auditeur AFNOR officiel', color: 'cyan' },
                { label: 'ISO 27001 Lead Auditor', color: 'cyan' },
                { label: 'OSCP · CEH · PNPT', color: 'cyan' },
                { label: '15 ans d\'expertise', color: 'slate' },
              ].map(({ label, color }) => (
                <span key={label} className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium border
                  ${color === 'cyan'
                    ? 'border text-[#76a6d1]'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                  style={color === 'cyan' ? { background: 'rgba(118,166,209,0.08)', borderColor: 'rgba(118,166,209,0.25)' } : {}}>
                  <Shield className="w-3 h-3" />
                  {label}
                </span>
              ))}
            </div>

            {/* Key stats */}
            <div className="flex flex-wrap gap-8 pt-2">
              {[
                { value: '+86', label: 'Pentests réalisés' },
                { value: '97%', label: 'Vulnérabilités critiques détectées' },
                { value: '+105', label: 'Conformités ISO 27001' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold" style={{ color: '#76a6d1', fontFamily: "'Sora', sans-serif" }}>{value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Secondary CTA */}
            <div className="flex items-center gap-4 flex-wrap pt-1">
              <a href="/pentest-au-resultat"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 px-4 py-2.5 rounded-xl transition-colors">
                Découvrir notre garantie <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>+100 entreprises sécurisées</span>
              </div>
            </div>

            {/* Client logos carousel */}
            <div className="pt-2">
              <p className="text-slate-300 text-[10px] uppercase tracking-widest font-medium mb-4">Ils nous font confiance</p>
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10"
                  style={{ background: 'linear-gradient(to right, #020817, rgba(2,8,23,0))' }} />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10"
                  style={{ background: 'linear-gradient(to left, #020817, rgba(2,8,23,0))' }} />
                <div
                  className="flex items-center gap-10"
                  style={{ animation: 'marquee 24s linear infinite', whiteSpace: 'nowrap', willChange: 'transform' }}
                  onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
                  onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
                >
                  {[...clientLogos, ...clientLogos].map((logo, i) => (
                    <div key={i} className="flex-shrink-0 h-8 flex items-center">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={100}
                        height={32}
                        className="object-contain max-h-8 w-auto"
                        style={{ filter: 'invert(1)', opacity: 0.7, mixBlendMode: 'screen' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Lead Form */}
          <div className="lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_60px_rgba(2,8,23,.8)]">
              {/* Top gradient accent */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #76a6d1, #5a90be)' }} />

              <div className="p-7">
                <div className="mb-5">
                  <h2 className="text-white font-bold text-xl mb-1.5" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Votre audit gratuit immédiat
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Entrez votre URL — l&apos;analyse démarre immédiatement, sans engagement.
                  </p>
                </div>

                {/* ScoreCard preview — shows what the client receives */}
                <ScoreCardPreview />

                <LeadForm />

                {/* Social proof */}
                <div className="mt-6 pt-5 border-t border-slate-800 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border"
                    style={{ background: 'rgba(118,166,209,0.1)', borderColor: 'rgba(118,166,209,0.25)' }}>
                    <Shield className="w-4 h-4" style={{ color: '#76a6d1' }} />
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    <strong className="text-slate-300">+100 entreprises</strong> nous font confiance — RGPD conforme, données hébergées en France.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sora font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
      `}</style>
    </section>
  );
};
