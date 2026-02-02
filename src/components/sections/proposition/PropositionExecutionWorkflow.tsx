import React from 'react';

export function PropositionExecutionWorkflow() {
  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-border">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#9abff2]/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-20 reveal">
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none mb-4 text-center">
            Workflow <span className="text-[#9abff2]">d&apos;exécution</span>
          </h2>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 py-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2"></div>

          {/* CARD 1: CADRAGE */}
          <div className="reveal w-full max-w-sm lg:w-[22%] group">
            <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 hover:border-[#9abff2]/30 hover:bg-[#0a0a0a]">
              <div className="flex justify-between items-start mb-10">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Échange</span>
                <div className="w-10 h-10 rounded-xl bg-[#9abff2]/10 flex items-center justify-center text-[#9abff2]">
                  <iconify-icon icon="solar:users-group-rounded-bold" width="22"></iconify-icon>
                </div>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                Cadrage <br />& Kick Off
              </h3>
            </div>
          </div>

          {/* CARD 2: OFFENSIVE */}
          <div className="reveal w-full max-w-sm lg:w-[26%] group">
            <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 hover:border-[#9abff2]/30 hover:bg-[#0a0a0a]">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Production</span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <iconify-icon icon="solar:shield-check-bold" width="22"></iconify-icon>
                </div>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                Offensive & Tests
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {['TEST V1', 'TEST V2', 'TEST V3', 'TEST DEF'].map((t) => (
                  <span key={t} className="px-3 py-1 bg-indigo-900/40 border border-indigo-500/20 text-[10px] font-bold text-indigo-300 rounded uppercase">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-[#9abff2]/5 border border-[#9abff2]/10 flex items-center justify-center text-[#9abff2]/40">
                    <iconify-icon icon="solar:letter-bold" width="16"></iconify-icon>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 3: ANALYSE */}
          <div className="reveal w-full max-w-sm lg:w-[28%] group">
            <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 hover:border-[#9abff2]/30 hover:bg-[#0a0a0a]">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Production</span>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <iconify-icon icon="solar:pen-new-square-bold" width="22"></iconify-icon>
                </div>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                Analyse & Rapports
              </h3>
              
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-6">
                <p className="text-[11px] font-mono text-white/60">
                  Audit technique - <span className="text-[#9abff2]">45 vulnérabilités identifiées</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {['DOC V1', 'DOC V2', 'DOC V3', 'DOC VF'].map((t) => (
                  <span key={t} className="px-3 py-1 bg-indigo-900/40 border border-indigo-500/20 text-[10px] font-bold text-indigo-300 rounded uppercase">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-[#9abff2]/5 border border-[#9abff2]/10 flex items-center justify-center text-[#9abff2]/40">
                    <iconify-icon icon="solar:letter-bold" width="16"></iconify-icon>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 4: LIVRAISON */}
          <div className="reveal w-full max-w-sm lg:w-[20%] group">
            <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 relative overflow-hidden transition-all duration-500 hover:border-[#9abff2]/30 hover:bg-[#0a0a0a]">
              <div className="flex justify-between items-start mb-10">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Production</span>
                <div className="w-10 h-10 rounded-xl bg-[#9abff2]/10 flex items-center justify-center text-[#9abff2]">
                  <iconify-icon icon="solar:cloud-upload-bold" width="22"></iconify-icon>
                </div>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                Livraison <br />Finale
              </h3>
            </div>
          </div>
        </div>

        {/* Legend / Roles Footer */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 reveal">
          <div className="flex items-center gap-4 px-6 py-3 bg-indigo-600 rounded-lg">
            <div className="w-4 h-4 rounded-full bg-white/20"></div>
            <span className="text-white font-bold uppercase tracking-widest text-sm">Entreprise</span>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 bg-[#9abff2] rounded-lg">
            <div className="w-4 h-4 rounded-full bg-black/20"></div>
            <span className="text-black font-bold uppercase tracking-widest text-sm">SecuriTrust</span>
          </div>
        </div>
      </div>
    </section>
  );
}
