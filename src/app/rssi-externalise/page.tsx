"use client";

import { useRef, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import "./lp.css";

/* Police de la LP source (chargée en HTML via Google Fonts) portée proprement
   via next/font/google (évite FOUT/CLS). La variable --font-space-grotesk est
   montée sur #lp-root (className du wrapper) ; lp.css fait pointer --disp dessus.
   Poids repris à l'identique de la source : 400;500;600;700. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

/* Logos clients réels, repris du site (public/clients). Versions monochromes
   blanches détourées (fond transparent) générées depuis les logos officiels —
   rendu net et lisible sur le navy de la LP, sans pastille. Défilement via
   @keyframes marquee (globals.css). */
const clientLogos = [
  { src: "/clients/white/abeille-assurance.png", alt: "Abeille Assurance" },
  { src: "/clients/white/axa.png", alt: "AXA" },
  { src: "/clients/white/bollore.png", alt: "Bolloré Logistics" },
  { src: "/clients/white/cegedim.png", alt: "Cegedim" },
  { src: "/clients/white/malakoff.png", alt: "Malakoff Médéric" },
  { src: "/clients/white/lyvoc.png", alt: "Lyvoc" },
  { src: "/clients/white/thales.png", alt: "Thales" },
  { src: "/clients/white/natixis.png", alt: "Natixis" },
  { src: "/clients/white/munich-re.png", alt: "Munich Re" },
  { src: "/clients/white/backupta.png", alt: "BackupTa" },
];

export default function RSSIExternaliseLPPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setShowSuccess(true);
    // rAF : on attend le commit DOM de React (le form passe en display:none et
    // #form-success en .show) avant de scroller, pour reproduire le
    // success.scrollIntoView() synchrone du <script> vanilla de la source.
    requestAnimationFrame(() => {
      const success = document.getElementById("form-success");
      if (success) {
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  return (
    <div id="lp-root" className={spaceGrotesk.variable}>
      {/* ======================= HERO ======================= */}
      <header className="hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="wrap">
          <div className="hero-grid">

            {/* COLONNE GAUCHE */}
            <div className="hero-left">
              {/* 1. Logo / wordmark */}
              <div className="brandbar">
                <img className="brand-logo" src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769766433152.png?width=400&resize=contain" alt="SecuriTrust" width={180} height={37} />
              </div>

              {/* 2. H1 */}
              <h1>Votre <span className="hl">RSSI externalisé</span> certifié à temps partagé, à partir de 1 100 €/jour</h1>

              {/* 3. Sous-header */}
              <p className="hero-sub">Un RSSI externe senior pour piloter votre sécurité, sans le coût d'un plein temps.</p>

              {/* 4. Réassurance : note, certification, clients */}
              <div className="hero-trust">
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                  <span className="ht-txt">Certifié <b>ISO&nbsp;27001</b></span>
                </div>
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  <span className="ht-txt"><b>+100</b> clients accompagnés</span>
                </div>
                <div className="ht-item ht-stars" aria-label="Note moyenne 4,7 sur 5">
                  <span className="stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26 6.86.7-5.12 4.62 1.43 6.76L12 17.77 5.93 21.1l1.43-6.76L2.24 8.96l6.86-.7z" /></svg>
                    ))}
                  </span>
                  <span className="ht-txt"><b>4,7/5</b></span>
                </div>
              </div>

              {/* 5. Certifications clés du RSSI */}
              <div className="hero-certs">
                <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> CISSP</span>
                <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> CISM</span>
                <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> CISA</span>
                <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> ISO&nbsp;27001</span>
              </div>

            </div>

            {/* COLONNE DROITE : FORMULAIRE */}
            <aside>
              <div className="formcard" id="form-anchor">
                <form id="callback-form" noValidate ref={formRef} onSubmit={handleSubmit} style={showSuccess ? { display: "none" } : undefined}>
                  <h2>Parlez à un expert RSSI</h2>

                  <div className="field">
                    <label htmlFor="f-name">Nom</label>
                    <input type="text" id="f-name" name="name" placeholder="Votre nom et prénom" required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">Email professionnel</label>
                    <input type="email" id="f-email" name="email" placeholder="prenom@entreprise.fr" required autoComplete="email" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-phone">Téléphone <span className="opt">(facultatif, sinon réponse par email)</span></label>
                    <input type="tel" id="f-phone" name="phone" placeholder="06 12 34 56 78" autoComplete="tel" />
                  </div>

                  <button type="submit" className="btn btn-primary">Être rappelé sous 2h →</button>
                  <p className="micro"><b>Réponse sous 2h</b> · <b>100% confidentiel</b></p>
                </form>

                {/* État de succès */}
                <div className={showSuccess ? "form-success show" : "form-success"} id="form-success" role="status" aria-live="polite">
                  <div className="ok-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>
                  <h3>Merci, c'est bien reçu.</h3>
                  <p>Un RSSI senior vous rappelle sous 2h pour cadrer votre besoin. Vous ne voulez pas attendre&nbsp;? Réservez votre créneau dès maintenant.</p>
                  <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: "18px" }}>Réserver mon créneau de 20 min →</a>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </header>

      {/* ======================= TRUST BAND ======================= */}
      <section className="trustband" aria-label="Clients">
        <div className="wrap">
          <p className="label">Ils nous font confiance</p>
          <div className="logo-marquee">
            <div className="logo-track">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div className="logo-item" key={i}>
                  <img className="logo-img" src={logo.src} alt={logo.alt} loading="lazy" aria-hidden={i >= clientLogos.length} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= PROBLÈME / ENJEU ======================= */}
      <section className="section" id="enjeu">
        <div className="wrap">
          <h2>La sécurité de l'information n'est plus une option pour les PME et ETI</h2>
          <p className="lead">Pression réglementaire, exigences des assureurs, cybermenaces : piloter sans expertise dédiée expose à un risque vital.</p>
          <div className="risk-grid">
            <div className="risk">
              <div className="stat">60%</div>
              <p>des PME victimes d'une cyberattaque cessent leur activité sous 18 mois, faute de gouvernance cyber.</p>
            </div>
            <div className="risk">
              <div className="stat">10 M€</div>
              <p>de sanctions NIS2, ou 2% du CA mondial. NIS2 DORA imposent une conformité documentée et pilotée.</p>
            </div>
            <div className="risk">
              <div className="stat">80–120 k€</div>
              <p>le salaire annuel d'un RSSI interne senior, hors charges et recrutement. Rarement justifiable pour une PME.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= L'OFFRE ======================= */}
      <section className="section" id="offre">
        <div className="wrap">
          <h2>Le RSSI externalisé à temps partagé&nbsp;: en quoi ça consiste&nbsp;?</h2>
          <p className="lead">Le principe du RSSI as a service : une fonction RSSI complète à temps partagé, sur site ou à distance, intégrée à votre comité de direction, ajustable selon vos priorités, sans en porter le coût ni la charge interne.</p>

          <div className="bento">

            {/* A — Analyse des risques (grande carte primaire) */}
            <div className="bento-card wide" aria-label="Analyse des risques et remédiation">
              <div className="bc-head">
                <h3>Analyse des risques &amp; remédiation</h3>
                <p>Cartographie des vulnérabilités, analyse EBIOS&nbsp;RM et plan de remédiation priorisé selon vos enjeux métier.</p>
              </div>
              <div className="card-visual">
                <img src="/rssi-lp/card-risque.webp" alt="" loading="lazy" />
                <div className="ov"></div>
              </div>
            </div>

            {/* B — PSSI & conformité (carte haute) */}
            <div className="bento-card tall" aria-label="PSSI et conformité">
              <div className="bc-head">
                <h3>PSSI &amp; conformité</h3>
                <p>Mise en conformité ISO&nbsp;27001, RGPD, NIS2&nbsp;&amp; DORA, en lien avec votre DPO.</p>
              </div>
              <div className="card-visual">
                <img src="/rssi-lp/card-conformite.webp" alt="" loading="lazy" />
                <div className="ov"></div>
              </div>
            </div>

            {/* FEATURE — RSSI externalisé (centre) */}
            <div className="bento-card feature" aria-label="Votre RSSI externalisé — SecuriTrust">
              <div className="feat-orb"><img src="/rssi-lp/orb.webp" alt="" loading="lazy" /></div>
              <h3>Votre RSSI externalisé</h3>
            </div>

            {/* C — Coordination de crise (carte haute) */}
            <div className="bento-card tall" aria-label="Coordination de crise">
              <div className="bc-head">
                <h3>Coordination de crise</h3>
                <p>Cellule de crise activable, PCA/PRA testés, astreinte senior 24/7 en cas d'incident.</p>
              </div>
              <div className="card-visual">
                <img src="/rssi-lp/card-crise.webp" alt="" loading="lazy" />
                <div className="ov"></div>
              </div>
            </div>

            {/* D — Sensibilisation des équipes (grande carte) */}
            <div className="bento-card wide" aria-label="Sensibilisation des équipes">
              <div className="bc-head">
                <h3>Sensibilisation des équipes</h3>
                <p>Formation et simulations de phishing&nbsp;: vos collaborateurs deviennent le premier rempart.</p>
              </div>
              <div className="card-visual">
                <img src="/rssi-lp/card-sensibilisation.webp" alt="" loading="lazy" />
                <div className="ov"></div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================= COMMENT ÇA SE PASSE ======================= */}
      <section className="section" id="process">
        <div className="wrap">
          <h2>Comment se déroule la mission, mois après mois</h2>
          <p className="lead">Une montée en sécurité progressive sur la première année, puis un pilotage continu ajustable selon vos priorités.</p>
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-tag">Mois 1</div>
              <h3>Audit préliminaire &amp; cadrage</h3>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> État des lieux de votre sécurité, de vos risques et de vos obligations (NIS2, RGPD, HDS)</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Cartographie des vulnérabilités et analyse EBIOS&nbsp;RM</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Feuille de route priorisée selon vos enjeux métier</li>
              </ul>
            </div>
            <div className="tl-item">
              <div className="tl-tag">Mois 2 à 6</div>
              <h3>Mise en place du socle</h3>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Déploiement des mesures de sécurité prioritaires</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> PSSI &amp; mise en conformité (ISO&nbsp;27001, NIS2, DORA)</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Sensibilisation des équipes &amp; simulations de phishing</li>
              </ul>
            </div>
            <div className="tl-item">
              <div className="tl-tag">Mois 6 +</div>
              <h3>Pilotage continu</h3>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Maintenance &amp; monitoring continu des risques cyber</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Tableaux de bord &amp; reporting en comité de direction</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Gestion de crise et astreinte senior 24/7</li>
              </ul>
            </div>
          </div>
          <div className="cmp-cta">
            <a href="#form-anchor" className="btn btn-primary">Réserver mon créneau de 20 min →</a>
            <p className="cmp-cta-note">Réponse sous 2h · 100% confidentiel</p>
          </div>
        </div>
      </section>

      {/* ======================= TÉMOIGNAGE SIMPLE (RÉASSURANCE) ======================= */}
      {/* Vrai témoignage : avis Google 5★ de Saida (extrait synthétique). */}
      <section className="section" id="temoignage">
        <div className="wrap">
          <div className="testimonial">
            <div className="t-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26 6.86.7-5.12 4.62 1.43 6.76L12 17.77 5.93 21.1l1.43-6.76L2.24 8.96l6.86-.7z" /></svg>
              ))}
            </div>
            <blockquote className="t-quote">«&nbsp;Nous sommes extrêmement satisfaits de l'accompagnement de SecuriTrust. Leur expertise en cybersécurité a été un véritable atout, notamment pour l'obtention de notre certification SOC 2 Type II&nbsp;: méthodologie rigoureuse, délais respectés et conseils pertinents.&nbsp;»</blockquote>
            <div className="t-author">
              <div className="t-avatar" aria-hidden="true">S</div>
              <div className="t-meta">
                <div className="t-name">Saida</div>
                <div className="t-role">Avis vérifié sur Google</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= SECTEURS ======================= */}
      <section className="section" id="secteurs">
        <div className="wrap">
          <h2>Une expertise calibrée pour vos contraintes sectorielles</h2>
          <p className="lead">Nous adaptons la mission RSSI à votre cadre réglementaire : finance (DORA), santé (HDS), industrie et secteur public.</p>

          <div className="sectors">
            <div className="sector">
              <div className="s-head">
                <h3>Finance &amp; assurance</h3>
                <p>DORA, exigences ACPR, due diligence investisseurs. Banques, assureurs et fintech.</p>
              </div>
              <div className="s-art">
                <img className="s-art-img" src="/sectors/finance.webp" alt="" loading="lazy" />
              </div>
            </div>
            <div className="sector">
              <div className="s-head">
                <h3>Santé &amp; HDS</h3>
                <p>Données de santé, hébergement HDS, séparation des accès. SecuriTrust est certifié HDS (AFAQ).</p>
              </div>
              <div className="s-art">
                <img className="s-art-img" src="/sectors/sante.webp" alt="" loading="lazy" />
              </div>
            </div>
            <div className="sector">
              <div className="s-head">
                <h3>Industrie &amp; multi-sites</h3>
                <p>SI hybride, OT/IT, franchises et réseaux. Inventaire et gouvernance d'un parc distribué.</p>
              </div>
              <div className="s-art">
                <img className="s-art-img" src="/sectors/industrie.webp" alt="" loading="lazy" />
              </div>
            </div>
            <div className="sector">
              <div className="s-head">
                <h3>Public &amp; ESS</h3>
                <p>Collectivités, mutuelles et associations. Intervention en marché public (MAPA, appel d'offres).</p>
              </div>
              <div className="s-art">
                <img className="s-art-img" src="/sectors/public.webp" alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= PREUVE : CHIFFRES + CERTIFS ======================= */}
      <section className="section" id="preuve">
        <div className="wrap">
          <h2>Une expertise de haut niveau, prouvée par les chiffres</h2>
          <p className="lead" style={{ marginBottom: "26px" }}>Depuis 15 ans, du diagnostic au pilotage continu, portés par un CISO (RSSI) externe senior.</p>
          <div className="stats-wall">
            <div className="stat-box"><div className="num">+2 500</div><div className="lbl">jours-homme de RSSI externalisé</div></div>
            <div className="stat-box"><div className="num">15 ans</div><div className="lbl">d'expérience cyber</div></div>
            <div className="stat-box"><div className="num">+100</div><div className="lbl">entreprises sécurisées</div></div>
            <div className="stat-box"><div className="num">+86</div><div className="lbl">pentests au résultat garanti</div></div>
            <div className="stat-box"><div className="num">97%</div><div className="lbl">des vulnérabilités critiques détectées</div></div>
            <div className="stat-box"><div className="num">+105</div><div className="lbl">conformités ISO 27001 obtenues</div></div>
          </div>

          <div className="certs">
            <span className="cert highlight cert-featured"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Auditeur officiel AFNOR</span>
            <div className="cert-list">
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> ISO 27001 (AFAQ)</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> RGPD (AFAQ)</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> HDS (AFAQ)</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> ISO 42001</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> CISSP</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> CISM</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> CISA</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> OSCP</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> CEH</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> PNPT</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> EBIOS RM</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Lead Auditor / Implementer ISO 27001</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg> PASSI (en cours)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= INTERNE VS EXTERNALISÉ ======================= */}
      <section className="section" id="comparatif">
        <div className="wrap">
          <h2>Externaliser la fonction RSSI ou recruter&nbsp;?</h2>
          <p className="lead">Avant de recruter, comparez : externaliser offre la même expertise, plus de flexibilité, à coût réduit.</p>

          <div className="cmp">
            <div className="cmp-grid">
              <div className="cmp-row cmp-head">
                <div className="cmp-crit">Critère</div>
                <div className="cmp-int"><span className="cmp-th">RSSI internalisé</span></div>
                <div className="cmp-ext"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg><span className="cmp-th">RSSI externalisé</span></div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">Coût</span></div>
                <div className="cmp-int"><span className="x">✕</span><span className="cmp-lbl">Interne&nbsp;: </span>80 000 à 120 000 €/an chargé</div>
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Externalisé&nbsp;: </span>À partir de 1 100 €/jour, vous ne payez que les jours utiles</div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">Disponibilité de l'expertise</span></div>
                <div className="cmp-int"><span className="x">✕</span><span className="cmp-lbl">Interne&nbsp;: </span>Plusieurs mois de recrutement</div>
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Externalisé&nbsp;: </span>Expertise senior immédiate</div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">Charge RH &amp; turnover</span></div>
                <div className="cmp-int"><span className="x">✕</span><span className="cmp-lbl">Interne&nbsp;: </span>Recrutement, management, risque de départ</div>
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Externalisé&nbsp;: </span>Zéro charge RH, continuité garantie</div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">Étendue des compétences</span></div>
                <div className="cmp-int"><span className="x">✕</span><span className="cmp-lbl">Interne&nbsp;: </span>Une personne, périmètre limité</div>
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Externalisé&nbsp;: </span>Un cabinet, toutes les expertises</div>
              </div>
            </div>
            <div className="cmp-cta">
              <a href="#form-anchor" className="btn btn-primary">Parlez à un expert RSSI →</a>
              <p className="cmp-cta-note">Réponse sous 2h · 100% confidentiel</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= PRIX / FORMULES ======================= */}
      <section className="section" id="prix">
        <div className="wrap">
          <h2>Combien coûte un RSSI externalisé&nbsp;?</h2>
          <p className="lead">Un tarif clair à la journée. Vous ne payez que les jours réellement utiles, et vous ajustez le volume mois après mois.</p>

          <div className="tjm">
            <div className="tjm-head">
              <div className="from">À partir de</div>
              <div className="amount">1 100 €<span> /jour HT</span></div>
              <p className="tjm-who">Un RSSI senior certifié, à temps partagé&nbsp;: de quelques jours par mois à plusieurs jours par semaine selon vos enjeux. Le volume exact est calé après l'audit préliminaire.</p>
            </div>
            <a href="#form-anchor" className="btn btn-primary tjm-cta">Réserver mon créneau de 20 min →</a>
          </div>
        </div>
      </section>

      {/* ======================= CAS CLIENTS ======================= */}
      {/* Cas réels repris du portfolio du site (clients déjà publics). Réalisations factuelles, sans chiffres ni citations inventés. */}
      <section className="section" id="cas">
        <div className="wrap">
          <h2>Ce que ça donne concrètement, secteur par secteur</h2>
          <p className="lead">Des accompagnements réels, du pilotage RSSI au test d'intrusion, pour des organisations de tous secteurs.</p>

          <div className="grid g3" style={{ marginTop: "36px" }}>

            <div className="card case">
              <div className="case-media">
                <img src="/rssi-lp/cas-affluens.webp" alt="" loading="lazy" />
                <div className="case-fade" aria-hidden="true"></div>
                <div className="case-logo"><img src="/rssi-lp/logo-affluens.png" alt="Affluens" loading="lazy" /></div>
              </div>
              <div className="case-body">
                <h3 className="case-client">Affluens</h3>
                <span className="case-sector"><span className="cs-label">Technologie</span></span>
                <p className="case-desc">RSSI externalisé à temps partagé et stratégie de cybersécurité d'ensemble.</p>
              </div>
            </div>

            <div className="card case">
              <div className="case-media">
                <img src="/rssi-lp/cas-sg.webp" alt="" loading="lazy" />
                <div className="case-fade" aria-hidden="true"></div>
                <div className="case-logo"><img src="/clients/abeille-assurance.jpg" alt="Abeille Assurances" loading="lazy" /></div>
              </div>
              <div className="case-body">
                <h3 className="case-client">Abeille Assurances</h3>
                <span className="case-sector"><span className="cs-label">Assurance</span></span>
                <p className="case-desc">RSSI externalisé à temps partagé pour piloter la sécurité et la conformité.</p>
              </div>
            </div>

            <div className="card case">
              <div className="case-media">
                <img src="/rssi-lp/cas-veolia.webp" alt="" loading="lazy" />
                <div className="case-fade" aria-hidden="true"></div>
                <div className="case-logo"><img src="/clients/pizzorno.png" alt="Groupe Pizzorno Environnement" loading="lazy" /></div>
              </div>
              <div className="case-body">
                <h3 className="case-client">Groupe Pizzorno Environnement</h3>
                <span className="case-sector"><span className="cs-label">Environnement</span></span>
                <p className="case-desc">Tests d'intrusion (pentest) des systèmes et infrastructures.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================= CTA FINAL ======================= */}
      <section className="section" id="contact">
        <div className="wrap">
          <div className="finalcta">
            <div className="bg-glow"></div>
            <div className="finalcta-inner">
              <h2>Parlez à un expert RSSI dès aujourd'hui</h2>
              <p>Un RSSI senior vous rappelle sous 2h, ou réservez 20 min. 100% confidentiel.</p>
              <div className="finalcta-btns">
                <a href="#form-anchor" className="btn btn-primary">Être rappelé sous 2h →</a>
                <a href="https://calendly.com/expert-securitrust" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Réserver 20 min</a>
              </div>
              <p className="micro"><b>Réponse sous 2h</b> · <b>NDA dès le 1er échange</b></p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= OBJECTIONS / FAQ ======================= */}
      <section className="section" id="faq">
        <div className="wrap">
          <h2>RSSI externalisé&nbsp;: les réponses aux questions des décideurs</h2>
          <p className="lead">Les décideurs nous posent toujours les mêmes questions. Voici nos réponses, sans détour.</p>

          <div className="faq">
            <details>
              <summary>Combien ça coûte vraiment&nbsp;?<span className="plus">+</span></summary>
              <p>Le RSSI externalisé SecuriTrust est facturé à la journée, à partir de 1 100 €/jour HT. Vous ne payez que les jours réellement utiles, et le volume s'ajuste mois après mois selon vos priorités.</p>
              <p>Le nombre de jours exact dépend de votre taille, de votre exposition réglementaire et de vos enjeux&nbsp;: il est calé après l'audit préliminaire, sans surprise. À comparer aux 80–120 k€/an d'un RSSI interne à temps plein.</p>
            </details>
            <details>
              <summary>Quels sont les avantages d'un RSSI externalisé&nbsp;?<span className="plus">+</span></summary>
              <p>Une expertise de haut niveau en cybersécurité immédiatement disponible, un budget cyber maîtrisé (à partir de 1 100 €/jour, vous ne payez que les jours utiles, face à un RSSI interne à 80–120 k€/an), zéro charge RH, une vision indépendante des enjeux internes, et une flexibilité totale. Vous accédez à un cabinet entier (audit, gestion de crise, conformité aux normes ISO), là où un salarié unique reste limité à son seul périmètre.</p>
            </details>
            <details>
              <summary>Quelles sont les missions d'un RSSI externalisé&nbsp;?<span className="plus">+</span></summary>
              <p>Analyse des risques et remédiation, rédaction de la PSSI et mise en conformité (ISO 27001, RGPD, NIS2 DORA), coordination de la gestion de crise et des incidents, supervision des projets IT sensibles (cloud, SI métier), veille technologique et réglementaire, sensibilisation des équipes. Le RSSI externe pilote votre feuille de route sécurité et produit les tableaux de bord présentés à votre instance de gouvernance.</p>
            </details>
            <details>
              <summary>Pourquoi externaliser la fonction RSSI plutôt que recruter&nbsp;?<span className="plus">+</span></summary>
              <p>Parce qu'un RSSI interne coûte 80 000 à 120 000 €/an, prend des mois à recruter et expose au turnover. L'externalisation du RSSI vous donne la même séniorité immédiatement, à temps partagé, sans charge RH et avec une indépendance que n'a pas un salarié soumis aux enjeux internes. Pour la plupart des PME et ETI, un RSSI à temps plein n'est ni nécessaire ni rentable.</p>
            </details>
            <details>
              <summary>Qui intervient concrètement&nbsp;? Vos intervenants sont-ils vraiment seniors&nbsp;?<span className="plus">+</span></summary>
              <p>Vous n'aurez jamais un profil junior seul en première ligne sur votre gouvernance. Votre mission est portée par un RSSI senior référent, qui cumule en moyenne 15 ans d'expérience et s'appuie sur l'équipe du cabinet (auditeurs, pentesteurs, experts conformité).</p>
              <p>Nos consultants sont certifiés CISSP, CISM, CISA, OSCP, CEH, EBIOS RM, Lead Auditor et Lead Implementer ISO 27001 ; SecuriTrust est auditeur officiel AFNOR. Avant de signer, nous vous présentons nominativement l'intervenant qui sera affecté à votre compte, avec son parcours et ses missions de référence, vous choisissez en connaissance de cause.</p>
            </details>
            <details>
              <summary>J'ai déjà un responsable IT (ou un infogérant), comment travaillez-vous ensemble&nbsp;?<span className="plus">+</span></summary>
              <p>Le RSSI externalisé est un renfort, pas un doublon. Il porte la gouvernance, la stratégie et la conformité&nbsp;; votre responsable IT et votre infogérant gardent l'exploitation et le run. Une matrice RACI claire répartit les responsabilités dès le cadrage, ce qui évite toute guerre de chapelle en cas d'incident.</p>
              <p>Concrètement&nbsp;: nous montons votre équipe en compétence et donnons à votre responsable IT un cadre et un appui senior, sans jamais le court-circuiter. Beaucoup de nos clients conservent à la fois leur DSI interne et leur infogérant.</p>
            </details>
            <details>
              <summary>Comment garantissez-vous la confidentialité et l'accès à notre SI&nbsp;?<span className="plus">+</span></summary>
              <p>La confidentialité est contractualisée (NDA) dès le premier échange. Les accès au système d'information sont strictement limités au périmètre nécessaire, tracés et révocables. En tant que cabinet certifié ISO 27001 et HDS, nous appliquons à notre propre fonctionnement les exigences que nous déployons chez vous. Votre SI reste sous votre contrôle&nbsp;: nous le sécurisons, nous ne le détenons pas.</p>
            </details>
            <details>
              <summary>On peut le faire en interne, pourquoi vous&nbsp;?<span className="plus">+</span></summary>
              <p>Un responsable IT, ou même un lead dev senior, gère l'exploitation des systèmes informatiques, rarement la gouvernance cyber formalisée, l'analyse des risques, la conformité aux normes et la gestion de crise. C'est d'ailleurs souvent lors de l'audit préliminaire que l'on révèle des écarts qu'une équipe technique, concentrée sur le run, ne pouvait pas voir. Le RSSI externe apporte cette expertise dédiée et un regard indépendant, sans mobiliser un temps plein.</p>
            </details>
            <details>
              <summary>Une cyber-assurance ne suffit-elle pas&nbsp;?<span className="plus">+</span></summary>
              <p>Non&nbsp;: une assurance indemnise après l'incident, elle ne l'empêche pas, et les assureurs exigent désormais un niveau de sécurité documenté pour couvrir, voire pour fixer la prime. Un RSSI externalisé réduit le risque en amont, prépare la gestion de crise et renforce votre dossier auprès de l'assureur (ce qui peut alléger votre prime). La prévention et l'assurance sont complémentaires, pas substituables.</p>
            </details>
            <details>
              <summary>Êtes-vous compatibles avec notre SI (cloud, on-premise, hybride)&nbsp;?<span className="plus">+</span></summary>
              <p>Oui. Nous intervenons sur des environnements cloud, on-premise et hybrides, y compris des SI industriels complexes (OT/IT) et multi-sites. Le RSSI externe commence toujours par un inventaire et une cartographie de votre socle technique réel, puis définit la gouvernance et supervise son application, sur vos outils, dans votre contexte, pas sur un modèle générique.</p>
            </details>
            <details>
              <summary>Qui porte la responsabilité juridique&nbsp;?<span className="plus">+</span></summary>
              <p>La responsabilité réglementaire de l'entreprise (NIS2, RGPD, DORA) reste celle de sa direction, c'est la loi, et personne ne peut s'y substituer. En revanche, SecuriTrust s'engage contractuellement par une obligation de moyens documentée et est couvert par une assurance responsabilité civile professionnelle (attestation sur demande). Le périmètre, les engagements et la répartition des responsabilités sont précisés au contrat, et nous vous en communiquons un extrait avant signature.</p>
            </details>
            <details>
              <summary>Quelle réactivité en cas d'incident&nbsp;?<span className="plus">+</span></summary>
              <p>Sur les formules Premium et Entreprise, l'astreinte 24/7 est incluse&nbsp;: en cas d'incident, votre RSSI externe active la cellule de crise, avec un premier contact senior dans l'heure, et coordonne la réponse, le PCA/PRA et la communication. Les délais garantis (SLA) sont contractualisés en fonction de votre niveau d'exposition, dès le cadrage, pas après.</p>
            </details>
            <details>
              <summary>Intervenez-vous pour les collectivités et le secteur public&nbsp;?<span className="plus">+</span></summary>
              <p>Oui. Nous accompagnons des structures parapubliques et de l'ESS (mutuelles, associations), et nous intervenons dans le cadre d'un marché public (MAPA ou appel d'offres). Le RSSI externe s'intègre à votre instance de gouvernance (direction générale des services ou équivalent) et adapte le cadre budgétaire à vos crédits votés.</p>
            </details>
            <details>
              <summary>Comment choisir et évaluer un RSSI externalisé&nbsp;?<span className="plus">+</span></summary>
              <p>Vérifiez les certifications (ISO 27001, OSCP, CEH, EBIOS RM, qualité d'auditeur AFNOR), l'expérience réelle (jours-homme, nombre d'entreprises sécurisées), la transparence tarifaire, la clarté des livrables (feuille de route, tableaux de bord, analyse des risques) et la capacité à siéger en comité de direction. Un bon RSSI externe se mesure à la lisibilité de son pilotage, pas à son discours.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ======================= FOOTER ======================= */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="brandbar" style={{ marginBottom: "10px" }}>
                <img className="brand-logo" src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769766433152.png?width=400&resize=contain" alt="SecuriTrust" width={180} height={37} />
              </div>
              <p>Cabinet de cybersécurité, auditeur officiel AFNOR. RSSI externalisé à temps partagé, audit, conformité et gestion de crise pour PME et ETI.</p>
            </div>
            <div className="footer-links">
              <a href="#offre">L'offre</a>
              <a href="#prix">Prix</a>
              <a href="#comparatif">Interne vs externe</a>
              <a href="#faq">FAQ</a>
              <a href="#preuve">Certifications</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-legal">
            © 2026 SecuriTrust. Tous droits réservés. Vos données sont traitées de manière strictement confidentielle, conformément au RGPD, et utilisées uniquement pour répondre à votre demande. <a href="#" style={{ color: "var(--sky)" }}>Mentions légales</a> · <a href="#" style={{ color: "var(--sky)" }}>Politique de confidentialité</a>
          </div>
        </div>
      </footer>

      {/* ======================= STICKY MOBILE CTA ======================= */}
      <div className="sticky-cta">
        <a href="#form-anchor" className="btn btn-primary">Parler à un expert →</a>
      </div>
    </div>
  );
}
