'use client';

import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import Image from 'next/image';
import { SearchBar } from '@/components/search-bar';

export const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="fixed top-[40px] sm:top-[45px] lg:top-[50px] xl:top-[55px] w-full z-50">
      <header className="bg-black/95 backdrop-blur-sm border-b border-white/5">
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-20 flex items-center justify-between gap-4">
          {/* Logo SecuriTrust - Left */}
          <a href="/" className="flex items-center cursor-pointer group flex-shrink-0">
            <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-768x158-1764257964299.png?width=8000&height=8000&resize=contain"
                alt="SecuriTrust Logo"
                width={180}
                height={37}
                className="neon-logo h-7 sm:h-8 lg:h-9 w-auto"
                priority
              />
            </div>
          </a>

          {/* Desktop Navigation - Center and Right */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
            {/* Services avec icône grille */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-2 px-3 py-2 text-xs xl:text-sm font-normal text-white/70 hover:text-white transition-colors uppercase tracking-wide">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-70">
                  <rect x="1" y="1" width="5" height="5" fill="currentColor"/>
                  <rect x="10" y="1" width="5" height="5" fill="currentColor"/>
                  <rect x="1" y="10" width="5" height="5" fill="currentColor"/>
                  <rect x="10" y="10" width="5" height="5" fill="currentColor"/>
                </svg>
                Services
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 pt-4 z-50">
                  <div className="w-[700px] grid grid-cols-2 gap-6 bg-black border border-white/10 rounded-lg p-6 shadow-2xl">
                    {/* Cybersécurité opérationnelle */}
                    <div>
                      <h3 className="text-sm font-semibold text-[#38bdf8] mb-3 uppercase tracking-wide">Cybersécurité opérationnelle</h3>
                      <ul className="space-y-2">
                        <li><a href="/audit-configuration" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Audit de configuration</a></li>
                        <li><a href="/audit-architecture" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Audit d&apos;architecture</a></li>
                        <li><a href="/audit-code-source" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Audit de code source</a></li>
                        <li><a href="/audit-securite-technique" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Audit de sécurité technique</a></li>
                        <li><a href="/audit-flash" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Audit Flash</a></li>
                        <li><a href="/pentest-interne" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Pentest interne</a></li>
                        <li><a href="/pentest-externe" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Pentest externe</a></li>
                        <li><a href="/pentest-web-mobile" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Pentest web/mobile</a></li>
                        <li><a href="/pentest-physique" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Pentest Physique</a></li>
                        <li><a href="/protection-ransomware" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Test de ransomware</a></li>
                        <li><a href="/red-team" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Red Team</a></li>
                        <li><a href="/osint" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">OSINT</a></li>
                        <li><a href="/cyber-vigilance-humaine" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Campagnes de phishing</a></li>
                        <li><a href="/sensibilisation-formation" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Sensibilisation/formation</a></li>
                      </ul>
                    </div>
                    
                    {/* Gouvernance & Conformité */}
                    <div>
                      <h3 className="text-sm font-semibold text-[#06b6d4] mb-3 uppercase tracking-wide">Gouvernance & Conformité</h3>
                      <ul className="space-y-2">
                        <li><a href="/strategie-cybersecurite" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Stratégie Cybersécurité</a></li>
                        <li><a href="/rssi-externalise" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">RSSI à temps partagé</a></li>
                        <li><a href="/dpo-externalise" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">DPO externalisé</a></li>
                        <li><a href="/gestion-risques" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Gestion des risques</a></li>
                        <li><a href="/evaluation-maturite" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Évaluation de maturité</a></li>
                        <li><a href="/audit-organisationnel" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Audit organisationnel</a></li>
                        <li><a href="/audit-conformite" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Audit de conformité</a></li>
                        <li><a href="/mise-en-conformite-rgpd" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Mise en conformité RGPD</a></li>
                        <li><a href="/dora" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Conformité DORA</a></li>
                        <li><a href="/tisax-security" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Certification TISAX</a></li>
                        <li><a href="/hds-certification" className="text-sm text-white/70 hover:text-white transition-colors block py-1.5">Certification HDS</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="/votre-entreprise-sur-internet" className="px-3 py-2 text-xs xl:text-sm font-normal text-white/70 hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap">
              Votre image sur internet
            </a>
            <a href="/articles" className="px-3 py-2 text-xs xl:text-sm font-normal text-white/70 hover:text-white transition-colors uppercase tracking-wide">
              Articles
            </a>
            <a href="/nous-rejoindre" className="px-3 py-2 text-xs xl:text-sm font-normal text-white/70 hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap">
              Nous rejoindre
            </a>
            <a href="/contact" className="px-3 py-2 text-xs xl:text-sm font-normal text-white/70 hover:text-white transition-colors uppercase tracking-wide">
              Contact
            </a>

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="px-3 py-2 text-white/70 hover:text-white transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white hover:text-[#38bdf8] transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#38bdf8] transition-colors"
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
                  <div className="mt-2 space-y-3 pl-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#38bdf8] mb-2">Cybersécurité opérationnelle</h4>
                      <ul className="space-y-2">
                        <li><a href="/audit-configuration" className="text-sm text-slate-300 block py-1">Audit de configuration</a></li>
                        <li><a href="/audit-architecture" className="text-sm text-slate-300 block py-1">Audit d&apos;architecture</a></li>
                        <li><a href="/audit-code-source" className="text-sm text-slate-300 block py-1">Audit de code source</a></li>
                        <li><a href="/audit-securite-technique" className="text-sm text-slate-300 block py-1">Audit de sécurité technique</a></li>
                        <li><a href="/audit-flash" className="text-sm text-slate-300 block py-1">Audit Flash</a></li>
                        <li><a href="/pentest-interne" className="text-sm text-slate-300 block py-1">Pentest interne</a></li>
                        <li><a href="/pentest-externe" className="text-sm text-slate-300 block py-1">Pentest externe</a></li>
                        <li><a href="/pentest-web-mobile" className="text-sm text-slate-300 block py-1">Pentest web/mobile</a></li>
                        <li><a href="/pentest-physique" className="text-sm text-slate-300 block py-1">Pentest Physique</a></li>
                        <li><a href="/protection-ransomware" className="text-sm text-slate-300 block py-1">Test de ransomware</a></li>
                        <li><a href="/red-team" className="text-sm text-slate-300 block py-1">Red Team</a></li>
                        <li><a href="/osint" className="text-sm text-slate-300 block py-1">OSINT</a></li>
                        <li><a href="/cyber-vigilance-humaine" className="text-sm text-slate-300 block py-1">Campagnes de phishing</a></li>
                        <li><a href="/sensibilisation-formation" className="text-sm text-slate-300 block py-1">Sensibilisation/formation</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#06b6d4] mb-2">Gouvernance & Conformité</h4>
                      <ul className="space-y-2">
                        <li><a href="/strategie-cybersecurite" className="text-sm text-slate-300 block py-1">Stratégie Cybersécurité</a></li>
                        <li><a href="/rssi-externalise" className="text-sm text-slate-300 block py-1">RSSI à temps partagé</a></li>
                        <li><a href="/dpo-externalise" className="text-sm text-slate-300 block py-1">DPO externalisé</a></li>
                        <li><a href="/gestion-risques" className="text-sm text-slate-300 block py-1">Gestion des risques</a></li>
                        <li><a href="/evaluation-maturite" className="text-sm text-slate-300 block py-1">Évaluation de maturité</a></li>
                        <li><a href="/audit-organisationnel" className="text-sm text-slate-300 block py-1">Audit organisationnel</a></li>
                        <li><a href="/audit-conformite" className="text-sm text-slate-300 block py-1">Audit de conformité</a></li>
                        <li><a href="/mise-en-conformite-rgpd" className="text-sm text-slate-300 block py-1">Mise en conformité RGPD</a></li>
                        <li><a href="/dora" className="text-sm text-slate-300 block py-1">Conformité DORA</a></li>
                        <li><a href="/tisax-security" className="text-sm text-slate-300 block py-1">Certification TISAX</a></li>
                        <li><a href="/hds-certification" className="text-sm text-slate-300 block py-1">Certification HDS</a></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <a href="/votre-entreprise-sur-internet" className="block text-base font-bold text-white py-2">Votre image sur internet</a>
              <a href="/articles" className="block text-base font-bold text-white py-2">Articles</a>
              <a href="/nous-rejoindre" className="block text-base font-bold text-white py-2">Nous rejoindre</a>
              <a href="/contact" className="block text-base font-bold text-white py-2">Contact</a>
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