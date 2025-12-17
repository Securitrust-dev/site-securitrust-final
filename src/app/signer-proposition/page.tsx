'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function SignerPropositionPage() {
  const router = useRouter();
  
  // États pour gérer le chargement et les données
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signUrl, setSignUrl] = useState<string | null>(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        // 1. Récupérer les données du stockage local
        const storedData = sessionStorage.getItem('eligibilityData');
        
        if (!storedData) {
          setError("Aucune donnée de proposition trouvée. Veuillez recommencer le parcours.");
          setLoading(false);
          return;
        }

        const data = JSON.parse(storedData);
        
        // 2. Appeler notre API pour avoir l'URL de signature
        // Note: On utilise les données du session storage
        const response = await fetch('/api/esignatures/sign-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: data.companyName || "Société Inconnue",
            email: data.email,
            siret: data.siret
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Erreur lors de la préparation du contrat");
        }

        if (result.url) {
          setSignUrl(result.url);
        } else {
          throw new Error("L'URL de signature n'a pas été générée");
        }

      } catch (err: any) {
        console.error("Erreur page signature:", err);
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    initContract();
  }, []);

  const handleBack = () => {
    router.push('/proposition');
  };

  // CAS 1 : Chargement en cours (Le vrai "moulinage", mais qui va s'arrêter)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto" />
          <p className="text-slate-400 animate-pulse">Préparation de votre contrat sécurisé...</p>
        </div>
      </div>
    );
  }

  // CAS 2 : Erreur (Données manquantes ou API plantée)
  if (error) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Impossible d'afficher le contrat</h2>
          <p className="text-red-200/80 mb-8">{error}</p>
          <button 
            onClick={handleBack}
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la proposition
          </button>
        </div>
      </div>
    );
  }

  // CAS 3 : Succès -> On affiche l'Iframe Esignature
  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col">
      {/* En-tête simple */}
      <div className="h-16 border-b border-white/10 flex items-center px-6 bg-[#02040a]">
        <button onClick={handleBack} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
      </div>

      {/* Zone du contrat plein écran */}
      <div className="flex-1 w-full h-full relative">
        {signUrl && (
          <iframe 
            src={signUrl} 
            className="absolute inset-0 w-full h-full border-0"
            allow="camera; microphone" // Nécessaire pour certaines signatures
          />
        )}
      </div>
    </div>
  );
}
