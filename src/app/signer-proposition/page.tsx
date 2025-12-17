'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle, ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const dynamic = 'force-dynamic';

export default function SignerPropositionPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [showManualButton, setShowManualButton] = useState(false);

  const goToPayment = () => {
    sessionStorage.setItem('propositionSigned', 'true');
    router.push('/paiement');
  };

      useEffect(() => {
      let redirectTimer: NodeJS.Timeout | null = null;

      const handleMessage = (event: MessageEvent) => {
        if (event.data?.event === 'es:signed' || (typeof event.data === 'string' && event.data.includes('es:signed'))) {
          setIsSigned(true);
          toast.success("Contrat signé !");
          setShowManualButton(true);
          
          redirectTimer = setTimeout(() => {
            goToPayment();
          }, 5000);
        }
      };

      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
        if (redirectTimer) clearTimeout(redirectTimer);
      };
    }, []);

  useEffect(() => {
    const initContract = async () => {
      try {
        const storedData = sessionStorage.getItem('eligibilityData');
        if (!storedData) {
          setError("Données introuvables. Merci de refaire le parcours.");
          setLoading(false);
          return;
        }

        const data = JSON.parse(storedData);
        
        const response = await fetch('/api/esignatures/sign-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: data.companyName,
            email: data.email,
            siret: data.siret
          })
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.error);
        if (result.url) {
          setSignUrl(result.url);
        } else {
          throw new Error("Erreur de génération du lien");
        }

      } catch (err: any) {
        console.error("Erreur:", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    initContract();
  }, []);

  const handleBack = () => {
    router.push('/proposition');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto" />
          <p className="text-slate-400 animate-pulse">Chargement du contrat sécurisé...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center backdrop-blur-sm">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Impossible d'afficher le contrat</h2>
          <p className="text-red-200/80 mb-6">{error}</p>
          <button onClick={handleBack} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (isSigned) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-10 text-center backdrop-blur-md shadow-2xl">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
            <ShieldCheck className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Contrat Signé !</h2>
          <p className="text-zinc-300 mb-8 text-lg">
            Votre document est validé. Vous pouvez passer au paiement.
          </p>
          <button onClick={goToPayment} className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]">
            <span>Procéder au Paiement</span>
            <CreditCard className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col relative">
      <div className="h-14 border-b border-white/10 flex items-center px-6 bg-[#02040a] justify-between z-10">
        <button onClick={handleBack} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        <div className="flex items-center gap-2 text-xs text-cyan-400/80 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Signature Sécurisée
        </div>
      </div>

      <div className="flex-1 w-full relative bg-white pb-24">
        {signUrl && (
          <iframe 
            src={signUrl} 
            className="absolute inset-0 w-full h-full border-0"
            allow="camera; microphone"
          />
        )}
      </div>

      {showManualButton && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-[#02040a]/90 border-t border-white/10 backdrop-blur-md z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-400 text-center sm:text-left">
              Une fois le document signé, cliquez ici pour continuer :
            </p>
            <button 
              onClick={goToPayment}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <span>J'ai signé, procéder au paiement</span>
              <CreditCard className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
