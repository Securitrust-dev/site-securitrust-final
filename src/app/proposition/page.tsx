'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { 
  Shield, 
  Lock, 
  Terminal, 
  Search, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  FileText,
  User,
  Zap,
  Globe,
  Award
} from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
  }
}

export default function PropositionPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- 1. PRELOADER ---
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    
    let width = 0;
    const loadInterval = setInterval(() => {
      width += Math.random() * 15;
      if(width > 100) width = 100;
      if (loaderBar) loaderBar.style.width = width + '%';
      
      if(width === 100) {
        clearInterval(loadInterval);
        if (window.gsap && preloader) {
          window.gsap.to(preloader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.5,
            onComplete: () => {
              setLoading(false);
              initAnimations();
            }
          });
        } else {
          setLoading(false);
          if (preloader) preloader.style.display = 'none';
        }
      }
    }, 50);

    function initAnimations() {
      if (!window.gsap || !window.ScrollTrigger) return;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Hero Entrance
      gsap.to('.hero-anim', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Section Reveals
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    // --- 4. SMOOTH SCROLL ---
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }, []);

  return (
    <div className="bg-[#030303] text-slate-300 font-sans selection:bg-cyan-500/30">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="afterInteractive" />

      {/* PRELOADER */}
      <div className="preloader fixed inset-0 bg-[#030303] z-[9999] flex items-center justify-center" id="preloader">
        <div className="text-center px-6">
          <div className="font-mono text-3xl md:text-4xl font-bold mb-4 tracking-tighter text-white uppercase">INITIALIZING</div>
          <div className="w-64 h-1 bg-white/10 mx-auto overflow-hidden rounded-full">
            <div className="h-full bg-cyan-500 w-0 transition-all duration-300" id="loader-bar"></div>
          </div>
          <div className="font-mono text-[10px] text-cyan-500 mt-4 tracking-[0.3em] uppercase animate-pulse">Establishing Secure Uplink...</div>
        </div>
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
          <div className="absolute w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-8 reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Proposition personnalisée pour votre entreprise</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none mb-4">
                Securitrust propose une offre <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">unique et innovante</span> pour vous
              </h1>
            </div>
            <div className="mt-6 md:mt-0 text-right font-mono">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Proposition Commerciale</div>
              <div className="text-sm text-cyan-500 font-bold">29 JANVIER 2026</div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 reveal">
            {[
              { label: "jours R&D (Automotive)", value: "+2500" },
              { label: "Conformité RGPD & DPO", value: "+40" },
              { label: "Audits et Tests d'Intrusion", value: "+86" },
              { label: "AMB & ISO 27001", value: "+105" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-colors group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="mb-32 reveal text-center">
            <h2 className="text-sm font-mono text-slate-500 uppercase tracking-[0.3em] mb-12 italic">Ils nous font <span className="text-white not-italic font-bold">confiance</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "SOCIÉTÉ GÉNÉRALE",
                "ABEILLE ASSURANCES",
                "GENDARMERIE NATIONALE",
                "MINISTÈRE DES ARMÉES",
                "VEOLIA",
                "AVIVA",
                "AFLUENS",
                "SNCF"
              ].map((logo, i) => (
                <div key={i} className="h-24 bg-white/[0.03] border border-white/5 flex items-center justify-center p-8 rounded-lg grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all hover:bg-white/[0.05] hover:border-white/10">
                   <span className="text-white font-bold text-sm tracking-tighter opacity-80">{logo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Cards */}
          <div className="mb-32">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl font-bold text-white mb-4">Notre <span className="text-cyan-500">Proposition</span> pour la Sécurité et la Conformité</h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-light">Services complets de tests de sécurité et de certification pour assurer votre résilience numérique.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expertise en Attestation et Certification",
                  icon: <Award className="h-6 w-6" />,
                  items: ["Auditeur Principal ISO 27001", "Implémenteur Principal ISO 27001", "Gestionnaire de Risques EBIOS", "Certifié OSCP", "Certifié CEH", "Qualification PASSI (En cours)"]
                },
                {
                  title: "Gouvernance, Risques & Conformité (GRC)",
                  icon: <Shield className="h-6 w-6" />,
                  items: ["Conformité ISO 27001", "RGPD & Protection des Données", "NIS 2 & DORA", "TISAX Automobile", "Conformité LPM", "Services DPO Externalisé"]
                },
                {
                  title: "Cybersécurité Opérationnelle",
                  icon: <Terminal className="h-6 w-6" />,
                  items: ["Opérations Red Team", "Tests d'Intrusion (Pentest)", "Simulation de Ransomware", "Campagnes de Phishing", "Analyse OSINT", "Audits de Sécurité Technique"]
                }
              ].map((card, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl reveal group hover:bg-white/[0.04] transition-all">
                  <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6 leading-tight">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-slate-400 font-light">
                        <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-32">
            <div className="text-center mb-16 reveal">
               <h2 className="text-3xl font-bold text-white mb-4">La <span className="text-cyan-500">Méthodologie</span> Securitrust</h2>
               <p className="text-slate-400 max-w-2xl mx-auto font-light italic">Nous vous proposons la réalisation de la prestation suivante</p>
            </div>
            
            <div className="space-y-12 max-w-5xl mx-auto">
              {/* Pentest Box */}
              <div className="bg-cyan-950/20 border border-cyan-500/20 p-8 md:p-12 rounded-3xl reveal relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Terminal className="h-32 w-32 text-cyan-500" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-10 h-10 bg-cyan-500 text-black flex items-center justify-center font-bold rounded-lg">1</div>
                   <div>
                     <h3 className="text-2xl font-bold text-white tracking-tight">Test d'intrusion <span className="text-cyan-500">interne</span></h3>
                     <p className="text-xs font-mono text-cyan-500/70 uppercase tracking-widest mt-1">Approche en boîte grise sur l'environnement Active Directory</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div>
                     <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <ArrowRight className="h-3 w-3" /> Objectifs
                     </h4>
                     <ul className="space-y-4">
                        {[
                          "Évaluer la sécurité de l'Active Directory et identifier les vulnérabilités critiques.",
                          "Tester les mécanismes d'authentification, les administrateurs et la sécurité des comptes privilèges.",
                          "Simuler des scénarios d'attaque réalistes depuis une position d'utilisateur authentifié (boîte grise)."
                        ].map((text, i) => (
                          <li key={i} className="text-sm text-slate-400 font-light flex items-start gap-3 leading-relaxed italic">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 shrink-0"></span>
                            {text}
                          </li>
                        ))}
                     </ul>
                   </div>
                   <div>
                     <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <ArrowRight className="h-3 w-3" /> Périmètre
                     </h4>
                     <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                          <div className="flex items-center gap-3 text-white text-sm font-semibold mb-2">
                             <Globe className="h-4 w-4 text-cyan-500" /> Infrastructure Active Directory
                          </div>
                          <p className="text-xs text-slate-500 font-light">Contrôleurs de domaine, serveurs, architectures AD.</p>
                        </div>
                        <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                          <div className="flex items-center gap-3 text-white text-sm font-semibold mb-2">
                             <User className="h-4 w-4 text-cyan-500" /> Comptes Utilisateurs & Groupes
                          </div>
                          <p className="text-xs text-slate-500 font-light">Permissions, élévation de privilèges, comptes sensibles.</p>
                        </div>
                     </div>
                   </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                   <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6 text-center">Méthode Utilisée</h4>
                   <div className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 shrink-0">
                         <Lock className="h-8 w-8" />
                      </div>
                      <div className="text-center md:text-left">
                        <h5 className="text-white font-bold mb-1 uppercase tracking-tight">Intrusion en boîte <span className="text-cyan-500">grise</span></h5>
                        <p className="text-xs text-slate-400 font-light leading-relaxed italic">L'attaquant dispose d'accès authentifiés et d'informations privilégiées pour simuler une menace interne ou une compromission de poste utilisateur.</p>
                      </div>
                      <div className="flex gap-4 md:ml-auto">
                         <div className="text-center">
                            <div className="text-cyan-500 font-mono text-xs mb-1">ACCÈS</div>
                            <div className="text-white font-bold text-xs uppercase bg-white/5 px-2 py-1 rounded">VPN / Physique</div>
                         </div>
                         <div className="text-center">
                            <div className="text-cyan-500 font-mono text-xs mb-1">NIVEAU</div>
                            <div className="text-white font-bold text-xs uppercase bg-white/5 px-2 py-1 rounded">Standard AD</div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Initialisation Box */}
              <div className="bg-purple-950/20 border border-purple-500/20 p-8 rounded-3xl reveal">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-10 h-10 bg-purple-500 text-black flex items-center justify-center font-bold rounded-lg">2</div>
                   <div>
                     <h3 className="text-xl font-bold text-white tracking-tight">Phase d'initialisation - <span className="text-purple-400">Réunion de cadrage</span></h3>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                   <div className="space-y-4">
                      <p className="text-slate-400 font-light italic">Identification des actifs à auditer (Contrôleurs, serveurs, users).</p>
                      <p className="text-slate-400 font-light italic">Préparation des prérequis techniques pour un accès réseau fluide.</p>
                   </div>
                   <div className="bg-purple-500/5 border border-purple-500/20 p-4 rounded-xl">
                      <div className="text-xs font-mono text-purple-400 uppercase mb-2">Objectif</div>
                      <p className="text-xs text-slate-300 font-light leading-relaxed italic">Garantir le bon déroulement des tests et la sécurité opérationnelle durant toute la prestation.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="mb-32 reveal overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-widest">Périmètre des <span className="text-cyan-500">Travaux</span></h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-mono text-cyan-500 uppercase tracking-widest">
                  <th className="py-4 px-4 font-normal">Phase</th>
                  <th className="py-4 px-4 font-normal">Activité</th>
                  <th className="py-4 px-4 font-normal">Durée</th>
                  <th className="py-4 px-4 font-normal">Livrables</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light italic">
                {[
                  { phase: "Reconnaissance", activity: "OSINT, Cartographie réseau, Découverte d'actifs", duration: "1 jour", delivery: "Rapport d'inventaire des actifs" },
                  { phase: "Évaluation des Vulnérabilités", activity: "Analyse automatisée, Tests manuels", duration: "1 jour", delivery: "Rapport de vulnérabilités" },
                  { phase: "Exploitation", activity: "Tests d'intrusion, Élévation de privilèges", duration: "2 jours", delivery: "Rapport d'exploitation" },
                  { phase: "Rapport", activity: "Documentation, Recommandations", duration: "1 jour", delivery: "Rapport final & présentation" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-white font-medium not-italic">{row.phase}</td>
                    <td className="py-4 px-4 text-slate-400">{row.activity}</td>
                    <td className="py-4 px-4 text-cyan-500 font-mono text-xs font-bold">{row.duration}</td>
                    <td className="py-4 px-4 text-slate-400">{row.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Timeline Section */}
          <div className="mb-32 reveal text-center">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest italic">Calendrier <span className="text-cyan-500 not-italic">Estimé</span></h2>
            <div className="inline-block px-6 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-12">
               <span className="text-xs font-mono text-cyan-500 font-bold uppercase tracking-widest">5 Jours — Durée Totale</span>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
               {[
                 { label: "Lancement du Projet", progress: 20, start: 0 },
                 { label: "Reconnaissance & OSINT", progress: 20, start: 20 },
                 { label: "Évaluation des Vulnérabilités", progress: 20, start: 40 },
                 { label: "Tests d'intrusion", progress: 40, start: 60 },
                 { label: "Rapport Final", progress: 20, start: 80 }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 group">
                   <div className="w-48 text-right text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{item.label}</div>
                   <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                      <div 
                        className="absolute h-full bg-cyan-500/50 border-r-2 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:bg-cyan-500 transition-all duration-500"
                        style={{ width: `${item.progress}%`, left: `${item.start}%` }}
                      ></div>
                   </div>
                 </div>
               ))}
               <div className="flex justify-between px-4 mt-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest ml-48">
                  <span>Jour 1</span>
                  <span>Jour 2</span>
                  <span>Jour 3</span>
                  <span>Jour 4</span>
                  <span>Jour 5</span>
               </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-32">
            <h2 className="text-2xl font-bold text-white mb-12 text-center uppercase tracking-widest">Prochaines <span className="text-cyan-500">Étapes</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { n: 1, title: "Signature du Contrat", icon: <FileText className="h-5 w-5" />, desc: "Examen et signature de l'accord de service." },
                { n: 2, title: "Réunion de Lancement", icon: <User className="h-5 w-5" />, desc: "Rencontre de l'équipe et définition des objectifs." },
                { n: 3, title: "Évaluation", icon: <Search className="h-5 w-5" />, desc: "Réalisation des tests de sécurité complets." },
                { n: 4, title: "Livraison", icon: <Zap className="h-5 w-5" />, desc: "Réception du rapport détaillé et des recommandations." }
              ].map((step, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/10 p-6 rounded-xl reveal hover:bg-white/[0.04] transition-all group">
                   <div className="w-10 h-10 bg-cyan-500 text-black flex items-center justify-center font-bold rounded-lg mb-6 group-hover:scale-110 transition-transform">
                      {step.n}
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2 leading-tight flex items-center gap-2">
                     {step.icon}
                     {step.title}
                   </h3>
                   <p className="text-xs text-slate-500 font-light italic leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Section */}
          <div className="reveal">
            <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 p-8 md:p-16 rounded-[2.5rem] relative overflow-hidden text-center group">
               <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Shield className="h-64 w-64 text-cyan-500" />
               </div>
               
               <div className="relative z-10">
                 <h2 className="text-xl font-mono text-cyan-500 uppercase tracking-[0.3em] mb-4">Votre <span className="text-white font-bold not-italic">Investissement</span></h2>
                 
                 <div className="max-w-2xl mx-auto bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md mb-12 hover:border-cyan-500/30 transition-all">
                    <h3 className="text-2xl font-bold text-white mb-2">Évaluation de Sécurité Complète</h3>
                    <div className="text-6xl font-bold text-white mb-4 tracking-tighter">
                       4 999 €
                    </div>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-8">Hors taxes</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10">
                       {[
                         "Test d'intrusion Complet",
                         "OSINT & Reconnaissance Étendue",
                         "Évaluation des Vulnérabilités",
                         "Exploitation & Tests de Sécurité",
                         "Rapport de Sécurité Complet",
                         "Résumé Exécutif & Recommandations",
                         "Délai de Livraison de 5 Jours",
                         "Support Post-Évaluation"
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-2 text-xs text-slate-400 font-light italic">
                           <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                           <span>{item}</span>
                         </div>
                       ))}
                    </div>

                    <a 
                      href="/signer-proposition"
                      className="w-full inline-flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest py-5 px-8 rounded-xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:scale-[1.02] group/btn"
                    >
                       <span>Signer la proposition</span>
                       <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                    </a>
                 </div>

                 <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest italic max-w-lg mx-auto leading-relaxed">
                    Pour toute question ou commentaire, veuillez contacter <span className="text-cyan-500 underline">contact@securitrust.io</span> ou au <span className="text-cyan-500">07 56 83 23 74</span>.
                    La signature électronique est équivalente à la signature manuscrite. Cette proposition est valable 30 jours calendaires.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes pulse-cyan {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        .bg-tech-grid {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.05) 50%
          );
          background-size: 100% 4px;
          z-index: 50;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .text-6xl {
            font-size: 2.5rem;
          }
          .text-4xl {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
