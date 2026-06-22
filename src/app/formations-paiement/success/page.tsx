'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

function FormationsSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [formationSlug, setFormationSlug] = useState('');
  const [formationTitle, setFormationTitle] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    fetch(`/api/formations/verify-access?session_id=${sessionId}`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus('success');
          setFormationSlug(data.formationSlug || '');
          setFormationTitle(data.formationTitle || '');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [sessionId]);

  return (
    <div className="relative min-h-screen antialiased text-slate-300 selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        <section className="relative pt-32 pb-20 px-6 min-h-[70vh] flex items-center">
          <div className="max-w-2xl mx-auto text-center w-full">
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                <p className="text-xl text-slate-400">Validation de votre paiement...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="glass-panel rounded-2xl p-12 border border-cyan-500/20">
                <div className="w-20 h-20 rounded-full border-2 border-cyan-500 bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-cyan-400" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                  Paiement confirme !
                </h1>
                <p className="text-lg text-slate-400 mb-2">
                  Votre acces a la formation <strong className="text-white">{formationTitle}</strong> est maintenant actif.
                </p>
                <p className="text-sm text-slate-500 mb-8">
                  Un email de confirmation a ete envoye. Vous pouvez commencer votre formation immediatement.
                </p>
                <a
                  href={`/formations/apprendre/${formationSlug}`}
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)] hover:shadow-[0_0_30px_rgba(118,166,209,0.5)]"
                >
                  Commencer la formation
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            )}

            {status === 'error' && (
              <div className="glass-panel rounded-2xl p-12 border border-red-500/20">
                <h1 className="text-3xl font-semibold text-white mb-4">
                  Erreur de validation
                </h1>
                <p className="text-lg text-slate-400 mb-8">
                  Nous n&apos;avons pas pu valider votre paiement. Si vous avez ete debite, contactez-nous.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all"
                >
                  Contacter le support
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default function FormationsSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    }>
      <FormationsSuccessContent />
    </Suspense>
  );
}
