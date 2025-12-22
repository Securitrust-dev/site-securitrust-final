'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle, ArrowLeft, CreditCard, ShieldCheck, FileSignature, Building2, User, Mail, Hash, Feather } from 'lucide-react';
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
  const [isRedirectingToStripe, setIsRedirectingToStripe] = useState(false);
  
  const [step, setStep] = useState<'sign'>('sign');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [siret, setSiret] = useState('');
  const [signerName, setSignerName] = useState('');

  const goToPayment = useCallback(async () => {
    sessionStorage.setItem('propositionSigned', 'true');
    setIsRedirectingToStripe(true);
    toast.info("Signature confirmée ! Préparation de votre paiement sécurisé...");
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'Pro', 
          amount: 4999,
          email: email,
          name: signerName || companyName || "Client SecuriTrust",
        })
      });

      const data = await response.json();
      
      if (data.url) {
        // Use multiple redirection strategies to bail out of iframe
        try {
          if (window.top) {
            window.top.location.href = data.url;
          } else {
            window.location.href = data.url;
          }
        } catch (e) {
          window.location.href = data.url;
        }
        
        // Safety fallback if redirection fails
        setTimeout(() => {
          setIsRedirectingToStripe(false);
          router.push('/paiement');
        }, 3000);
      } else {
        router.push('/paiement');
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
      router.push('/paiement');
    }
  }, [router, email, signerName, companyName]);

  useEffect(() => {
    const storedData = sessionStorage.getItem('eligibilityData');
    let cName = '', mail = '', sr = '', sName = '';
    let pInfo = {
      activeDirectoryList: '',
      testAccounts: '',
      timeSlots: '',
      urgencyContact: '',
      techRestrictions: ''
    };

    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        const emailFromAnswers = data.answers?.find((a: any) => a.questionId === 'email')?.answer;
        cName = data.company?.name || data.companyName || data.name || "Entreprise";
        mail = emailFromAnswers || data.email || "client@exemple.fr";
        sr = data.company?.siret || data.siret || "00000000000000";
        sName = data.signerName || cName || "Client SecuriTrust";
        pInfo = data.prestationInfo || pInfo;
        
        setCompanyName(cName);
        setEmail(mail);
        setSiret(sr);
        setSignerName(sName);
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    } else {
      cName = "Entreprise";
      mail = "client@exemple.fr";
      sr = "00000000000000";
      sName = cName;
      setCompanyName(cName);
      setEmail(mail);
      setSiret(sr);
      setSignerName(sName);
    }

    const triggerSign = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/esignatures/sign-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: cName,
            email: mail,
            siret: sr,
            signerName: sName,
            ...pInfo
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

    triggerSign();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      console.log('Message reçu de l\'iframe:', data);
      
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
        
        setTimeout(() => {
          goToPayment();
        }, 1500);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router, goToPayment]);

  const handleBack = () => {
    router.push('/proposition');
  };

  if (loading || isRedirectingToStripe) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto" />
            <ShieldCheck className="w-6 h-6 text-green-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-2">
            <p className="text-white text-xl font-medium">
              {isRedirectingToStripe ? "Confirmation de la signature..." : "Chargement de votre contrat..."}
            </p>
            <p className="text-slate-400 animate-pulse">
              {isRedirectingToStripe ? "Redirection vers le paiement Stripe sécurisé" : "Veuillez patienter un instant"}
            </p>
          </div>
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
