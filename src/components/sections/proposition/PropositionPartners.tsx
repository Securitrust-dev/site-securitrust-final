import React from 'react';
import Image from 'next/image';

export function PropositionPartners() {
  const partners = [
    { name: "Société Générale", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769780772933.png" },
    { name: "Abeille Assurances", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769780810947.png" },
    { name: "Banque Française Mutualiste", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769780837348.png" },
    { name: "Veolia Eau", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769780854504.png" },
    { name: "Afluens", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769780847169.png" },
    { name: "Aviva", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769780861273.png" },
    { name: "Ma Place en Crèche", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769780840832.png" }
  ];

  return (
    <section className="border-b border-border bg-[#030303] py-12 overflow-hidden">
        <div className="flex gap-20 animate-scroll w-max">
            {partners.concat(partners).map((partner, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                  <div className="relative h-16 md:h-20 w-48 md:w-64">
                      <Image 
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain"
                      />
                  </div>
              </div>
            ))}
        </div>
    </section>
  );
}
