import { GraduationCap, Play, Shield } from 'lucide-react';

export function FormationsHero() {
  return (
    <>
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
              E-Learning Cybersecurite
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
              FORMATIONS EN LIGNE
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
              Montez en competences en <strong>cybersecurite</strong> avec nos formations video animees par des experts du terrain. Du pentest web au forensics, progressez a votre rythme.
            </p>
            <div className="flex flex-wrap gap-6 justify-center mt-10">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-full border border-cyan-500/30 bg-black/50 flex items-center justify-center">
                  <Play className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm">+80h de video</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-full border border-cyan-500/30 bg-black/50 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm">5 formations</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-full border border-cyan-500/30 bg-black/50 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm">Acces a vie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">
              Domaines
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
              {['Pentest', 'OWASP', 'Hacking Ethique', 'Reseaux', 'GRC / RGPD', 'Forensics', 'Pentest', 'OWASP', 'Hacking Ethique'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
