'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import Image from 'next/image';
import { SearchBar } from '@/components/search-bar';

export const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50">
      <header className="bg-black/95 backdrop-blur-sm border-b border-white/5">
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-20 flex items-center justify-between gap-4">
          {/* Logo SecuriTrust - Left */}
          <a href="/" data-nav-link className="flex items-center cursor-pointer group flex-shrink-0">
            <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769766433152.png?width=8000&height=8000&resize=contain"
                  alt="SecuriTrust - Cabinet d'audit et conseil en cybersécurité"
                  width={180}
                  height={37}
                    className="h-7 sm:h-8 lg:h-9 w-auto"
                  priority
                />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
            {/* Services dropdown — CSS pur group-hover, aucun JS */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 text-xs xl:text-sm font-normal text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-70">
                  <rect x="1" y="1" width="5" height="5" fill="currentColor"/>
                  <rect x="10" y="1" width="5" height="5" fill="currentColor"/>
                  <rect x="1" y="10" width="5" height="5" fill="currentColor"/>
                  <rect x="10" y="10" width="5" height="5" fill="currentColor"/>
                </svg>
                Services
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="transition-transform group-hover:rotate-180">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Dropdown — visible au hover CSS, pas de JS */}
              <div className="absolute top-full right-0 z-[9999] hidden group-hover:block">
                <div className="mt-1 w-[620px] bg-[#0a0a0a] border border-white/20 rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-6">
                  {/* Cybersécurité Opérationnelle */}
                  <div>
                    <h3 className="text-xs font-bold text-[#76a6d1] mb-3 uppercase tracking-widest border-b border-white/10 pb-2">Cybersécurité Opérationnelle</h3>
                    <ul className="space-y-0.5">
                      <li><a href="/cybersecurite-operationnelle" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-2 py-1.5 rounded">Sécurité offensive</a></li>
                      <li><a href="/cybersecurite-operationnelle/proteger-chiffre-affaires" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-2 py-1.5 rounded">Pentest &amp; Sécurité des Systèmes Critiques</a></li>
                      <li><a href="/cybersecurite-operationnelle/preserver-image-confiance" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-2 py-1.5 rounded">Gestion des Risques Cyber &amp; Protection de la Réputation</a></li>
                      <li><a href="/cybersecurite-operationnelle/exigences-reglementaires" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-2 py-1.5 rounded">Audit de Conformité &amp; Cybersécurité Réglementaire</a></li>
                    </ul>
                  </div>

                  {/* Gouvernance & Conformité */}
                  <div>
                    <h3 className="text-xs font-bold text-[#5a90be] mb-3 uppercase tracking-widest border-b border-white/10 pb-2">Gouvernance &amp; Conformité</h3>
                    <ul className="space-y-0.5">
                      <li><a href="/gouvernance-conformite/domaines-expertise" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-2 py-1.5 rounded">Domaines d&apos;expertise</a></li>
                      <li><a href="/gouvernance-conformite/accompagnement" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-2 py-1.5 rounded">Accompagnement</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <a href="/rssi-externalise" data-nav-link className="px-3 py-2 text-xs xl:text-sm font-normal text-white hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-colors uppercase tracking-wide whitespace-nowrap">
              RSSI externalisé
            </a>
            <a href="/articles" data-nav-link className="px-3 py-2 text-xs xl:text-sm font-normal text-white hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-colors uppercase tracking-wide">
              Articles
            </a>
            <a href="/nous-rejoindre" data-nav-link className="px-3 py-2 text-xs xl:text-sm font-normal text-white hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-colors uppercase tracking-wide whitespace-nowrap">
              Nous rejoindre
            </a>
            <a href="/contact" data-nav-link className="px-3 py-2 text-xs xl:text-sm font-normal text-white hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-colors uppercase tracking-wide">
              Contact
            </a>

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="px-3 py-2 text-white hover:text-white transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white hover:text-[#76a6d1] transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#76a6d1] transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4 max-h-[calc(100vh-130px)] overflow-y-auto">
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full text-base font-bold text-white py-2"
                >
                  Services
                  <span className="text-cyan-400">{servicesOpen ? '−' : '+'}</span>
                </button>
                {servicesOpen && (
                  <div className="mt-2 space-y-4 pl-4">
                    <div>
                      <h4 className="text-xs font-bold text-[#76a6d1] mb-2 uppercase tracking-wider">Cybersécurité Opérationnelle</h4>
                      <ul className="space-y-1">
                        <li><a href="/cybersecurite-operationnelle" data-nav-link className="text-sm text-slate-300 block py-1">Sécurité offensive</a></li>
                        <li><a href="/cybersecurite-operationnelle/proteger-chiffre-affaires" data-nav-link className="text-sm text-slate-300 block py-1">Pentest &amp; Sécurité des Systèmes Critiques</a></li>
                        <li><a href="/cybersecurite-operationnelle/preserver-image-confiance" data-nav-link className="text-sm text-slate-300 block py-1">Gestion des Risques Cyber &amp; Protection de la Réputation</a></li>
                        <li><a href="/cybersecurite-operationnelle/exigences-reglementaires" data-nav-link className="text-sm text-slate-300 block py-1">Audit de Conformité &amp; Cybersécurité Réglementaire</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#5a90be] mb-2 uppercase tracking-wider">Gouvernance &amp; Conformité</h4>
                      <ul className="space-y-1">
                        <li><a href="/gouvernance-conformite/domaines-expertise" data-nav-link className="text-sm text-slate-300 block py-1">Domaines d&apos;expertise</a></li>
                        <li><a href="/gouvernance-conformite/accompagnement" data-nav-link className="text-sm text-slate-300 block py-1">Accompagnement</a></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <a href="/rssi-externalise" data-nav-link className="block text-base font-bold text-white py-2">RSSI externalisé</a>
              <a href="/articles" data-nav-link className="block text-base font-bold text-white py-2">Articles</a>
              <a href="/nous-rejoindre" data-nav-link className="block text-base font-bold text-white py-2">Nous rejoindre</a>
              <a href="/contact" data-nav-link className="block text-base font-bold text-white py-2">Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center pt-32 px-4">
          <div className="w-full max-w-3xl relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Fermer la recherche"
            >
              <X className="h-6 w-6" />
            </button>
            <SearchBar />
          </div>
        </div>
      )}
    </div>
  );
};
