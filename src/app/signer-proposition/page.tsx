'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle, ArrowLeft, CreditCard, ShieldCheck, FileSignature, Building2, User, Mail, Hash, Feather } from 'lucide-react';
import { toast } from 'sonner';
import { ProposalHeader } from '@/components/sections/proposal-header';

export const dynamic = 'force-dynamic';

export default function SignerPropositionPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
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
        try {
          const isInIframe = window.self !== window.top;
          
          if (isInIframe) {
            window.parent.postMessage({ type: 'OPEN_EXTERNAL_URL', data: { url: data.url } }, '*');
            
            try {
              if (window.top) {
                window.top.location.href = data.url;
              }
            } catch (e) {
              window.location.href = data.url;
            }
          } else {
            window.location.href = data.url;
          }
        } catch (e) {
          window.location.href = data.url;
        }
        
        setTimeout(() => {
          setIsRedirectingToStripe(false);
          if (window.location.pathname === '/signer-proposition') {
            router.push('/paiement');
          }
        }, 5000);
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
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-[#00ffa3] animate-spin mx-auto" />
            <ShieldCheck className="w-6 h-6 text-[#00ffa3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-2">
            <p className="text-white text-xl font-bold uppercase tracking-tight">
              {isRedirectingToStripe ? "Confirmation de la signature..." : "Chargement du contrat..."}
            </p>
            <p className="text-[#888888] font-mono text-xs uppercase tracking-widest animate-pulse">
              {isRedirectingToStripe ? "Redirection vers le paiement sécurisé" : "Veuillez patienter"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-red-500/5 border border-red-500/20 p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white uppercase mb-2 tracking-tight">Impossible d'afficher le contrat</h2>
          <p className="text-[#888888] text-sm mb-6">{error}</p>
          <button onClick={handleBack} className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase text-xs tracking-widest transition-colors">
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col relative text-[#e0e0e0] font-['Inter',sans-serif] antialiased">
      {/* Background Grid */}
      <div
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <ProposalHeader clientName={companyName || "Client"} />
      
      <div className="h-16 border-b border-white/5 flex items-center px-6 bg-[#030303]/90 backdrop-blur-xl justify-between z-10">
        <div className="flex items-center gap-6">
          <button onClick={handleBack} className="text-[#888888] hover:text-[#00ffa3] transition-colors flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
            <ArrowLeft className="w-3 h-3" />
            Back
          </button>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold tracking-tight text-white">
              {companyName || "ENTITÉ CLIENT"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#00ffa3]">
            <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full animate-pulse"></span>
            ENCRYPTED LINK
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative bg-white">
        {signUrl && (
          <iframe 
            src={signUrl} 
            className="absolute inset-0 w-full h-full border-0"
            allow="camera; microphone"
          />
        )}
      </div>

      {isSignatureDone && (
        <div className="fixed bottom-0 left-0 w-full p-8 bg-[#030303]/95 border-t border-white/10 backdrop-blur-xl z-50">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-[#00ffa3]/30 flex items-center justify-center bg-[#00ffa3]/5">
                <ShieldCheck className="w-6 h-6 text-[#00ffa3]" />
              </div>
              <div>
                <p className="text-white font-bold uppercase tracking-tight">Contrat Signé</p>
                <p className="text-[#888888] font-mono text-[10px] uppercase tracking-widest">All conditions accepted</p>
              </div>
            </div>

            <button 
              onClick={goToPayment}
              className="w-full sm:w-auto px-10 py-4 bg-[#00ffa3] text-[#030303] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,163,0.3)] flex items-center justify-center gap-3"
            >
              <span>Procéder au paiement</span>
              <CreditCard className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Footer - Minimalist */}
      <footer className="border-t border-white/5 py-8 bg-[#030303] relative z-20">
        <div className="max-w-[1920px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} SecuriTrust — Secure Signing Protocol
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] shadow-[0_0_8px_rgba(0,255,163,0.8)] animate-pulse"></div>
            <span className="font-mono text-[10px] text-[#00ffa3] uppercase tracking-widest">Uplink Stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
