'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { PropositionHero } from '@/components/sections/proposition/PropositionHero';
import { PropositionPartners } from '@/components/sections/proposition/PropositionPartners';
import { PropositionIntroduction } from '@/components/sections/proposition/PropositionIntroduction';
import { PropositionRequirement } from '@/components/sections/proposition/PropositionRequirement';
import { PropositionMethodology } from '@/components/sections/proposition/PropositionMethodology';
import { PropositionOffer } from '@/components/sections/proposition/PropositionOffer';
import { PropositionRoadmap } from '@/components/sections/proposition/PropositionRoadmap';
import { PropositionMap } from '@/components/sections/proposition/PropositionMap';
import { PropositionSingularity } from '@/components/sections/proposition/PropositionSingularity';
import { PropositionFooter } from '@/components/sections/proposition/PropositionFooter';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
    UnicornStudio: any;
  }
}

export default function PropositionPage() {
  const [companyName, setCompanyName] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Fetch company name from sessionStorage
    const storedData = sessionStorage.getItem('eligibilityData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        if (data?.company?.name) {
          setCompanyName(data.company.name);
        }
      } catch (e) {
        console.error('Error parsing eligibility data:', e);
      }
    }

    // --- 1. PRELOADER ---
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    
    let width = 0;
    const loadInterval = setInterval(() => {
        width += Math.random() * 25;
        if(width > 100) width = 100;
        if (loaderBar) loaderBar.style.width = width + '%';
        
        if(width === 100) {
            clearInterval(loadInterval);
            if (window.gsap && preloader) {
                window.gsap.to(preloader, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power4.inOut",
                    delay: 0.2,
                    onComplete: initSite
                });
            } else {
                if (preloader) preloader.style.display = 'none';
                initSite();
            }
        }
    }, 80);

    function initSite() {
        initAnimations();
    }

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
                        end: "bottom 10%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });

        // Token Chart
        const tokenRing = document.querySelector('.token-chart-ring');
        if(tokenRing) {
            gsap.to(tokenRing, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '#token',
                    start: "top 70%",
                    toggleActions: "play reverse play reverse"
                }
            });
        }

        // Stats Count
        const tokenStats = document.querySelectorAll('.token-stat-number');
        tokenStats.forEach(stat => {
            const targetAttr = stat.getAttribute('data-target');
            if (!targetAttr) return;
            const target = parseFloat(targetAttr);
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 0.1 },
                ease: "power1.out",
                scrollTrigger: {
                    trigger: '#token',
                    start: "top 70%",
                    toggleActions: "play reverse play reverse"
                }
            });
        });
    }

    // Lenis
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
    <div className="font-body bg-tech-grid grid-bg selection:bg-[#00ffa3] selection:text-[#030303] text-[#e0e0e0] overflow-x-hidden min-h-screen bg-[#030303]">
      <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="afterInteractive" />
      
      <Script id="unicorn-studio-init" strategy="afterInteractive">
        {`
          !function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.2/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();
        `}
      </Script>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --void: #030303;
          --panel: #080808;
          --mint: #00ffa3;
          --mint-dark: #00b372;
          --border: rgba(255, 255, 255, 0.08);
          --border-strong: rgba(255, 255, 255, 0.15);
          --sub: #888888;
        }
        body { background-color: #030303; color: #e0e0e0; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb { background: #333; }
        ::-webkit-scrollbar-thumb:hover { background: #00ffa3; }
        
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25); color: transparent; }
        .grid-bg { background-size: 50px 50px; }
        .bg-tech-grid {
          background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
        .hover-card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-card:hover { background: rgba(255, 255, 255, 0.03); border-color: #00ffa3; }
        
        .scan-line {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 5px;
          background: linear-gradient(to right, transparent, #00ffa3, transparent);
          opacity: 0.5; box-shadow: 0 0 15px #00ffa3;
          animation: scan 4s linear infinite;
        }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        
        .tech-separator {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          position: relative; margin: 0 auto;
        }
        .tech-separator::after {
          content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 50px; height: 3px; background: #00ffa3; box-shadow: 0 0 10px rgba(0, 255, 163, 0.5);
        }
        
        .singularity-wrapper {
          perspective: 800px; width: 100%; height: 100%; position: absolute; top: 0; left: 0;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
        }
        .tunnel-ring {
          position: absolute; border-radius: 50%; border: 1px solid rgba(0, 255, 163, 0.15);
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.05); animation: tunnelMove 6s linear infinite; opacity: 0;
        }
        .tunnel-ring:nth-child(even) { border-style: dashed; border-width: 1px; border-color: rgba(255, 255, 255, 0.1); }
        @keyframes tunnelMove {
          0% { transform: translateZ(-500px) scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateZ(800px) scale(2); opacity: 0; }
        }
        .tunnel-ring:nth-child(1) { animation-delay: 0s; }
        .tunnel-ring:nth-child(2) { animation-delay: 0.5s; }
        .tunnel-ring:nth-child(3) { animation-delay: 1s; }
        .tunnel-ring:nth-child(4) { animation-delay: 1.5s; }
        .tunnel-ring:nth-child(5) { animation-delay: 2s; }
        .tunnel-ring:nth-child(6) { animation-delay: 2.5s; }
        .tunnel-ring:nth-child(7) { animation-delay: 3s; }
        .tunnel-ring:nth-child(8) { animation-delay: 3.5s; }
        .tunnel-ring:nth-child(9) { animation-delay: 4s; }
        .tunnel-ring:nth-child(10) { animation-delay: 4.5s; }
        .tunnel-ring:nth-child(11) { animation-delay: 5s; }
        .tunnel-ring:nth-child(12) { animation-delay: 5.5s; }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 2)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      ` }} />

      {/* PRELOADER */}
      <div className="preloader fixed inset-0 bg-[#030303] z-[9999] flex items-center justify-center" id="preloader">
          <div className="text-center px-6">
              <div className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tighter uppercase text-white">INITIALIZING</div>
              <div className="w-48 h-1 bg-gray-800 mx-auto overflow-hidden">
                  <div className="h-full bg-[#00ffa3] w-0" id="loader-bar"></div>
              </div>
              <div className="font-mono text-[10px] text-[#00ffa3] mt-2 tracking-widest uppercase">ESTABLISHING UPLINK...</div>
          </div>
      </div>
      
      {/* HUD OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-40 p-4 hidden md:block">
          <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50"></div>
          <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/50"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/50"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50"></div>
      </div>

      <PropositionHero companyName={companyName} />
      <div className="tech-separator"></div>
        <PropositionPartners />
        <div className="tech-separator"></div>
        <PropositionIntroduction />
        <div className="tech-separator"></div>
        <PropositionRequirement companyName={companyName} />
        <div className="tech-separator"></div>
        {mounted && <PropositionMethodology />}
      <div className="tech-separator"></div>
      <PropositionOffer />
      <div className="tech-separator"></div>
      <PropositionRoadmap companyName={companyName} />
      <div className="tech-separator"></div>
      <PropositionMap />
      <div className="tech-separator"></div>
      <PropositionSingularity />
      <div className="tech-separator"></div>
      <PropositionFooter />
    </div>
  );
}
