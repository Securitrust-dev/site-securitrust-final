import React from 'react';

export function PropositionIntroduction() {
  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden border-t border-border">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00ffa3]/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-16 reveal">
          <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.8]">
            Présentation de<br />
            <span className="text-[#00ffa3]">SecuriTrust</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 reveal">
          {/* Main Info Box */}
          <div className="lg:col-span-8 flex flex-col bg-[#080808] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#00ffa3]/40 transition-all duration-500 p-8 md:p-12">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed italic">
              SecuriTrust est un cabinet de conseil avec une expertise reconnue en cybersécurité
            </h3>
            
            <ul className="space-y-6">
              <li className="flex gap-4 text-base md:text-lg text-white group/item leading-relaxed">
                <span className="text-[#00ffa3] font-bold shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity">→</span>
                <span>Pure Player en cybersécurité, nous accompagnons les entreprises depuis <span className="font-bold">2016</span> dans l&apos;évaluation et l&apos;amélioration de la sécurité de leur système d&apos;information.</span>
              </li>
              <li className="flex gap-4 text-base md:text-lg text-white group/item leading-relaxed">
                <span className="text-[#00ffa3] font-bold shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity">→</span>
                <span>Nous aidons nos clients à renforcer leur protection face aux cybermenaces et à garantir leur conformité réglementaire.</span>
              </li>
            </ul>
          </div>

          {/* Badge & Label Section */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Label Promo Box */}
            <div className="flex-1 bg-[#080808] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:border-[#00ffa3]/40 transition-all duration-500">
               <div className="mb-6 relative">
                 {/* Stylized Badge Representative of the Logo in the screenshot */}
                 <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-900 to-blue-600 border-4 border-white/20 flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]"></div>
                    <div className="flex flex-col items-center text-white font-black leading-none uppercase">
                      <span className="text-[10px] tracking-[0.2em] mb-1">LABEL</span>
                      <span className="text-sm">FRANCE</span>
                      <span className="text-sm">CYBER</span>
                      <span className="text-xs tracking-widest mt-1 opacity-70">SECURITY</span>
                    </div>
                    {/* Metallic Shine Effect */}
                    <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 group-hover:top-[100%] group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>
                 </div>
               </div>
               
               <h4 className="text-lg font-bold text-white mb-2 italic">
                 SecuriTrust est labellisé <br/>
                 <span className="text-blue-400">« France Cybersecurity »</span>
               </h4>
            </div>

            {/* Label Description Box */}
            <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-8 group hover:border-blue-500/40 transition-all duration-500">
              <p className="text-sm text-white/80 leading-relaxed italic">
                Le label <span className="text-blue-400 font-bold">« France Cybersecurity »</span> assure aux clients que les produits et services certifiés sont <span className="text-blue-400 font-bold">d&apos;origine française</span>, dotés de fonctionnalités claires et définies, et répondent à un niveau de qualité vérifié par un jury indépendant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
