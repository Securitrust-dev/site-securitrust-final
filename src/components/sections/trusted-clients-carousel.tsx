'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const clients = [
  {
    name: 'Société Générale',
    category: 'Banque',
    location: 'FRA — 48.8°N',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-societe-generale2-e1436481313147-1764595764935.png?width=8000&height=8000&resize=contain',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Abeille Assurances',
    category: 'Assurance',
    location: 'FRA — 48.8°N',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/43-abeille-assurance-1764596006375.jpg?width=8000&height=8000&resize=contain',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Banque Française Mutualiste',
    category: 'Finance',
    location: 'FRA — 48.8°N',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-150x150-1764596042844.png?width=8000&height=8000&resize=contain',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Ma Place en Crèche',
    category: 'Service',
    location: 'FRA — 48.8°N',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-4-150x150-1764596061442.png?width=8000&height=8000&resize=contain',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Affluens',
    category: 'Conseil',
    location: 'FRA — 48.8°N',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Af-150x150-1764596072367.png?width=8000&height=8000&resize=contain',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Veolia Eau d\'Île-de-France',
    category: 'Environnement',
    location: 'FRA — 48.8°N',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients-150x150-1764596078949.png?width=8000&height=8000&resize=contain',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Aviva',
    category: 'Assurance',
    location: 'FRA — 48.8°N',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-150x150-1764596094822.png?width=8000&height=8000&resize=contain',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
  }
];

export function TrustedClientsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(4);
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(clients.length - cardsToShow, prev + 1));
  };

  const visibleClients = clients.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-16 sm:py-20 lg:py-28 relative z-10 bg-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-4 sm:mb-6">
            Ils nous font confiance
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {visibleClients.map((client, index) => (
              <div 
                key={startIndex + index}
                className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-52 lg:h-60 w-full overflow-hidden">
                  <Image
                    src={client.image}
                    alt={client.name}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Logo Badge */}
                  <div className="absolute top-4 left-4 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/98 backdrop-blur-sm rounded-lg p-3 sm:p-4 flex items-center justify-center shadow-lg">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 lg:p-7">
                  {/* Category Badge */}
                  <div className="inline-block mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm font-normal tracking-wide uppercase text-white/60">
                      {client.category}
                    </span>
                  </div>

                  {/* Client Name */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-normal text-white line-clamp-2 mb-3 sm:mb-4 leading-tight">
                    {client.name}
                  </h3>

                  {/* CTA Button */}
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Rejoignez-les
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= clients.length - cardsToShow}
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}