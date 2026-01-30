import React from 'react';

export function PropositionMap() {
  return (
    <section id="network" className="py-16 md:py-24 bg-[#030303]">
        <div className="max-w-[1920px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 border border-border bg-[#080808] p-2 relative overflow-hidden reveal min-h-[400px] md:min-h-[500px]">
                    <div className="absolute inset-0 z-0">
                        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3e590790-e144-4deb-9989-37794b67c60e_1600w.webp" alt="SecuriTrust Network Map" className="w-full h-full object-cover opacity-40 grayscale brightness-75 contrast-125" />
                    </div>
                    <div className="scan-line z-10 pointer-events-none"></div>
                    <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div className="bg-[#030303]/80 backdrop-blur-md p-4 border border-border">
                                <h2 className="font-display text-xl md:text-2xl font-semibold mb-1 text-white tracking-tight uppercase">Topology Défensive</h2>
                                <p className="text-[#888888] text-[10px] font-mono uppercase tracking-widest">STATUS: MONITORING</p>
                            </div>
                            <div className="flex gap-2 items-center text-[#00ffa3]">
                                <div className="w-2 h-2 bg-[#00ffa3] rounded-full animate-pulse"></div>
                                <div className="font-mono text-[10px] hidden md:block uppercase tracking-widest">SECURE LINK ACTIVE</div>
                            </div>
                        </div>
                        <div className="absolute top-[30%] left-[20%] w-20 h-20 border border-[#00ffa3]/20 rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-1 h-1 bg-[#00ffa3] rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-[#030303] border border-border p-6 reveal h-full flex flex-col justify-center">
                        <h3 className="font-semibold text-white mb-6 text-sm uppercase flex items-center gap-2 tracking-widest font-mono">
                            <span className="w-2 h-2 bg-[#00ffa3] rounded-sm"></span>
                            Statistiques Experts
                        </h3>
                        <div className="space-y-4 font-mono text-[#888888]">
                            {[
                              { l: "Consultants Certifiés", v: "15+", c: "text-white" },
                              { l: "Missions Réalisées", v: "500+", c: "text-[#00ffa3]" },
                              { l: "Score R&D", v: "A+", c: "text-white" }
                            ].map((s, i) => (
                              <div key={i} className="flex justify-between items-center p-3 bg-[#080808] border border-border">
                                  <span className="text-[10px] uppercase tracking-widest">{s.l}</span>
                                  <span className={`text-xs font-semibold tracking-tighter ${s.c}`}>{s.v}</span>
                              </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
