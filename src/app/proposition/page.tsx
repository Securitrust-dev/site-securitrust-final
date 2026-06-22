'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { PropositionHero } from '@/components/sections/proposition/PropositionHero';
import { PropositionPartners } from '@/components/sections/proposition/PropositionPartners';
import { PropositionIntroduction } from '@/components/sections/proposition/PropositionIntroduction';
import { PropositionMethodology } from '@/components/sections/proposition/PropositionMethodology';
import { PropositionExecutionWorkflow } from '@/components/sections/proposition/PropositionExecutionWorkflow';
import { PropositionOffer } from '@/components/sections/proposition/PropositionOffer';

import { PropositionMap } from '@/components/sections/proposition/PropositionMap';
import { PropositionObjectifs } from '@/components/sections/proposition/PropositionObjectifs';
import { PropositionPlanningDetails } from '@/components/sections/proposition/PropositionPlanningDetails';
import { PropositionFooter } from '@/components/sections/proposition/PropositionFooter';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
    UnicornStudio: any;
  }
}

const NAV_ITEMS = [
  { label: "Présentation",     href: "#presentation" },
  { label: "Périmètre",        href: "#network" },
  { label: "Objectifs",        href: "#objectifs" },
  { label: "Méthodologie",     href: "#methodologie" },
  { label: "Calendrier",       href: "#calendrier" },
  { label: "Déroulement",      href: "#planning-detaille" },
];

