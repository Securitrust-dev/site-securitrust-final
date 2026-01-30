import React from 'react';
import Image from 'next/image';

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
                 {/* France Cybersecurity Logo */}
                 <div className="w-32 h-32 relative group-hover:scale-110 transition-transform duration-500">
                    <Image 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769787082364.png?width=800&height=800&resize=contain"
                      alt="Label France Cybersecurity"
                      fill
                      className="object-contain"
                    />
                    {/* Metallic Shine Effect Over Image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
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
