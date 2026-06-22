import React from 'react';

export function PropositionAuditPhase() {
  const standards = [
    {
      name: "PTES (Penetration Testing Execution Standard)",
      desc: "pour le cadre global des tests, depuis la reconnaissance jusqu'au reporting."
    },
    {
      name: "OSSTMM (Open Source Security Testing Methodology Manual)",
      desc: "une évaluation rigoureuse de la surface d'attaque, des vecteurs et des contre-mesures."
    },
    {
      name: "OWASP",
      desc: "Tests applicatifs web exposés sur l'Internet."
    },
    {
      name: "MITRE ATT&CK Framework",
      desc: "Simulation réaliste de comportements d'attaquants, notamment lors des phases internes."
    }
  ];

  const phases = [
    {
      title: "Reconnaissance",
      icon: "solar:minimalistic-magnifer-bold",
      color: "bg-red-500/10",
      iconColor: "text-red-500"
    },
    {
      title: "Accès initial",
      icon: "solar:lock-unlocked-bold",
      color: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      title: "Post-Exploitation",
      icon: "solar:ghost-bold",
      color: "bg-blue-500/10",
      iconColor: "text-blue-500"
    },
    {
      title: "Reporting",
      icon: "solar:clipboard-list-bold",
      color: "bg-gray-500/10",
      iconColor: "text-gray-400"
    }
  ];

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-border">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#9abff2]/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-20 reveal">
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none mb-4">
            Méthodologie - <span className="text-[#9abff2]">Phase d&apos;audit</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 font-display uppercase tracking-wider">
            Tests de sécurité technique : <span className="text-white font-bold">Tests d&apos;intrusion</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Standards Column */}
          <div className="reveal">
            <h3 className="text-lg font-mono text-[#9abff2] uppercase tracking-[0.2em] mb-8">
              Standards de référence
            </h3>
            <p className="text-white/80 mb-10 text-lg">
              Nous vous proposons une méthodologie hybride, s&apos;appuyant sur les standards suivants :
            </p>
            <div className="space-y-6">
              {standards.map((std, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <span className="text-[#9abff2] font-bold shrink-0 pt-1">➤</span>
                  <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors">
                    <span className="font-bold text-[#9abff2]">{std.name}</span> — {std.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Phases Column */}
          <div className="reveal bg-[#080808] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                 Workflow Audit
               </div>
            </div>

              <p className="text-white/80 mb-12 text-lg">
                Cette méthodologie se séquence en plusieurs phases :
              </p>

              <div className="grid grid-cols-1 gap-12 relative">
                 {/* Types of tests */}
                 <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center group hover:border-[#9abff2]/40 transition-all">
                       <div className="w-12 h-12 rounded-full border border-[#9abff2]/30 flex items-center justify-center mb-4 font-bold text-[#9abff2]">1</div>
                       <h4 className="text-white font-bold uppercase tracking-tighter">Tests d&apos;intrusion externe</h4>
                       <p className="text-[#9abff2] text-xs font-mono mt-2">✓ Boîte noire</p>
                    </div>
                 </div>

               {/* Phases visualizer */}
               <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 pt-8 border-t border-white/10">
                  {phases.map((phase, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center gap-3 group">
                        <div className={`w-16 h-16 rounded-full ${phase.color} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative`}>
                           <iconify-icon icon={phase.icon} className={phase.iconColor} width="28"></iconify-icon>
                           {/* Pulse effect for first phases */}
                           {idx < 3 && <div className="absolute inset-0 rounded-full bg-current opacity-0 animate-ping"></div>}
                        </div>
                        <span className="text-xs font-mono uppercase text-white/60 group-hover:text-white transition-colors">{phase.title}</span>
                      </div>
                      {idx < phases.length - 1 && (
                        <div className="hidden md:block flex-grow h-[1px] bg-gradient-to-r from-white/5 via-white/20 to-white/5"></div>
                      )}
                    </React.Fragment>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
