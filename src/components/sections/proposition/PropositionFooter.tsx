import React from 'react';

export function PropositionFooter() {
  return (
    <footer className="border-border reveal border-t pt-16 md:pt-20 pb-10 bg-[#030303]">
        <div className="max-w-[1920px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
                <div className="col-span-2 md:col-span-1">
                    <span className="text-lg font-medium text-white font-display uppercase tracking-tighter">SECURITRUST</span>
                    <p className="text-[#888888] text-[10px] mt-4 leading-relaxed max-w-xs uppercase tracking-widest">
                        Audit de sécurité et expertise offensive pour protéger les entreprises de demain.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h5 className="text-white font-medium text-xs uppercase tracking-widest">Services</h5>
                    <a href="/pentest-externe" className="text-[#888888] text-[10px] uppercase hover:text-[#00ffa3]">Pentest Externe</a>
                    <a href="/audit-configuration" className="text-[#888888] text-[10px] uppercase hover:text-[#00ffa3]">Audit Configuration</a>
                </div>
                <div className="flex flex-col gap-4">
                    <h5 className="text-white font-medium text-xs uppercase tracking-widest">Société</h5>
                    <a href="/contact" className="text-[#888888] text-[10px] uppercase hover:text-[#00ffa3]">Contact</a>
                    <a href="/mentions-legales" className="text-[#888888] text-[10px] uppercase hover:text-[#00ffa3]">Légal</a>
                </div>
                <div className="flex gap-4">
                    <a href="#" className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white border border-white/5 rounded-full"><iconify-icon icon="ri:linkedin-fill"></iconify-icon></a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white border border-white/5 rounded-full"><iconify-icon icon="ri:twitter-x-fill"></iconify-icon></a>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
                <p className="text-[9px] text-[#888888] uppercase tracking-[0.3em]">© 2026 SecuriTrust. Tous droits réservés.</p>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse"></div>
                    <span className="font-mono text-[9px] text-[#00ffa3] uppercase tracking-[0.3em]">System Secure</span>
                </div>
            </div>
        </div>
    </footer>
  );
}
