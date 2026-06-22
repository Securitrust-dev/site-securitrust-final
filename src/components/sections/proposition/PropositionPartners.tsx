'use client';

import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export function PropositionPartners() {
  const partners = [
      { name: "OCAPIAT", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/Logo-OCAPIAT-couleur-resized-1772551611343.webp?width=8000&height=8000&resize=contain" },
      { name: "Banque Française Mutualiste", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/LOGO-BFM-RVB-avec_signat-resized-1772551610697.jpg?width=8000&height=8000&resize=contain" },
      { name: "Société Générale", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/logo-societe-generale-1772551611142.png?width=8000&height=8000&resize=contain" },
      { name: "Pizzorno", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/Pizzornologo-1772551611580.jpg?width=8000&height=8000&resize=contain" },
      { name: "Sogefi Group", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/sogefi-group-logo-1772551611181.jpg?width=8000&height=8000&resize=contain" },
      { name: "Superhot", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/Superhot_Logo-resized-1772551611120.webp?width=8000&height=8000&resize=contain" },
      { name: "Munchener Ruck", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/Munchener_Ruck_logo-1772551610249.svg" },
      { name: "Abeille Assurances", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/43-abeille-assurance-1772551460396.jpg?width=8000&height=8000&resize=contain" },
      { name: "Les Parents Zens", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1772707276555.png?width=8000&height=8000&resize=contain" },
      { name: "Afluens", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1772707890611.png?width=8000&height=8000&resize=contain", medium: true },
        { name: "L'eau d'Ile-de-France", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1772708789627.png?width=8000&height=8000&resize=contain" },

      { name: "Backupta", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/653be2e4dc1d409ae8b022fd_backupta-logo-full-white-1772551461012.png?width=8000&height=8000&resize=contain" },
      { name: "AXA", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/CS.PA-1772704134483.png?width=8000&height=8000&resize=contain", small: true },
      { name: "Bolloré Logistics", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/Bollore_Logistics_Logo-resized-1772551460504.webp?width=8000&height=8000&resize=contain" },
      { name: "Cegedim", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/cegedim-logo-HD-resized-1772551460997.jpg?width=8000&height=8000&resize=contain" },
      { name: "Malakoff Humanis", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-resized-1772708536913.webp?width=8000&height=8000&resize=contain" },
    ];

  return (
    <React.Fragment>
      <section id="references" className="py-24 bg-[#030303] border-t border-white/5 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#74a2cd]/50 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="flex flex-col items-center mb-16">
            <span className="inline-block px-4 py-1.5 border border-[#74a2cd]/30 rounded-full text-[#74a2cd] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 bg-[#74a2cd]/5">
              Références Clients
            </span>
            <h2 className="text-center text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ils nous font <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#74a2cd]">confiance</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />

            <Marquee speed={40} gradient={false} pauseOnHover={true}>
              <div className="flex gap-8 py-4">
                {partners.concat(partners).map((partner, i) => (
                  <div
                    key={i}
                    className="group relative w-64 h-32 bg-white border border-white/10 rounded-2xl flex items-center justify-center p-8 transition-all duration-500 hover:border-[#74a2cd]/50 hover:shadow-[0_0_20px_rgba(116,162,205,0.2)]"
                  >
                    <div className="absolute inset-0 bg-[#74a2cd]/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl" />
                      <div className="relative h-16 w-full flex items-center justify-center">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={partner.small ? 60 : partner.medium ? 80 : 180}
                            height={partner.small ? 60 : partner.medium ? 80 : 80}
                            className="object-contain transition-all duration-500 group-hover:scale-105"
                            style={partner.small ? { maxWidth: 60, maxHeight: 60 } : partner.medium ? { maxWidth: 80, maxHeight: 80 } : undefined}
                          />
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
