import React from 'react';

interface PropositionRoadmapProps {
  companyName: string;
}

export function PropositionRoadmap({ companyName }: PropositionRoadmapProps) {
  return (
    <section id="roadmap" className="py-24 bg-[#030303] border-t border-border overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12 flex items-center justify-between reveal">
                <div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tight uppercase text-white">Déroulement du Projet</h2>
                    <p className="text-[#888888] text-sm md:text-base max-w-md">Un calendrier structuré pour une exécution agile et transparente.</p>
                </div>
                <div className="hidden md:block text-right">
                    <div className="font-mono text-[10px] text-[#00ffa3] uppercase tracking-widest">TIMELINE_V2</div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-20 reveal">
                <div className="flex items-center gap-12 flex-1">
                    <div className="text-center shrink-0">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">Semaine 1</span>
                        <span className="text-white font-medium text-sm">du 02 au 06 février</span>
                    </div>
                    <div className="h-px bg-border flex-1 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-border bg-[#030303] flex items-center justify-center">
                            <iconify-icon icon="solar:arrow-right-linear" className="text-gray-500" width="16"></iconify-icon>
                        </div>
                    </div>
                    <div className="text-center shrink-0">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">Semaine 2</span>
                        <span className="text-white font-medium text-sm">du 09 au 13 février</span>
                    </div>
                </div>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0 items-start min-h-[500px]">
                <div className="lg:pr-4 lg:pt-0 reveal">
                    <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#00ffa3] transition-all max-w-[280px]">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Échange</span>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00ffa3]">
                              <iconify-icon icon="solar:users-group-rounded-linear" width="18"></iconify-icon>
                            </div>
                        </div>
                        <h3 className="text-2xl font-display font-semibold text-white leading-tight mb-2 uppercase">Cadrage<br/>& kick off</h3>
                    </div>
                </div>

                <div className="lg:-ml-8 lg:pt-20 reveal">
                    <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#00ffa3] transition-all min-w-[320px] lg:w-[450px]">
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

                <div className="lg:-ml-12 lg:pt-40 reveal">
                    <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#00ffa3] transition-all min-w-[320px] lg:w-[450px]">
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

                <div className="lg:pt-72 lg:flex lg:justify-end reveal">
                    <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#00ffa3] transition-all max-w-[240px] w-full">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Production</span>
                            <iconify-icon icon="solar:cloud-check-linear" className="text-white" width="20"></iconify-icon>
                        </div>
                        <h3 className="text-2xl font-display font-semibold text-white leading-tight uppercase">Livraison<br/>Finale</h3>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-12 reveal">
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
