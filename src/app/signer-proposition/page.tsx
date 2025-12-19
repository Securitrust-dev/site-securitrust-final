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
  const [isSignatureDone, setIsSignatureDone] = useState(false);

  const goToPayment = () => {
    sessionStorage.setItem('propositionSigned', 'true');
    router.push('/paiement');
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      console.log('Message reçu de l\'iframe:', data);
      
      // Détecter tous les événements possibles de signature
      if (
        data?.event === 'es:signed' || 
        data?.event === 'es:document:signed' ||
        data?.type === 'es:signed' ||
        data?.type === 'signed' ||
        data === 'es:signed' ||
        data === 'signed' ||
        (typeof data === 'string' && data.includes('signed')) ||
        (typeof data === 'object' && JSON.stringify(data).includes('signed'))
      ) {
        setIsSignatureDone(true);
        setIsSigned(true);
        setShowManualButton(true);
        toast.success("Contrat signé ! Vous pouvez maintenant procéder au paiement.");
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [signUrl]);

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

      {isSignatureDone && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-[#02040a]/95 border-t border-white/10 backdrop-blur-md z-50 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white font-bold">Contrat Signé !</p>
                <p className="text-slate-400 text-xs">Toutes les étapes sont complétées.</p>
              </div>
            </div>

            <button 
              onClick={goToPayment}
              className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-900/40 hover:scale-105 active:scale-95"
            >
              <span>Procéder au paiement</span>
              <CreditCard className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
