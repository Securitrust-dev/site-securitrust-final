"use client";

import { useRef, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import "./lp.css";
import "./lp-v2.css";

/* ============================================================================
   BROUILLON — la page d'accueil securitrust.fr habillée du design de la LP.

   Le TEXTE est celui de la nouvelle home (public/index.html, commit d69ab38),
   repris mot pour mot et dans son ordre : headline, les 3 portes d'entrée,
   la preuve par les chiffres, Cyber-Pilote, RSSI externalisé, le déroulé de
   la mission, le comparatif, le tarif, le CTA final, le footer.

   Le DESIGN est celui de /rssi-externalise : lp.css est importé tel quel,
   aucune valeur graphique n'est modifiée. lp-v2.css n'ajoute que les
   composants que la LP n'avait pas (les 3 portes d'entrée, les grilles à
   6 blocs, le footer 3 colonnes, le consentement RGPD, le tarif sans montant).

   Arbitrage validé par Charles : la home ne communique plus aucun montant,
   le « à partir de 1 100 €/jour » ne figure donc nulle part.
   ============================================================================ */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const clientLogos = [
  { src: "/clients/white/cegedim.png", alt: "Cegedim" },
  { src: "/clients/white/malakoff.png", alt: "Malakoff Médéric" },
  { src: "/clients/white/lyvoc.png", alt: "Lyvoc" },
  { src: "/clients/white/thales.png", alt: "Thales" },
  { src: "/clients/white/natixis.png", alt: "Natixis" },
  { src: "/clients/white/munich-re.png", alt: "Munich Re" },
  { src: "/clients/white/backupta.png", alt: "BackupTa" },
  { src: "/clients/white/abeille-assurance.png", alt: "Abeille Assurance" },
  { src: "/clients/white/axa.png", alt: "AXA" },
  { src: "/clients/white/bollore.png", alt: "Bolloré Logistics" },
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

/* Icônes des 12 blocs d'offre (Cyber-Pilote + RSSI externalisé). */
const ICO = {
  pilotage: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>,
  gouvernance: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></svg>,
  audit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  conformite: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  crise: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  support: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
  rssi: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  pentest: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>,
  iso: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>,
  formation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
};

export default function HomeDesignLPPage() {
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
    // ⚠️ /api/contact ne lit que name/email/phone/company/subject/message/source :
    // le besoin choisi part donc dans `subject` (→ colonne Notion « Sujet & message »
    // + email de notification), sinon il serait silencieusement perdu. Et `source`
    // est normalisé par l'API en « LP RSSI » ou « Contact » (la colonne Notion Source
    // est un select) — d'où le rappel de l'origine dans le sujet.
    try {
      const fd = new FormData(form);
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          subject: `RSSI externalisé — besoin : ${fd.get("besoin") || "non précisé"}`,
          source: "LP RSSI",
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

              <p className="eyebrow">Cabinet de conseil en cybersécurité · Paris</p>

              {/* Headline de la home, mot pour mot. */}
              <h1>Reprendre le <span className="hl">contrôle</span> de votre sécurité.</h1>

              <p className="hero-sub">Un cabinet multi-certifié qui pilote la cybersécurité des organisations à forts enjeux depuis 2016. Choisissez votre porte d&apos;entrée — le résultat, on l&apos;engage.</p>

              {/* Les 3 preuves du hero de la home. */}
              <div className="hero-trust">
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  <span className="ht-txt"><b>+100</b> entreprises sécurisées</span>
                </div>
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  <span className="ht-txt"><b>15 ans</b> d&apos;expertise</span>
                </div>
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                  <span className="ht-txt">Équipe <b>multi-certifiée</b></span>
                </div>
              </div>
            </div>

            {/* COLONNE DROITE : FORMULAIRE (le design de la LP le place ici) */}
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
                    <label htmlFor="f-phone">Téléphone <span className="opt">(facultatif)</span></label>
                    <input type="tel" id="f-phone" name="phone" placeholder="06 12 34 56 78" autoComplete="tel" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-besoin">Votre besoin</label>
                    <select id="f-besoin" name="besoin" defaultValue="" required>
                      <option value="" disabled>Sélectionnez votre besoin…</option>
                      <option>Pentest au résultat</option>
                      <option>RSSI externalisé (Cyber-Pilote)</option>
                      <option>Conformité &amp; audit</option>
                      <option>Autre / je ne sais pas encore</option>
                    </select>
                  </div>

                  <div className="field-consent">
                    <input type="checkbox" id="f-consent" name="consent" required />
                    <label htmlFor="f-consent">J&apos;accepte que SecuriTrust utilise ces informations pour me recontacter dans le cadre de ma demande. Aucun transfert à des tiers.</label>
                  </div>

                  <button type="submit" className="btn btn-primary">Être rappelé sous 2h →</button>
                  <p className="micro"><b>Réponse sous 2h</b> · <b>NDA dès le 1er échange</b></p>

                  <p className="rgpd-notice">Les données collectées via ce formulaire sont traitées par SecuriTrust en qualité de responsable de traitement, sur la base de votre consentement, aux fins exclusives de traiter votre demande de contact. Elles sont conservées 24 mois puis supprimées. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition sur vos données — exerçables à <a href="mailto:dpo@securitrust.fr">dpo@securitrust.fr</a>. En savoir plus : <a href="/politique-de-confidentialite">politique de confidentialité</a>.</p>
                </form>

                <div className={showSuccess ? "form-success show" : "form-success"} id="form-success" role="status" aria-live="polite">
                  <div className="ok-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>
                  <h3>Merci, c&apos;est bien reçu.</h3>
                  <p>Un senior vous rappelle sous 2h pour cadrer votre besoin. Vous ne voulez pas attendre&nbsp;? Réservez votre créneau dès maintenant.</p>
                  <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: "18px" }}>Réserver un créneau →</a>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </header>

      {/* ======================= LES 3 PORTES D'ENTRÉE ======================= */}
      <section className="section" id="offres">
        <div className="wrap">
          <div className="offers">

            <div className="offer">
              <span className="offer-tag">Sécurité offensive</span>
              <h3>Pentest au résultat</h3>
              <p>Aucune vulnérabilité détectée&nbsp;? <b>Votre pentest est entièrement remboursé.</b></p>
              <ul className="offer-list">
                <li>{CHECK} Tests d&apos;intrusion réalistes</li>
                <li>{CHECK} Rapport exploitable</li>
                <li>{CHECK} Garantie de résultat</li>
              </ul>
              <a href="https://calendly.com/expert-securitrust" className="btn btn-secondary offer-cta" target="_blank" rel="noopener noreferrer">Commencer →</a>
            </div>

            <div className="offer offer-lead">
              <span className="offer-tag">Expertise complète</span>
              <h3>RSSI externalisé</h3>
              <p>Pilotage complet, sans charge RH interne. Continuité garantie, zéro turnover.</p>
              <ul className="offer-list">
                <li>{CHECK} Audit &amp; conformité</li>
                <li>{CHECK} Monitoring 24/7</li>
                <li>{CHECK} Gestion de crise</li>
              </ul>
              <a href="#rssi-externalise" className="btn btn-primary offer-cta">En savoir plus →</a>
            </div>

            <div className="offer">
              <span className="offer-tag">Pilotage stratégique</span>
              <h3>Cyber-Pilote</h3>
              <p>Un RSSI expert dédié, à temps partagé, pilote votre stratégie sécurité.</p>
              <ul className="offer-list">
                <li>{CHECK} Expert senior intégré</li>
                <li>{CHECK} Reporting COMEX continu</li>
                <li>{CHECK} Volume ajustable mois après mois</li>
              </ul>
              <a href="#cyber-pilote" className="btn btn-secondary offer-cta">En savoir plus →</a>
            </div>

          </div>
        </div>
      </section>

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

      {/* ======================= LA PREUVE PAR LES CHIFFRES ======================= */}
      <section className="section" id="preuves">
        <div className="wrap">
          <p className="eyebrow">La preuve par les chiffres</p>
          <h2>Une expertise de terrain, pas une promesse.</h2>
          <p className="lead" style={{ marginBottom: "26px" }}>Depuis 15 ans, du premier diagnostic au pilotage continu, portés par des experts seniors qui engagent leur résultat.</p>

          <div className="stats-wall">
            <div className="stat-box"><div className="num">+86</div><div className="lbl">pentests au résultat garanti</div></div>
            <div className="stat-box"><div className="num">97%</div><div className="lbl">des vulnérabilités critiques détectées</div></div>
            <div className="stat-box"><div className="num">+105</div><div className="lbl">conformités ISO 27001 obtenues</div></div>
            <div className="stat-box"><div className="num">+100</div><div className="lbl">entreprises sécurisées</div></div>
            <div className="stat-box"><div className="num">+2 500</div><div className="lbl">jours-homme de RSSI externalisé</div></div>
            <div className="stat-box"><div className="num">15 ans</div><div className="lbl">d&apos;expertise</div></div>
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

      {/* ======================= CYBER-PILOTE ======================= */}
      <section className="section" id="cyber-pilote">
        <div className="wrap">
          <p className="eyebrow">Cyber-Pilote</p>
          <h2>Un RSSI expert pilote votre stratégie sécurité.</h2>
          <p className="lead">La solution clé en main&nbsp;: un RSSI senior certifié CISSP/CISM, dédié à votre organisation, de quelques jours par mois à plusieurs jours par semaine selon vos enjeux.</p>

          <div className="feat-grid">
            <div className="feat-card">
              <div className="feat-ico">{ICO.pilotage}</div>
              <h3>Pilotage stratégique RSSI</h3>
              <p>Un expert senior dédié qui pilote votre sécurité à temps partagé&nbsp;: décisions, arbitrages, reporting COMEX. Disponibilité immédiate, sans délai de recrutement.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.gouvernance}</div>
              <h3>Gouvernance SSI</h3>
              <p>Politiques de sécurité alignées sur vos enjeux métier&nbsp;: cadre clair, responsabilités définies, escalade et prise de décision tracées.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.audit}</div>
              <h3>Audit &amp; roadmap</h3>
              <p>État des lieux complet, analyse de risques EBIOS&nbsp;RM, feuille de route sécurité priorisée selon vos enjeux métier.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.conformite}</div>
              <h3>Pilotage conformité</h3>
              <p>NIS2, ISO&nbsp;27001, DORA, RGPD&nbsp;: accompagnement de l&apos;audit à la certification, audit annuel, mise à jour continue.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.crise}</div>
              <h3>Gestion de crise 24/7</h3>
              <p>Cellule de crise activable, PCA/PRA testés, astreinte senior 24/7. Vous savez qui appeler et quoi faire en cas d&apos;incident.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.support}</div>
              <h3>Support technique</h3>
              <p>Appui opérationnel dans l&apos;implémentation des mesures, intégration à votre équipe IT, liaison avec vos partenaires et prestataires.</p>
            </div>
          </div>

          <div className="cmp-cta">
            <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">En savoir plus sur Cyber-Pilote →</a>
          </div>
        </div>
      </section>

      {/* ======================= RSSI EXTERNALISÉ ======================= */}
      <section className="section" id="rssi-externalise">
        <div className="wrap">
          <p className="eyebrow">RSSI externalisé</p>
          <h2>Expertise senior, sans charge RH interne.</h2>
          <p className="lead">Nos RSSI certifiés prennent en charge le pilotage complet de votre sécurité, de l&apos;audit à la conformité, du monitoring continu à la gestion de crise — avec continuité garantie, zéro turnover.</p>

          <div className="feat-grid">
            <div className="feat-card">
              <div className="feat-ico">{ICO.rssi}</div>
              <h3>RSSI externalisé</h3>
              <p>Pilotage stratégique et opérationnel par un expert dédié&nbsp;: décisions, arbitrages, reporting COMEX. Vous gardez le cap, nous tenons la barre.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.pentest}</div>
              <h3>Audits &amp; Pentests</h3>
              <p>Tests d&apos;intrusion réalistes au résultat garanti&nbsp;: nous ne facturons que les vulnérabilités que nous prouvons. Vision offensive de votre exposition réelle.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.conformite}</div>
              <h3>Conformité NIS2, DORA, RGPD</h3>
              <p>Conformité documentée et pilotée — pas un classeur qui prend la poussière. ISO&nbsp;27001, HDS, en lien avec votre DPO. De quoi rassurer assureurs et donneurs d&apos;ordre.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.gouvernance}</div>
              <h3>Gouvernance SSI</h3>
              <p>Politiques de sécurité alignées sur vos enjeux métier et vos obligations&nbsp;: cadre clair, responsabilités définies, décisions traçables.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.iso}</div>
              <h3>ISO 27001 &amp; 27701</h3>
              <p>De la préparation à la certification, méthodologie rigoureuse et délais tenus. +105 conformités obtenues&nbsp;: certification devient argument commercial.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.formation}</div>
              <h3>Sensibilisation &amp; Formations</h3>
              <p>Simulations de phishing et entraînement des équipes&nbsp;: vos collaborateurs deviennent le premier rempart, plus la première faille.</p>
            </div>
          </div>

          <div className="cmp-cta">
            <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">En savoir plus sur RSSI externalisé →</a>
          </div>
        </div>
      </section>

      {/* ======================= LE DÉROULÉ DE LA MISSION ======================= */}
      <section className="section" id="mission">
        <div className="wrap">
          <p className="eyebrow">Le déroulé de la mission</p>
          <h2>Une montée en sécurité progressive, mois après mois.</h2>
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
        </div>
      </section>

      {/* ======================= EXTERNALISER OU RECRUTER ======================= */}
      <section className="section" id="comparatif">
        <div className="wrap">
          <p className="eyebrow">Externaliser ou recruter&nbsp;?</p>
          <h2>La même expertise, plus de flexibilité, à coût maîtrisé.</h2>
          <p className="lead">Avant de lancer un recrutement à 80–120 k€ par an, comparez ce que change un RSSI externalisé.</p>

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
          </div>
        </div>
      </section>

      {/* ======================= TARIF ======================= */}
      {/* La home ne communique plus de montant. */}
      <section className="section" id="tarif">
        <div className="wrap">
          <h2>Un tarif clair, à la journée</h2>

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

      {/* ======================= CTA FINAL ======================= */}
      <section className="section" id="contact">
        <div className="wrap">
          <div className="finalcta">
            <div className="bg-glow"></div>
            <div className="finalcta-inner">
              <p className="eyebrow" style={{ justifyContent: "center" }}>Passons à l&apos;action</p>
              <h2>Prenez rendez-vous avec un expert.</h2>
              <p>Que vous visiez un pentest au résultat ou un RSSI externalisé, un senior vous rappelle sous 2h pour cadrer votre besoin. Sans engagement, 100% confidentiel.</p>
              <ul className="finalcta-points">
                <li>{CHECK} Réponse sous 2h ouvrées</li>
                <li>{CHECK} NDA signé dès le 1er échange</li>
                <li>{CHECK} Un intervenant senior, jamais un profil junior</li>
              </ul>
              <div className="finalcta-btns">
                <a href="#form-anchor" className="btn btn-primary">Être rappelé sous 2h →</a>
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

      {/* ======================= FOOTER ======================= */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="brandbar" style={{ marginBottom: "10px" }}>
                <img className="brand-logo" src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769766433152.png?width=400&resize=contain" alt="SecuriTrust" width={180} height={37} />
              </div>
              <p>Cabinet de conseil en cybersécurité à Paris. Nous pilotons la sécurité des organisations à forts enjeux depuis 2016.</p>
            </div>

            <div className="footer-cols">
              <div className="footer-col">
                <h4>Expertise</h4>
                <a href="#cyber-pilote">Cyber-Pilote</a>
                <a href="#rssi-externalise">RSSI externalisé</a>
                <a href="#rssi-externalise">Audits &amp; Pentests</a>
                <a href="#rssi-externalise">Conformité NIS2 / DORA</a>
                <a href="#rssi-externalise">ISO 27001 &amp; 27701</a>
              </div>
              <div className="footer-col">
                <h4>Cabinet</h4>
                <a href="#preuves">Nos preuves</a>
                <a href="#mission">La mission</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <span>11 Rue Saint-Didier</span>
                <span>75116 Paris</span>
                <a className="fc-strong" href="tel:+33186044431">01 86 04 44 31</a>
                <span>Lun–Ven · 09:00–18:30</span>
              </div>
            </div>
          </div>

          <div className="footer-legal">
            © 2016–2026 SecuriTrust. Tous droits réservés. <a href="/mentions-legales" style={{ color: "var(--sky)" }}>Mentions légales</a> · <a href="/politique-de-confidentialite" style={{ color: "var(--sky)" }}>Confidentialité</a>
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
