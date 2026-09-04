'use client';

import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';

/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────── */
const T = {
  bg: '#05070d',
  bgSoft: '#0a0f1a',
  panel: '#0d1320',
  panel2: '#111927',
  line: 'rgba(120,160,220,.12)',
  lineS: 'rgba(120,170,255,.28)',
  txt: '#e8eef9',
  soft: '#9fb0c9',
  dim: '#67768f',
  acc: '#4f9dff',
  acc2: '#7fd0ff',
  cyan: '#2fe0d8',
  amb: '#ffb547',
  red: '#ff5d6c',
  mono: '"Space Mono",ui-monospace,monospace',
  disp: '"Sora",system-ui,sans-serif',
};

/* ─── REVEAL ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setV(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? 'none' : 'translateY(24px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── CHECK (hero bullets) ───────────────────────────────────────────────── */
function Chk() {
  return (
    <span style={{
      flexShrink: 0, width: 22, height: 22, borderRadius: 6,
      display: 'grid', placeItems: 'center', marginTop: 1,
      background: 'rgba(47,224,216,.12)', border: '1px solid rgba(47,224,216,.3)',
    }}>
      <svg viewBox="0 0 24 24" fill="none" style={{ width: 13, height: 13, color: T.cyan }}>
        <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ─── CHECK SM (pricing list) ────────────────────────────────────────────── */
function ChkSm() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 15, height: 15, flexShrink: 0, marginTop: 3, color: T.cyan }}>
      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── ARROW SVG ──────────────────────────────────────────────────────────── */
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}>
      <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── GRAD TEXT ──────────────────────────────────────────────────────────── */
function GradText({ children }: { children: ReactNode }) {
  return (
    <span style={{
      background: `linear-gradient(100deg,${T.acc2},${T.acc})`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    }}>
      {children}
    </span>
  );
}

/* ─── BADGE ──────────────────────────────────────────────────────────────── */
function Badge({ children }: { children: ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      fontFamily: T.mono, fontSize: 11, letterSpacing: '.13em', textTransform: 'uppercase',
      color: T.acc2, border: `1px solid ${T.lineS}`, borderRadius: 999,
      padding: '6px 14px', marginBottom: 18, background: 'rgba(79,157,255,.05)',
    }}>
      {children}
    </span>
  );
}

/* ─── FAQ ITEM ───────────────────────────────────────────────────────────── */
function FaqItem({ num, q, a, defaultOpen = false }: { num: string; q: string; a: string; defaultOpen?: boolean }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (defaultOpen && ref.current) ref.current.open = true;
  }, []);
  return (
    <details ref={ref} style={{
      background: T.panel,
      border: `1px solid ${T.line}`,
      borderRadius: 14, overflow: 'hidden',
    }}>
      <summary style={{
        padding: '18px 22px', cursor: 'pointer', listStyle: 'none',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 14, fontWeight: 600, fontSize: 15, color: T.txt,
        userSelect: 'none',
      }}>
        <span>
          <span style={{ fontFamily: T.mono, fontSize: 12, color: T.dim, marginRight: 10 }}>{num}</span>
          {q}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          style={{ flexShrink: 0, color: T.acc2 }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </summary>
      <div style={{ padding: '0 22px 20px', color: T.soft, fontSize: 14.5 }}>{a}</div>
    </details>
  );
}

