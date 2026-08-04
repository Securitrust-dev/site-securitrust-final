'use client';

import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import Image from 'next/image';
import { SearchBar } from '@/components/search-bar';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pentestOpen, setPentestOpen] = useState(false);
  const [gouvernanceOpen, setGouvernanceOpen] = useState(false);

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
            {/* Pentest dropdown — CSS pur group-hover, aucun JS */}
            <div className="relative group">
              <a href="/pentest" data-nav-link className="flex items-center gap-2 px-3 py-2 text-xs xl:text-sm font-normal text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wide whitespace-nowrap">
                Pentest
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="transition-transform group-hover:rotate-180">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>

              <div className="absolute top-full right-0 z-[9999] hidden group-hover:block">
                <div className="mt-1 w-64 bg-[#0a0a0a] border border-white/20 rounded-xl shadow-2xl p-2">
                  <a href="/audit-o365" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-3 py-2 rounded">Audit Microsoft 365</a>
                  <a href="/pentest-web" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-3 py-2 rounded">Pentest Web</a>
                  <a href="/pentest-ad" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-3 py-2 rounded">Pentest Active Directory</a>
                  <a href="/pentest-mobile" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-3 py-2 rounded">Pentest Mobile</a>
                </div>
              </div>
            </div>

            {/* Gouvernance dropdown — CSS pur group-hover, aucun JS */}
            <div className="relative group">
              <a href="/gouvernance-conformite" data-nav-link className="flex items-center gap-2 px-3 py-2 text-xs xl:text-sm font-normal text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wide whitespace-nowrap">
                Gouvernance
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="transition-transform group-hover:rotate-180">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>

              <div className="absolute top-full right-0 z-[9999] hidden group-hover:block">
                <div className="mt-1 w-56 bg-[#0a0a0a] border border-white/20 rounded-xl shadow-2xl p-2">
                  <a href="/iso27001" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-3 py-2 rounded">ISO 27001</a>
                  <a href="/nis2" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-3 py-2 rounded">NIS2</a>
                  <a href="/hds" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-3 py-2 rounded">HDS</a>
                  <a href="/tisax" data-nav-link className="text-sm text-white/65 hover:text-white hover:bg-white/5 transition-colors block px-3 py-2 rounded">TISAX</a>
                </div>
              </div>
            </div>

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
                  onClick={() => setPentestOpen(!pentestOpen)}
                  className="flex items-center justify-between w-full text-base font-bold text-white py-2"
                >
                  Pentest
                  <span className="text-cyan-400">{pentestOpen ? '−' : '+'}</span>
                </button>
                {pentestOpen && (
                  <ul className="mt-2 space-y-1 pl-4">
                    <li><a href="/audit-o365" data-nav-link className="text-sm text-slate-300 block py-1">Audit Microsoft 365</a></li>
                    <li><a href="/pentest-web" data-nav-link className="text-sm text-slate-300 block py-1">Pentest Web</a></li>
                    <li><a href="/pentest-ad" data-nav-link className="text-sm text-slate-300 block py-1">Pentest Active Directory</a></li>
                    <li><a href="/pentest-mobile" data-nav-link className="text-sm text-slate-300 block py-1">Pentest Mobile</a></li>
                  </ul>
                )}
              </div>

              <div>
                <button
                  onClick={() => setGouvernanceOpen(!gouvernanceOpen)}
                  className="flex items-center justify-between w-full text-base font-bold text-white py-2"
                >
                  Gouvernance
                  <span className="text-cyan-400">{gouvernanceOpen ? '−' : '+'}</span>
                </button>
                {gouvernanceOpen && (
                  <ul className="mt-2 space-y-1 pl-4">
                    <li><a href="/iso27001" data-nav-link className="text-sm text-slate-300 block py-1">ISO 27001</a></li>
                    <li><a href="/nis2" data-nav-link className="text-sm text-slate-300 block py-1">NIS2</a></li>
                    <li><a href="/hds" data-nav-link className="text-sm text-slate-300 block py-1">HDS</a></li>
                    <li><a href="/tisax" data-nav-link className="text-sm text-slate-300 block py-1">TISAX</a></li>
                  </ul>
                )}
              </div>

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
