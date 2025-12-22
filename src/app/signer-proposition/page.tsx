'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle, ArrowLeft, CreditCard, ShieldCheck, FileSignature, Building2, User, Mail, Hash } from 'lucide-react';
import { toast } from 'sonner';

export const dynamic = 'force-dynamic';

export default function SignerPropositionPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false); // Change to false initially
  const [error, setError] = useState<string | null>(null);
  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [showManualButton, setShowManualButton] = useState(false);
  const [isSignatureDone, setIsSignatureDone] = useState(false);
  
  const [step, setStep] = useState<'info' | 'sign'>('info');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [siret, setSiret] = useState('');
  const [signerName, setSignerName] = useState('');

  const isFormValid = companyName.trim().length > 0 && 
                      email.trim().length > 5 && 
                      email.includes('@') &&
                      siret.trim().length >= 9 &&
                      signerName.trim().length > 2;

  const goToPayment = () => {
    sessionStorage.setItem('propositionSigned', 'true');
    router.push('/paiement');
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem('eligibilityData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        // Initialize form fields from session storage if available
        const emailFromAnswers = data.answers?.find((a: any) => a.questionId === 'email')?.answer;
        setCompanyName(data.company?.name || data.companyName || data.name || "");
        setEmail(emailFromAnswers || data.email || "");
        setSiret(data.company?.siret || data.siret || "");
        setSignerName(data.signerName || "");
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
  }, []);

  const handleStartSigning = async () => {
    if (!isFormValid) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    setStep('sign');
    
    try {
      const response = await fetch('/api/esignatures/sign-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          email,
          siret,
          signerName
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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      console.log('Message reçu de l\'iframe:', data);
      
      // Détecter les événements de signature réussie uniquement
      const isActuallySigned = 
        data?.event === 'es:signed' || 
        data?.event === 'es:document:signed' ||
        data?.type === 'es:signed' ||
        data === 'es:signed' ||
        (typeof data === 'string' && (data === 'signed' || data === 'es:signed'));
      
      if (isActuallySigned) {
        setIsSignatureDone(true);
        setIsSigned(true);
        setShowManualButton(true);
        toast.success("Contrat signé ! Redirection vers le paiement...");
        
        // Redirection immédiate
        setTimeout(() => {
          goToPayment();
        }, 1500); // Petit délai pour laisser voir le toast
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [router]);

  const handleBack = () => {
    if (step === 'sign' && !isSigned) {
      setStep('info');
      setSignUrl(null);
    } else {
      router.push('/proposition');
    }
  };

  if (step === 'info') {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_70%)]" />
        </div>

        <div className="w-full max-w-xl relative z-10">
          <button 
            onClick={() => router.push('/proposition')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à la proposition
          </button>

          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <FileSignature className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Vérification d'identité</h1>
                <p className="text-slate-400 text-sm">Complétez vos informations avant de signer</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Prénom & Nom du signataire
                </label>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ex: SecuriTrust"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none placeholder:text-zinc-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean@entreprise.fr"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Numéro SIRET
                  </label>
                  <input
                    type="text"
                    value={siret}
                    onChange={(e) => setSiret(e.target.value)}
                    placeholder="14 chiffres"
                    maxLength={14}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 transition-colors outline-none placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartSigning}
                  disabled={!isFormValid || loading}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                    isFormValid 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/40 hover:scale-[1.02]' 
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Accéder au contrat</span>
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-zinc-500 mt-6 italic">
                La signature électronique est légalement contraignante. Vos informations sont traitées de manière sécurisée.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
