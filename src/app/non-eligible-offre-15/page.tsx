'use client';

import { ArrowRight, Shield, Clock, CheckCircle2, Phone, Mail, Download, Lock, Zap, TrendingUp } from 'lucide-react';
import { GradientBeamCTA } from '@/components/ui/gradient-beam-cta';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';

export default function NonEligiblePage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300 selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      {/* Scanline Overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>

      {/* Background Particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Hero Section - Centered */}
        <section className="relative px-6 pt-32 pb-24 border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
                VOTRE ORGANISATION N'EST PAS ÉLIGIBLE
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Bien que vous ne remplissiez pas les critères du programme principal, nous souhaitons vous accompagner avec cette offre exceptionnelle jusqu'au 31 décembre.
              </p>
            </div>

            {/* Improved Offer Banner */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-green-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative glass-panel px-8 py-6 rounded-2xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-cyan-500/5 to-green-500/10">
                <div className="flex flex-col items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full">
                    <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
                      Offre spéciale jusqu'au 31 décembre 2024
                    </span>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-6xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-gradient-shift">
                      -15%
                    </div>
                    <p className="text-lg font-medium text-cyan-300">
                      Remise immédiate sur tous nos pentests
                    </p>
                    <p className="text-sm text-slate-400 max-w-2xl mx-auto">
                      1 an pour réaliser votre audit • Sans restriction • Tous nos services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section - Card + Details */}
        <section className="sm:px-6 lg:px-8 lg:py-10 max-w-6xl mt-24 mr-auto mb-24 ml-auto pt-2 pr-4 pb-10 pl-4">
          <style dangerouslySetInnerHTML={{__html: `
            [style*="--border-gradient"]::before {
              content: "";
              position: absolute;
              inset: 0;
              padding: 1px;
              border-radius: var(--border-radius-before, inherit);
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              background: var(--border-gradient);
              pointer-events: none;
            }
          `}} />

          <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Détails de l'offre
            </h2>
            <span className="text-cyan-500 font-mono text-xs">01 // OFFRE</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Redesigned Modern Card */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-cyan-500/20 to-green-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Main Card */}
                  <div className="relative glass-panel rounded-3xl border-2 border-green-500/30 overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl">
                    {/* Header with animated gradient */}
                    <div className="relative px-6 py-8 bg-gradient-to-br from-green-500/20 via-cyan-500/10 to-transparent">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Shield className="w-6 h-6 text-cyan-400" />
                          <span className="text-lg font-semibold tracking-tight text-slate-100">SecuriTrust</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40">
                          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          <span className="text-xs font-medium text-amber-300">Limitée</span>
                        </div>
                      </div>

                      {/* Large Discount Badge */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
                        <div className="relative flex items-center justify-center py-8">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                            <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 shadow-[0_0_60px_rgba(34,197,94,0.6)]">
                              <span className="text-5xl font-bold text-white">-15%</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-sm font-semibold text-green-300 mt-2">
                          Remise exclusive
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="px-6 py-6 space-y-4 border-t border-slate-800/80">
                      <div className="flex items-start gap-4 group/item">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/30 to-green-500/10 border border-green-500/40 flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-semibold text-slate-100">Commande avant le 31/12</p>
                          <p className="text-xs text-slate-400 mt-0.5">Signature avant fin d'année</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group/item">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 border border-cyan-500/40 flex-shrink-0">
                          <Clock className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-semibold text-slate-100">1 an pour réaliser</p>
                          <p className="text-xs text-slate-400 mt-0.5">Flexibilité totale de planning</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group/item">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-500/10 border border-blue-500/40 flex-shrink-0">
                          <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-semibold text-slate-100">Tous nos pentests</p>
                          <p className="text-xs text-slate-400 mt-0.5">Sans aucune restriction</p>
                        </div>
                      </div>
                    </div>

                      {/* CTA Button */}
                      <div className="px-6 pb-6">
                        <a href="https://calendly.com/securitrust-pentest/consultation-cybersecurite" target="_blank" rel="noopener noreferrer" className="w-full group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white text-sm font-semibold py-4 px-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 flex items-center justify-between">
                          <span className="relative z-10 flex items-center justify-between w-full">
                            <span>Profiter de l'offre maintenant</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </a>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: offer details */}
            <div className="flex flex-col gap-8">
              <div className="space-y-6">
                {/* Stat 1 */}
                <div className="flex items-start gap-4 border-t border-slate-800/80 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/80 border border-slate-800/90">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4.5 h-4.5" strokeWidth="1.7">
                      <path fill="#22c55e"
                        d="M4 7.75C4 6.784 4.784 6 5.75 6h12.5c.966 0 1.75.784 1.75 1.75v7.5A2.75 2.75 0 0 1 17.25 18H6.75A2.75 2.75 0 0 1 4 15.25z"
                        opacity=".5" />
                      <path fill="#dcfce7"
                        d="M7 9.75A.75.75 0 0 1 7.75 9h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 7 9.75m0 3A.75.75 0 0 1 7.75 12h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 7 12.75"
                        />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
                        -15%
                      </span>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-[0.16em]">
                        Remise immédiate
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Réduction applicable sur tous nos services de pentest, sans exception.
                    </p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-start gap-4 border-t border-slate-800/80 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/80 border border-slate-800/90">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4.5 h-4.5" strokeWidth="1.7">
                      <path fill="#0ea5e9"
                        d="M4 6.75A1.75 1.75 0 0 1 5.75 5h12.5A1.75 1.75 0 0 1 20 6.75v10.5A1.75 1.75 0 0 1 18.25 19H5.75A1.75 1.75 0 0 1 4 17.25z"
                        opacity=".5" />
                      <path fill="#e0f2fe"
                        d="M8.53 11.47a.75.75 0 0 1 1.06 0L11 12.88l3.47-3.47a.75.75 0 0 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 0 1 0-1.06"
                        />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
                        31 déc.
                      </span>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-[0.16em]">
                        Date limite
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Commandez ou signez votre devis avant le 31 décembre 2024 à 23h59.
                    </p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-start gap-4 border-t border-b border-slate-800/80 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/80 border border-slate-800/90">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4.5 h-4.5" strokeWidth="1.7">
                      <path fill="#eab308"
                        d="M5 5.75A1.75 1.75 0 0 1 6.75 4h10.5A1.75 1.75 0 0 1 19 5.75v12.5A1.75 1.75 0 0 1 17.25 20H6.75A1.75 1.75 0 0 1 5 18.25z"
                        opacity=".5" />
                      <path fill="#fef9c3"
                        d="M9.75 8a.75.75 0 0 1 .75.75v4.19l1.72-1.72a.75.75 0 0 1 1.06 1.06l-3 3A.75.75 0 0 1 9 15.75v-7A.75.75 0 0 1 9.75 8"
                        />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
                        1 an
                      </span>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-[0.16em]">
                        Délai de réalisation
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Planifiez votre audit de sécurité quand vous le souhaitez dans les 12 mois.
                    </p>
                  </div>
                </div>
              </div>

                <div className="flex flex-wrap items-center gap-3">
                  <GradientBeamCTA 
                    href="https://calendly.com/securitrust-pentest/consultation-cybersecurite" 
                    text="Activer ma remise de -15%" 
                  />
                  <span className="text-xs text-slate-400">
                    Offre valable jusqu'au 31 décembre 2024
                  </span>
                </div>
            </div>
          </div>
        </section>

        {/* Conditions Section */}
        <section className="relative px-6 py-20 border-y border-white/5 bg-black/40">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                Conditions de l'offre
              </h2>
              <span className="text-cyan-500 font-mono text-xs">02 // CONDITIONS</span>
            </div>
            
            <ul className="space-y-4">
              {[
                'Réduction de 15% applicable sur le montant HT du pentest.',
                'Commande à confirmer ou devis à signer avant le 31 décembre à 23h59.',
                'Délai d\'un an à compter de la signature pour réaliser l\'audit.',
                'Offre valable une seule fois par organisation.',
                'Sans engagement pour la suite : vous restez libre après le pentest.'
              ].map((condition, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 glass-panel p-4 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>

            <div className="glass-panel bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-6 mt-8">
              <p className="text-sm text-cyan-300/90 italic">
                <strong>Note :</strong> Cette offre vise à faciliter votre premier pas vers la cybersécurité, avec flexibilité et sans contrainte.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Block */}
        <section className="relative px-6 py-32 border-t border-white/5 bg-black/40">
          <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                Besoin d'un accompagnement ?
              </h2>
              <span className="text-cyan-500 font-mono text-xs">03 // CONTACT</span>
            </div>

            <div className="glass-panel p-12 rounded-2xl border-2 border-green-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent pointer-events-none"></div>
              
              <div className="space-y-4 relative z-10 text-center">
                <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
                  Profitez de <span className="text-green-400 font-bold">-15%</span> avant le 31/12
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Commandez ou signez votre devis avant la fin de l'année et réalisez votre pentest quand vous le souhaitez dans les 12 mois suivants.
                </p>
              </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 relative z-10">
                  <GradientBeamCTA 
                    href="https://calendly.com/securitrust-pentest/consultation-cybersecurite" 
                    text="Activer ma remise de -15%" 
                  />
                  <a 
                    href="https://calendly.com/securitrust-pentest/consultation-cybersecurite" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 glass-panel border-2 border-cyan-500/30 rounded-full text-cyan-400 font-medium hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2"
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
                  <div className="text-sm text-slate-400">Réponse sous 24h</div>
                </div>
                <div className="space-y-2 text-center">
                  <div className="text-3xl font-bold text-cyan-400">+2500</div>
                  <div className="text-sm text-slate-400">Audits réalisés</div>
                </div>
                <div className="space-y-2 text-center">
                  <div className="text-3xl font-bold text-cyan-400">100%</div>
                  <div className="text-sm text-slate-400">Satisfaction client</div>
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