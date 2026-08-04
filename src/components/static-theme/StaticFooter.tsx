import Link from 'next/link';

/**
 * Footer identique aux pages statiques (public/*.html). Contrairement à la
 * version HTML source, les liens légaux pointent vers les vraies routes
 * Next.js (/politique-de-confidentialite, /politique-de-cookies) plutôt que
 * les slugs raccourcis (parfois cassés) utilisés dans le HTML statique.
 */
export function StaticFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand foot-col">
            <div className="brand">
              <img src="/assets/logo-securitrust.png" alt="SecuriTrust" className="brand-mark" />
            </div>
            <p>Cabinet de conseil en cybersécurité — Paris, depuis 2016. Audit, pentest au résultat, RSSI externalisé, conformité.</p>
            <address>
              11 Rue Saint-Didier
              <br />
              75116 Paris
              <br />
              <a href="tel:+33186044431" style={{ color: 'var(--muted-2)' }}>01 86 04 44 31</a>
              <br />
              <a href="mailto:expertise@securitrust.fr" style={{ color: 'var(--muted-2)' }}>expertise@securitrust.fr</a>
            </address>
          </div>
          <div className="foot-col">
            <h4>Offres</h4>
            <Link href="/#pentest">Pentest au résultat</Link>
            <Link href="/#offre">RSSI externalisé</Link>
            <Link href="/#obligation">Accompagnement conformité</Link>
            <Link href="/nis2">Mise en conformité NIS2</Link>
            <Link href="/pentest-web">Pentest Web</Link>
            <Link href="/pentest-mobile">Pentest Mobile</Link>
            <Link href="/pentest-ad">Pentest Active Directory</Link>
            <Link href="/audit-o365">Audit Microsoft 365</Link>
          </div>
          <div className="foot-col">
            <h4>Cabinet</h4>
            <Link href="/#references">Références</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/nous-rejoindre">Nous rejoindre</Link>
            <a href="https://calendly.com/expert-securitrust" target="_blank" rel="noopener noreferrer">Nous contacter</a>
          </div>
          <div className="foot-col">
            <h4>Légal</h4>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
            <Link href="/cgv">CGV</Link>
            <Link href="/politique-de-cookies">Politique de cookies</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 SecuriTrust — Tous droits réservés</span>
          <span>
            <a href="https://www.linkedin.com/company/securitrust" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
