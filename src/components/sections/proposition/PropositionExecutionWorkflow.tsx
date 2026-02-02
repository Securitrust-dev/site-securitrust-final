import React from 'react';

interface PropositionExecutionWorkflowProps {
  companyName?: string;
}

export function PropositionExecutionWorkflow({ companyName }: PropositionExecutionWorkflowProps) {
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

        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0 items-start min-h-[500px]">
          {/* CARD 1: CADRAGE */}
          <div className="lg:pr-4 lg:pt-0 reveal">
            <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#9abff2] transition-all max-w-[280px]">
              <div className="flex justify-between items-start mb-10">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Échange</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9abff2]">
                  <iconify-icon icon="solar:users-group-rounded-linear" width="18"></iconify-icon>
                </div>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white leading-tight mb-2 uppercase">Cadrage<br/>& kick off</h3>
            </div>
          </div>

          {/* CARD 2: OFFENSIVE */}
          <div className="lg:-ml-8 lg:pt-20 reveal">
            <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#9abff2] transition-all min-w-[320px] lg:w-[450px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Production</span>
                <iconify-icon icon="solar:shield-up-linear" className="text-indigo-400" width="20"></iconify-icon>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white leading-tight mb-6 uppercase">Offensive & Tests</h3>
              
              <div className="flex items-center gap-2 mb-6">
                {['V1', 'V2', 'V3', 'DEF'].map((v) => (
                  <div key={v} className="bg-indigo-600/20 text-indigo-400 px-2.5 py-1 rounded text-[9px] font-bold border border-indigo-600/30 uppercase tracking-wider">
                    TEST {v}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-9 h-9 rounded bg-[#d9f99d]/20 flex items-center justify-center text-[#d9f99d] border border-[#d9f99d]/30">
                    <iconify-icon icon="solar:letter-linear" width="18"></iconify-icon>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 3: ANALYSE */}
          <div className="lg:-ml-12 lg:pt-40 reveal">
            <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#9abff2] transition-all min-w-[320px] lg:w-[450px]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Production</span>
                <iconify-icon icon="solar:document-add-linear" className="text-indigo-400" width="20"></iconify-icon>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white leading-tight mb-6 uppercase">Analyse & Rapports</h3>
              
              <div className="bg-white/5 border border-white/10 rounded-full h-9 flex items-center px-4 mb-6">
                <span className="text-[10px] text-gray-400 font-mono tracking-wider">Audit technique - 45 vulnérabilités identifiées</span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {['V1', 'V2', 'V3', 'VF'].map((v) => (
                  <div key={v} className="bg-indigo-600/20 text-indigo-400 px-2.5 py-1 rounded text-[9px] font-bold border border-indigo-600/30 uppercase tracking-wider">
                    DOC {v}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-9 h-9 rounded bg-[#d9f99d]/20 flex items-center justify-center text-[#d9f99d] border border-[#d9f99d]/30">
                    <iconify-icon icon="solar:letter-linear" width="18"></iconify-icon>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 4: LIVRAISON */}
          <div className="lg:pt-72 lg:flex lg:justify-end reveal">
            <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#9abff2] transition-all max-w-[240px] w-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Production</span>
                <iconify-icon icon="solar:cloud-check-linear" className="text-white" width="20"></iconify-icon>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white leading-tight uppercase">Livraison<br/>Finale</h3>
            </div>
          </div>
        </div>

        {/* Legend / Roles Footer */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 reveal">
          <div className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-600/20">
            {companyName || "ENTREPRISE"}
          </div>
          <div className="bg-[#d9f99d] text-[#030303] px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#d9f99d]/20">
            SECURITRUST
          </div>
        </div>
      </div>
    </section>
  );
}
