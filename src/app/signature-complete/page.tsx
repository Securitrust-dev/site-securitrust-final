'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, Loader2, CreditCard } from 'lucide-react';

export default function SignatureCompletePage() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    sessionStorage.setItem('propositionSigned', 'true');
    window.location.href = 'https://calendly.com/expert-securitrust';
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6">
      <div
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        <div className="w-20 h-20 mx-auto border border-[#9abff2]/30 flex items-center justify-center bg-[#9abff2]/5">
          <ShieldCheck className="w-10 h-10 text-[#9abff2]" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight">
            Contrat signé avec succès
          </h1>
          <p className="text-[#888888] text-sm font-mono">
            Votre signature a bien été enregistrée.
          </p>
        </div>

          <div className="flex items-center justify-center gap-3 text-[#9abff2]">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-mono uppercase tracking-widest">
              Redirection vers Calendly dans {countdown}s...
            </span>
          </div>

          <button
            onClick={() => { window.location.href = 'https://calendly.com/expert-securitrust'; }}
            className="w-full py-4 bg-[#9abff2] text-[#030303] font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3"
          >
            <CreditCard className="w-5 h-5" />
            Prendre rendez-vous maintenant
          </button>
      </div>
    </div>
  );
}
