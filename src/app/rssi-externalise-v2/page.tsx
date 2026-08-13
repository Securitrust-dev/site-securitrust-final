"use client";

import { useRef, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import "../rssi-externalise/lp.css";
import "./lp-v2.css";

/* ============================================================================
   LP « RSSI externalisé » — V2 (BROUILLON)

   Même design que /rssi-externalise (lp.css est importé tel quel, aucune
   valeur graphique modifiée) mais le TEXTE est repris de la nouvelle home
   securitrust.fr (public/index.html, commit d69ab38).

   Deux arbitrages validés par Charles le 2026-08-13 :
   - PRIX : plus aucun montant affiché (la nouvelle home a retiré le
     « à partir de 1 100 €/jour »), ni dans le comparatif, ni dans la FAQ,
     ni dans les metadata.
   - PÉRIMÈTRE : hybride — le texte de la home remplace celui de la LP là où
     il existe un équivalent ; les sections propres à la LP (enjeu, secteurs,
     témoignage, cas clients, FAQ) sont conservées telles quelles.
   ============================================================================ */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

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

// Domaines email personnels/grand public à refuser (on ne garde que les adresses pro).
const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.fr", "ymail.com",
  "hotmail.com", "hotmail.fr", "outlook.com", "outlook.fr", "live.com", "live.fr", "msn.com",
  "icloud.com", "me.com", "mac.com", "aol.com", "gmx.com", "gmx.fr",
  "free.fr", "orange.fr", "wanadoo.fr", "sfr.fr", "laposte.net", "bbox.fr",
  "neuf.fr", "numericable.fr", "protonmail.com", "proton.me", "yopmail.com",
]);

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg>
);