/* ─── HERO FORM ──────────────────────────────────────────────────────────── */
function HeroForm() {
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', tel: '', entreprise: '',
    taille: '20 – 100 salariés', consent: false,
  });
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({
      ...prev,
      [key]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value,
    }));

  const inp: CSSProperties = {
    width: '100%', padding: '12px 14px',
    background: 'rgba(5,8,15,.6)', border: `1px solid ${T.line}`,
    borderRadius: 10, color: T.txt, fontFamily: 'inherit', fontSize: 14.5, outline: 'none',
  };
  const lbl: CSSProperties = { display: 'block', fontSize: 12.5, color: T.soft, marginBottom: 6, fontWeight: 500 };

  if (sent) {
    return (
      <div id="hero-form" style={{
        background: `linear-gradient(180deg,${T.panel2},${T.panel})`,
        border: `1px solid ${T.lineS}`, borderRadius: 18,
        padding: '60px 28px', textAlign: 'center',
        boxShadow: '0 30px 80px -30px rgba(0,0,0,.8)',
      }}>
        <div style={{ fontSize: 52, color: T.cyan, marginBottom: 12 }}>✓</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: T.txt, marginBottom: 8 }}>Demande envoyée !</h3>
        <p style={{ color: T.soft, fontSize: 14.5 }}>Un expert vous contacte sous 24h pour votre audit gratuit.</p>
      </div>
    );
  }

  return (
    <div id="hero-form" style={{
      background: `linear-gradient(180deg,${T.panel2},${T.panel})`,
      border: `1px solid ${T.lineS}`, borderRadius: 18, padding: '30px 28px', position: 'relative',
      boxShadow: '0 30px 80px -30px rgba(0,0,0,.8),0 0 0 1px rgba(79,157,255,.04)',
    }}>
      {/* top gradient border */}
      <div style={{
        position: 'absolute', inset: -1, borderRadius: 18, pointerEvents: 'none',
        background: 'linear-gradient(180deg,rgba(79,157,255,.35),transparent 40%)',
        WebkitMask: 'linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: 1,
      }} />
      <h3 style={{ fontSize: 23, fontWeight: 700, color: T.txt, marginBottom: 4 }}>
        Évaluez gratuitement votre exposition
      </h3>
      <p style={{ fontFamily: T.mono, fontSize: 13.5, color: T.acc2, marginBottom: 22 }}>
        Réponse sous 24h — audit préliminaire offert · sans engagement
      </p>
      <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Prénom *</label>
            <input type="text" placeholder="Prénom" required value={form.prenom} onChange={update('prenom')} style={inp} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Nom *</label>
            <input type="text" placeholder="Nom" required value={form.nom} onChange={update('nom')} style={inp} />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Email professionnel *</label>
          <input type="email" placeholder="vous@entreprise.fr" required value={form.email} onChange={update('email')} style={inp} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Téléphone *</label>
            <input type="tel" placeholder="06 00 00 00 00" required value={form.tel} onChange={update('tel')} style={inp} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Entreprise *</label>
            <input type="text" placeholder="Société" required value={form.entreprise} onChange={update('entreprise')} style={inp} />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Taille de l&apos;entreprise</label>
          <select value={form.taille} onChange={update('taille')} style={inp}>
            <option>1 – 20 salariés</option>
            <option>20 – 100 salariés</option>
            <option>100 – 250 salariés</option>
            <option>250+ salariés</option>
          </select>
        </div>
        <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 11.5, color: T.dim, margin: '16px 0' }}>
          <input
            type="checkbox" required checked={form.consent} onChange={update('consent')}
            style={{ marginTop: 3, accentColor: T.acc }}
          />
          J&apos;accepte que mes données soient utilisées pour être recontacté, conformément à la{' '}
          <Link href="/politique-de-confidentialite" style={{ color: T.acc2, textDecoration: 'underline' }}>
            politique de confidentialité
          </Link>.
        </label>
        <button type="submit" style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          fontWeight: 600, fontSize: 15, padding: '14px 22px', borderRadius: 999, cursor: 'pointer',
          border: '1px solid transparent', background: `linear-gradient(120deg,${T.acc},#2f7fe0)`,
          color: '#fff', boxShadow: '0 8px 30px -8px rgba(79,157,255,.45)', fontFamily: 'inherit',
        }}>
          Obtenir mon audit gratuit
          <Arrow />
        </button>
      </form>
      <div style={{ textAlign: 'center', fontSize: 11.5, color: T.dim, marginTop: 13, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          {
            icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 12, height: 12, color: T.cyan }}><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" stroke="currentColor" strokeWidth="1.6" /></svg>,
            label: 'Données souveraines',
          },
          {
            icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 12, height: 12, color: T.cyan }}><path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.2" /></svg>,
            label: 'Sans engagement',
          },
          {
            icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 12, height: 12, color: T.cyan }}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" /></svg>,
            label: 'Réponse 24h',
          },
        ].map(({ icon, label }) => (
          <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            {icon}{label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function CyberPilotePage() {
  // Load Sora + Space Mono fonts asynchronously
  useEffect(() => {
    if (document.getElementById('cp-fonts')) return;
    const link = document.createElement('link');
    link.id = 'cp-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap';
    document.head.appendChild(link);
  }, []);

  const wrap: CSSProperties = { maxWidth: 1180, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 };
  const secHead: CSSProperties = { textAlign: 'center', maxWidth: 660, margin: '0 auto 48px' };
  const h2Style: CSSProperties = { fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.12, marginBottom: 14 };

  const btnPrimary: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 9, fontWeight: 600, fontSize: 14.5,
    padding: '12px 22px', borderRadius: 999, cursor: 'pointer', border: '1px solid transparent',
    background: `linear-gradient(120deg,${T.acc},#2f7fe0)`, color: '#fff',
    boxShadow: '0 8px 30px -8px rgba(79,157,255,.45)', whiteSpace: 'nowrap',
    textDecoration: 'none', fontFamily: 'inherit',
  };
  const btnGhost: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 9, fontWeight: 600, fontSize: 14.5,
    padding: '12px 22px', borderRadius: 999, cursor: 'pointer',
    border: `1px solid ${T.lineS}`, background: 'rgba(120,160,220,.07)',
    color: T.txt, whiteSpace: 'nowrap', textDecoration: 'none', fontFamily: 'inherit',
  };

  return (
    <div style={{
      background: T.bg, color: T.txt, fontFamily: T.disp, position: 'relative',
      overflowX: 'hidden', minHeight: '100vh', WebkitFontSmoothing: 'antialiased', lineHeight: 1.6,
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(900px 600px at 80% -5%,rgba(79,157,255,.10),transparent 60%),radial-gradient(700px 500px at 5% 15%,rgba(47,224,216,.06),transparent 55%)',
      }} />

      <PromoBanner />
      <Navbar />

      {/* ═══ HERO ═════════════════════════════════════════════════════════ */}
      <section id="offre" style={{ padding: '140px 0 40px', position: 'relative', zIndex: 1 }}>
        <div style={wrap}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-[54px] items-start">

            {/* Left column */}
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: T.mono, fontSize: 11.5, letterSpacing: '.12em', textTransform: 'uppercase',
                color: T.acc2, border: `1px solid ${T.lineS}`, borderRadius: 999,
                padding: '7px 14px', background: 'rgba(79,157,255,.06)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.cyan, boxShadow: `0 0 10px ${T.cyan}` }} />
                RSSI externalisé · Pilotage 24/7
              </span>

              <h1 style={{
                fontSize: 'clamp(28px,4.2vw,52px)', fontWeight: 800, letterSpacing: '-.02em',
                lineHeight: 1.12, margin: '22px 0 14px',
              }}>
                <GradText>Cyber-Pilote</GradText> —{' '}<br />Protégez votre entreprise en 1 clique
              </h1>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 30 }}>
                {[
                  '💯 Obligation de résultat',
                  '🕵️ Experts cyber certifiés',
                  '🇫🇷 Données en France',
                  '🎯 Accompagnement sur mesure',
                  '⚡ Opérationnel en 48h',
                  '🛡️ Conformité NIS2 · RGPD · ISO 27001',
                  '💰 Jusqu\'à -30% assurance cyber',
                  '🔒 Surveillance 24h/24 · 7j/7',
                ].map(badge => (
                  <span key={badge} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 13, fontWeight: 500, color: T.txt,
                    background: 'rgba(79,157,255,.07)', border: `1px solid ${T.line}`,
                    borderRadius: 999, padding: '6px 13px', whiteSpace: 'nowrap',
                  }}>
                    {badge}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 28 }}>
                <a href="#hero-form" style={{ ...btnPrimary, fontSize: 15 }}>
                  Sécuriser mon entreprise en &lt;5 min <Arrow />
                </a>
                <a href="#tarifs" style={btnGhost}>Voir les tarifs</a>
              </div>

              <p style={{ fontSize: 16, color: T.txt, maxWidth: 520, marginBottom: 18, lineHeight: 1.7 }}>
                Une cyberattaque peut paralyser votre activité en quelques heures — données volées, systèmes bloqués, clients exposés — sous une pression réglementaire (<strong style={{ color: T.acc2 }}>NIS2, RGPD, ISO 27001</strong>) dont le non-respect coûte cher.
              </p>
              <p style={{ fontSize: 16, color: T.txt, maxWidth: 520, marginBottom: 26, lineHeight: 1.7 }}>
                Avec <strong style={{ color: T.acc2 }}>Cyber-Pilote</strong>, votre cybersécurité passe entre les mains d&apos;experts : surveillance permanente de votre système, failles neutralisées avant les pirates, conformité garantie. Vous pilotez votre activité, nous pilotons votre sécurité.
              </p>

              <p style={{ fontSize: 14, color: T.txt, fontStyle: 'italic', maxWidth: 480, marginBottom: 26 }}>
                En clair : l&apos;expertise d&apos;un directeur cybersécurité et de son équipe, sans la charge salariale.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 26, flexWrap: 'wrap' }}>
                <span style={{ color: T.amb, fontSize: 16, letterSpacing: 2 }}>★★★★★</span>
                <span style={{ fontSize: 13.5, color: T.dim }}>
                  <strong style={{ color: T.txt }}>+100 entreprises</strong> nous font confiance ·{' '}
                  <strong style={{ color: T.txt }}>15 ans</strong> d&apos;expertise · Experts certifiés
                </span>
              </div>
            </div>

            {/* Right — form */}
            <HeroForm />
          </div>
        </div>
      </section>

      {/* ═══ PRICING PREVIEW (below logos) ═══════════════════════════════ */}
      <section style={{
        background: `linear-gradient(180deg,${T.bgSoft},${T.bg})`,
        borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`,
        padding: '74px 0', position: 'relative', zIndex: 1,
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 48px' }}>
            <Badge>Tarifs transparents</Badge>
            <h2 style={{ fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.12, marginBottom: 14 }}>
              Choisissez votre <GradText>offre</GradText>
            </h2>
            <p style={{ color: T.soft, fontSize: 17 }}>Trois niveaux de pilotage, un seul objectif : votre sécurité en autonomie totale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] items-stretch">
            {/* Essentiel */}
            <div style={{ background: `linear-gradient(180deg,${T.panel},${T.bgSoft})`, border: `1px solid ${T.line}`, borderRadius: 18, padding: '30px 26px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(79,157,255,.08)', border: `1px solid ${T.lineS}`, color: T.acc2 }}>
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" stroke="currentColor" strokeWidth="1.6" /></svg>
                </span>
                <span style={{ fontSize: 17, fontWeight: 600, color: T.txt }}>Essentiel</span>
              </div>
              <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, color: T.txt }}>
                1 950<small style={{ fontSize: 14, fontWeight: 400, color: T.dim }}> €/mois HT</small>
              </div>
              <p style={{ fontSize: 13.5, color: T.soft, margin: '10px 0 22px', minHeight: 38 }}>Les fondamentaux de la cyber pour assurer vos basiques.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24, flex: 1, padding: 0 }}>
                {['Amélioration scoring assureur (-10%)', 'Identification de risque (Basique)', 'Pilotage ISO 27001 (Basique)', 'Reporting RGPD & NIS2 (Partiel)', 'Scan vulnérabilités mensuel', 'Rapport PDF + alertes hebdo'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13.8, color: T.soft }}><ChkSm />{item}</li>
                ))}
              </ul>
              <Link href="/cyber-pilote/souscrire/essentiel" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontWeight: 600, fontSize: 14.5, padding: '12px 22px', borderRadius: 999, cursor: 'pointer', border: `1px solid ${T.lineS}`, background: 'rgba(120,160,220,.07)', color: T.txt, whiteSpace: 'nowrap', textDecoration: 'none', fontFamily: 'inherit' }}>Démarrer maintenant</Link>
            </div>
            {/* Premium */}
            <div style={{ background: `linear-gradient(180deg,${T.panel},${T.bgSoft})`, border: `1px solid ${T.lineS}`, borderRadius: 18, padding: '30px 26px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: `0 0 0 1px rgba(79,157,255,.2),0 30px 70px -30px rgba(79,157,255,.3)` }}>
              <span style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', fontFamily: T.mono, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: '#06121f', fontWeight: 700, background: `linear-gradient(120deg,${T.acc2},${T.acc})`, padding: '6px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>★ Populaire · Protection active 360°</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, marginTop: 8 }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(79,157,255,.08)', border: `1px solid ${T.lineS}`, color: T.acc2 }}>
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                </span>
                <span style={{ fontSize: 17, fontWeight: 600, color: T.txt }}>Premium</span>
              </div>
              <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, color: T.txt }}>
                4 500<small style={{ fontSize: 14, fontWeight: 400, color: T.dim }}> €/mois HT</small>
              </div>
              <p style={{ fontSize: 13.5, color: T.soft, margin: '10px 0 22px', minHeight: 38 }}>SI structuré avec forts enjeux de sécurité.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24, flex: 1, padding: 0 }}>
                {['Amélioration scoring assureur (-20%)', 'Identification de risque Ebios RM light', 'ISO 27001 automatisé & reporting complet', 'Scan vulnérabilités 2×/mois + Cloud', 'Dark Web monitoring & OSINT hebdo', 'Exercice de crise 1×/an · Alertes quotidiennes'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13.8, color: T.soft }}><ChkSm />{item}</li>
                ))}
              </ul>
              <Link href="/cyber-pilote/souscrire/premium" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontWeight: 600, fontSize: 14.5, padding: '12px 22px', borderRadius: 999, cursor: 'pointer', border: '1px solid transparent', background: `linear-gradient(120deg,${T.acc},#2f7fe0)`, color: '#fff', boxShadow: '0 8px 30px -8px rgba(79,157,255,.45)', whiteSpace: 'nowrap', textDecoration: 'none', fontFamily: 'inherit' }}>
                Démarrer maintenant <Arrow />
              </Link>
            </div>
            {/* Entreprise */}
            <div style={{ background: `linear-gradient(180deg,${T.panel},${T.bgSoft})`, border: `1px solid ${T.line}`, borderRadius: 18, padding: '30px 26px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(79,157,255,.08)', border: `1px solid ${T.lineS}`, color: T.acc2 }}>
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6" /></svg>
                </span>
                <span style={{ fontSize: 17, fontWeight: 600, color: T.txt }}>Entreprise</span>
              </div>
              <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, color: T.txt }}>
                <span style={{ fontSize: 13, color: T.dim, marginRight: 2 }}>Dès</span>8 500<small style={{ fontSize: 14, fontWeight: 400, color: T.dim }}> €/mois HT</small>
              </div>
              <p style={{ fontSize: 13.5, color: T.soft, margin: '10px 0 22px', minHeight: 38 }}>Enjeux réglementaires forts, SI mature multi-entités.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24, flex: 1, padding: 0 }}>
                {['Amélioration scoring assureur (-30%)', 'Identification de risque Ebios RM complet', 'ISO 27001 avancé multi-entités', 'Reporting sur-mesure (Board / Comité)', 'Scan hebdo · Dark Web & OSINT quotidiens', 'Cellule de crise dédiée + SLA garanti'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13.8, color: T.soft }}><ChkSm />{item}</li>
                ))}
              </ul>
              <Link href="/cyber-pilote/souscrire/enterprise" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontWeight: 600, fontSize: 14.5, padding: '12px 22px', borderRadius: 999, cursor: 'pointer', border: `1px solid ${T.lineS}`, background: 'rgba(120,160,220,.07)', color: T.txt, whiteSpace: 'nowrap', textDecoration: 'none', fontFamily: 'inherit' }}>Démarrer maintenant</Link>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: T.dim, marginTop: 24 }}>
            Tous les packs incluent un audit préliminaire offert et un déploiement opérationnel garanti en 48h.
          </p>

          {/* FAQ inline */}
          <div style={{ marginTop: 56 }}>
            <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 36px' }}>
              <Badge>FAQ</Badge>
              <h2 style={{ fontSize: 'clamp(28px,3.6vw,42px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.12 }}>Questions fréquentes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FaqItem num="01" q="Combien de temps pour déployer ?" a="Après validation de la roadmap de l'audit préliminaire." defaultOpen />
              <FaqItem num="02" q="Suis-je engagé ?" a="Nos packs sont contractualisés pour un an afin de garantir la continuité de votre sécurité sans aucune interruption." />
              <FaqItem num="03" q="Que se passe-t-il en cas d'incident grave ?" a="Nous vous accompagnons en cas d'incident grave pour la gestion de crise, cet accompagnement est facturé au temps passé par demi-journée — non compris dans nos packs." />
              <FaqItem num="04" q="Puis-je changer de pack ?" a="Upgrade immédiat, sans interruption de service. Downgrade avec préavis de 30 jours." />
              <FaqItem num="05" q="Comment se déroule l'intégration de votre Cyber-Pilote ?" a="L'intégration se déroule en 3 phases : l'audit préliminaire (analyse de votre SI et identification des risques), la phase de déploiement (mise en place des outils et procédures), puis la phase de run (pilotage continu de votre cybersécurité)." />
              <FaqItem num="06" q="Ça remplace vraiment un RSSI ?" a="Pour 95% des PME et ETI : oui, complètement. Un RSSI senior coûte entre 80 000 et 120 000€/an, prend 3 à 6 mois à recruter, et part dès que la concurrence lui propose mieux. Notre solution est opérationnelle en 48h, disponible 24h/24, et ne démissionne jamais." />
              <FaqItem num="07" q="Compatible avec mon SI actuel ?" a="Solution agnostique — compatible cloud, on-premise, hybride. Intégration Microsoft 365, AWS, Azure, Google Workspace." />
              <FaqItem num="08" q="Quelle différence avec un RSSI externalisé classique ?" a="Jusqu'à 10× moins chère, disponible 24/7, scalable instantanément, zéro risque RH." />
            </div>
            <div style={{
              background: 'rgba(255,93,108,.05)', border: '1px solid rgba(255,93,108,.2)',
              borderRadius: 14, padding: '20px 24px', marginTop: 28,
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M12 3l9 16H3l9-16z" stroke={T.red} strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M12 10v4M12 17h.01" stroke={T.red} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <p style={{ fontSize: 14.5, color: T.soft }}>
                <strong style={{ color: T.txt }}>60% des PME victimes d&apos;une cyberattaque cessent leur activité dans les 18 mois.</strong>{' '}
                La directive NIS2 est en vigueur — les sanctions peuvent atteindre 10M€ ou 2% du CA mondial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinks pageKey="cyber-pilote" />
      <Footer />
    </div>
  );
}
