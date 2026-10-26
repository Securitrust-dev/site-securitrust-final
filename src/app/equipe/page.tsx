import Link from 'next/link';
import { Linkedin, GraduationCap, ArrowRight } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { EXPERTS, initials } from '@/content/equipe';

export default function EquipePage() {
  return (
    <StaticThemeShell active="equipe">
      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <span className="now">Équipe</span>
          </p>
          <h1>Une équipe d&apos;experts qui s&apos;engagent</h1>
          <p className="hero-sub">
            Chez SecuriTrust, un intervenant senior pilote votre sécurité de bout en bout — jamais un profil
            junior laissé seul. Direction, conformité, pentest et RSSI externalisé : voici les visages derrière le cabinet.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid-3">
            {EXPERTS.map((e) => (
              <article key={e.slug} className="pilier" id={e.slug}>
                <div
                  aria-hidden
                  style={{
                    width: 64, height: 64, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--sfont-jetbrains-mono), monospace', fontSize: 22, fontWeight: 600,
                    color: '#0a1420', background: 'linear-gradient(135deg,#76a6d1,#4d9fe8)', marginBottom: 18,
                  }}
                >
                  {initials(e.name)}
                </div>
                <h3 style={{ marginBottom: 4 }}>{e.name}</h3>
                <p style={{ color: 'var(--cyan)', fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>{e.role}</p>
                <p>{e.bio}</p>
                {e.alumniOf && (
                  <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted-2)', marginBottom: 10 }}>
                    <GraduationCap size={15} /> {e.alumniOf}
                  </p>
                )}
                {e.certifications?.length ? (
                  <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>
                    {e.certifications.join(' · ')}
                  </p>
                ) : null}
                {e.linkedin && (
                  <a
                    href={e.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--cyan)', fontWeight: 600 }}
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                )}
              </article>
            ))}
          </div>

          <p style={{ marginTop: 40, color: 'var(--muted)', fontSize: 14 }}>
            Le cabinet s&apos;appuie aussi sur un réseau de consultants seniors certifiés mobilisés selon vos enjeux.
            Découvrez nos <Link href="/certifications" style={{ color: 'var(--cyan)' }}>certifications et accréditations</Link>.
          </p>
        </div>
      </section>

      <section className="sec sec--dark" style={{ textAlign: 'center' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 'clamp(26px,3.4vw,40px)', marginBottom: 14 }}>Envie d&apos;échanger avec l&apos;un de nos experts ?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: 560, margin: '0 auto 28px' }}>
            Un intervenant senior vous rappelle sous 2h ouvrées pour cadrer votre besoin. Sans engagement, 100% confidentiel.
          </p>
          <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Nous contacter <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </StaticThemeShell>
  );
}