export default function RSSIExternaliseV2Page() {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Bloque les adresses email personnelles (Gmail, Yahoo, etc.) : on ne garde que le pro.
    const emailInput = form.querySelector<HTMLInputElement>("#f-email");
    if (emailInput) {
      const domain = emailInput.value.trim().split("@")[1]?.toLowerCase() ?? "";
      emailInput.setCustomValidity(
        domain && PERSONAL_EMAIL_DOMAINS.has(domain)
          ? "Merci d'utiliser une adresse email professionnelle."
          : "",
      );
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Capture du lead dans Notion (best-effort — ne bloque jamais l'affichage du succès).
    try {
      const fd = new FormData(form);
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          source: "LP RSSI v2",
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* noop */
    }

    setShowSuccess(true);
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
              <div className="brandbar">
                <img className="brand-logo" src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769766433152.png?width=400&resize=contain" alt="SecuriTrust" width={180} height={37} />
              </div>

              {/* H1 : reprend « Reprendre le contrôle de votre sécurité. » de la
                  nouvelle home, en gardant le mot-clé « RSSI externalisé ». */}
              <h1>Votre <span className="hl">RSSI externalisé</span> : reprenez le contrôle de votre sécurité</h1>

              <p className="hero-sub">Un cabinet multi-certifié qui pilote la cybersécurité des organisations à forts enjeux depuis 2016. Pilotage complet, sans charge RH interne — continuité garantie, zéro turnover.</p>

              <div className="hero-trust">
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                  <span className="ht-txt">Équipe <b>multi-certifiée</b></span>
                </div>
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  <span className="ht-txt"><b>+100</b> entreprises sécurisées</span>
                </div>
                <div className="ht-item ht-stars" aria-label="Note Google 5 sur 5">
                  <span className="stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26 6.86.7-5.12 4.62 1.43 6.76L12 17.77 5.93 21.1l1.43-6.76L2.24 8.96l6.86-.7z" /></svg>
                    ))}
                  </span>
                  <span className="ht-txt"><b>5/5</b></span>
                  <span className="ht-google" aria-label="Avis Google" style={{ display: "inline-flex", alignItems: "center", marginLeft: 6 }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style={{ display: "block" }}>
                      <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.48h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.75z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A12 12 0 0 0 12 24z" />
                      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.26a12 12 0 0 0 0 10.75l4.01-3.11z" />
                      <path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.62l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Certifications du RSSI — la home annonce « un RSSI senior certifié CISSP/CISM ». */}
              <div className="hero-certs">
                <span className="cert">{CHECK} CISSP</span>
                <span className="cert">{CHECK} CISM</span>
                <span className="cert">{CHECK} CISA</span>
              </div>

            </div>

            {/* COLONNE DROITE : FORMULAIRE */}
            <aside>
              <div className="formcard" id="form-anchor">
                <form id="callback-form" noValidate ref={formRef} onSubmit={handleSubmit} style={showSuccess ? { display: "none" } : undefined}>
                  <h2>Être rappelé sous 2h</h2>
                  <p className="form-sub">Dites-nous où vous en êtes, on s&apos;occupe du reste.</p>

                  <div className="field">
                    <label htmlFor="f-name">Nom et prénom</label>
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

                  {/* Consentement RGPD — texte repris à l'identique de la home. */}
                  <div className="field-consent">
                    <input type="checkbox" id="f-consent" name="consent" required />
                    <label htmlFor="f-consent">J&apos;accepte que SecuriTrust utilise ces informations pour me recontacter dans le cadre de ma demande. Aucun transfert à des tiers.</label>
                  </div>

                  <button type="submit" className="btn btn-primary">Être rappelé sous 2h →</button>
                  <p className="micro"><b>Réponse sous 2h</b> · <b>NDA dès le 1er échange</b></p>

                  <p className="rgpd-notice">Les données collectées via ce formulaire sont traitées par SecuriTrust en qualité de responsable de traitement, sur la base de votre consentement, aux fins exclusives de traiter votre demande de contact. Elles sont conservées 24 mois puis supprimées. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition sur vos données — exerçables à <a href="mailto:dpo@securitrust.fr">dpo@securitrust.fr</a>. En savoir plus : <a href="/politique-de-confidentialite">politique de confidentialité</a>.</p>
                </form>

                {/* État de succès */}
                <div className={showSuccess ? "form-success show" : "form-success"} id="form-success" role="status" aria-live="polite">
                  <div className="ok-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>
                  <h3>Merci, c&apos;est bien reçu.</h3>
                  <p>Un RSSI senior vous rappelle sous 2h pour cadrer votre besoin. Vous ne voulez pas attendre&nbsp;? Réservez votre créneau dès maintenant.</p>
                  <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: "18px" }}>Réserver un créneau →</a>
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
      {/* Section propre à la LP : pas d'équivalent sur la nouvelle home, conservée. */}
      <section className="section" id="enjeu">
        <div className="wrap">
          <h2>La sécurité de l&apos;information n&apos;est plus une option pour les PME et ETI</h2>
          <p className="lead">Pression réglementaire, exigences des assureurs, cybermenaces : piloter sans expertise dédiée expose à un risque vital.</p>
          <div className="risk-grid">
            <div className="risk">
              <div className="stat">60%</div>
              <p>des PME victimes d&apos;une cyberattaque cessent leur activité sous 18 mois, faute de gouvernance cyber.</p>
            </div>
            <div className="risk">
              <div className="stat">10 M€</div>
              <p>de sanctions NIS2, ou 2% du CA mondial. NIS2 DORA imposent une conformité documentée et pilotée.</p>
            </div>
            <div className="risk">
              <div className="stat">80–120 k€</div>
              <p>le salaire annuel d&apos;un RSSI interne senior, hors charges et recrutement. Rarement justifiable pour une PME.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= L'OFFRE ======================= */}
      {/* Titre, chapô et contenu des cartes repris de la section « RSSI externalisé »
          de la nouvelle home (les 4 blocs qui correspondent aux visuels existants). */}
      <section className="section" id="offre">
        <div className="wrap">
          <h2>Expertise senior, sans charge RH interne</h2>
          <p className="lead">Nos RSSI certifiés prennent en charge le pilotage complet de votre sécurité, de l&apos;audit à la conformité, du monitoring continu à la gestion de crise — avec continuité garantie, zéro turnover.</p>

          <div className="bento">

            {/* A — Audit & roadmap (grande carte) */}
            <div className="bento-card wide" aria-label="Audit et roadmap">
              <div className="bc-head">
                <h3>Audit &amp; roadmap</h3>
                <p>État des lieux complet, analyse de risques EBIOS&nbsp;RM, feuille de route sécurité priorisée selon vos enjeux métier.</p>
              </div>
              <div className="card-visual">
                <img src="/rssi-lp/card-risque.webp" alt="" loading="lazy" />
                <div className="ov"></div>
              </div>
            </div>

            {/* B — Conformité (carte haute) */}
            <div className="bento-card tall" aria-label="Conformité NIS2, DORA, RGPD">
              <div className="bc-head">
                <h3>Conformité NIS2, DORA, RGPD</h3>
                <p>Conformité documentée et pilotée — pas un classeur qui prend la poussière. ISO&nbsp;27001, HDS, en lien avec votre DPO.</p>
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

            {/* C — Gestion de crise (carte haute) */}
            <div className="bento-card tall" aria-label="Gestion de crise 24/7">
              <div className="bc-head">
                <h3>Gestion de crise 24/7</h3>
                <p>Cellule de crise activable, PCA/PRA testés, astreinte senior 24/7. Vous savez qui appeler et quoi faire en cas d&apos;incident.</p>
              </div>
              <div className="card-visual">
                <img src="/rssi-lp/card-crise.webp" alt="" loading="lazy" />
                <div className="ov"></div>
              </div>
            </div>

            {/* D — Sensibilisation & formations (grande carte) */}
            <div className="bento-card wide" aria-label="Sensibilisation et formations">
              <div className="bc-head">
                <h3>Sensibilisation &amp; Formations</h3>
                <p>Simulations de phishing et entraînement des équipes&nbsp;: vos collaborateurs deviennent le premier rempart, plus la première faille.</p>
              </div>
              <div className="card-visual">
                <img src="/rssi-lp/card-sensibilisation.webp" alt="" loading="lazy" />
                <div className="ov"></div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================= DÉROULÉ DE LA MISSION ======================= */}
      {/* Repris mot pour mot de la section « Le déroulé de la mission » de la home. */}
      <section className="section" id="process">
        <div className="wrap">
          <h2>Une montée en sécurité progressive, mois après mois</h2>
          <p className="lead">Un socle solide la première année, puis un pilotage continu qui s&apos;ajuste à vos priorités et à votre niveau de risque.</p>
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-tag">Mois 1</div>
              <h3>Audit &amp; cadrage</h3>
              <ul>
                <li>{CHECK} État des lieux de votre sécurité et de vos obligations (NIS2, RGPD, HDS)</li>
                <li>{CHECK} Cartographie des vulnérabilités et analyse de risques EBIOS&nbsp;RM</li>
                <li>{CHECK} Feuille de route priorisée selon vos enjeux métier</li>
              </ul>
            </div>
            <div className="tl-item">
              <div className="tl-tag">Mois 2 → 6</div>
              <h3>Mise en place du socle</h3>
              <ul>
                <li>{CHECK} Déploiement des mesures de sécurité prioritaires</li>
                <li>{CHECK} PSSI et mise en conformité (ISO&nbsp;27001, NIS2, DORA)</li>
                <li>{CHECK} Sensibilisation des équipes et simulations de phishing</li>
              </ul>
            </div>
            <div className="tl-item">
              <div className="tl-tag">Mois 6 +</div>
              <h3>Pilotage continu</h3>
              <ul>
                <li>{CHECK} Monitoring continu des risques cyber</li>
                <li>{CHECK} Tableaux de bord et reporting en comité de direction</li>
                <li>{CHECK} Gestion de crise et astreinte senior 24/7</li>
              </ul>
            </div>
          </div>
          <div className="cmp-cta">
            <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Réserver un créneau →</a>
            <p className="cmp-cta-note">Réponse sous 2h · 100% confidentiel</p>
          </div>
        </div>
      </section>

      {/* ======================= TÉMOIGNAGE ======================= */}
      {/* Section propre à la LP : avis Google 5★ de Saida. Conservée. */}
      <section className="section" id="temoignage">
        <div className="wrap">
          <div className="testimonial">
            <div className="t-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26 6.86.7-5.12 4.62 1.43 6.76L12 17.77 5.93 21.1l1.43-6.76L2.24 8.96l6.86-.7z" /></svg>
              ))}
            </div>
            <blockquote className="t-quote">«&nbsp;Nous sommes extrêmement satisfaits de l&apos;accompagnement de SecuriTrust. Leur expertise en cybersécurité a été un véritable atout, notamment pour l&apos;obtention de notre certification SOC 2 Type II&nbsp;: méthodologie rigoureuse, délais respectés et conseils pertinents.&nbsp;»</blockquote>
            <div className="t-author">
              <div className="t-avatar" aria-hidden="true">S</div>
              <div className="t-meta">
                <div className="t-name">Saida</div>
                <div className="t-role">CEO, Élite Aéroport</div>
                <div className="t-role" style={{ opacity: 0.68 }}>Avis vérifié sur Google</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= SECTEURS ======================= */}
      {/* Section propre à la LP : pas d'équivalent sur la nouvelle home, conservée. */}
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
                <p>SI hybride, OT/IT, franchises et réseaux. Inventaire et gouvernance d&apos;un parc distribué.</p>
              </div>
              <div className="s-art">
                <img className="s-art-img" src="/sectors/industrie.webp" alt="" loading="lazy" />
              </div>
            </div>
            <div className="sector">
              <div className="s-head">
                <h3>Public &amp; ESS</h3>
                <p>Collectivités, mutuelles et associations. Intervention en marché public (MAPA, appel d&apos;offres).</p>
              </div>
              <div className="s-art">
                <img className="s-art-img" src="/sectors/public.webp" alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= PREUVE : CHIFFRES + CERTIFS ======================= */}
      {/* Titre, chapô et libellés des chiffres repris de « La preuve par les chiffres ». */}
      <section className="section" id="preuve">
        <div className="wrap">
          <h2>Une expertise de terrain, pas une promesse</h2>
          <p className="lead" style={{ marginBottom: "26px" }}>Depuis 15 ans, du premier diagnostic au pilotage continu, portés par des experts seniors qui engagent leur résultat.</p>
          <div className="stats-wall">
            <div className="stat-box"><div className="num">+2 500</div><div className="lbl">jours-homme de RSSI externalisé</div></div>
            <div className="stat-box"><div className="num">15 ans</div><div className="lbl">d&apos;expertise</div></div>
            <div className="stat-box"><div className="num">+100</div><div className="lbl">entreprises sécurisées</div></div>
            <div className="stat-box"><div className="num">+86</div><div className="lbl">pentests au résultat garanti</div></div>
            <div className="stat-box"><div className="num">97%</div><div className="lbl">des vulnérabilités critiques détectées</div></div>
            <div className="stat-box"><div className="num">+105</div><div className="lbl">conformités ISO 27001 obtenues</div></div>
          </div>

          <div className="certs">
            <span className="cert highlight cert-featured"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Auditeur officiel AFNOR</span>
            <div className="cert-list">
              <span className="cert">{CHECK} ISO 27001 (AFAQ)</span>
              <span className="cert">{CHECK} ISO 27701</span>
              <span className="cert">{CHECK} RGPD (AFAQ)</span>
              <span className="cert">{CHECK} HDS (AFAQ)</span>
              <span className="cert">{CHECK} ISO 42001</span>
              <span className="cert">{CHECK} CISSP</span>
              <span className="cert">{CHECK} CISM</span>
              <span className="cert">{CHECK} CISA</span>
              <span className="cert">{CHECK} OSCP</span>
              <span className="cert">{CHECK} CEH</span>
              <span className="cert">{CHECK} PNPT</span>
              <span className="cert">{CHECK} EBIOS RM</span>
              <span className="cert">{CHECK} Lead Auditor / Implementer ISO 27001</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg> PASSI (en cours)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= INTERNE VS EXTERNALISÉ ======================= */}
      {/* Tableau repris ligne par ligne de « Externaliser ou recruter ? » (sans montant
          côté externalisé, la nouvelle home ne communiquant plus de TJM). */}
      <section className="section" id="comparatif">
        <div className="wrap">
          <h2>Externaliser ou recruter&nbsp;?</h2>
          <p className="lead">La même expertise, plus de flexibilité, à coût maîtrisé. Avant de lancer un recrutement à 80–120 k€ par an, comparez ce que change un RSSI externalisé.</p>

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
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Externalisé&nbsp;: </span>Vous ne payez que les jours réellement utiles</div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">Disponibilité de l&apos;expertise</span></div>
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
              <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Parler à un expert →</a>
              <p className="cmp-cta-note">Réponse sous 2h · 100% confidentiel</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= TARIF ======================= */}
      {/* La nouvelle home ne communique plus de montant : bloc « Un tarif clair,
          à la journée » repris mot pour mot, sans TJM affiché. */}
      <section className="section" id="prix">
        <div className="wrap">
          <h2>Un tarif clair, à la journée</h2>
          <p className="lead">Vous ne payez que les jours réellement utiles, et vous ajustez le volume mois après mois.</p>

          <div className="tjm">
            <div className="tjm-head">
              <div className="from">Tarification</div>
              <div className="amount amount-label">À la journée<span>Volume ajustable mois après mois</span></div>
              <p className="tjm-who">Un RSSI senior certifié, à temps partagé&nbsp;: de quelques jours par mois à plusieurs jours par semaine selon vos enjeux. Le volume exact est calé après l&apos;audit préliminaire — et ajusté mois après mois. Vous ne payez que les jours réellement utiles.</p>
            </div>
            <a href="https://calendly.com/expert-securitrust" className="btn btn-primary tjm-cta" target="_blank" rel="noopener noreferrer">Réserver un créneau →</a>
          </div>
        </div>
      </section>

      {/* ======================= CAS CLIENTS ======================= */}
      {/* Section propre à la LP : pas d'équivalent sur la nouvelle home, conservée. */}
      <section className="section" id="cas">
        <div className="wrap">
          <h2>Ce que ça donne concrètement, secteur par secteur</h2>
          <p className="lead">Des accompagnements réels, du pilotage RSSI au test d&apos;intrusion, pour des organisations de tous secteurs.</p>

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
                <p className="case-desc">RSSI externalisé à temps partagé et stratégie de cybersécurité d&apos;ensemble.</p>
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
                <p className="case-desc">Tests d&apos;intrusion (pentest) des systèmes et infrastructures.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================= CTA FINAL ======================= */}
      {/* Repris de « Passons à l'action » (garanties + coordonnées de la home). */}
      <section className="section" id="contact">
        <div className="wrap">
          <div className="finalcta">
            <div className="bg-glow"></div>
            <div className="finalcta-inner">
              <h2>Prenez rendez-vous avec un expert</h2>
              <p>Un senior vous rappelle sous 2h pour cadrer votre besoin. Sans engagement, 100% confidentiel.</p>
              <ul className="finalcta-points">
                <li>{CHECK} Réponse sous 2h ouvrées</li>
                <li>{CHECK} NDA signé dès le 1er échange</li>
                <li>{CHECK} Un intervenant senior, jamais un profil junior</li>
              </ul>
              <div className="finalcta-btns">
                <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Être rappelé sous 2h →</a>
              </div>
              <div className="finalcta-contact">
                <a href="tel:+33186044431">01 86 04 44 31</a>
                <span className="fc-sep">·</span>
                <span>11 Rue Saint-Didier, 75116 Paris</span>
                <span className="fc-sep">·</span>
                <span>Lun–Ven · 09:00–18:30</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= OBJECTIONS / FAQ ======================= */}
      {/* Section propre à la LP, conservée. Deux corrections de fond :
          - toute mention de montant retirée (aligné sur la nouvelle home) ;
          - « formules Premium et Entreprise » supprimé (ces formules n'existent
            plus depuis le passage au tarif journalier). */}
      <section className="section" id="faq">
        <div className="wrap">
          <h2>RSSI externalisé&nbsp;: les réponses aux questions des décideurs</h2>
          <p className="lead">Les décideurs nous posent toujours les mêmes questions. Voici nos réponses, sans détour.</p>

          <div className="faq">
            <details>
              <summary>Combien ça coûte vraiment&nbsp;?<span className="plus">+</span></summary>
              <p>Le RSSI externalisé SecuriTrust est facturé à la journée. Vous ne payez que les jours réellement utiles, et le volume s&apos;ajuste mois après mois selon vos priorités.</p>
              <p>Le nombre de jours exact dépend de votre taille, de votre exposition réglementaire et de vos enjeux&nbsp;: il est calé après l&apos;audit préliminaire, sans surprise. À comparer aux 80–120 k€/an d&apos;un RSSI interne à temps plein.</p>
            </details>
            <details>
              <summary>Quels sont les avantages d&apos;un RSSI externalisé&nbsp;?<span className="plus">+</span></summary>
              <p>Une expertise de haut niveau en cybersécurité immédiatement disponible, un budget cyber maîtrisé (vous ne payez que les jours utiles, face à un RSSI interne à 80–120 k€/an), zéro charge RH, une vision indépendante des enjeux internes, et une flexibilité totale. Vous accédez à un cabinet entier (audit, gestion de crise, conformité aux normes ISO), là où un salarié unique reste limité à son seul périmètre.</p>
            </details>
            <details>
              <summary>Quelles sont les missions d&apos;un RSSI externalisé&nbsp;?<span className="plus">+</span></summary>
              <p>Analyse des risques et remédiation, rédaction de la PSSI et mise en conformité (ISO 27001, RGPD, NIS2 DORA), coordination de la gestion de crise et des incidents, supervision des projets IT sensibles (cloud, SI métier), veille technologique et réglementaire, sensibilisation des équipes. Le RSSI externe pilote votre feuille de route sécurité et produit les tableaux de bord présentés à votre instance de gouvernance.</p>
            </details>
            <details>
              <summary>Pourquoi externaliser la fonction RSSI plutôt que recruter&nbsp;?<span className="plus">+</span></summary>
              <p>Parce qu&apos;un RSSI interne coûte 80 000 à 120 000 €/an, prend des mois à recruter et expose au turnover. L&apos;externalisation du RSSI vous donne la même séniorité immédiatement, à temps partagé, sans charge RH et avec une indépendance que n&apos;a pas un salarié soumis aux enjeux internes. Pour la plupart des PME et ETI, un RSSI à temps plein n&apos;est ni nécessaire ni rentable.</p>
            </details>
            <details>
              <summary>Qui intervient concrètement&nbsp;? Vos intervenants sont-ils vraiment seniors&nbsp;?<span className="plus">+</span></summary>
              <p>Vous n&apos;aurez jamais un profil junior seul en première ligne sur votre gouvernance. Votre mission est portée par un RSSI senior référent, qui cumule en moyenne 15 ans d&apos;expérience et s&apos;appuie sur l&apos;équipe du cabinet (auditeurs, pentesteurs, experts conformité).</p>
              <p>Nos consultants sont certifiés CISSP, CISM, CISA, OSCP, CEH, EBIOS RM, Lead Auditor et Lead Implementer ISO 27001 ; SecuriTrust est auditeur officiel AFNOR. Avant de signer, nous vous présentons nominativement l&apos;intervenant qui sera affecté à votre compte, avec son parcours et ses missions de référence, vous choisissez en connaissance de cause.</p>
            </details>
            <details>
              <summary>J&apos;ai déjà un responsable IT (ou un infogérant), comment travaillez-vous ensemble&nbsp;?<span className="plus">+</span></summary>
              <p>Le RSSI externalisé est un renfort, pas un doublon. Il porte la gouvernance, la stratégie et la conformité&nbsp;; votre responsable IT et votre infogérant gardent l&apos;exploitation et le run. Une matrice RACI claire répartit les responsabilités dès le cadrage, ce qui évite toute guerre de chapelle en cas d&apos;incident.</p>
              <p>Concrètement&nbsp;: nous montons votre équipe en compétence et donnons à votre responsable IT un cadre et un appui senior, sans jamais le court-circuiter. Beaucoup de nos clients conservent à la fois leur DSI interne et leur infogérant.</p>
            </details>
            <details>
              <summary>Comment garantissez-vous la confidentialité et l&apos;accès à notre SI&nbsp;?<span className="plus">+</span></summary>
              <p>La confidentialité est contractualisée (NDA) dès le premier échange. Les accès au système d&apos;information sont strictement limités au périmètre nécessaire, tracés et révocables. En tant que cabinet certifié ISO 27001 et HDS, nous appliquons à notre propre fonctionnement les exigences que nous déployons chez vous. Votre SI reste sous votre contrôle&nbsp;: nous le sécurisons, nous ne le détenons pas.</p>
            </details>
            <details>
              <summary>On peut le faire en interne, pourquoi vous&nbsp;?<span className="plus">+</span></summary>
              <p>Un responsable IT, ou même un lead dev senior, gère l&apos;exploitation des systèmes informatiques, rarement la gouvernance cyber formalisée, l&apos;analyse des risques, la conformité aux normes et la gestion de crise. C&apos;est d&apos;ailleurs souvent lors de l&apos;audit préliminaire que l&apos;on révèle des écarts qu&apos;une équipe technique, concentrée sur le run, ne pouvait pas voir. Le RSSI externe apporte cette expertise dédiée et un regard indépendant, sans mobiliser un temps plein.</p>
            </details>
            <details>
              <summary>Une cyber-assurance ne suffit-elle pas&nbsp;?<span className="plus">+</span></summary>
              <p>Non&nbsp;: une assurance indemnise après l&apos;incident, elle ne l&apos;empêche pas, et les assureurs exigent désormais un niveau de sécurité documenté pour couvrir, voire pour fixer la prime. Un RSSI externalisé réduit le risque en amont, prépare la gestion de crise et renforce votre dossier auprès de l&apos;assureur (ce qui peut alléger votre prime). La prévention et l&apos;assurance sont complémentaires, pas substituables.</p>
            </details>
            <details>
              <summary>Êtes-vous compatibles avec notre SI (cloud, on-premise, hybride)&nbsp;?<span className="plus">+</span></summary>
              <p>Oui. Nous intervenons sur des environnements cloud, on-premise et hybrides, y compris des SI industriels complexes (OT/IT) et multi-sites. Le RSSI externe commence toujours par un inventaire et une cartographie de votre socle technique réel, puis définit la gouvernance et supervise son application, sur vos outils, dans votre contexte, pas sur un modèle générique.</p>
            </details>
            <details>
              <summary>Qui porte la responsabilité juridique&nbsp;?<span className="plus">+</span></summary>
              <p>La responsabilité réglementaire de l&apos;entreprise (NIS2, RGPD, DORA) reste celle de sa direction, c&apos;est la loi, et personne ne peut s&apos;y substituer. En revanche, SecuriTrust s&apos;engage contractuellement par une obligation de moyens documentée et est couvert par une assurance responsabilité civile professionnelle (attestation sur demande). Le périmètre, les engagements et la répartition des responsabilités sont précisés au contrat, et nous vous en communiquons un extrait avant signature.</p>
            </details>
            <details>
              <summary>Quelle réactivité en cas d&apos;incident&nbsp;?<span className="plus">+</span></summary>
              <p>L&apos;astreinte senior 24/7 est incluse&nbsp;: en cas d&apos;incident, votre RSSI externe active la cellule de crise, avec un premier contact senior dans l&apos;heure, et coordonne la réponse, le PCA/PRA et la communication. Les délais garantis (SLA) sont contractualisés en fonction de votre niveau d&apos;exposition, dès le cadrage, pas après.</p>
            </details>
            <details>
              <summary>Intervenez-vous pour les collectivités et le secteur public&nbsp;?<span className="plus">+</span></summary>
              <p>Oui. Nous accompagnons des structures parapubliques et de l&apos;ESS (mutuelles, associations), et nous intervenons dans le cadre d&apos;un marché public (MAPA ou appel d&apos;offres). Le RSSI externe s&apos;intègre à votre instance de gouvernance (direction générale des services ou équivalent) et adapte le cadre budgétaire à vos crédits votés.</p>
            </details>
            <details>
              <summary>Comment choisir et évaluer un RSSI externalisé&nbsp;?<span className="plus">+</span></summary>
              <p>Vérifiez les certifications (ISO 27001, OSCP, CEH, EBIOS RM, qualité d&apos;auditeur AFNOR), l&apos;expérience réelle (jours-homme, nombre d&apos;entreprises sécurisées), la transparence tarifaire, la clarté des livrables (feuille de route, tableaux de bord, analyse des risques) et la capacité à siéger en comité de direction. Un bon RSSI externe se mesure à la lisibilité de son pilotage, pas à son discours.</p>
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
              <p>Cabinet de conseil en cybersécurité à Paris. Nous pilotons la sécurité des organisations à forts enjeux depuis 2016.</p>
              <div className="footer-contact">
                <span>11 Rue Saint-Didier, 75116 Paris</span>
                <a href="tel:+33186044431">01 86 04 44 31</a>
                <span>Lun–Ven · 09:00–18:30</span>
              </div>
            </div>
            <div className="footer-links">
              <a href="#offre">L&apos;offre</a>
              <a href="#process">La mission</a>
              <a href="#preuve">Nos preuves</a>
              <a href="#comparatif">Interne vs externe</a>
              <a href="#prix">Tarif</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-legal">
            © 2016–2026 SecuriTrust. Tous droits réservés. Vos données sont traitées de manière strictement confidentielle, conformément au RGPD, et utilisées uniquement pour répondre à votre demande. <a href="/mentions-legales" style={{ color: "var(--sky)" }}>Mentions légales</a> · <a href="/politique-de-confidentialite" style={{ color: "var(--sky)" }}>Confidentialité</a>
          </div>
        </div>
      </footer>

      {/* ======================= STICKY MOBILE CTA ======================= */}
      <div className="sticky-cta">
        <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Parler à un expert →</a>
      </div>
    </div>
  );
}
