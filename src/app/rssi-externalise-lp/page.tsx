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
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#020817" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </span>
                <span className="brand-name">Securi<b>Trust</b></span>
              </div>

              {/* 2. H1 */}
              <h1>Votre <span className="hl">RSSI externalisé</span> à temps partagé, à partir de 1 950 €/mois</h1>

              {/* 3. Sous-header */}
              <p className="hero-sub">Un RSSI externe senior pour piloter votre sécurité, sans le coût d'un plein temps.</p>

            </div>

            {/* COLONNE DROITE : FORMULAIRE */}
            <aside>
              <div className="formcard" id="form-anchor">
                <form id="callback-form" noValidate ref={formRef} onSubmit={handleSubmit} style={showSuccess ? { display: "none" } : undefined}>
                  <h2>Recevez votre fourchette de prix sous 2h</h2>

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

                  <button type="submit" className="btn btn-primary">Recevoir ma fourchette de prix →</button>
                  <p className="micro"><b>Sans engagement</b> · <b>Réponse sous 2h</b> · <b>100% confidentiel</b></p>
                </form>

                {/* État de succès */}
                <div className={showSuccess ? "form-success show" : "form-success"} id="form-success" role="status" aria-live="polite">
                  <div className="ok-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>
                  <h3>Merci, c'est bien reçu.</h3>
                  <p>Un RSSI senior vous rappelle sous 2h pour cadrer votre besoin. Vous ne voulez pas attendre&nbsp;? Réservez votre créneau dès maintenant.</p>
                  <a href="https://calendly.com/securitrust-rssi/20min" className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: "18px" }}>Réserver mon créneau de 20 min →</a>
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
          <div className="logos">
            <span className="wordmark wm-sg"><span className="dot"></span>Société Générale</span>
            <span className="wordmark wm-ab">Abeille Assurances</span>
            <span className="wordmark wm-bfm">Banque Française Mutualiste</span>
            <span className="wordmark"><span className="dot"></span>Ma Place en Crèche</span>
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
          <p className="lead">Le principe du RSSI as a service : une fonction RSSI complète à temps partagé — sur site ou à distance, intégrée à votre comité de direction, ajustable selon vos priorités — sans en porter le coût ni la charge interne.</p>

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
              <p className="feat-tag">Tout votre pilotage cyber, au même endroit.</p>
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

      {/* ======================= PRIX / FORMULES ======================= */}
      <section className="section" id="prix">
        <div className="wrap">
          <h2>Combien coûte un RSSI externalisé&nbsp;? Nos ordres de grandeur</h2>
          <p className="lead">Pas de prix caché ni de «&nbsp;sur devis&nbsp;» opaque : voici nos fourchettes indicatives, calées après l'audit offert.</p>

          <div className="pricing">
            <div className="price-card">
              <div className="tier">Essentiel</div>
              <div className="from">À partir de</div>
              <div className="amount">1 950 €<span> /mois HT</span></div>
              <div className="who">PME jusqu'à ~50 salariés, poser les fondamentaux de la gouvernance cyber.</div>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Analyse des risques &amp; feuille de route</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> PSSI &amp; mise en conformité de base</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Tableaux de bord trimestriels</li>
              </ul>
              <a href="#form-anchor" className="btn btn-ghost pc-cta">Vérifier mon éligibilité</a>
            </div>

            <div className="price-card featured">
              <span className="tag">Le plus choisi</span>
              <div className="tier">Premium</div>
              <div className="from">À partir de</div>
              <div className="amount">4 500 €<span> /mois HT</span></div>
              <div className="who">PME &amp; ETI 50–300 salariés, protection active et pilotage continu.</div>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Tout l'Essentiel + supervision projets IT</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Gestion de crise 24/7 incluse</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Dossier assureur cyber &amp; conformité NIS2</li>
              </ul>
              <a href="#form-anchor" className="btn btn-primary pc-cta">Recevoir un devis précis</a>
            </div>

            <div className="price-card">
              <div className="tier">Entreprise</div>
              <div className="from">Dès</div>
              <div className="amount">8 500 €<span> /mois HT</span></div>
              <div className="who">ETI &amp; enjeux forts (HDS, DORA, multi-sites), dispositif sur mesure.</div>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> RSSI dédié + équipe pluridisciplinaire</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Conformité sectorielle (santé/HDS, finance/DORA)</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Coordination infogérant &amp; sous-traitants</li>
              </ul>
              <a href="#form-anchor" className="btn btn-ghost pc-cta">Cadrer mon périmètre</a>
            </div>
          </div>


          <p className="pricing-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg> <span>Des points de départ indicatifs, calés après l'audit offert — à comparer aux 80–120 k€/an d'un RSSI interne. <strong style={{ color: "var(--muted)" }}>Volume de jours indicatif par formule :</strong> [À COMPLÉTER : ex. Essentiel ~2 j/mois · Premium ~4 j/mois · Entreprise sur-mesure].</span></p>
        </div>
      </section>

      {/* ======================= INTERNE VS EXTERNALISÉ ======================= */}
      <section className="section" id="comparatif">
        <div className="wrap">
          <h2>Externaliser la fonction RSSI ou recruter&nbsp;? Le comparatif honnête</h2>
          <p className="lead">Avant de recruter, comparez : externaliser offre la même expertise, plus de flexibilité, à coût réduit.</p>

          <div className="compare">
            <div className="compare-row compare-head">
              <div>Critère</div>
              <div className="col-int">RSSI interne</div>
              <div className="col-ext">RSSI externalisé</div>
            </div>
            <div className="compare-row">
              <div className="crit">Coût</div>
              <div className="col-int"><span className="cross">✕</span>80 000 à 120 000 €/an de salaire chargé</div>
              <div className="col-ext"><span className="tick">✓</span>À partir de 1 950 €/mois, jusqu'à 10× moins</div>
            </div>
            <div className="compare-row">
              <div className="crit">Engagement</div>
              <div className="col-int"><span className="cross">✕</span>CDI : préavis, indemnités, rigidité</div>
              <div className="col-ext"><span className="tick">✓</span>Sans engagement, résiliable sous 30 jours</div>
            </div>
            <div className="compare-row">
              <div className="crit">Disponibilité de l'expertise</div>
              <div className="col-int"><span className="cross">✕</span>Plusieurs mois de recrutement</div>
              <div className="col-ext"><span className="tick">✓</span>Expertise de haut niveau immédiate</div>
            </div>
            <div className="compare-row">
              <div className="crit">Charge RH &amp; turnover</div>
              <div className="col-int"><span className="cross">✕</span>Recrutement, management, risque de départ</div>
              <div className="col-ext"><span className="tick">✓</span>Zéro charge RH, continuité garantie</div>
            </div>
            <div className="compare-row">
              <div className="crit">Étendue des compétences</div>
              <div className="col-int"><span className="cross">✕</span>Une personne, un périmètre limité</div>
              <div className="col-ext"><span className="tick">✓</span>Un cabinet, toutes les expertises (audit, crise, conformité)</div>
            </div>
            <div className="compare-row">
              <div className="crit">Indépendance</div>
              <div className="col-int"><span className="cross">✕</span>Soumis aux enjeux internes et politiques</div>
              <div className="col-ext"><span className="tick">✓</span>Regard externe, indépendant et objectif</div>
            </div>
            <div className="compare-row">
              <div className="crit">Flexibilité du volume</div>
              <div className="col-int"><span className="cross">✕</span>Temps plein figé, qu'importe la charge réelle</div>
              <div className="col-ext"><span className="tick">✓</span>Temps partagé, ajustable mois après mois</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= COEXISTENCE IT / INFOGÉRANT + CRISE 24/7 ======================= */}
      <section className="section" id="dispositif">
        <div className="wrap">
          <h2>Le RSSI externalisé renforce vos équipes, il ne les remplace pas</h2>
          <p className="lead">Déjà une DSI ou un infogérant ? Le RSSI externe pilote la gouvernance, vos équipes gardent l'exploitation. Chacun son rôle.</p>

          <div className="split">
            <div className="feature">
              <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg> Vous avez déjà un responsable IT ou un infogérant</h3>
              <p>Le RSSI externe pilote la gouvernance et la feuille de route ; votre IT garde l'exécution. Matrice RACI claire dès le cadrage.</p>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> RSSI = gouvernance, stratégie, conformité, arbitrage</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> IT / infogérant = exploitation, run, maintien en condition</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Votre responsable IT est renforcé et monté en compétence, jamais court-circuité</li>
              </ul>
            </div>

            <div className="feature accent">
              <span className="badge24"><span className="pulse"></span> Gestion de crise 24/7</span>
              <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></svg> Quand ça pète, on est là</h3>
              <p>Gestion de crise intégrée à la mission, pas en option. En cas d'incident, un interlocuteur senior décroche — pas un standard — active la cellule de crise et coordonne la réponse.</p>
              <ul>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Astreinte 24/7 incluse (Premium &amp; Entreprise)</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Cellule de crise, réponse à incident, PCA/PRA</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Les SLA précis (délais garantis) sont contractualisés selon votre exposition</li>
              </ul>
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
              <div className="s-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /></svg></div>
              <h3>Finance &amp; assurance</h3>
              <p>DORA, exigences ACPR, due diligence investisseurs. Banques, assureurs et fintech.</p>
            </div>
            <div className="sector">
              <div className="s-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg></div>
              <h3>Santé &amp; HDS</h3>
              <p>Données de santé, hébergement HDS, séparation des accès. SecuriTrust est certifié HDS (AFAQ).</p>
            </div>
            <div className="sector">
              <div className="s-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-6 0v4M5 9h14l1 12H4L5 9z" /></svg></div>
              <h3>Industrie &amp; multi-sites</h3>
              <p>SI hybride, OT/IT, franchises et réseaux. Inventaire et gouvernance d'un parc distribué.</p>
            </div>
            <div className="sector">
              <div className="s-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-5h4v5" /></svg></div>
              <h3>Public &amp; ESS</h3>
              <p>Collectivités, mutuelles et associations. Intervention en marché public (MAPA, appel d'offres).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= CAS CLIENTS (GABARITS À COMPLÉTER AVANT MISE EN LIGNE) ======================= */}
      <section className="section" id="cas" style={{ display: "none" }}>{/* ⚠️ MASQUÉE POUR LE LANCEMENT : retire style="display:none" UNE FOIS les 3 cas réels remplis. Les placeholders [À COMPLÉTER] visibles nuisent à la conversion (testé). */}
        <div className="wrap">
          <h2>Ce que ça donne concrètement, secteur par secteur</h2>
          <p className="lead">Des missions réelles, des résultats mesurables. <em style={{ color: "var(--muted-2)" }}>Gabarits à compléter par SecuriTrust avec de vrais cas (anonymisés par secteur si nécessaire) avant la mise en ligne. Ne pas publier avec les mentions « À COMPLÉTER ».</em></p>

          <div className="grid g3" style={{ marginTop: "36px" }}>

            <div className="card" style={{ borderStyle: "dashed" }}>
              <span className="eyebrow" style={{ marginBottom: "10px", color: "var(--cyan)" }}>[À COMPLÉTER : Secteur, ex : Distribution / ETI]</span>
              <h3>[À COMPLÉTER : taille &amp; contexte, ex : ETI distribution, 200 salariés]</h3>
              <p><strong style={{ color: "#fff" }}>Situation&nbsp;:</strong> [À COMPLÉTER : le problème de départ, ex : aucune gouvernance cyber, l'assureur exigeait un niveau de sécurité documenté pour renouveler la police].</p>
              <p><strong style={{ color: "#fff" }}>Mission&nbsp;:</strong> [À COMPLÉTER : ce que le RSSI externe a mis en place, ex : analyse des risques EBIOS RM, PSSI, feuille de route, dossier assureur].</p>
              <p><strong style={{ color: "var(--sky)" }}>Résultat&nbsp;:</strong> [À COMPLÉTER : résultat chiffré, ex : conformité obtenue en 4 mois, prime assureur −18 %, dossier accepté].</p>
              <p style={{ fontSize: ".86rem", color: "var(--muted-2)", borderLeft: "2px solid var(--line)", paddingLeft: "12px", marginTop: "14px" }}>«&nbsp;[À COMPLÉTER : verbatim client court]&nbsp;», [Poste], [Secteur / taille]</p>
            </div>

            <div className="card" style={{ borderStyle: "dashed" }}>
              <span className="eyebrow" style={{ marginBottom: "10px", color: "var(--cyan)" }}>[À COMPLÉTER : Secteur, ex : Industrie / multi-sites]</span>
              <h3>[À COMPLÉTER : taille &amp; contexte, ex : industrie, 150 salariés, SI hybride OT/IT]</h3>
              <p><strong style={{ color: "#fff" }}>Situation&nbsp;:</strong> [À COMPLÉTER : ex : parc complexe, plusieurs sites, aucune supervision des accès].</p>
              <p><strong style={{ color: "#fff" }}>Mission&nbsp;:</strong> [À COMPLÉTER : ex : inventaire, cartographie, supervision, plan de remédiation priorisé].</p>
              <p><strong style={{ color: "var(--sky)" }}>Résultat&nbsp;:</strong> [À COMPLÉTER : ex : X vulnérabilités critiques corrigées, PCA/PRA testé, audit passé].</p>
              <p style={{ fontSize: ".86rem", color: "var(--muted-2)", borderLeft: "2px solid var(--line)", paddingLeft: "12px", marginTop: "14px" }}>«&nbsp;[À COMPLÉTER : verbatim client court]&nbsp;», [Poste], [Secteur / taille]</p>
            </div>

            <div className="card" style={{ borderStyle: "dashed" }}>
              <span className="eyebrow" style={{ marginBottom: "10px", color: "var(--cyan)" }}>[À COMPLÉTER : Secteur, ex : SaaS / levée de fonds ou Santé / HDS]</span>
              <h3>[À COMPLÉTER : taille &amp; contexte, ex : scale-up SaaS, 60 salariés, due diligence Série A]</h3>
              <p><strong style={{ color: "#fff" }}>Situation&nbsp;:</strong> [À COMPLÉTER : ex : due diligence investisseur / exigence client grand compte / conformité HDS].</p>
              <p><strong style={{ color: "#fff" }}>Mission&nbsp;:</strong> [À COMPLÉTER : ex : rapport EBIOS RM, attestation ISO 27001, synthèse pour data room].</p>
              <p><strong style={{ color: "var(--sky)" }}>Résultat&nbsp;:</strong> [À COMPLÉTER : ex : dossier sécurité validé par l'investisseur, contrat grand compte signé].</p>
              <p style={{ fontSize: ".86rem", color: "var(--muted-2)", borderLeft: "2px solid var(--line)", paddingLeft: "12px", marginTop: "14px" }}>«&nbsp;[À COMPLÉTER : verbatim client court]&nbsp;», [Poste], [Secteur / taille]</p>
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
              <summary>Combien ça coûte vraiment, et pourquoi pas un prix unique&nbsp;?<span className="plus">+</span></summary>
              <p>Nos formules démarrent à 1 950 €/mois HT (PME jusqu'à ~50 salariés), 4 500 €/mois HT (PME et ETI 50–300 salariés), et dès 8 500 €/mois HT pour les enjeux forts (HDS, DORA, multi-sites). Ce sont des points de départ honnêtes, affichés pour que vous puissiez vous situer avant même de nous parler.</p>
              <p>Le prix exact dépend de votre taille, de votre exposition réglementaire et du volume de jours réellement utile&nbsp;: nous le calons après l'audit préliminaire offert, sans surprise. À comparer aux 80–120 k€/an d'un RSSI interne.</p>
            </details>
            <details>
              <summary>Y a-t-il un engagement de durée&nbsp;?<span className="plus">+</span></summary>
              <p>Non. Toutes nos missions de RSSI externalisé sont sans engagement de durée&nbsp;: le contrat est résiliable à tout moment avec 30 jours de préavis, sans pénalité de sortie. Vous ajustez aussi le volume de jours mois après mois selon vos priorités. Nous préférons vous garder par la qualité du pilotage, pas par un contrat verrouillé.</p>
            </details>
            <details>
              <summary>Quels sont les avantages d'un RSSI externalisé&nbsp;?<span className="plus">+</span></summary>
              <p>Une expertise de haut niveau en cybersécurité immédiatement disponible, un budget cyber maîtrisé (à partir de 1 950 €/mois face à un RSSI interne à 80–120 k€/an), zéro charge RH, une vision indépendante des enjeux internes, et une flexibilité totale. Vous accédez à un cabinet entier (audit, gestion de crise, conformité aux normes ISO), là où un salarié unique reste limité à son seul périmètre.</p>
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
              <p>Nos consultants sont certifiés OSCP, CEH, EBIOS RM, Lead Auditor et Lead Implementer ISO 27001 ; SecuriTrust est auditeur officiel AFNOR. Avant de signer, nous vous présentons nominativement l'intervenant qui sera affecté à votre compte, avec son parcours et ses missions de référence, vous choisissez en connaissance de cause.</p>
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
              <p>Un responsable IT, ou même un lead dev senior, gère l'exploitation des systèmes informatiques, rarement la gouvernance cyber formalisée, l'analyse des risques, la conformité aux normes et la gestion de crise. C'est d'ailleurs souvent lors de l'audit préliminaire offert que l'on révèle des écarts qu'une équipe technique, concentrée sur le run, ne pouvait pas voir. Le RSSI externe apporte cette expertise dédiée et un regard indépendant, sans mobiliser un temps plein.</p>
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
              <p>La responsabilité réglementaire de l'entreprise (NIS2, RGPD, DORA) reste celle de sa direction, c'est la loi, et personne ne peut s'y substituer. En revanche, SecuriTrust s'engage contractuellement par une obligation de moyens documentée et est couvert par une assurance responsabilité civile professionnelle (plafond [À COMPLÉTER] € par sinistre, attestation sur demande). Le périmètre, les engagements et la répartition des responsabilités sont précisés au contrat, et nous vous en communiquons un extrait avant signature.</p>
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
            <span className="cert highlight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Auditeur officiel AFNOR</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> ISO 27001 (AFAQ)</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> RGPD (AFAQ)</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> HDS (AFAQ)</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> ISO 42001</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> OSCP</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> CEH</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> PNPT</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> EBIOS RM</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5" /></svg> Lead Auditor / Implementer ISO 27001</span>
            <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg> PASSI (en cours)</span>
          </div>
        </div>
      </section>

      {/* ======================= COMMENT ÇA SE PASSE ======================= */}
      <section className="section" id="process">
        <div className="wrap">
          <h2>De l'audit au pilotage continu, en 3 étapes</h2>
          <div className="steps">
            <div className="step">
              <div className="n">1</div>
              <h3>Audit préliminaire offert</h3>
              <p>On évalue votre sécurité, vos risques et vos obligations (NIS2, RGPD, HDS). Vous repartez avec un diagnostic clair et une fourchette de prix ferme.</p>
              <span className="free">Offert</span>
            </div>
            <div className="step">
              <div className="n">2</div>
              <h3>Plan de pilotage &amp; devis</h3>
              <p>Feuille de route priorisée, mission dimensionnée selon vos besoins. Devis précis, sans engagement. Déploiement en 48h.</p>
            </div>
            <div className="step">
              <div className="n">3</div>
              <h3>Run &amp; pilotage continu</h3>
              <p>Votre RSSI pilote la sécurité, anime les tableaux de bord en comité de direction, gère conformité, veille et crise. Une gouvernance vivante, ajustable mois après mois.</p>
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
              <p>Recevez votre fourchette de prix sous 2h, ou réservez 20 min. Audit offert, sans engagement, 100% confidentiel.</p>
              <div className="finalcta-btns">
                <a href="#form-anchor" className="btn btn-primary">Recevoir ma fourchette de prix →</a>
                <a href="https://calendly.com/securitrust-rssi/20min" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Réserver 20 min</a>
              </div>
              <p className="micro"><b>Sans engagement</b> · <b>Résiliable sous 30 jours</b> · <b>Réponse sous 2h</b> · <b>NDA dès le 1er échange</b></p>
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
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#020817" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </span>
                <span className="brand-name">Securi<b>Trust</b></span>
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
        <a href="#form-anchor" className="btn btn-primary">Recevoir ma fourchette de prix →</a>
      </div>
    </div>
  );
}
