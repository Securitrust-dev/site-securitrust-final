import Link from "next/link";
import { SECTEURS, SECTEURS_ORDRE } from "@/lib/secteurs-data";

export const metadata = {
  title: "Nos secteurs d'expertise — SecuriTrust",
  description:
    "Banque & Finance, Santé, Tech, Public, Retail, Industrie : un accompagnement cybersécurité et conformité adapté aux normes de chaque secteur.",
};

export default function SecteursIndex() {
  return (
    <div className="st-idx">
      <section className="st-idx-hero">
        <div className="st-container">
          <span className="st-idx-eyebrow">Nos secteurs d&apos;expertise</span>
          <h1 className="st-idx-h1">
            Chaque secteur a ses menaces.
            <br />
            Et ses obligations.
          </h1>
          <p className="st-idx-sub">
            DORA, NIS2, HDS, PCI DSS, IEC 62443 : derrière chaque activité se cache
            un cadre réglementaire précis. SecuriTrust traduit ces exigences en
            feuille de route concrète, secteur par secteur.
          </p>
        </div>
      </section>

      <section className="st-idx-grid-section">
        <div className="st-container">
          <div className="st-idx-grid">
            {SECTEURS_ORDRE.map((slug) => {
              const s = SECTEURS[slug];
              return (
                <Link key={slug} href={`/secteurs/${slug}`} className="st-idx-card">
                  <div className="st-idx-card-top">
                    <span className="st-idx-card-eyebrow">{s.eyebrow}</span>
                    <h2 className="st-idx-card-title">{s.label}</h2>
                  </div>
                  <p className="st-idx-card-text">{s.hero.sousTitre.slice(0, 110)}…</p>
                  <span className="st-idx-card-link">
                    {"Voir l'accompagnement"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .st-idx {
          background: #0a1628;
          color: #e8eef6;
          font-family: "Inter", -apple-system, sans-serif;
        }
        .st-container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .st-idx-hero { padding: 120px 0 60px; text-align: center; }
        .st-idx-eyebrow {
          color: #3dd6e0; font-size: 13px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase;
        }
        .st-idx-h1 {
          font-size: clamp(32px, 5vw, 52px); font-weight: 800;
          letter-spacing: -.02em; line-height: 1.1; margin: 18px 0 0;
        }
        .st-idx-sub {
          max-width: 64ch; margin: 22px auto 0; color: #93a4ba;
          font-size: 17px; line-height: 1.7;
        }
        .st-idx-grid-section { padding: 30px 0 110px; }
        .st-idx-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .st-idx-card {
          display: flex; flex-direction: column; justify-content: space-between;
          background: linear-gradient(180deg, #0f2138 0%, #0d1b2e 100%);
          border: 1px solid rgba(125,160,200,.14); border-radius: 16px;
          padding: 28px 26px; min-height: 220px; text-decoration: none;
          color: inherit; transition: all .3s ease;
        }
        .st-idx-card:hover {
          border-color: rgba(61,214,224,.4); transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,.35);
        }
        .st-idx-card-eyebrow {
          font-size: 12px; color: #3dd6e0; font-weight: 600;
          letter-spacing: .04em; text-transform: uppercase;
        }
        .st-idx-card-title {
          font-size: 24px; font-weight: 800; margin: 10px 0 0; letter-spacing: -.01em;
        }
        .st-idx-card-text {
          font-size: 14.5px; line-height: 1.6; color: #93a4ba; margin: 14px 0 0;
        }
        .st-idx-card-link {
          display: inline-flex; align-items: center; gap: 8px; margin-top: 22px;
          color: #3dd6e0; font-size: 14.5px; font-weight: 600;
        }
        @media (max-width: 880px) {
          .st-idx-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
