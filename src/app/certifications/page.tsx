import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';

type Badge = { src: string; w: number; h: number; label: string; detail: string };

const CABINET: Badge[] = [
  { src: '/afaq-iso27001-securite.png', w: 1498, h: 749, label: 'ISO/IEC 27001', detail: 'Audité AFAQ (AFNOR Certification) — management de la sécurité de l’information.' },
  { src: '/afaq-hds.png', w: 680, h: 702, label: 'HDS', detail: 'Hébergeur de données de santé — référentiel AFAQ.' },
  { src: '/afaq-protection-donnees.png', w: 225, h: 224, label: 'Protection des données', detail: 'Démarche RGPD — AFAQ Protection des données.' },
  { src: '/afaq-intelligence-artificielle.png', w: 221, h: 228, label: 'Intelligence artificielle', detail: 'AFAQ Intelligence artificielle — cadre de confiance IA.' },
];

const CONSULTANTS: Badge[] = [
  { src: '/iso27001-lead-auditor.png', w: 500, h: 500, label: 'ISO 27001 Lead Auditor', detail: 'Conduite d’audits de systèmes de management de la sécurité de l’information.' },
  { src: '/iso27001-lead-implementer.png', w: 500, h: 500, label: 'ISO 27001 Lead Implementer', detail: 'Mise en œuvre d’un SMSI conforme à ISO/IEC 27001.' },
  { src: '/ebios-badge.png', w: 416, h: 239, label: 'EBIOS Risk Manager', detail: 'Méthode d’analyse de risques de l’ANSSI.' },
  { src: '/oscp-badge.png', w: 512, h: 512, label: 'OSCP', detail: 'Offensive Security Certified Professional — test d’intrusion pratique.' },
  { src: '/ceh-badge.png', w: 549, h: 454, label: 'CEH', detail: 'Certified Ethical Hacker (EC-Council).' },
  { src: '/pnpt-badge.png', w: 780, h: 780, label: 'PNPT', detail: 'Practical Network Penetration Tester (TCM Security).' },
  { src: '/crtp-badge.png', w: 200, h: 175, label: 'CRTP', detail: 'Certified Red Team Professional — sécurité Active Directory.' },
  { src: '/crte-badge.png', w: 240, h: 240, label: 'CRTE', detail: 'Certified Red Team Expert — environnements AD avancés.' },
];

function BadgeGrid({ items }: { items: Badge[] }) {
  return (
    <div className="grid-4">
      {items.map((b) => (
        <article key={b.src} className="pilier" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Image src={b.src} alt={b.label} width={b.w} height={b.h} style={{ height: 76, width: 'auto', objectFit: 'contain' }} />
          </div>
          <h3 style={{ fontSize: 17, marginBottom: 8 }}>{b.label}</h3>
          <p style={{ fontSize: 13.5 }}>{b.detail}</p>
        </article>
      ))}
    </div>
  );
}

export default function CertificationsPage() {
  return (
    <StaticThemeShell active="certifications">
      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <span className="now">Certifications</span>
          </p>
          <h1>Certifications &amp; accréditations</h1>
          <p className="hero-sub">
            Notre niveau d&apos;exigence se vérifie. Le cabinet et ses consultants s&apos;appuient sur des
            référentiels reconnus, de la conformité (ISO 27001, HDS, RGPD) à la sécurité offensive (OSCP, CEH, PNPT, CRTP, CRTE).
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Le cabinet</h2>
            <p>Audits et référentiels portés par SecuriTrust en tant qu&apos;organisation.</p>
          </div>
          <BadgeGrid items={CABINET} />
        </div>
      </section>

      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head">
            <h2>Nos consultants</h2>
            <p>Certifications individuelles mobilisées sur vos missions de conformité et de pentest.</p>
          </div>
          <BadgeGrid items={CONSULTANTS} />
        </div>
      </section>

      <section className="sec" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 'clamp(26px,3.4vw,40px)', marginBottom: 14 }}>Un projet de conformité ou un pentest ?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: 560, margin: '0 auto 28px' }}>
            Parlez à un expert certifié. Réponse sous 2h ouvrées, sans engagement.
          </p>
          <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Nous contacter <ArrowRight size={16} />
          </Link>
          <p style={{ marginTop: 22, fontSize: 14, color: 'var(--muted)' }}>
            Voir aussi <Link href="/equipe" style={{ color: 'var(--cyan)' }}>notre équipe</Link>.
          </p>
        </div>
      </section>
    </StaticThemeShell>
  );
}
