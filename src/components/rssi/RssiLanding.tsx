"use client";

/* ============================================================================
   Page RSSI externalisé — composant partagé entre :
   - /rssi-externalise          (variant "seo") : page de référence, indexée ;
   - /lp/rssi-externalise       (variant "ads") : page d'atterrissage Google Ads,
                                  noindex, sans le guide long.

   Refonte du 2 novembre 2026. Le contenu parle uniquement du RSSI externalisé
   (l'ancienne version reprenait le texte de la page d'accueil : portes d'entrée
   pentest, compteur pentests…, ce qui diluait le sujet pour Google et dégradait
   le niveau de qualité des annonces).

   Tarif : 850 € HT par jour affiché sur la page SEO uniquement (décision de la
   direction du 9 novembre 2026, qui remplace l'arbitrage « pas de TJM affiché ») ;
   la LP Google Ads (variant "ads") reste sans montant. Cas clients sans prix, dates
   ni nombre de jours.
   ============================================================================ */

import { useRef, useState, type ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import "@/app/rssi-externalise/lp.css";
import "@/app/rssi-externalise/lp-v2.css";
import "@/app/rssi-externalise/lp-v3.css";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { trackLead, trackLeadError } from "@/lib/analytics";
import { Captcha, captchaToken } from "@/components/brand/Captcha";
import { isProEmail, PRO_EMAIL_MESSAGE } from "@/lib/email-pro";
import { logoDims } from "@/content/logo-dims";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const CALENDLY = "https://calendly.com/expert-securitrust";

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

/** Résumé d'un cas client RSSI, calculé côté serveur (évite d'embarquer tous les cas dans le JS). */
export type CasResume = { slug: string; client: string; activite: string; mission: string; referentiels: string[]; chapeau: string };


const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg>
);

const ICO = {
  gouvernance: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></svg>,
  conformite: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  risques: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  tiers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  formation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
  crise: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
};

type Props = {
  /** "seo" : page indexée /rssi-externalise. "ads" : LP Google Ads (noindex). */
  variant: "seo" | "ads";
  /** Cas clients RSSI affichés (voir CAS_RSSI dans src/content/cas-clients-rssi.ts). */
  cas: CasResume[];
  /** Contenu inséré avant l'appel à l'action final (guide pilier + FAQ sur la page SEO). */
  children?: ReactNode;
};

