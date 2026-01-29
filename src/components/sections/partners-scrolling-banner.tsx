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
    <section className="w-full bg-[#D9FF99] py-8 border-y border-black/10 overflow-hidden">
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        <div className="flex items-center gap-16 md:gap-24 px-8">
          {clients.concat(clients).map((client, index) => (
            <div 
              key={`${client.name}-${index}`} 
              className="flex items-center justify-center grayscale brightness-0 opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={client.logo}
                alt={`Logo ${client.name}`}
                width={120}
                height={60}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
