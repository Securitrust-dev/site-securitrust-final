'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const clients = [
  {
    name: 'Société Générale',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-societe-generale2-e1436481313147-1764595764935.png?width=8000&height=8000&resize=contain',
  },
  {
    name: 'Abeille Assurances',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/43-abeille-assurance-1764596006375.jpg?width=8000&height=8000&resize=contain',
  },
  {
    name: 'Banque Française Mutualiste',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-150x150-1764596042844.png?width=8000&height=8000&resize=contain',
  },
  {
    name: 'Ma Place en Crèche',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-4-150x150-1764596061442.png?width=8000&height=8000&resize=contain',
  },
  {
    name: 'Affluens',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Af-150x150-1764596072367.png?width=8000&height=8000&resize=contain',
  },
  {
    name: 'Veolia Eau d\'Île-de-France',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients-150x150-1764596078949.png?width=8000&height=8000&resize=contain',
  },
  {
    name: 'Aviva',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-150x150-1764596094822.png?width=8000&height=8000&resize=contain',
  }
];

export function PartnersScrollingBanner() {
  return (
      <div className="bg-void py-12 md:py-20">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-8 reveal">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <h2 className="text-[10px] md:text-xs font-mono text-white uppercase tracking-[0.4em]">Ecosystem_Partners</h2>
          </div>
        </div>
        
        <section className="w-full bg-[#02040a] py-10 md:py-14 border-y border-white/5 overflow-hidden">
          <Marquee speed={35} gradient={false} pauseOnHover={true}>
            <div className="flex items-center gap-24 md:gap-40 px-12">
              {clients.concat(clients).map((client, index) => (
                <div 
                  key={`${client.name}-${index}`} 
                  className="flex items-center justify-center brightness-0 invert transition-all duration-500 hover:scale-110 cursor-pointer"
                >
                <Image
                  src={client.logo}
                  alt={`Logo ${client.name}`}
                  width={200}
                  height={100}
                  className="h-14 md:h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </section>
    </div>
  );
}
