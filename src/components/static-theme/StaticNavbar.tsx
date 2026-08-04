'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type StaticNavActive = 'pentest' | 'gouvernance' | 'rssi-externalise' | 'articles' | 'nous-rejoindre' | 'contact';

const PENTEST_LINKS = [
  { href: '/audit-o365', label: 'Audit Microsoft 365' },
  { href: '/pentest-web', label: 'Pentest Web' },
  { href: '/pentest-ad', label: 'Pentest Active Directory' },
  { href: '/pentest-mobile', label: 'Pentest Mobile' },
];

const GOUVERNANCE_LINKS = [
  { href: '/iso27001', label: 'ISO 27001' },
  { href: '/nis2', label: 'NIS2' },
  { href: '/hds', label: 'HDS' },
  { href: '/tisax', label: 'TISAX' },
];

/**
 * Navbar identique aux pages statiques (public/*.html) : mêmes classes CSS
 * (static-theme.css), même structure. `active` met en évidence l'entrée de
 * menu correspondant à la page courante.
 */
export function StaticNavbar({ active }: { active?: StaticNavActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen);
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth > 1080) return;
    const onResize = () => {
      if (window.innerWidth > 1080) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <Link href="/" className="brand">
          <img src="/assets/logo-securitrust.png" alt="SecuriTrust" className="brand-mark" />
        </Link>
        <nav className="nav-links">
          <div className="nav-item">
            <span className={`nav-item-trigger${active === 'pentest' ? ' active' : ''}`} tabIndex={0}>
              Pentest
              <svg className="nav-caret" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <div className="nav-dropdown">
              <div className="nav-dropdown-inner">
                {PENTEST_LINKS.map((l) => (
                  <Link key={l.href} href={l.href}>{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="nav-item">
            <span className={`nav-item-trigger${active === 'gouvernance' ? ' active' : ''}`} tabIndex={0}>
              Gouvernance
              <svg className="nav-caret" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <div className="nav-dropdown">
              <div className="nav-dropdown-inner">
                {GOUVERNANCE_LINKS.map((l) => (
                  <Link key={l.href} href={l.href}>{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/rssi-externalise" className={active === 'rssi-externalise' ? 'active' : ''}>RSSI externalisé</Link>
          <Link href="/articles" className={active === 'articles' ? 'active' : ''}>Articles</Link>
          <Link href="/nous-rejoindre" className={active === 'nous-rejoindre' ? 'active' : ''}>Nous rejoindre</Link>
          <Link href="/contact" className={active === 'contact' ? 'active' : ''}>Contact</Link>
        </nav>
        <a
          href="https://calendly.com/expert-securitrust"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          data-hot
        >
          <span className="pulse-dot" aria-hidden="true" />
          Parler à un expert
        </a>
        <button
          className="nav-toggle"
          aria-label="Ouvrir le menu"
          aria-expanded={mobileOpen}
          aria-controls="navMobile"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`nav-backdrop${mobileOpen ? ' open' : ''}`} onClick={closeMobile} />
      <nav className={`nav-links-mobile${mobileOpen ? ' open' : ''}`} id="navMobile" aria-hidden={!mobileOpen}>
        <details className="nav-mobile-group">
          <summary>Pentest</summary>
          {PENTEST_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={closeMobile}>{l.label}</Link>
          ))}
        </details>
        <details className="nav-mobile-group">
          <summary>Gouvernance</summary>
          {GOUVERNANCE_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={closeMobile}>{l.label}</Link>
          ))}
        </details>
        <Link href="/rssi-externalise" onClick={closeMobile}>RSSI externalisé</Link>
        <Link href="/articles" onClick={closeMobile}>Articles</Link>
        <Link href="/nous-rejoindre" onClick={closeMobile}>Nous rejoindre</Link>
        <Link href="/contact" onClick={closeMobile}>Contact</Link>
        <a
          href="https://calendly.com/expert-securitrust"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          data-hot
          onClick={closeMobile}
        >
          <span className="pulse-dot" aria-hidden="true" />
          Parler à un expert
        </a>
      </nav>
    </>
  );
}
