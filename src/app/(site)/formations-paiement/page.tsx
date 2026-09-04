'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { getFormationBySlug, getPublishedFormations, formatPrice } from '@/lib/formations-data';
import { CheckCircle, CreditCard, ArrowRight, Shield, Lock } from 'lucide-react';

function FormationsPaiementContent() {
  const searchParams = useSearchParams();
  const formationSlug = searchParams.get('formation');
  const formations = getPublishedFormations();
  const [selectedSlug, setSelectedSlug] = useState(formationSlug || formations[0]?.slug || '');
  const [purchaseType, setPurchaseType] = useState<'one_time' | 'subscription'>('one_time');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (formationSlug) setSelectedSlug(formationSlug);
  }, [formationSlug]);

  const formation = getFormationBySlug(selectedSlug);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formation || !email || !name) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/formations/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formationSlug: formation.slug,
          email,
          name,
          purchaseType,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Erreur lors de la creation du paiement');
      }
    } catch {
      setError('Erreur de connexion. Veuillez reessayer.');
    } finally {
      setLoading(false);
    }
  }

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

        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">Inscription</h2>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                Inscrivez-vous a une formation
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Choisissez votre formation, remplissez vos informations et procedez au paiement securise.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Formation select */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Formation</label>
                    <select
                      value={selectedSlug}
                      onChange={(e) => setSelectedSlug(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    >
                      {formations.map((f) => (
                        <option key={f.slug} value={f.slug}>
                          {f.title} - {formatPrice(f.price)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jean Dupont"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Adresse email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="jean@exemple.fr"
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Purchase type */}
                  {formation?.priceMonthly && (
                    <div>
                      <label className="block text-sm text-slate-400 mb-3">Mode de paiement</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setPurchaseType('one_time')}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            purchaseType === 'one_time'
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <CreditCard className={`w-5 h-5 mb-2 ${purchaseType === 'one_time' ? 'text-cyan-400' : 'text-slate-500'}`} />
                          <div className="text-white font-medium text-sm">Paiement unique</div>
                          <div className="text-slate-500 text-xs mt-1">
                            {formation ? formatPrice(formation.price) : ''} - Acces a vie
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPurchaseType('subscription')}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            purchaseType === 'subscription'
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Shield className={`w-5 h-5 mb-2 ${purchaseType === 'subscription' ? 'text-cyan-400' : 'text-slate-500'}`} />
                          <div className="text-white font-medium text-sm">Abonnement mensuel</div>
                          <div className="text-slate-500 text-xs mt-1">
                            {formation ? formatPrice(formation.priceMonthly) : ''}/mois
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !formation}
                    className="w-full inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)] hover:shadow-[0_0_30px_rgba(118,166,209,0.5)] text-sm"
                  >
                    {loading ? 'Redirection...' : 'Proceder au paiement'}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5" />
                    Paiement securise par Stripe
                  </div>
                </form>
              </div>

              {/* Summary */}
              <div className="lg:col-span-2">
                {formation && (
                  <div className="glass-panel rounded-xl p-6 border border-white/10 sticky top-28">
                    <h3 className="text-lg font-medium text-white mb-4">Recapitulatif</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Formation</span>
                        <span className="text-white font-medium text-right max-w-[200px]">{formation.title}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Duree</span>
                        <span className="text-white">{formation.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Modules</span>
                        <span className="text-white">{formation.modules.length} modules</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Niveau</span>
                        <span className="text-white">{formation.level}</span>
                      </div>
                      <div className="border-t border-white/10 pt-4 flex justify-between">
                        <span className="text-slate-400">Total</span>
                        <span className="text-2xl font-bold text-white">
                          {purchaseType === 'subscription' && formation.priceMonthly
                            ? `${formatPrice(formation.priceMonthly)}/mois`
                            : formatPrice(formation.price)}
                        </span>
                      </div>
                    </div>
                    <ul className="mt-6 space-y-2 text-xs text-slate-500">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-500" />
                        Acces immediat apres paiement
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-500" />
                        Certificat de formation inclus
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-500" />
                        Satisfait ou rembourse 14 jours
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default function FormationsPaiementPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-cyan-500 animate-pulse uppercase tracking-widest text-sm">Chargement...</div>
      </div>
    }>
      <FormationsPaiementContent />
    </Suspense>
  );
}
