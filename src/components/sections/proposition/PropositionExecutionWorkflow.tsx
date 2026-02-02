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
              <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#9abff2] transition-all max-w-[320px]">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Échange</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9abff2]">
                    <iconify-icon icon="solar:users-group-rounded-linear" width="18"></iconify-icon>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-white leading-tight mb-4 uppercase">1. Cadrage<br/>& kick off</h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Cette phase d&apos;initialisation assure l&apos;alignement organisationnel et technique avant le lancement des tests.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9abff2] shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Identification des actifs</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Définition des IP publiques et services critiques à auditer.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9abff2] shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Prérequis techniques</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Collecte des URL, domaines et documentations nécessaires.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9abff2] shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Gouvernance</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Désignation d&apos;interlocuteurs et signature de l&apos;autorisation.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CARD 2: OFFENSIVE */}
            <div className="lg:-ml-8 lg:pt-20 reveal">
              <div className="bg-[#080808] border border-border p-8 rounded-lg relative group hover:border-[#9abff2] transition-all min-w-[320px] lg:w-[480px]">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Production</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                    <iconify-icon icon="solar:shield-up-linear" width="20"></iconify-icon>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-white leading-tight mb-4 uppercase">2. Offensive & Tests</h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Nos experts simulent une attaque réelle en mode &quot;Boîte Noire&quot; pour éprouver vos défenses externes.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Reconnaissance</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">OSINT, DNS/WHOIS et cartographie numérique.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Scanning Actif</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Ports, sous-domaines et certificats SSL/TLS.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Exploitation</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Intrusions réelles (RCE, SQLi, XXE) et OWASP Top 10.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Post-Exploitation</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Simulation de fuite et évaluation EDR/Logs.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {['V1', 'V2', 'V3', 'DEF'].map((v) => (
                      <div key={v} className="bg-indigo-600/20 text-indigo-400 px-2.5 py-1 rounded text-[9px] font-bold border border-indigo-600/30 uppercase tracking-wider">
                        TEST {v}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded bg-[#d9f99d]/10 flex items-center justify-center text-[#d9f99d] border border-[#d9f99d]/20">
                        <iconify-icon icon="solar:letter-linear" width="16"></iconify-icon>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: ANALYSE */}
            <div className="lg:-ml-12 lg:pt-40 reveal">
              <div className="bg-[#080808] border border-border p-8 rounded-lg relative group hover:border-[#9abff2] transition-all min-w-[320px] lg:w-[480px]">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Production</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                    <iconify-icon icon="solar:document-add-linear" width="20"></iconify-icon>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-white leading-tight mb-4 uppercase">3. Analyse & Rapports</h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Une analyse rigoureuse des résultats pour transformer les vulnérabilités en plan d&apos;action concret.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider">Audit technique en cours...</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Analyse technique</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Qualification manuelle et élimination des faux positifs.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Synthèse managériale</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Évaluation du risque global pour la direction.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Documentation</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Fiches de scénarios, PoC et captures d&apos;écran.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    {['V1', 'V2', 'V3', 'VF'].map((v) => (
                      <div key={v} className="bg-indigo-600/20 text-indigo-400 px-2.5 py-1 rounded text-[9px] font-bold border border-indigo-600/30 uppercase tracking-wider">
                        DOC {v}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded bg-[#d9f99d]/10 flex items-center justify-center text-[#d9f99d] border border-[#d9f99d]/20">
                        <iconify-icon icon="solar:letter-linear" width="16"></iconify-icon>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: LIVRAISON */}
            <div className="lg:pt-72 lg:flex lg:justify-end reveal">
              <div className="bg-[#080808] border border-border p-6 rounded-lg relative group hover:border-[#9abff2] transition-all max-w-[320px] w-full">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Production</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white">
                    <iconify-icon icon="solar:cloud-check-linear" width="20"></iconify-icon>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-white leading-tight mb-4 uppercase">4. Livraison<br/>Finale</h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Une restitution complète pour accompagner la sécurisation de votre infrastructure.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Restitution finale</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Démonstration technique et explication normative.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Plan de remédiation</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Classification CVSS et recommandations priorisées.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">Transfert</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed">Mise à disposition des scripts pour rejouer les tests.</p>
                    </div>
                  </li>
                </ul>
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