export default function PropositionPage() {
  const router = useRouter();
  const [companyName, setCompanyName]   = useState<string>('');
  const [mounted, setMounted]           = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Guard: only accessible after completing eligibility form
    const storedData = sessionStorage.getItem('eligibilityData');
    let eligible = false;
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        if (data?.eligibilityResult?.eligible === true) {
          eligible = true;
          if (data?.company?.name) setCompanyName(data.company.name);
        }
      } catch (e) { /* noop */ }
    }
    if (!eligible) {
      router.replace('/eligibilite');
      return;
    }
    setIsAuthorized(true);
    setMounted(true);

    // ── Progress bar ──
    const onScroll = () => {
      const el   = document.documentElement;
      const top  = el.scrollTop || document.body.scrollTop;
      const h    = el.scrollHeight - el.clientHeight;
      setScrollProgress(h > 0 ? (top / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── ScrollSpy ──
    const sectionIds = NAV_ITEMS.map(i => i.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection('#' + entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // ── Preloader ──
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    let width = 0;
    const loadInterval = setInterval(() => {
      width += Math.random() * 25;
      if (width > 100) width = 100;
      if (loaderBar) loaderBar.style.width = width + '%';
      if (width === 100) {
        clearInterval(loadInterval);
        if (window.gsap && preloader) {
          window.gsap.to(preloader, {
            yPercent: -100, duration: 0.8, ease: "power4.inOut", delay: 0.2,
            onComplete: initSite
          });
        } else {
          if (preloader) preloader.style.display = 'none';
          initSite();
        }
      }
    }, 80);

    function initSite() { initAnimations(); }

    function initAnimations() {
      if (!window.gsap || !window.ScrollTrigger) return;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('.hero-anim', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" });
      document.querySelectorAll('.reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 10%", toggleActions: "play reverse play reverse" }
          }
        );
      });
    }

    if (window.Lenis) {
      const lenis = new window.Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="font-sans bg-tech-grid grid-bg selection:bg-[#74a2cd] selection:text-[#0a0a0a] text-[#fbfdfd] overflow-x-hidden min-h-screen bg-[#0a0a0a]">
      <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="afterInteractive" />

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --void: #0a0a0a; --panel: #121212;
          --mint: #74a2cd; --mint-dark: #5a8ab5;
          --border: rgba(255,255,255,0.08);
          --border-strong: rgba(255,255,255,0.15);
          --sub: #888888; --emerald: #10b981;
        }
        body { background:#0a0a0a; color:#fbfdfd; overflow-x:hidden; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#0a0a0a; }
        ::-webkit-scrollbar-thumb { background:#333; }
        ::-webkit-scrollbar-thumb:hover { background:#74a2cd; }
        .text-stroke { -webkit-text-stroke:1px rgba(255,255,255,0.25); color:transparent; }
        .grid-bg { background-size:50px 50px; }
        .bg-tech-grid {
          background-image:linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px),
                           linear-gradient(to bottom,rgba(255,255,255,0.03) 1px,transparent 1px);
        }
        .hover-card { transition:all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .hover-card:hover { background:rgba(255,255,255,0.03); border-color:#74a2cd; }
        .scan-line {
          position:absolute; top:0; left:0; width:100%; height:5px;
          background:linear-gradient(to right,transparent,#74a2cd,transparent);
          opacity:0.5; box-shadow:0 0 15px #74a2cd; animation:scan 4s linear infinite;
        }
        @keyframes scan { 0%{top:0} 100%{top:100%} }
        .tech-separator {
          width:100%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);
          position:relative; margin:0 auto;
        }
        .tech-separator::after {
          content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:50px; height:3px; background:#74a2cd; box-shadow:0 0 10px rgba(116,162,205,0.5);
        }
        /* Navbar */
          .nav-link-active { color:#74a2cd !important; }
          /* CTA pulse */
          @keyframes pulse-emerald {
            0%,100% { box-shadow:0 0 0 0 rgba(116,162,205,0.6); }
            50%      { box-shadow:0 0 0 10px rgba(116,162,205,0); }
          }
          .btn-pulse { animation:pulse-emerald 2s ease-in-out infinite; }
        /* Bento */
        .bento-card { transition:all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .bento-card:hover { border-color:rgba(116,162,205,0.5); transform:translateY(-2px); }
      `}} />

      {/* PRELOADER */}
      <div className="preloader fixed inset-0 bg-[#0a0a0a] z-[9999] flex items-center justify-center" id="preloader">
        <div className="text-center px-6">
            <div className="font-sans text-3xl md:text-4xl font-semibold mb-2 tracking-tighter uppercase text-white">{companyName || 'SECURITRUST'}</div>
          <div className="w-48 h-1 bg-gray-800 mx-auto overflow-hidden">
            <div className="h-full bg-[#74a2cd] w-0" id="loader-bar"></div>
          </div>
          <div className="font-mono text-[10px] text-[#74a2cd] mt-2 tracking-widest uppercase">ESTABLISHING UPLINK...</div>
        </div>
      </div>

      {/* HUD corners */}
      <div className="fixed inset-0 pointer-events-none z-40 p-4 hidden md:block">
        <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50"></div>
        <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/50"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/50"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50"></div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-[10px] border-b border-white/10">
        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[#74a2cd] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between gap-2 py-2.5">
          {/* Nav links */}
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 shrink-0
                  ${activeSection === item.href
                    ? 'text-[#74a2cd] bg-[#74a2cd]/10'
                    : 'text-white hover:text-[#74a2cd] hover:bg-white/5'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>
            {/* CTA pulsant */}
                <Link
                  href="/signer-signwell"
                  className="btn-pulse shrink-0 bg-[#74a2cd] hover:bg-[#5a8ab5] text-white text-xs md:text-sm font-bold px-4 py-2 rounded-xl uppercase tracking-wide transition-all duration-200 whitespace-nowrap"
                >
                    Cliquer pour signer pour votre devis
                </Link>

        </div>
      </nav>
      <div className="h-[48px]" />

      <PropositionHero companyName={companyName} />
      <div className="tech-separator"></div>
      <PropositionIntroduction />
      <div className="tech-separator"></div>
      <PropositionPartners />
      <div className="tech-separator"></div>
             <PropositionMap />
             <div className="tech-separator"></div>
               <PropositionObjectifs />
           <div className="tech-separator"></div>
           {mounted && <PropositionMethodology />}
           <div className="tech-separator"></div>
             <PropositionExecutionWorkflow companyName={companyName} />
             <div className="tech-separator"></div>
               <PropositionPlanningDetails />
            <PropositionOffer />
         <div className="tech-separator"></div>
         <PropositionFooter />
       </div>
     );
   }

