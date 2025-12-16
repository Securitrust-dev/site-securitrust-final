'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Download, Mail, ArrowRight } from 'lucide-react';
import { OrangeBeamCTA } from '@/components/ui/orange-beam-cta';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Nettoyer le sessionStorage après paiement réussi
    sessionStorage.removeItem('propositionSigned');
    sessionStorage.removeItem('signatureDate');
    sessionStorage.removeItem('eligibilityData');

    // Countdown pour redirection automatique
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Success Card */}
        <div className="glass-panel rounded-2xl p-8 md:p-12 text-center border-2 border-cyan-500/20">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Paiement réussi !
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            Votre paiement a été traité avec succès. Nous avons bien reçu votre commande pour l'audit de cybersécurité.
          </p>

          {/* Session ID */}
          {sessionId && (
            <div className="mb-8 p-4 bg-black/40 rounded-lg border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Référence de transaction</p>
              <p className="text-sm text-cyan-400 font-mono">{sessionId}</p>
            </div>
          )}

          {/* Next Steps */}
          <div className="mb-8 text-left max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Prochaines étapes
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-3 h-3 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Confirmation par email</p>
                  <p className="text-sm text-slate-400">
                    Vous recevrez un email de confirmation avec tous les détails de votre commande
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Download className="w-3 h-3 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Document signé</p>
                  <p className="text-sm text-slate-400">
                    Votre proposition commerciale signée sera envoyée par email
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Prise de contact</p>
                  <p className="text-sm text-slate-400">
                    Notre équipe vous contactera sous 24-48h pour planifier l'audit
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <OrangeBeamCTA 
              href="/" 
              text="Retour à l'accueil"
              className="w-full sm:w-auto"
            />
            <button
              onClick={() => router.push('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/10 text-white hover:bg-white/5 transition-all font-medium w-full sm:w-auto justify-center"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Auto-redirect notice */}
          <p className="mt-6 text-sm text-slate-500">
            Redirection automatique dans {countdown} secondes...
          </p>
        </div>

        {/* Support Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Une question ? Contactez-nous à{' '}
            <a 
              href="mailto:contact@securitrust.fr" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              contact@securitrust.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}