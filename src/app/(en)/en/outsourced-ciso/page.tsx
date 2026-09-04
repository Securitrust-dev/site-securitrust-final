"use client";

import { useRef, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import "../../../(site)/rssi-externalise/lp.css";
import "../../../(site)/rssi-externalise-v2/lp-v2.css";

/* ============================================================================
   DRAFT — English version of the securitrust.fr home page, in the LP design.

   Straight translation of ../rssi-externalise-v2/page.tsx : same structure,
   same sections, same design (lp.css and lp-v2.css are imported as-is, no
   styling is duplicated or changed here).

   Conventions:
   - British English (organisation, prioritised, defence) — the firm is Paris
     based and sells NIS2 / DORA / GDPR compliance to a European market.
   - « RSSI externalisé » → "Outsourced CISO". « Cyber-Pilote » is a product
     name and is left untranslated.
   - French-specific references are kept and made explicit rather than
     dropped: EBIOS RM, HDS, AFNOR, PASSI.
   - No price is shown, in line with the French version.
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

// Consumer email domains are rejected: we only keep work addresses.
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

export default function HomeDesignLPEnPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const emailInput = form.querySelector<HTMLInputElement>("#f-email");
    if (emailInput) {
      const domain = emailInput.value.trim().split("@")[1]?.toLowerCase() ?? "";
      emailInput.setCustomValidity(
        domain && PERSONAL_EMAIL_DOMAINS.has(domain)
          ? "Please use a work email address."
          : "",
      );
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Lead capture in Notion (best-effort — never blocks the success state).
    // /api/contact only reads name/email/phone/company/subject/message/source,
    // so the selected need travels in `subject`, and the language is flagged
    // there too so EN leads can be told apart in the CRM.
    try {
      const fd = new FormData(form);
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          subject: `[EN] Home — need: ${fd.get("besoin") || "not specified"}`,
          source: "Contact",
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
    <div id="lp-root" lang="en" className={spaceGrotesk.variable}>
      {/* ======================= HERO ======================= */}
      <header className="hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="wrap">
          <div className="hero-grid">

            <div className="hero-left">
              <div className="brandbar">
                <img className="brand-logo" src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769766433152.png?width=400&resize=contain" alt="SecuriTrust" width={180} height={37} />
              </div>

              <p className="eyebrow">Cybersecurity consultancy · Paris</p>

              <h1>Take back <span className="hl">control</span> of your security.</h1>

              <p className="hero-sub">A multi-certified consultancy that has been steering cybersecurity for high-stakes organisations since 2016. Choose your entry point — we stand behind the outcome.</p>

              <div className="hero-trust">
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  <span className="ht-txt"><b>+100</b> organisations secured</span>
                </div>
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  <span className="ht-txt"><b>15 years</b> of expertise</span>
                </div>
                <div className="ht-item">
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                  <span className="ht-txt"><b>Multi-certified</b> team</span>
                </div>
              </div>
            </div>

            <aside>
              <div className="formcard" id="form-anchor">
                <form id="callback-form" noValidate ref={formRef} onSubmit={handleSubmit} style={showSuccess ? { display: "none" } : undefined}>
                  <h2>Get a call back within 2 hours</h2>
                  <p className="form-sub">Tell us where you stand, we&apos;ll take it from there.</p>

                  <div className="field">
                    <label htmlFor="f-name">Full name</label>
                    <input type="text" id="f-name" name="name" placeholder="Your full name" required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">Work email</label>
                    <input type="email" id="f-email" name="email" placeholder="firstname@company.com" required autoComplete="email" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-phone">Phone <span className="opt">(optional)</span></label>
                    <input type="tel" id="f-phone" name="phone" placeholder="+33 6 12 34 56 78" autoComplete="tel" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-besoin">What you need</label>
                    <select id="f-besoin" name="besoin" defaultValue="" required>
                      <option value="" disabled>Select your need…</option>
                      <option>Results-guaranteed pentest</option>
                      <option>Outsourced CISO (Cyber-Pilote)</option>
                      <option>Compliance &amp; audit</option>
                      <option>Other / not sure yet</option>
                    </select>
                  </div>

                  <div className="field-consent">
                    <input type="checkbox" id="f-consent" name="consent" required />
                    <label htmlFor="f-consent">I agree that SecuriTrust may use this information to contact me about my enquiry. Nothing is shared with third parties.</label>
                  </div>

                  <button type="submit" className="btn btn-primary">Get a call back within 2 hours →</button>
                  <p className="micro"><b>Response within 2 hours</b> · <b>NDA from the first conversation</b></p>

                  <p className="rgpd-notice">The data collected through this form is processed by SecuriTrust as data controller, on the basis of your consent, for the sole purpose of handling your enquiry. It is kept for 24 months and then deleted. Under the GDPR, you have the right to access, rectify, erase, restrict and object to the processing of your data — exercisable at <a href="mailto:dpo@securitrust.fr">dpo@securitrust.fr</a>. Find out more: <a href="/politique-de-confidentialite">privacy policy</a>.</p>
                </form>

                <div className={showSuccess ? "form-success show" : "form-success"} id="form-success" role="status" aria-live="polite">
                  <div className="ok-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>
                  <h3>Thank you, we have received it.</h3>
                  <p>A senior consultant will call you back within 2 hours to scope your needs. Don&apos;t want to wait? Book your slot now.</p>
                  <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: "18px" }}>Book a slot →</a>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </header>

      {/* ======================= THE THREE ENTRY POINTS ======================= */}
      <section className="section" id="offres">
        <div className="wrap">
          <div className="offers">

            <div className="offer">
              <span className="offer-tag">Offensive security</span>
              <h3>Results-guaranteed pentest</h3>
              <p>No vulnerabilities found? <b>Your pentest is fully refunded.</b></p>
              <ul className="offer-list">
                <li>{CHECK} Realistic penetration testing</li>
                <li>{CHECK} Actionable reporting</li>
                <li>{CHECK} Guaranteed results</li>
              </ul>
              <a href="https://calendly.com/expert-securitrust" className="btn btn-secondary offer-cta" target="_blank" rel="noopener noreferrer">Get started →</a>
            </div>

            <div className="offer offer-lead">
              <span className="offer-tag">Full-service expertise</span>
              <h3>Outsourced CISO</h3>
              <p>Complete security leadership, with no internal HR burden. Guaranteed continuity, zero turnover.</p>
              <ul className="offer-list">
                <li>{CHECK} Audit &amp; compliance</li>
                <li>{CHECK} 24/7 monitoring</li>
                <li>{CHECK} Crisis management</li>
              </ul>
              <a href="#rssi-externalise" className="btn btn-primary offer-cta">Learn more →</a>
            </div>

            <div className="offer">
              <span className="offer-tag">Strategic leadership</span>
              <h3>Cyber-Pilote</h3>
              <p>A dedicated expert CISO, on a fractional basis, steering your security strategy.</p>
              <ul className="offer-list">
                <li>{CHECK} Senior expert embedded in your team</li>
                <li>{CHECK} Continuous board-level reporting</li>
                <li>{CHECK} Volume adjusted month by month</li>
              </ul>
              <a href="#cyber-pilote" className="btn btn-secondary offer-cta">Learn more →</a>
            </div>

          </div>
        </div>
      </section>

      {/* ======================= TRUST BAND ======================= */}
      <section className="trustband" aria-label="Clients">
        <div className="wrap">
          <p className="label">Trusted by</p>
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

      {/* ======================= THE PROOF IN NUMBERS ======================= */}
      <section className="section" id="preuves">
        <div className="wrap">
          <p className="eyebrow">The proof in numbers</p>
          <h2>Field-proven expertise, not a promise.</h2>
          <p className="lead" style={{ marginBottom: "26px" }}>For 15 years, from the first assessment through to continuous oversight, delivered by senior experts who stand behind their results.</p>

          <div className="stats-wall">
            <div className="stat-box"><div className="num">+86</div><div className="lbl">results-guaranteed pentests</div></div>
            <div className="stat-box"><div className="num">97%</div><div className="lbl">of critical vulnerabilities detected</div></div>
            <div className="stat-box"><div className="num">+105</div><div className="lbl">ISO 27001 certifications achieved</div></div>
            <div className="stat-box"><div className="num">+100</div><div className="lbl">organisations secured</div></div>
            <div className="stat-box"><div className="num">+2,500</div><div className="lbl">consultant-days as outsourced CISO</div></div>
            <div className="stat-box"><div className="num">15 years</div><div className="lbl">of expertise</div></div>
          </div>

          <div className="certs">
            <span className="cert highlight cert-featured"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Accredited AFNOR auditor</span>
            <div className="cert-list">
              <span className="cert">{CHECK} ISO 27001 (AFAQ)</span>
              <span className="cert">{CHECK} ISO 27701</span>
              <span className="cert">{CHECK} GDPR (AFAQ)</span>
              <span className="cert">{CHECK} HDS (French health data hosting)</span>
              <span className="cert">{CHECK} ISO 42001</span>
              <span className="cert">{CHECK} CISSP</span>
              <span className="cert">{CHECK} CISM</span>
              <span className="cert">{CHECK} CISA</span>
              <span className="cert">{CHECK} OSCP</span>
              <span className="cert">{CHECK} CEH</span>
              <span className="cert">{CHECK} PNPT</span>
              <span className="cert">{CHECK} EBIOS RM</span>
              <span className="cert">{CHECK} ISO 27001 Lead Auditor / Implementer</span>
              <span className="cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg> PASSI (in progress)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= CYBER-PILOTE ======================= */}
      <section className="section" id="cyber-pilote">
        <div className="wrap">
          <p className="eyebrow">Cyber-Pilote</p>
          <h2>An expert CISO steers your security strategy.</h2>
          <p className="lead">The turnkey solution: a senior CISO certified CISSP/CISM, dedicated to your organisation, from a few days a month to several days a week depending on what is at stake.</p>

          <div className="feat-grid">
            <div className="feat-card">
              <div className="feat-ico">{ICO.pilotage}</div>
              <h3>Strategic CISO leadership</h3>
              <p>A dedicated senior expert steering your security on a fractional basis: decisions, trade-offs, board-level reporting. Available immediately, with no recruitment delay.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.gouvernance}</div>
              <h3>Security governance</h3>
              <p>Security policies aligned with your business priorities: a clear framework, defined responsibilities, and traceable escalation and decision-making.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.audit}</div>
              <h3>Audit &amp; roadmap</h3>
              <p>A full assessment, EBIOS&nbsp;RM risk analysis, and a security roadmap prioritised around your business priorities.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.conformite}</div>
              <h3>Compliance oversight</h3>
              <p>NIS2, ISO&nbsp;27001, DORA, GDPR: support from audit through to certification, annual audits and continuous updates.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.crise}</div>
              <h3>24/7 crisis management</h3>
              <p>A crisis unit you can activate, tested business continuity and disaster recovery plans, and senior staff on call around the clock. You know who to ring and what to do when an incident hits.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.support}</div>
              <h3>Technical support</h3>
              <p>Hands-on support implementing controls, integration with your IT team, and liaison with your partners and suppliers.</p>
            </div>
          </div>

          <div className="cmp-cta">
            <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Learn more about Cyber-Pilote →</a>
          </div>
        </div>
      </section>

      {/* ======================= OUTSOURCED CISO ======================= */}
      <section className="section" id="rssi-externalise">
        <div className="wrap">
          <p className="eyebrow">Outsourced CISO</p>
          <h2>Senior expertise, without the internal HR burden.</h2>
          <p className="lead">Our certified CISOs take full ownership of your security, from audit to compliance and from continuous monitoring to crisis management — with guaranteed continuity and zero turnover.</p>

          <div className="feat-grid">
            <div className="feat-card">
              <div className="feat-ico">{ICO.rssi}</div>
              <h3>Outsourced CISO</h3>
              <p>Strategic and operational leadership from a dedicated expert: decisions, trade-offs, board-level reporting. You set the course, we hold the helm.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.pentest}</div>
              <h3>Audits &amp; pentests</h3>
              <p>Realistic penetration testing with guaranteed results: we only charge for the vulnerabilities we can prove. An offensive view of your real exposure.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.conformite}</div>
              <h3>NIS2, DORA &amp; GDPR compliance</h3>
              <p>Compliance that is documented and actively managed — not a binder gathering dust. ISO&nbsp;27001, HDS, alongside your DPO. Enough to reassure insurers and prime contractors.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.gouvernance}</div>
              <h3>Security governance</h3>
              <p>Security policies aligned with your business priorities and your regulatory obligations: a clear framework, defined responsibilities, traceable decisions.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.iso}</div>
              <h3>ISO 27001 &amp; 27701</h3>
              <p>From preparation to certification, with rigorous methodology and deadlines met. +105 certifications achieved: certification turns into a commercial argument.</p>
            </div>
            <div className="feat-card">
              <div className="feat-ico">{ICO.formation}</div>
              <h3>Awareness &amp; training</h3>
              <p>Phishing simulations and hands-on training: your people become your first line of defence rather than your first weakness.</p>
            </div>
          </div>

          <div className="cmp-cta">
            <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Learn more about our Outsourced CISO →</a>
          </div>
        </div>
      </section>

      {/* ======================= HOW THE ENGAGEMENT UNFOLDS ======================= */}
      <section className="section" id="mission">
        <div className="wrap">
          <p className="eyebrow">How the engagement unfolds</p>
          <h2>A steady rise in security, month after month.</h2>
          <p className="lead">A solid foundation in the first year, then continuous oversight that adapts to your priorities and your risk level.</p>
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-tag">Month 1</div>
              <h3>Audit &amp; scoping</h3>
              <ul>
                <li>{CHECK} A full review of your security posture and regulatory obligations (NIS2, GDPR, HDS)</li>
                <li>{CHECK} Vulnerability mapping and EBIOS&nbsp;RM risk analysis</li>
                <li>{CHECK} A roadmap prioritised around your business priorities</li>
              </ul>
            </div>
            <div className="tl-item">
              <div className="tl-tag">Months 2 → 6</div>
              <h3>Building the foundation</h3>
              <ul>
                <li>{CHECK} Rollout of priority security controls</li>
                <li>{CHECK} Security policies and compliance work (ISO&nbsp;27001, NIS2, DORA)</li>
                <li>{CHECK} Team awareness training and phishing simulations</li>
              </ul>
            </div>
            <div className="tl-item">
              <div className="tl-tag">Month 6 +</div>
              <h3>Continuous oversight</h3>
              <ul>
                <li>{CHECK} Continuous monitoring of cyber risk</li>
                <li>{CHECK} Dashboards and board-level reporting</li>
                <li>{CHECK} Crisis management and 24/7 senior on-call</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= OUTSOURCE OR HIRE ======================= */}
      <section className="section" id="comparatif">
        <div className="wrap">
          <p className="eyebrow">Outsource or hire?</p>
          <h2>The same expertise, more flexibility, at a cost you control.</h2>
          <p className="lead">Before launching a recruitment process at €80–120k a year, compare what an outsourced CISO changes.</p>

          <div className="cmp">
            <div className="cmp-grid">
              <div className="cmp-row cmp-head">
                <div className="cmp-crit">Criterion</div>
                <div className="cmp-int"><span className="cmp-th">In-house CISO</span></div>
                <div className="cmp-ext"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg><span className="cmp-th">Outsourced CISO</span></div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">Cost</span></div>
                <div className="cmp-int"><span className="x">✕</span><span className="cmp-lbl">In-house: </span>€80,000 to €120,000 a year, fully loaded</div>
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Outsourced: </span>You only pay for the days you actually need</div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">Availability of expertise</span></div>
                <div className="cmp-int"><span className="x">✕</span><span className="cmp-lbl">In-house: </span>Several months of recruitment</div>
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Outsourced: </span>Senior expertise available immediately</div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">HR burden &amp; turnover</span></div>
                <div className="cmp-int"><span className="x">✕</span><span className="cmp-lbl">In-house: </span>Recruitment, line management, risk of departure</div>
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Outsourced: </span>Zero HR burden, guaranteed continuity</div>
              </div>
              <div className="cmp-row">
                <div className="cmp-crit"><span className="cmp-ct">Breadth of skills</span></div>
                <div className="cmp-int"><span className="x">✕</span><span className="cmp-lbl">In-house: </span>One person, limited scope</div>
                <div className="cmp-ext"><span className="v">✓</span><span className="cmp-lbl">Outsourced: </span>A full consultancy, every specialism</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= PRICING ======================= */}
      <section className="section" id="tarif">
        <div className="wrap">
          <h2>Clear day-rate pricing</h2>

          <div className="tjm">
            <div className="tjm-head">
              <div className="from">Pricing</div>
              <div className="amount amount-label">Per day<span>Volume adjusted month by month</span></div>
              <p className="tjm-who">A certified senior CISO on a fractional basis: from a few days a month to several days a week depending on what is at stake. The exact volume is set after the initial audit — and adjusted month by month. You only pay for the days you actually need.</p>
            </div>
            <a href="https://calendly.com/expert-securitrust" className="btn btn-primary tjm-cta" target="_blank" rel="noopener noreferrer">Book a slot →</a>
          </div>
        </div>
      </section>

      {/* ======================= FINAL CTA ======================= */}
      <section className="section" id="contact">
        <div className="wrap">
          <div className="finalcta">
            <div className="bg-glow"></div>
            <div className="finalcta-inner">
              <p className="eyebrow" style={{ justifyContent: "center" }}>Let&apos;s get started</p>
              <h2>Book a call with an expert.</h2>
              <p>Whether you are after a results-guaranteed pentest or an outsourced CISO, a senior consultant will call you back within 2 hours to scope your needs. No commitment, fully confidential.</p>
              <ul className="finalcta-points">
                <li>{CHECK} Response within 2 business hours</li>
                <li>{CHECK} NDA signed from the first conversation</li>
                <li>{CHECK} A senior consultant, never a junior profile</li>
              </ul>
              <div className="finalcta-btns">
                <a href="#form-anchor" className="btn btn-primary">Get a call back within 2 hours →</a>
              </div>
              <div className="finalcta-contact">
                <a href="tel:+33186044431">+33 1 86 04 44 31</a>
                <span className="fc-sep">·</span>
                <span>11 Rue Saint-Didier, 75116 Paris, France</span>
                <span className="fc-sep">·</span>
                <span>Mon–Fri · 09:00–18:30 CET</span>
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
              <p>Cybersecurity consultancy based in Paris. We have been steering security for high-stakes organisations since 2016.</p>
            </div>

            <div className="footer-cols">
              <div className="footer-col">
                <h4>Expertise</h4>
                <a href="#cyber-pilote">Cyber-Pilote</a>
                <a href="#rssi-externalise">Outsourced CISO</a>
                <a href="#rssi-externalise">Audits &amp; pentests</a>
                <a href="#rssi-externalise">NIS2 / DORA compliance</a>
                <a href="#rssi-externalise">ISO 27001 &amp; 27701</a>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#preuves">Our results</a>
                <a href="#mission">The engagement</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <span>11 Rue Saint-Didier</span>
                <span>75116 Paris, France</span>
                <a className="fc-strong" href="tel:+33186044431">+33 1 86 04 44 31</a>
                <span>Mon–Fri · 09:00–18:30 CET</span>
              </div>
            </div>
          </div>

          <div className="footer-legal">
            © 2016–2026 SecuriTrust. All rights reserved. <a href="/mentions-legales" style={{ color: "var(--sky)" }}>Legal notice</a> · <a href="/politique-de-confidentialite" style={{ color: "var(--sky)" }}>Privacy</a>
          </div>
        </div>
      </footer>

      {/* ======================= STICKY MOBILE CTA ======================= */}
      <div className="sticky-cta">
        <a href="https://calendly.com/expert-securitrust" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Talk to an expert →</a>
      </div>
    </div>
  );
}