export function RssiLanding({ variant, cas, children }: Props) {
  const isAds = variant === "ads";
  const formId = isAds ? "rssi_rappel_ads" : "rssi_rappel";
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const emailInput = form.querySelector<HTMLInputElement>("#f-email");
    if (emailInput) {
      // Adresses non professionnelles bloquées avant envoi (contrôle refait côté serveur).
      const value = emailInput.value.trim();
      emailInput.setCustomValidity(value && !isProEmail(value) ? PRO_EMAIL_MESSAGE : "");
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // /api/contact ne lit que name/email/phone/company/subject/message/source : le besoin
    // part dans `subject` (e-mail + Notion). `source` reste « LP RSSI » (select Notion) ;
    // l'origine exacte (page SEO ou annonces) est rappelée dans le sujet.
    const fd = new FormData(form);
    const besoin = String(fd.get("besoin") || "non précisé");
    setSending(true);
    setSendError(false);
    const turnstileToken = await captchaToken(form);
    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("company"),
          subject: `RSSI externalisé${isAds ? " (annonce Google Ads)" : ""} — besoin : ${besoin}`,
          source: "LP RSSI",
          page: isAds ? "/lp/rssi-externalise" : "/rssi-externalise",
          turnstileToken,
        }),
      });
    } catch {
      res = new Response(null, { status: 599 });
    }
    setSending(false);
    if (!res.ok) {
      trackLeadError(formId, res.status === 599 ? "network" : `http_${res.status}`);
      setSendError(true);
      setCaptchaReset((n) => n + 1);
      return;
    }
    let leadId: string | undefined;
    try {
      leadId = (await res.json())?.leadId;
    } catch {
      /* réponse sans corps JSON : pas d'identifiant de lead */
    }
    trackLead(formId, besoin, {
      leadId,
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
    });

    setShowSuccess(true);
    requestAnimationFrame(() => {
      document.getElementById("form-success")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <>
      <SiteHeader position="sticky" />
      <div id="lp-root" className={`lp-root ${spaceGrotesk.variable}`}>
        {/* ======================= HERO ======================= */}
        <header className="hero">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-left">
                <p className="eyebrow">RSSI à temps partagé · PME et ETI · Paris</p>

                {isAds ? (
                  <h1>RSSI externalisé&nbsp;: un expert <span className="hl">senior</span> à vos côtés, sans recruter.</h1>
                ) : (
                  <h1>RSSI externalisé à <span className="hl">temps partagé</span> pour PME et ETI</h1>
                )}

                <p className="hero-sub">
                  Un RSSI senior certifié pilote votre cybersécurité et votre conformité (NIS2, ISO&nbsp;27001, DORA)
                  quelques jours par mois, selon vos besoins réels. Sans recrutement, sans charge RH, avec la
                  continuité d&apos;un cabinet.
                </p>

                <div className="hero-trust">
                  <div className="ht-item">
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                    <span className="ht-txt"><b>+2 500</b> jours-homme de RSSI externalisé</span>
                  </div>
                  <div className="ht-item">
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                    <span className="ht-txt">Cabinet <b>certifié ISO&nbsp;27001</b></span>
                  </div>
                  <div className="ht-item">
                    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                    <span className="ht-txt"><b>10 ans</b> d&apos;expertise</span>
                  </div>
                </div>
              </div>

              <aside>
                <div className="formcard" id="form-anchor">
                  <form id="callback-form" data-lead-form={formId} noValidate ref={formRef} onSubmit={handleSubmit} style={showSuccess ? { display: "none" } : undefined}>
                    <p className="form-title">Être rappelé sous 2h</p>
                    <p className="form-sub">Un RSSI senior vous rappelle pour cadrer votre besoin.</p>

                    <div className="field">
                      <label htmlFor="f-name">Nom et prénom</label>
                      <input type="text" id="f-name" name="name" placeholder="Votre nom et prénom" required autoComplete="name" />
                    </div>
                    <div className="field">
                      <label htmlFor="f-email">Email professionnel</label>
                      <input type="email" id="f-email" name="email" placeholder="prenom@entreprise.fr" required autoComplete="email" />
                    </div>
                    <div className="field">
                      <label htmlFor="f-company">Entreprise <span className="opt">(facultatif)</span></label>
                      <input type="text" id="f-company" name="company" placeholder="Nom de votre entreprise" autoComplete="organization" />
                    </div>
                    <div className="field">
                      <label htmlFor="f-phone">Téléphone <span className="opt">(facultatif)</span></label>
                      <input type="tel" id="f-phone" name="phone" placeholder="06 12 34 56 78" autoComplete="tel" />
                    </div>
                    <div className="field">
                      <label htmlFor="f-besoin">Votre besoin</label>
                      <select id="f-besoin" name="besoin" defaultValue="RSSI externalisé à temps partagé" required>
                        <option>RSSI externalisé à temps partagé</option>
                        <option>Remplacer un RSSI (départ, absence)</option>
                        <option>Piloter une conformité NIS2, DORA ou ISO 27001</option>
                        <option>Autre / je ne sais pas encore</option>
                      </select>
                    </div>


                    <Captcha resetKey={captchaReset} />
                    <button type="submit" className="btn btn-primary" disabled={sending}>{sending ? "Envoi en cours…" : "Être rappelé sous 2h →"}</button>
                    {sendError && (
                      <p className="micro" role="alert" style={{ color: "#ffd2b0" }}>
                        L&apos;envoi n&apos;a pas abouti, votre saisie est conservée. Réessayez, ou appelez-nous au{" "}
                        <a href="tel:+33186044431" style={{ color: "inherit", textDecoration: "underline" }}>01 86 04 44 31</a>{" "}
                        ou écrivez à{" "}
                        <a href="mailto:expertise@securitrust.fr" style={{ color: "inherit", textDecoration: "underline" }}>expertise@securitrust.fr</a>.
                      </p>
                    )}
                    <p className="micro"><b>Réponse sous 2h</b> · <b>NDA dès le 1er échange</b></p>

                    <p className="rgpd-notice">Les données collectées via ce formulaire sont traitées par SecuriTrust en qualité de responsable de traitement, pour répondre à votre demande de contact (mesures précontractuelles prises à votre demande, art. 6.1.b du RGPD). Aucun transfert à des tiers. Elles sont conservées 24 mois puis supprimées. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition sur vos données — exerçables à <a href="mailto:dpo@securitrust.fr">dpo@securitrust.fr</a>. En savoir plus : <a href="/politique-de-confidentialite">politique de confidentialité</a>.</p>
                  </form>

                  <div className={showSuccess ? "form-success show" : "form-success"} id="form-success" role="status" aria-live="polite">
                    <div className="ok-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>
                    <p className="form-title">Merci, c&apos;est bien reçu.</p>
                    <p>Un RSSI senior vous rappelle sous 2h pour cadrer votre besoin. Vous ne voulez pas attendre&nbsp;? Réservez votre créneau dès maintenant.</p>
                    <a href={CALENDLY} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: "18px" }}>Réserver un créneau →</a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </header>

        {/* ======================= LOGOS ======================= */}
        <section className="trustband" aria-label="Clients">
          <div className="wrap">
            <p className="label">Ils nous font confiance</p>
            <div className="logo-marquee">
              <div className="logo-track">
                {[...clientLogos, ...clientLogos].map((logo, i) => (
                  <div className="logo-item" key={i}>
                    <img className="logo-img" src={logo.src} {...logoDims(logo.src)} alt={i < clientLogos.length ? logo.alt : ""} loading="lazy" aria-hidden={i >= clientLogos.length} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================= DÉFINITION ======================= */}
        <section className="section" id="definition">
          <div className="wrap">
            <p className="eyebrow">Définition</p>
            <h2>Qu&apos;est-ce qu&apos;un RSSI externalisé&nbsp;?</h2>
            <div className="def-box">
              <p>
                Un <strong>RSSI externalisé</strong> est un responsable de la sécurité des systèmes d&apos;information
                mis à disposition par un cabinet spécialisé, à <strong>temps partagé</strong>. Il tient le même rôle
                qu&apos;un RSSI salarié (stratégie de sécurité, gestion des risques, conformité, gestion de crise),
                quelques jours par mois, sans recrutement ni charge salariale.
              </p>
              <p>
                On parle aussi de <strong>RSSI à temps partagé</strong>, de RSSI externe ou de <strong>vCISO</strong> (CISO virtuel). C&apos;est une mission de pilotage dans la durée, pas un audit ponctuel&nbsp;: le RSSI
                externalisé représente l&apos;entreprise face à sa direction, à ses clients, à ses auditeurs et aux autorités.
              </p>
            </div>
            <div className="def-keys">
              <div className="def-key"><b>Pour qui&nbsp;?</b><span>PME et ETI sans RSSI, entreprises soumises à NIS2 ou DORA, organisations qui visent ISO&nbsp;27001 ou HDS.</span></div>
              <div className="def-key"><b>Quel rythme&nbsp;?</b><span>De quelques jours par mois à plusieurs jours par semaine, ajusté selon la phase et vos priorités.</span></div>
              <div className="def-key"><b>Quel engagement&nbsp;?</b><span>Un expert senior dédié, adossé à un cabinet&nbsp;: relais en cas d&apos;absence et continuité garantie.</span></div>
            </div>
          </div>
        </section>

        {/* ======================= MISSIONS ======================= */}
        <section className="section" id="missions">
          <div className="wrap">
            <p className="eyebrow">Missions</p>
            <h2>Les missions d&apos;un RSSI à temps partagé</h2>
            <p className="lead">Le périmètre se dimensionne selon vos enjeux. Dans la plupart des missions, votre RSSI externalisé prend en charge&nbsp;:</p>

            <div className="feat-grid">
              <div className="feat-card">
                <div className="feat-ico">{ICO.gouvernance}</div>
                <h3>Gouvernance et stratégie de sécurité</h3>
                <p>Politique de sécurité (PSSI), feuille de route pluriannuelle, arbitrages budgétaires et reporting au comité de direction. Voir notre approche de la <a href="/gouvernance-conformite">gouvernance et conformité</a>.</p>
              </div>
              <div className="feat-card">
                <div className="feat-ico">{ICO.conformite}</div>
                <h3>Pilotage de la conformité</h3>
                <p>Démarches <a href="/nis2">NIS2</a>, <a href="/dora">DORA</a>, <a href="/iso27001">ISO&nbsp;27001</a>, HDS et RGPD&nbsp;: plan d&apos;action, preuves documentées, préparation et suivi des audits.</p>
              </div>
              <div className="feat-card">
                <div className="feat-ico">{ICO.risques}</div>
                <h3>Analyse et gestion des risques</h3>
                <p>Cartographie des risques cyber avec la méthode <a href="/ebios-rm">EBIOS Risk Manager</a>, plan de traitement validé par la direction, revue périodique.</p>
              </div>
              <div className="feat-card">
                <div className="feat-ico">{ICO.tiers}</div>
                <h3>Sécurité des tiers et réponses clients</h3>
                <p>Évaluation des fournisseurs, clauses de sécurité des contrats, réponses aux questionnaires sécurité de vos clients et aux appels d&apos;offres.</p>
              </div>
              <div className="feat-card">
                <div className="feat-ico">{ICO.formation}</div>
                <h3>Sensibilisation des équipes</h3>
                <p>Campagnes de <a href="/sensibilisation-formation">sensibilisation et simulations de phishing</a>, formation de la direction à ses responsabilités cyber.</p>
              </div>
              <div className="feat-card">
                <div className="feat-ico">{ICO.crise}</div>
                <h3>Gestion des incidents et de crise</h3>
                <p>Plan de réponse, exercices de crise, coordination des intervenants pendant un incident et notification aux autorités dans les délais réglementaires.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= CAS CLIENTS ======================= */}
        <section className="section" id="cas-clients">
          <div className="wrap">
            <p className="eyebrow">Cas clients</p>
            <h2>Ils ont confié leur fonction RSSI à SecuriTrust</h2>
            <p className="lead">Des organisations aux enjeux différents, un même besoin&nbsp;: un pilotage senior de la sécurité, dans la durée.</p>
            <div className="cases-grid">
              {cas.map((c) => (
                <a className="case-card" href={`/cas-clients/${c.slug}`} key={c.slug}>
                  <span className="case-meta">{c.activite} · {c.referentiels.join(" · ")}</span>
                  <h3>{c.client}&nbsp;: {c.mission}</h3>
                  <p>{c.chapeau}</p>
                  <span className="case-more">Lire le cas client →</span>
                </a>
              ))}
            </div>
            <p className="cases-all"><a href="/cas-clients">Voir tous nos cas clients →</a></p>
          </div>
        </section>

        {/* ======================= PREUVES ======================= */}
        <section className="section" id="preuves">
          <div className="wrap">
            <p className="eyebrow">Expertise</p>
            <h2>Un cabinet certifié ISO&nbsp;27001 derrière votre RSSI</h2>
            <p className="lead" style={{ marginBottom: "26px" }}>Depuis 2016, nos RSSI seniors pilotent la sécurité d&apos;organisations à forts enjeux, du premier diagnostic au maintien de la conformité.{!isAds && <> Chaque RSSI justifie de <strong>plus de 5&nbsp;ans d&apos;expérience</strong> et cumule plusieurs certifications reconnues.</>}</p>

            <div className="stats-wall">
              <div className="stat-box"><div className="num">+2 500</div><div className="lbl">jours-homme de RSSI externalisé</div></div>
              <div className="stat-box"><div className="num">+100</div><div className="lbl">accompagnements ISO 27001</div></div>
              <div className="stat-box"><div className="num">+100</div><div className="lbl">entreprises accompagnées</div></div>
            </div>

            <div className="certs">
              <span className="cert highlight cert-featured"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Auditeur officiel AFNOR</span>
              <div className="cert-list">
                <span className="cert">{CHECK} Cabinet certifié ISO 27001 (AFAQ)</span>
                <span className="cert">{CHECK} CISSP</span>
                <span className="cert">{CHECK} CISM</span>
                <span className="cert">{CHECK} CISA</span>
                <span className="cert">{CHECK} Lead Auditor / Implementer ISO 27001</span>
                <span className="cert">{CHECK} EBIOS RM</span>
                <span className="cert">{CHECK} ISO 27701</span>
                <span className="cert">{CHECK} ISO 42001</span>
                <span className="cert">{CHECK} RGPD et HDS (AFAQ)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= COMPARATIF ======================= */}
        <section className="section" id="comparatif">
          <div className="wrap">
            <p className="eyebrow">Externaliser ou recruter&nbsp;?</p>
            <h2>RSSI externalisé ou RSSI interne&nbsp;: le comparatif</h2>
            <p className="lead">Avant de lancer un recrutement à 80&nbsp;000–120&nbsp;000&nbsp;€ chargés par an, comparez ce que change un RSSI externalisé.</p>

            <div className="cmp">
              <div className="cmp-grid" role="table" aria-label="Comparatif RSSI interne et RSSI externalisé">
                <div className="cmp-row cmp-head" role="row">
                  <div className="cmp-crit" role="columnheader">Critère</div>
                  <div className="cmp-int" role="columnheader"><span className="cmp-th">RSSI interne</span></div>
                  <div className="cmp-ext" role="columnheader"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg><span className="cmp-th">RSSI externalisé</span></div>
                </div>
                {[
                  ["Coût", "80 000 à 120 000 €/an chargé, à temps plein", isAds ? "Uniquement les jours réellement utiles" : "850 € HT par jour, uniquement les jours réellement utiles"],
                  ["Délai de démarrage", "Plusieurs mois de recrutement", "Expertise senior immédiate"],
                  ["Charge RH et turnover", "Recrutement, management, risque de départ", "Aucune charge RH, continuité garantie"],
                  ["Absences", "Poste vacant pendant les congés ou après un départ", "Relais assuré par le cabinet"],
                  ["Compétences", "Une personne, un périmètre limité", "Un cabinet : conformité, risques, technique, juridique"],
                  ["Regard", "Interne, pris dans les habitudes", "Indépendant, nourri de plusieurs organisations"],
                ].map(([crit, int, ext]) => (
                  <div className="cmp-row" role="row" key={crit}>
                    <div className="cmp-crit" role="rowheader"><span className="cmp-ct">{crit}</span></div>
                    <div className="cmp-int" role="cell"><span className="x">✕</span><span className="cmp-lbl">Interne&nbsp;: </span>{int}</div>
                    <div className="cmp-ext" role="cell"><span className="v">✓</span><span className="cmp-lbl">Externalisé&nbsp;: </span>{ext}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================= PRIX ======================= */}
        {/* Tarif journalier affiché sur la page SEO (décision de la direction du 9/11/2026) ; LP Ads sans montant. */}
        <section className="section" id="prix">
          <div className="wrap">
            <p className="eyebrow">Prix et tarif</p>
            <h2>Combien coûte un RSSI externalisé&nbsp;?</h2>
            {!isAds && (
              <div className="cost-rate" style={{ border: "1px solid rgba(34,211,238,.35)", borderRadius: 14, padding: "22px 24px", margin: "0 0 22px", background: "rgba(34,211,238,.06)" }}>
                <p style={{ margin: 0, fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", opacity: .8 }}>Tarif journalier</p>
                <p style={{ margin: "6px 0 8px", fontSize: "clamp(30px, 6vw, 42px)", fontWeight: 700, lineHeight: 1.1 }}>850&nbsp;€&nbsp;HT <span style={{ fontSize: ".5em", fontWeight: 500 }}>par jour</span></p>
                <p style={{ margin: 0 }}>Un RSSI senior, <strong>plus de 5&nbsp;ans d&apos;expérience</strong>, <a href="#preuves">multi-certifié</a>. Vous ne payez que les jours d&apos;intervention.</p>
              </div>
            )}
            <p className="lead">
              Le prix d&apos;un RSSI externalisé dépend du <strong>nombre de jours d&apos;intervention par mois</strong>,
              {isAds ? <> facturés au tarif journalier d&apos;un consultant senior.</> : <> facturés 850&nbsp;€&nbsp;HT par jour.</>} Vous ne payez que le temps utile&nbsp;: le volume
              est fixé après un premier diagnostic, puis ajusté mois après mois. Quatre critères déterminent ce volume&nbsp;:
            </p>
            <div className="cost-grid">
              <div className="cost-item"><h3>Taille et complexité du système d&apos;information</h3><p>Nombre de sites, d&apos;applications métier, de prestataires et d&apos;environnements cloud à couvrir.</p></div>
              <div className="cost-item"><h3>Obligations réglementaires</h3><p>NIS2, DORA, HDS ou une certification ISO 27001 visée augmentent le besoin de pilotage et de preuves.</p></div>
              <div className="cost-item"><h3>Maturité de départ</h3><p>Une organisation sans politique de sécurité ni analyse de risques demande plus de temps la première année.</p></div>
              <div className="cost-item"><h3>Phase de la mission</h3><p>Plus soutenue au démarrage ou avant un audit de certification, allégée en rythme de croisière.</p></div>
            </div>
            <p className="cost-note">Dans tous les cas, le budget annuel reste très inférieur au coût d&apos;un RSSI salarié à temps plein, sans les délais ni les risques d&apos;un recrutement.</p>
            <div className="cost-cta"><a href="#form-anchor" className="btn btn-primary">Obtenir une estimation pour votre entreprise →</a></div>
          </div>
        </section>

        {/* ======================= DÉROULÉ ======================= */}
        <section className="section" id="deroule">
          <div className="wrap">
            <p className="eyebrow">Déroulé</p>
            <h2>Comment se déroule la mission&nbsp;?</h2>
            <p className="lead">Un socle solide la première année, puis un pilotage continu qui s&apos;ajuste à vos priorités et à votre niveau de risque.</p>
            <div className="timeline">
              <div className="tl-item">
                <div className="tl-tag">Mois 1</div>
                <h3>Diagnostic et cadrage</h3>
                <ul>
                  <li>{CHECK} État des lieux de votre sécurité et de vos obligations (NIS2, DORA, RGPD, HDS)</li>
                  <li>{CHECK} Analyse de risques EBIOS&nbsp;RM et cartographie des priorités</li>
                  <li>{CHECK} Feuille de route validée par la direction</li>
                </ul>
              </div>
              <div className="tl-item">
                <div className="tl-tag">Mois 2 → 6</div>
                <h3>Mise en place du socle</h3>
                <ul>
                  <li>{CHECK} PSSI, rôles et responsabilités, procédures clés</li>
                  <li>{CHECK} Déploiement des mesures prioritaires et mise en conformité (ISO&nbsp;27001, NIS2, DORA)</li>
                  <li>{CHECK} Sensibilisation des équipes et de la direction</li>
                </ul>
              </div>
              <div className="tl-item">
                <div className="tl-tag">Mois 6 +</div>
                <h3>Pilotage continu</h3>
                <ul>
                  <li>{CHECK} Suivi des risques et des indicateurs de sécurité</li>
                  <li>{CHECK} Reporting en comité de direction, préparation des audits</li>
                  <li>{CHECK} Gestion des incidents et accompagnement en cas de crise</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {children}

        {/* ======================= CTA FINAL ======================= */}
        <section className="section" id="contact">
          <div className="wrap">
            <div className="finalcta">
              <div className="bg-glow"></div>
              <div className="finalcta-inner">
                <p className="eyebrow" style={{ justifyContent: "center" }}>Passons à l&apos;action</p>
                <h2>Parlons de votre sécurité.</h2>
                <p>Un RSSI senior vous rappelle sous 2h pour comprendre votre contexte, vos obligations et le rythme d&apos;intervention adapté. Sans engagement, 100&nbsp;% confidentiel.</p>
                <ul className="finalcta-points">
                  <li>{CHECK} Réponse sous 2h ouvrées</li>
                  <li>{CHECK} NDA signé dès le 1er échange</li>
                  <li>{CHECK} Un RSSI senior, jamais un profil junior</li>
                </ul>
                <div className="finalcta-btns">
                  <a href="#form-anchor" className="btn btn-primary">Être rappelé sous 2h →</a>
                </div>
                <div className="finalcta-contact">
                  <a href="tel:+33186044431">01 86 04 44 31</a>
                  <span className="fc-sep">·</span>
                  <a href="mailto:expertise@securitrust.fr">expertise@securitrust.fr</a>
                  <span className="fc-sep">·</span>
                  <span>11 rue Saint-Didier, 75116 Paris</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky-cta">
          <a href="#form-anchor" className="btn btn-primary">Être rappelé sous 2h →</a>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
