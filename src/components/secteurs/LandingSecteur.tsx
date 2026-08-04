"use client";

import Link from "next/link";

// Landing page sectorielle — SecuriTrust
// Tailwind CSS uniquement, dark theme bg-[#020817]

const STATUT_STYLES: Record<string, string> = {
  Obligatoire: "bg-red-500/10 text-red-400 border border-red-500/30",
  "Obligatoire (contractuel)": "bg-red-500/10 text-red-400 border border-red-500/30",
  "Obligatoire selon seuils": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  "Obligation NIS2": "bg-red-500/10 text-red-400 border border-red-500/30",
  "Selon seuils": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  "Prérequis HDS": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  "Déclaratif annuel": "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  Périodique: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  Contractuel: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  "Exigé par les clients US": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  "Quasi-incontournable": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  Applicable: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  Recommandé: "bg-slate-500/10 text-slate-400 border border-slate-500/30",
  "Bonne pratique": "bg-slate-500/10 text-slate-400 border border-slate-500/30",
  "Standard de référence": "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  "Mesure prioritaire": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  "Exigence NIS2": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
};

function statutCls(s: string) {
  return STATUT_STYLES[s] ?? "bg-slate-500/10 text-slate-400 border border-slate-500/30";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LandingSecteur({ data }: { data: any }) {
  return (
    <div className="bg-[#020817] text-white min-h-screen" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(118,166,209,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-24">
          <span className="inline-flex items-center gap-2 text-[#76a6d1] text-xs font-semibold uppercase tracking-[0.12em] border border-[#76a6d1]/25 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(118,166,209,0.06)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" /><path d="m9 12 2 2 4-4" />
            </svg>
            {data.eyebrow}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.08] tracking-tight mb-6 max-w-3xl"
            style={{ background: "linear-gradient(180deg,#fff 0%,#c4d4e6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {data.hero.titre}
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
            {data.hero.sousTitre}
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="#contact"
              className="inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
              {data.cta.bouton}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#pourquoi"
              className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 font-semibold px-7 py-3.5 rounded-xl hover:border-[#76a6d1]/50 hover:text-[#76a6d1] transition-all duration-200 text-sm">
              {"Pourquoi c'est urgent"}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]">
            {data.stats.map((s: { valeur: string; legende: string }, i: number) => (
              <div key={i}>
                <div className="text-3xl font-extrabold text-[#76a6d1] tracking-tight">{s.valeur}</div>
                <div className="text-slate-400 text-sm mt-1 leading-snug">{s.legende}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI ─────────────────────────────────────────── */}
      <section id="pourquoi" className="py-24" style={{ background: "#030d1a" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">{data.pourquoi.titre}</h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-3xl mb-12">{data.pourquoi.intro}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.pourquoi.points.map((p: { titre: string; texte: string }, i: number) => (
              <div key={i} className="rounded-2xl p-7 border border-white/[0.08] hover:border-[#76a6d1]/30 transition-colors duration-300"
                style={{ background: "linear-gradient(180deg,#0a1f35 0%,#030d1a 100%)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-orange-400 mb-5 border border-orange-500/20"
                  style={{ background: "rgba(249,115,22,0.08)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-3 leading-snug">{p.titre}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NORMES ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#020817] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <span className="text-[#76a6d1] text-xs font-bold uppercase tracking-[0.12em] mb-3 block">Conformité réglementaire</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">{data.normes.titre}</h2>
          <p className="text-slate-400 text-base mb-12 max-w-2xl">
            Certifications, audits annuels, échéances : voici ce que votre secteur impose et ce que SecuriTrust prend en charge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.normes.items.map((n: { nom: string; statut: string; desc: string }, i: number) => (
              <div key={i} className="rounded-xl p-6 border border-white/[0.08] hover:border-[#76a6d1]/30 transition-colors duration-300"
                style={{ background: "#0a1f35" }}>
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <h3 className="text-white font-bold text-base leading-snug">{n.nom}</h3>
                  <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${statutCls(n.statut)}`}>
                    {n.statut}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCOMPAGNEMENT ───────────────────────────────────── */}
      <section className="py-24" style={{ background: "#030d1a" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-12">{data.accompagnement.titre}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {data.accompagnement.etapes.map((e: { titre: string; texte: string }, i: number) => (
              <div key={i} className="flex gap-5">
                <div className="text-4xl font-extrabold leading-none shrink-0 w-10 text-right" style={{ color: "rgba(118,166,209,0.18)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[#76a6d1]"
                      style={{ background: "rgba(118,166,209,0.1)" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    {e.titre}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{e.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-[#020817] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(118,166,209,0.07) 0%,transparent 65%)", filter: "blur(60px)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5 leading-tight"
            style={{ background: "linear-gradient(180deg,#fff 0%,#b9cce0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {data.cta.titre}
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">{data.cta.texte}</p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
              {data.cta.bouton}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <a href="https://calendly.com/expert-securitrust" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 font-semibold px-8 py-4 rounded-xl hover:border-[#76a6d1]/50 hover:text-[#76a6d1] transition-all duration-200">
              Prendre rendez-vous
            </a>
          </div>
          <p className="text-slate-500 text-sm">Diagnostic offert · Sans engagement · Réponse sous 48h ouvrées</p>
        </div>
      </section>

    </div>
  );
}
