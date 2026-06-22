'use client';

import { ArrowRight, Shield, Clock, CheckCircle2, Mail } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';

export default function NonEligiblePage() {
  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Hero Section */}
        <section className="relative px-6 pt-32 pb-24 border-b border-cyan-500/10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
                VOTRE ORGANISATION N'EST PAS ÉLIGIBLE
              </h1>
              <p className="text-lg sm:text-xl text-cyan-100/80 max-w-3xl mx-auto leading-relaxed">
                Bien que vous ne remplissiez pas les critères du programme principal, nous souhaitons vous accompagner avec cette offre exceptionnelle.
              </p>
            </div>

            {/* Offer Banner */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-green-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl border-2 border-cyan-500/40 px-8 py-6" style={{ background: 'linear-gradient(135deg, rgba(118,166,209,0.12) 0%, rgba(34,197,94,0.08) 100%)' }}>
                <div className="flex flex-col items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/50" style={{ background: 'rgba(118,166,209,0.15)' }}>
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
                      Offre spéciale réservée
                    </span>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                      -15%
                    </div>
                    <p className="text-lg font-medium text-cyan-300">
                      Remise immédiate sur tous nos pentests
                    </p>
                    <p className="text-sm text-cyan-100/60 max-w-2xl mx-auto">
                      1 an pour réaliser votre audit • Sans restriction • Tous nos services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="sm:px-6 lg:px-8 lg:py-10 max-w-6xl mt-24 mr-auto mb-24 ml-auto pt-2 pr-4 pb-10 pl-4">
          <div className="flex items-end justify-between mb-12 border-b border-cyan-500/20 pb-4">
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Détails de l'offre
            </h2>
            <span className="text-cyan-400 font-mono text-xs">01 // OFFRE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Card */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-green-500/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative rounded-3xl border-2 border-cyan-500/40 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(118,166,209,0.15) 0%, rgba(8,50,60,0.95) 50%, rgba(34,197,94,0.10) 100%)' }}>
                    {/* Header */}
                    <div className="relative px-6 py-8" style={{ background: 'linear-gradient(135deg, rgba(118,166,209,0.20) 0%, rgba(34,197,94,0.08) 100%)' }}>
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Shield className="w-6 h-6 text-cyan-400" />
                          <span className="text-lg font-semibold tracking-tight text-white">SecuriTrust</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40" style={{ background: 'rgba(118,166,209,0.15)' }}>
                          <Shield className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-xs font-medium text-cyan-300">Exclusive</span>
                        </div>
                      </div>

                      {/* Discount Badge */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-green-400/20 rounded-2xl blur-xl"></div>
                        <div className="relative flex items-center justify-center py-8">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                            <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 shadow-[0_0_60px_rgba(118,166,209,0.6)]">
                              <span className="text-5xl font-bold text-white">-15%</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-sm font-semibold text-cyan-300 mt-2">
                          Remise exclusive
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="px-6 py-6 space-y-4 border-t border-cyan-500/20">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 flex-shrink-0" style={{ background: 'rgba(118,166,209,0.15)' }}>
                          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-semibold text-white">Remise immédiate de -15%</p>
                          <p className="text-xs text-cyan-100/60 mt-0.5">Sur tous nos services</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/40 flex-shrink-0" style={{ background: 'rgba(34,197,94,0.15)' }}>
                          <Clock className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-semibold text-white">1 an pour réaliser</p>
                          <p className="text-xs text-cyan-100/60 mt-0.5">Flexibilité totale de planning</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 flex-shrink-0" style={{ background: 'rgba(118,166,209,0.15)' }}>
                          <Shield className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-semibold text-white">Tous nos pentests</p>
                          <p className="text-xs text-cyan-100/60 mt-0.5">Sans aucune restriction</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="px-6 pb-6">
                      <a
                        href="https://calendly.com/expert-securitrust"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm font-semibold py-4 px-6 hover:shadow-[0_0_30px_rgba(118,166,209,0.5)] transition-all duration-300 flex items-center justify-between"
                      >
                        <span className="relative z-10 flex items-center justify-between w-full">
                          <span>Profiter de l'offre maintenant</span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="flex flex-col gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 border-t border-cyan-500/20 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-cyan-500/30" style={{ background: 'rgba(118,166,209,0.10)' }}>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">-15%</span>
                      <span className="text-xs font-medium text-cyan-300/70 uppercase tracking-[0.16em]">Remise immédiate</span>
                    </div>
                    <p className="text-sm text-cyan-100/60">Réduction applicable sur tous nos services de pentest, sans exception.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-cyan-500/20 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-green-500/30" style={{ background: 'rgba(34,197,94,0.10)' }}>
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Flexible</span>
                      <span className="text-xs font-medium text-cyan-300/70 uppercase tracking-[0.16em]">Sans contrainte</span>
                    </div>
                    <p className="text-sm text-cyan-100/60">Offre activable à votre convenance, sans date d'expiration imposée.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-b border-cyan-500/20 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-cyan-500/30" style={{ background: 'rgba(118,166,209,0.10)' }}>
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">1 an</span>
                      <span className="text-xs font-medium text-cyan-300/70 uppercase tracking-[0.16em]">Délai de réalisation</span>
                    </div>
                    <p className="text-sm text-cyan-100/60">Planifiez votre audit de sécurité quand vous le souhaitez dans les 12 mois.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://calendly.com/expert-securitrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm font-semibold py-3 px-6 hover:shadow-[0_0_20px_rgba(118,166,209,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Activer ma remise de -15%</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <span className="text-xs text-cyan-100/50">Offre réservée à votre organisation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions Section */}
        <section className="relative px-6 py-20 border-y border-cyan-500/10" style={{ background: 'rgba(118,166,209,0.03)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-cyan-500/20 pb-4">
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                Conditions de l'offre
              </h2>
              <span className="text-cyan-400 font-mono text-xs">02 // CONDITIONS</span>
            </div>

            <ul className="space-y-4">
              {[
                'Réduction de 15% applicable sur le montant HT du pentest.',
                'Commande à confirmer ou devis à signer selon vos disponibilités.',
                "Délai d'un an à compter de la signature pour réaliser l'audit.",
                'Offre valable une seule fois par organisation.',
                'Sans engagement pour la suite : vous restez libre après le pentest.'
              ].map((condition, index) => (
                <li key={index} className="flex items-start gap-3 text-white p-4 rounded-lg border border-cyan-500/20" style={{ background: 'rgba(118,166,209,0.07)' }}>
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-lg p-6 mt-8 border border-cyan-500/30" style={{ background: 'rgba(118,166,209,0.08)' }}>
              <p className="text-sm text-cyan-200 italic">
                <strong>Note :</strong> Cette offre vise à faciliter votre premier pas vers la cybersécurité, avec flexibilité et sans contrainte.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Block */}
        <section className="relative px-6 py-32 border-t border-cyan-500/10" style={{ background: 'rgba(118,166,209,0.02)' }}>
          <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between mb-8 border-b border-cyan-500/20 pb-4">
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                Besoin d'un accompagnement ?
              </h2>
              <span className="text-cyan-400 font-mono text-xs">03 // CONTACT</span>
            </div>

            <div className="p-12 rounded-2xl border-2 border-cyan-500/30 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(118,166,209,0.12) 0%, rgba(8,40,50,0.95) 50%, rgba(34,197,94,0.08) 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none"></div>

              <div className="space-y-4 relative z-10 text-center">
                <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
                  Profitez de <span className="text-cyan-400 font-bold">-15%</span> sur votre pentest
                </h2>
                <p className="text-lg text-cyan-100/70 max-w-2xl mx-auto">
                  Signez votre devis et réalisez votre pentest quand vous le souhaitez dans les 12 mois suivants.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 relative z-10">
                <a
                  href="https://calendly.com/expert-securitrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm font-semibold py-4 px-8 hover:shadow-[0_0_30px_rgba(118,166,209,0.5)] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Activer ma remise de -15%</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://calendly.com/expert-securitrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 border-2 border-cyan-500/40 rounded-full text-cyan-300 font-medium hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Poser une question à un expert
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid sm:grid-cols-3 gap-6 pt-12 relative z-10">
                <div className="space-y-2 text-center">
                  <div className="text-3xl font-bold text-cyan-400">24h</div>
                  <div className="text-sm text-cyan-100/60">Réponse sous 24h</div>
                </div>
                <div className="space-y-2 text-center">
                  <div className="text-3xl font-bold text-cyan-400">+2500</div>
                  <div className="text-sm text-cyan-100/60">Audits réalisés</div>
                </div>
                <div className="space-y-2 text-center">
                  <div className="text-3xl font-bold text-cyan-400">100%</div>
                  <div className="text-sm text-cyan-100/60">Satisfaction client</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
