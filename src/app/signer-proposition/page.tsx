'use client';

import { ESignatureEmbed } from '@/components/ESignatureEmbed';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function SignerPropositionPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // Récupérer les données de la proposition depuis sessionStorage
    const storedData = sessionStorage.getItem('eligibilityData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setOrderData(data);
        setHasData(true);
      } catch (error) {
        console.error('Error parsing order data:', error);
        setHasData(false);
      }
    } else {
      setHasData(false);
    }
  }, []);

  const handleBack = () => {
    router.push('/proposition');
  };

  // Si pas de données, afficher un message d'erreur
  if (!hasData) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Aucune proposition trouvée
            </h2>
            <p className="text-zinc-400 mb-6">
              Veuillez d'abord compléter le test d'éligibilité et consulter votre proposition.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/eligibilite"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all"
              >
                Commencer le test d'éligibilité
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-all"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040a]">
      {/* Background Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.05,
        }}
      ></div>

      {/* Header with back button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#02040a]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à la proposition</span>
          </button>
          <div className="text-sm text-zinc-400">
            Signature de la proposition SecuriTrust
          </div>
        </div>
      </div>

      {/* Prochaine étape Section */}
      <div className="pt-20 pb-6 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 mb-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Prochaine étape → Valider votre mission
                </h2>
                <p className="text-white/70 mb-4">
                  Signez électroniquement votre proposition commerciale pour démarrer votre audit de sécurité. 
                  Le processus est simple, rapide et 100% sécurisé avec OpenSign.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">1</div>
                    <span className="text-white text-sm">Signez en ligne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm">2</div>
                    <span className="text-white text-sm">Confirmation immédiate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">3</div>
                    <span className="text-white text-sm">Paiement disponible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* eSignatures.io Embed */}
        <div className="px-6 pb-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ESignatureEmbed
              companyName={orderData?.company?.name || 'Entreprise'}
              email={orderData?.clientEmail || ''}
              siret={orderData?.company?.siret}
            />
          </div>
        </div>
    </div>
  );
}