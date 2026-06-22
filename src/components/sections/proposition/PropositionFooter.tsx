import React from 'react';

export function PropositionFooter() {
  return (
    <footer className="border-border reveal border-t pt-16 md:pt-20 pb-10 bg-[#030303]">
        <div className="max-w-[1920px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
                <div className="col-span-2 md:col-span-1">
                    <span className="text-xl font-semibold text-white font-display uppercase tracking-tighter">SECURITRUST</span>
                    <p className="text-[#aaaaaa] text-sm mt-4 leading-relaxed max-w-xs uppercase tracking-widest">
                        Audit de sécurité et expertise offensive pour protéger les entreprises de demain.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h5 className="text-white font-semibold text-sm uppercase tracking-widest">Services</h5>
                    <a href="/pentest-externe" className="text-[#aaaaaa] text-sm uppercase hover:text-white transition-colors">Pentest Externe</a>
                    <a href="/audit-configuration" className="text-[#aaaaaa] text-sm uppercase hover:text-white transition-colors">Audit Configuration</a>
                </div>
                <div className="flex flex-col gap-4">
                      <h5 className="text-white font-semibold text-sm uppercase tracking-widest">Société</h5>
                      <a href="/contact" className="text-[#aaaaaa] text-sm uppercase hover:text-white transition-colors">Contact</a>
                      <a href="tel:0186044431" className="text-[#aaaaaa] text-sm hover:text-white transition-colors">01 86 04 44 31</a>
                      <a href="/mentions-legales" className="text-[#aaaaaa] text-sm uppercase hover:text-white transition-colors">Légal</a>
                      <a href="/cgv" className="text-[#aaaaaa] text-sm uppercase hover:text-white transition-colors">CGV</a>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
                <p className="text-xs text-[#aaaaaa] uppercase tracking-[0.3em]">© 2026 SecuriTrust. Tous droits réservés.</p>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#74a2cd] animate-pulse"></div>
                    <span className="font-mono text-xs text-[#74a2cd] uppercase tracking-[0.3em]">System Secure</span>
                </div>
            </div>
        </div>
    </footer>
  );
}
