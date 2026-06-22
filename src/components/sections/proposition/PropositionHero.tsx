import React from 'react';
import Image from 'next/image';

interface PropositionHeroProps {
  companyName: string;
}

export function PropositionHero({ companyName }: PropositionHeroProps) {
  return (
    <header className="relative w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
             <div data-us-project="7zydvovZReD8YsoiUwj3" style={{width:'100%', height: '100%'}}></div>
             <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10"></div>
        </div>
        
        <div className="relative z-20 flex flex-col items-center w-full max-w-[1920px] px-6 text-center">
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="font-display text-4xl md:text-7xl font-semibold text-white tracking-[-0.04em] leading-none relative z-20 mix-blend-lighten uppercase">
                    PROPOSITION
                </h1>
                <h2 className="font-display text-4xl md:text-7xl font-semibold text-white tracking-[-0.04em] leading-none relative z-20 mix-blend-lighten uppercase">
                    COMMERCIALE
                </h2>
            </div>

            {/* Dynamic Partner Banner */}
            <div className="flex items-center justify-center gap-6 md:gap-12 mt-10 hero-anim opacity-0 translate-y-4">
                <div className="h-10 md:h-20 w-40 md:w-80 relative">
                    <Image 
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769766433152.png?width=8000&height=8000&resize=contain"
                        alt="SecuriTrust"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="text-white/30 text-3xl md:text-6xl font-extralight">×</div>
                <div className="text-white font-display text-2xl md:text-5xl font-bold uppercase tracking-tighter">
                    {companyName || "ENTREPRISE"}
                </div>
            </div>

            <p className="max-w-xl text-center text-gray-300 text-sm md:text-lg font-medium leading-relaxed mt-10 mb-8 hero-anim opacity-0 translate-y-4">
                Audit complet de votre Active Directory en mode boîte grise.
            </p>
        </div>
    </header>
  );
}
