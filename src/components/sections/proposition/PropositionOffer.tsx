import React from 'react';

export function PropositionOffer() {
  return (
    <section id="token" className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#080808] p-8 md:p-24 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center items-center relative overflow-hidden reveal order-2 md:order-1">
            <div className="relative w-56 h-56 md:w-64 md:h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="45" stroke="#1a1a1a" strokeWidth="8" fill="none"></circle>
                    <circle cx="50" cy="50" r="45" stroke="#9abff2" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="283" className="token-chart-ring"></circle>
                </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl md:text-4xl font-semibold text-white tracking-tighter uppercase"><span className="token-stat-number" data-target="4999">0</span>€</span>
                      <span className="text-xs text-[#888888] uppercase tracking-wider">Forfait HT</span>
                  </div>
              </div>
              
                <div className="mt-8 grid grid-cols-2 gap-8 text-center w-full max-w-sm">
                    <div>
                        <div className="text-xl md:text-2xl font-semibold text-white tracking-tight">5 Jours</div>
                        <div className="text-[10px] text-[#888888] uppercase tracking-widest font-mono">Délai d'exécution</div>
                    </div>
                  <div>
                      <div className="text-xl md:text-2xl font-semibold text-[#9abff2] tracking-tight"><span className="token-stat-number" data-target="3">0</span></div>
                      <div className="text-[10px] text-[#888888] uppercase tracking-widest font-mono">Experts dédiés</div>
                  </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 w-full max-w-sm reveal">
                  <a href="/signer-proposition" className="group bg-[#9abff2] text-[#030303] px-10 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-white transition-all hover:scale-[1.02] text-center shadow-[0_0_25px_rgba(0,255,163,0.4)]">
                      Signer la proposition
                  </a>
                  <a href="#features" className="group bg-transparent border border-white/20 text-white px-10 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition-all hover:border-white/40 text-center">
                      Voir le détail
                  </a>
              </div>
          </div>

        <div className="bg-[#030303] p-8 md:p-24 flex flex-col justify-center reveal order-1 md:order-2">
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-8 tracking-tight uppercase text-white">Détails de l'Offre</h3>
            <div className="space-y-6">
                {[
                  { t: "Audit Complet", p: "Tests d'intrusion sur le périmètre défini et analyse des vulnérabilités critiques.", n: "1" },
                  { t: "Gestion des Risques", p: "Évaluation de la maturité et recommandations basées sur les standards OWASP & ISO.", n: "2" },
                  { t: "Soutenance Live", p: "Présentation des résultats en visio-conférence avec vos équipes techniques.", n: "3" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9abff2] font-semibold font-mono shrink-0">{item.n}</div>
                      <div>
                          <h4 className="font-semibold text-white text-lg uppercase tracking-tight">{item.t}</h4>
                          <p className="text-sm md:text-base text-[#888888]">{item.p}</p>
                      </div>
                  </div>
                ))}
            </div>
        </div>
    </section>
  );
}
