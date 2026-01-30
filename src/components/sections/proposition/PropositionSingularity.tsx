import React from 'react';

export function PropositionSingularity() {
  return (
    <section className="py-24 md:py-32 bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center h-[70vh] md:h-[90vh]">
        <div className="absolute inset-0 opacity-10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa933a24-d4de-4c67-83f6-b8676b3bab35_1600w.webp)] bg-cover bg-center"></div>
        <div className="singularity-wrapper">
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((size, i) => (
              <div key={i} className="tunnel-ring" style={{ width: size, height: size }}></div>
            ))}
        </div>
        <div className="relative z-10 text-center reveal pointer-events-none px-6">
            <span className="text-[#00ffa3] font-mono text-[9px] md:text-[10px] tracking-[0.5em] uppercase bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-[#00ffa3]/20">Souveraineté Numérique</span>
            <h2 className="font-display text-4xl md:text-8xl font-bold mt-6 text-white mix-blend-difference tracking-tight uppercase">
                SÉCURITÉ ABSOLUE
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mt-6 bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5 italic font-light leading-relaxed">
                Une approche offensive qui renforce vos défenses à chaque mission. Votre résilience est notre priorité absolue.
            </p>
        </div>
    </section>
  );
}
