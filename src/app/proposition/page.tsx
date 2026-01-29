'use client';

import { Users, Target, CheckCircle2, FileCheck, Search, Database, Server, Network, Lock, FileSignature, CreditCard, Home, Feather, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProposalHeader } from '@/components/sections/proposal-header';
import { PartnersScrollingBanner } from '@/components/sections/partners-scrolling-banner';

export default function PropositionPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [isSigned, setIsSigned] = useState(false);
  
  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem('eligibilityData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setOrderData(data);
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }

    const propositionSigned = sessionStorage.getItem('propositionSigned');
    if (propositionSigned === 'true') {
      setIsSigned(true);
    }
  }, []);

  const handleSignProposal = () => {
    router.push('/signer-proposition');
  };

  const handlePayment = () => {
    router.push('/paiement');
  };

  return (
    <div className="antialiased selection:bg-[#00ffa3] selection:text-[#030303] overflow-x-hidden text-[#e0e0e0] font-['Inter',sans-serif] bg-[#030303] min-h-screen">
      {/* Proposal Header Banner */}
      <ProposalHeader clientName={orderData?.company?.name || orderData?.companyName || "Client"} />

      {/* Background Grid - Aetheris Style */}
      <div
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Navigation HUD style */}
      <header className="relative z-10 border-b border-white/5 bg-[#030303]/90 backdrop-blur-xl">
        <nav className="max-w-[1920px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <p className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-mono">PROPOSAL_V2.0</p>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
            <p className="text-sm font-semibold tracking-tight text-white">
              {orderData?.company?.name || orderData?.companyName || "PROPRIETARY DOCUMENT"}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#00ffa3]">
              <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full animate-pulse"></span>
              SECURE LINK
            </div>
            <button
              onClick={() => router.push('/')}
              className="bg-white/5 border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-white"
            >
              Back
            </button>
            <div className="text-[10px] font-mono text-[#888888] hidden sm:block uppercase">
              {getCurrentDate()}
            </div>
          </div>
        </nav>
      </header>

      <div className="relative z-10 max-w-[1920px] mx-auto">
        
        {/* HERO - Aetheris Style with stroked text */}
        <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-center bg-[#030303] overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]" />
          </div>
          
          <div className="relative z-20 flex flex-col items-center text-center px-6">
            <div className="mb-4">
              <span className="text-[#00ffa3] font-mono text-[10px] tracking-[0.4em] uppercase py-1 px-3 border border-[#00ffa3]/20 bg-[#00ffa3]/5 rounded-full">
                Business Proposal
              </span>
            </div>
            
            <h1 className="flex flex-col items-center justify-center leading-none">
              <span className="font-display text-5xl md:text-8xl font-bold text-white tracking-tightest mix-blend-lighten uppercase">
                VOTRE
              </span>
              <span 
                className="font-display text-[15vw] md:text-[160px] font-bold tracking-tighter text-transparent select-none pointer-events-none opacity-90 transition-opacity uppercase"
                style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.25)' }}
              >
                BESOIN
              </span>
            </h1>
            
            <p className="max-w-xl text-[#888888] text-sm md:text-lg font-medium leading-relaxed mt-8">
              Une approche sur mesure pour sécuriser vos actifs numériques et garantir la résilience de votre infrastructure critique.
            </p>
          </div>
        </section>

        {/* Tech Separator */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[3px] bg-[#00ffa3] shadow-[0_0_10px_#00ffa3]" />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            {/* CONTEXTE - Tech Panel */}
            <div className="lg:col-span-8 bg-[#080808] border border-white/5 p-8 md:p-12 relative overflow-hidden group hover:border-[#00ffa3]/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#888888] opacity-20">REF: CTX_01</div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-[#00ffa3]" />
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tightest text-white">CONTEXTE</h2>
              </div>
              
              <div className="space-y-8 text-[#888888] leading-relaxed text-sm md:text-base">
                <p className="text-lg md:text-xl text-white/90 font-medium">
                  <span className="text-[#00ffa3] font-mono">[ENTITY]</span> {orderData?.company?.name || orderData?.companyName || "VOTRE ENTREPRISE"} souhaite renforcer sa posture défensive face aux menaces émergentes.
                </p>
                <div className="h-[1px] w-full bg-white/5" />
                <p>
                  L'objectif central est la réalisation d'un <span className="text-white font-semibold">audit technique approfondi</span> de l'infrastructure Active Directory. Dans un paysage cyber de plus en plus complexe, la maîtrise de l'identité est le premier rempart de votre souveraineté numérique.
                </p>
                <p>
                  Notre méthodologie s'articule autour de l'analyse structurelle des privilèges, la détection de chemins d'attaque furtifs et le durcissement des mécanismes d'authentification. L'approche hybride simule avec précision les tactiques des groupes d'attaquants les plus sophistiqués.
                </p>
                <div className="p-6 bg-white/[0.02] border-l-2 border-[#00ffa3]/50 italic text-sm">
                  "Sécuriser n'est pas seulement boucher des trous, c'est concevoir un système où l'erreur humaine ne conduit pas à la compromission totale."
                </div>
              </div>
            </div>

            {/* Right Column Boxes */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Livrables - Mint Panel */}
              <div className="bg-[#00ffa3] p-8 relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#030303] mb-8 uppercase tracking-tighter">Livrables</h3>
                  <ul className="space-y-5">
                    {[
                      'Rapport d\'Audit complet (PDF)',
                      'Synthèse Décisionnelle',
                      'Matrice de Remédiation (XLS)',
                      'Audit de suivi à 30 jours',
                      'Certificat de Conformité'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#030303]">
                        <div className="mt-1 w-5 h-5 bg-[#030303] flex items-center justify-center rounded-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffa3]" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Période - Tech Dark Panel */}
              <div className="bg-[#080808] border border-white/5 p-8 relative overflow-hidden group hover:border-[#00ffa3]/30 transition-all duration-500">
                <div className="absolute bottom-0 right-0 p-4">
                  <Clock className="w-24 h-24 text-white/5" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-[10px] font-mono text-[#00ffa3] mb-2 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full" />
                    Project Timeline
                  </h3>
                  <div className="flex flex-col mt-4">
                    <span className="text-5xl font-bold text-white uppercase tracking-tightest italic leading-none">02 WEEKS</span>
                    <p className="text-[#888888] text-[10px] font-mono mt-4 uppercase tracking-widest">
                      &gt; DEPLOYMENT: DAY 01<br/>
                      &gt; ANALYSIS: DAY 03-10<br/>
                      &gt; FINAL_REPORT: DAY 14
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted Clients - Scrolling Banner style */}
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.4em]">Ecosystem_Partners</h2>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <PartnersScrollingBanner />
          </section>

          {/* Prochaines Étapes - Reveal cards */}
          <section className="mb-32">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="font-display text-4xl font-bold mb-2 tracking-tight text-white uppercase">Roadmap opérationnelle</h2>
                <p className="text-[#888888] text-sm md:text-base max-w-md">Chronologie séquentielle de l'engagement SecuriTrust.</p>
              </div>
              <div className="hidden md:block text-right">
                <div className="font-mono text-[10px] text-[#00ffa3] tracking-widest uppercase">SYS_FLOW_V2</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/5">
              {[
                { step: '01', title: 'Onboarding', description: 'Initialisation des accès et revue de périmètre.', icon: FileCheck },
                { step: '02', title: 'Exploitation', description: 'Lancement de l\'audit technique et tests d\'intrusion.', icon: Search },
                { step: '03', title: 'Analyse', description: 'Traitement des données et rédaction du rapport.', icon: Target },
                { step: '04', title: 'Restitution', description: 'Livraison finale et réunion de débriefing.', icon: Users },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <article key={idx} className="group border-b md:border-b-0 md:border-r last:border-r-0 border-white/5 p-8 bg-[#080808] hover:bg-white/[0.02] transition-colors relative">
                    <div className="absolute top-4 right-4 font-mono text-2xl font-bold text-white/5 group-hover:text-[#00ffa3]/20 transition-colors">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3] group-hover:border-[#00ffa3]/50 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3 tracking-tight text-white uppercase">{step.title}</h3>
                    <p className="text-sm text-[#888888] leading-relaxed">{step.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Investment - Aetheris Staking Dashboard style */}
          <section id="investment" className="grid grid-cols-1 lg:grid-cols-2 border border-white/5 bg-[#080808]">
            {/* Left side: The Price/Chart feel */}
            <div className="p-8 md:p-20 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,163,0.05),_transparent_70%)]" />
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="none" />
                  <circle 
                    cx="50" cy="50" r="45" 
                    stroke="#00ffa3" strokeWidth="4" fill="none" 
                    strokeDasharray="283" strokeDashoffset="70" 
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono text-[#00ffa3] uppercase tracking-[0.3em] mb-2">Total Value</span>
                  <span className="text-5xl md:text-6xl font-bold text-white tracking-tighter italic">4 999€</span>
                  <span className="text-[10px] text-[#888888] uppercase mt-2">HORS TAXES</span>
                </div>
              </div>

              <div className="w-full max-w-sm grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-xl font-bold text-white">5 JOURS</div>
                  <div className="text-[8px] font-mono text-[#888888] uppercase tracking-widest">SLA DELIVERY</div>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-xl font-bold text-[#00ffa3]">LIFETIME</div>
                  <div className="text-[8px] font-mono text-[#888888] uppercase tracking-widest">TECH SUPPORT</div>
                </div>
              </div>
            </div>

            {/* Right side: Action Area */}
            <div className="p-8 md:p-20 flex flex-col justify-center bg-[#030303]">
              <h3 className="font-display text-3xl font-bold mb-8 tracking-tight text-white uppercase">SÉCURISATION GLOBALE</h3>
              
              <div className="space-y-4 mb-12">
                {[
                  'Test d\'Intrusion complet de l\'infrastructure',
                  'Évaluation de la résilience Active Directory',
                  'Rapport de conformité technique',
                  'Support technique prioritaire post-audit',
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00ffa3] font-mono text-[10px] shrink-0 group-hover:border-[#00ffa3]/50 transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-sm md:text-base text-[#888888] group-hover:text-white/80 transition-colors">{item}</p>
                  </div>
                ))}
              </div>

              {isSigned ? (
                <div className="space-y-4">
                  <div className="p-6 bg-[#00ffa3]/5 border border-[#00ffa3]/20 flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-[#00ffa3]" />
                    <div>
                      <p className="text-[#00ffa3] font-bold text-lg uppercase tracking-tight">PROPOSAL SIGNED</p>
                      <p className="text-[#888888] text-xs font-mono uppercase">TRANSACTION_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handlePayment}
                    className="w-full bg-[#00ffa3] text-[#030303] py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,255,163,0.3)]"
                  >
                    <CreditCard className="w-5 h-5" />
                    Procéder au Paiement
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleSignProposal}
                  className="w-full bg-white text-[#030303] py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#00ffa3] transition-all flex items-center justify-center gap-3"
                >
                  Signer le document
                  <Feather className="w-5 h-5" />
                </button>
              )}

              <div className="mt-8 pt-8 border-t border-white/5 space-y-2">
                <p className="text-[10px] font-mono text-[#888888] uppercase tracking-widest">
                  CONTACT: jad.joumblat@securitrust.fr
                </p>
                <p className="text-[10px] font-mono text-[#888888] uppercase tracking-widest">
                  SECURE_COMMS: +33 6 08 94 87 97
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer - Minimalist Aetheris Style */}
      <footer className="border-t border-white/5 py-12 bg-[#030303] relative z-20">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 opacity-60">
            <Image 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-1764601146487.png?width=8000&height=8000&resize=contain"
              alt="SecuriTrust Logo"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
          </div>
          <p className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} SecuriTrust — Autonomous Security Protocol
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] shadow-[0_0_8px_rgba(0,255,163,0.8)] animate-pulse"></div>
            <span className="font-mono text-[10px] text-[#00ffa3] uppercase tracking-widest">Nodes Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
