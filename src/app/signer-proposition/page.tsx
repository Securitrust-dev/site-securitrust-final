'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const dynamic = 'force-dynamic';

export default function SignerPropositionPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signUrl, setSignUrl] = useState<string | null>(null);

  // Pas de redirection automatique - l'utilisateur reste sur cette page

  // 2. Chargement initial du contrat
  useEffect(() => {
    const initContract = async () => {
      try {
        const storedData = sessionStorage.getItem('eligibilityData');
        
        if (!storedData) {
          setError("Aucune donnée de proposition trouvée.");
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
          throw new Error("Pas d'URL reçue");
        }

      } catch (err: any) {
        console.error("Erreur:", err);
        setError(err.message || "Erreur de chargement");
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
          <p className="text-slate-400 animate-pulse">Préparation du contrat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Erreur</h2>
          <p className="text-red-200/80 mb-8">{error}</p>
          <button onClick={handleBack} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col">
      <div className="h-16 border-b border-white/10 flex items-center px-6 bg-[#02040a]">
        <button onClick={handleBack} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        <div className="ml-auto text-xs text-slate-500">
          En attente de signature...
        </div>
      </div>

      <div className="flex-1 w-full h-full relative">
        {signUrl && (
          <iframe 
            src={signUrl} 
            className="absolute inset-0 w-full h-full border-0 bg-white"
            allow="camera; microphone"
          />
        )}
      </div>
    </div>
  );
}
