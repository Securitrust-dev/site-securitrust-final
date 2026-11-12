"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, BadgeCheck, Bug, CalendarClock, Check, ChevronDown, ClipboardCheck, Phone, Scale, ShieldCheck, Star, UserCog } from "lucide-react";
import { Button } from "@/components/accueil-v2/ui/button";
import { contact, team } from "@/lib/accueil-v2/securitrust-content";
import { SecuriTrustHeader } from "@/components/accueil-v2/securitrust-header";
import { CyberVisual } from "@/components/accueil-v2/cyber-visual";
import { ContactCaptcha } from "@/components/accueil-v2/contact-captcha";
import { contactSchema, sendContact } from "@/lib/accueil-v2/securitrust-contact";
import logo from "@/assets/accueil-v2/logo-securitrust-original.png";
import abeille from "@/assets/accueil-v2/abeille.png";
import axa from "@/assets/accueil-v2/axa-white-wordmark-cropped.png";
import cegedim from "@/assets/accueil-v2/cegedim.png";
import thales from "@/assets/accueil-v2/thales-cropped.png";
import natixis from "@/assets/accueil-v2/natixis.png";
import munich from "@/assets/accueil-v2/munich-re.png";
import malakoff from "@/assets/accueil-v2/malakoff.png";
import bollore from "@/assets/accueil-v2/bollore.png";
import kallista from "@/assets/accueil-v2/kallista-energy.png";

const site = "https://www.securitrust.fr";
const needs = [
  { icon: BadgeCheck, label: "Je dois me certifier", sub: "ISO 27001 · TISAX · HDS", path: "/iso27001" },
  { icon: Scale, label: "Suis-je concerné par NIS2 / DORA ?", sub: "Obligations et plan d’action", path: "/nis2" },
  { icon: Bug, label: "Je veux tester ma sécurité", sub: "Pentest web, mobile, AD, Microsoft 365", path: "/pentest" },
  { icon: ClipboardCheck, label: "J’ai un questionnaire à remplir", sub: "Assureur, client, donneur d’ordre", path: "/audit-cybersecurite" },
  { icon: UserCog, label: "J’ai besoin d’un RSSI", sub: "Pilotage de la sécurité à temps partagé", path: "/rssi-externalise" },
];
const clients = [{ name: "Abeille Assurances", asset: abeille }, { name: "AXA", asset: axa }, { name: "Cegedim", asset: cegedim }, { name: "Thales", asset: thales }, { name: "Natixis", asset: natixis }, { name: "Munich Re", asset: munich }, { name: "Malakoff Médéric", asset: malakoff }, { name: "Bolloré Logistics", asset: bollore }, { name: "Kallista Energy", asset: kallista }];
const cases = [
  { client: "CFDP", title: "Structurer la conformité DORA et ISO 27001", sector: "Assurance", path: "/cas-clients/cfdp-conformite-dora-iso-27001" },
  { client: "Cegedim Activ", title: "Évaluer la conformité par des audits internes", sector: "Santé & IT", path: "/cas-clients/cegedim-activ-audits-internes-iso-27001-dora" },
  { client: "Abeille Assurances", title: "Piloter la sécurité avec un RSSI externalisé", sector: "Assurance", path: "/cas-clients/abeille-assurances-rssi-externalise" },
];
const reviews = [
  { name: "Saida", company: "CEO, Élite Aéroport", quote: "Leur expertise en cybersécurité a été un véritable atout pour notre organisation, notamment dans le cadre de l’obtention de notre certification SOC 2 Type II." },
  { name: "Isabelle P.", company: "", quote: "Leur implication, leur rapidité et leur compréhension du problème ont été exemplaires. Nous avons pu récupérer toutes nos données sans incidence sur nos comptes." },
  { name: "Noella I.", company: "Afluens Group", quote: "Securitrust nous accompagne avec succès depuis 9 ans. Leur expertise en tant que RSSI externalisé et aussi sur les tests d’intrusion. Nous recommandons vivement leurs services." },
];
const steps = [
  { title: "Cadrer", description: "Comprendre votre activité, vos données sensibles et vos obligations." },
  { title: "Auditer", description: "Identifier les vulnérabilités, les risques et les écarts réels." },
  { title: "Corriger", description: "Construire une feuille de route claire, priorisée et réaliste." },
  { title: "Piloter", description: "Suivre les actions, les indicateurs et les évolutions réglementaires." },
];
const faq = [
  { question: "NIS2 : mon entreprise est-elle concernée ?", answer: "Cela dépend notamment de votre secteur d’activité, de la taille de votre organisation et des textes applicables. Un diagnostic permet d’identifier vos obligations et de prioriser les actions. NIS2 n’est pas une certification.", path: "/nis2", link: "Explorer NIS2" },
  { question: "Comment préparer une certification ISO 27001 ?", answer: "L’accompagnement commence par le cadrage du périmètre et l’analyse des écarts, puis la mise en place d’un système de management de la sécurité de l’information. La certification est délivrée par un organisme certificateur indépendant.", path: "/iso27001", link: "Découvrir l’accompagnement ISO 27001" },
  { question: "Que reçoit-on après un test d’intrusion ?", answer: "Un rapport exploitable présentant les vulnérabilités identifiées et les recommandations de correction. Le périmètre du test est défini avec vous avant la mission.", path: "/pentest", link: "Découvrir les pentests" },
  { question: "Pouvez-vous nous aider avec un questionnaire de sécurité ?", answer: "Oui. SecuriTrust accompagne les organisations dans l’évaluation et la documentation de leur niveau de sécurité pour leurs clients, assureurs et donneurs d’ordre.", path: "/audit-cybersecurite", link: "Découvrir l’audit cybersécurité" },
  { question: "Combien de temps dure une mission ?", answer: "Le calendrier dépend de votre périmètre, de votre maturité et des ressources disponibles. Il est défini lors du cadrage de votre besoin, sans durée standard garantie.", path: "/contact", link: "Cadrer mon besoin" },
];

export function SecuriTrustHome() {
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [captchaActive, setCaptchaActive] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSent(false);
    const result = contactSchema.safeParse({ name, email, phone, need: selected, consent, website });
    if (!result.success) { setError(result.error.issues[0]?.message ?? "Vérifiez les champs du formulaire."); return; }
    setError(""); setSending(true);
    try {
      const response = await sendContact(result.data, window.location.origin, captchaToken);
      const tracking = window as Window & { stTrack?: (event: string, params: Record<string, unknown>) => void };
      tracking.stTrack?.("generate_lead", { form_id: "lp_rappel", lead_service: selected, lead_id: response.leadId });
      setSent(true); setName(""); setEmail(""); setPhone(""); setSelected(""); setConsent(false);
    } catch (failure) { setError(failure instanceof Error ? failure.message : "L’envoi a échoué. Réessayez ou contactez-nous par téléphone."); }
    finally { setSending(false); setCaptchaReset(value => value + 1); }
  }
  return <div className="securitrust-page min-h-screen">
    <SecuriTrustHeader />

    <section className="cyber-hero border-b border-border">
      <CyberVisual />
      <div className="hero-content mx-auto max-w-6xl px-5 md:px-6">
        <div className="hero-copy">
          <p className="mb-5 flex items-center gap-2 text-base font-medium text-accent"><ShieldCheck className="size-4" /> SecuriTrust · Depuis 2016</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Cabinet de <span className="text-accent">cybersécurité</span> à Paris</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">Certification ISO 27001, obligations NIS2 et DORA, tests d’intrusion : partez de votre enjeu, nous construisons la suite avec vous.</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-base text-muted-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-success" /> Intervenant senior</span></div>
          <figure className="mt-8 max-w-lg border-l-2 border-accent pl-5">
            <div aria-label="5 étoiles sur 5" className="flex gap-1 text-primary">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-current" />)}</div>
            <blockquote className="mt-3 text-lg leading-relaxed">« Securitrust nous accompagne avec succès depuis 9 ans. »</blockquote>
            <figcaption className="mt-3 text-base text-muted-foreground">Noella I. · Afluens Group</figcaption>
          </figure>
          <a href={contact.phoneHref} className="mt-8 inline-flex items-center gap-2 text-base text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"><Phone className="size-4" /> Un incident en cours ? {contact.phone}</a>
        </div>
        <form id="contact" noValidate onFocus={() => setCaptchaActive(true)} onSubmit={submit} className="hero-form rounded-lg border border-border bg-card p-5 md:p-7">
          <h2 className="text-xl font-semibold">Être rappelé par un expert</h2>
          <p className="mt-2 text-base text-muted-foreground">Un premier échange confidentiel, sans engagement.</p>
          <fieldset className="mt-5"><legend className="mb-3 text-base font-medium">Votre priorité</legend><div className="grid grid-cols-2 gap-2">{needs.map((need, index) => <Button key={need.label} type="button" variant="outline" aria-pressed={selected === need.label} onClick={() => { setSelected(need.label); setSent(false); }} className={`h-auto min-h-12 justify-start whitespace-normal px-3 py-3 text-left text-base leading-snug ${index === 4 ? "col-span-2" : ""} ${selected === need.label ? "border-primary bg-primary/10 text-foreground" : "bg-background text-muted-foreground"}`}><need.icon className="size-4 shrink-0" />{need.label}</Button>)}</div></fieldset>
          <div className="mt-4 grid gap-3"><label className="grid gap-1.5 text-base">Nom et prénom<input required autoComplete="name" maxLength={100} name="name" value={name} onChange={event => setName(event.target.value)} className="h-11 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label><label className="grid gap-1.5 text-base">Email professionnel<input required type="email" autoComplete="email" maxLength={255} name="email" value={email} onChange={event => setEmail(event.target.value)} className="h-11 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label></div>
          <label className="mt-3 grid gap-1.5 text-base">Téléphone (facultatif, sinon réponse par email)<input type="tel" autoComplete="tel" name="phone" maxLength={30} value={phone} onChange={event => setPhone(event.target.value)} className="h-11 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" /></label>
          <div hidden aria-hidden="true"><label>Site web<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></label></div>
          <label className="mt-4 flex items-start gap-2 text-base leading-relaxed text-muted-foreground"><input type="checkbox" required checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 size-4 shrink-0 accent-primary" /><span>J’accepte que SecuriTrust utilise mes coordonnées pour répondre à ma demande. <a className="underline underline-offset-2 hover:text-foreground" href={`${site}/politique-de-confidentialite`}>Politique de confidentialité</a>.</span></label>
          <ContactCaptcha active={captchaActive} reset={captchaReset} onToken={setCaptchaToken} />
          <Button type="submit" aria-busy={sending} className="mt-5 h-12 w-full text-base">{sending ? "Envoi en cours…" : "Être rappelé sous 2 h"} <ArrowRight /></Button>
          {error && <p role="alert" className="mt-3 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-base text-foreground">{error}</p>}
          {sent && <p role="status" className="mt-3 text-base text-success">Votre demande a bien été reçue par SecuriTrust.</p>}
          <Button asChild variant="ghost" className="mt-2 h-auto min-h-11 w-full whitespace-normal text-base"><a href={contact.calendar} target="_blank" rel="noopener noreferrer"><CalendarClock /> Réserver 30 min dans l’agenda</a></Button>
        </form>
      </div>
      <a href="#besoins" className="hero-scroll" aria-label="Découvrir nos expertises"><ChevronDown className="size-5" /></a>
    </section>
    <section className="border-b border-border bg-card/50"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-7 px-5 py-7 md:grid-cols-4 md:px-6">{[{ value: "Depuis 2016", label: "à vos côtés" }, { value: "+100", label: "entreprises sécurisées" }, { value: "+100", label: "accompagnements ISO 27001" }, { value: "Senior", label: "un expert pilote votre mission" }].map(stat => <div key={stat.label}><div className="font-display text-2xl font-semibold">{stat.value}</div><p className="mt-1 text-base leading-relaxed text-muted-foreground">{stat.label}</p></div>)}</div></section>
    <section aria-label="Références clients" className="mx-auto max-w-6xl px-5 py-9 md:px-6"><p className="text-base text-muted-foreground">Ils nous font confiance</p><div className="mt-6 flex flex-wrap justify-center gap-y-7">{clients.map((client, index) => <div key={client.name} className={`flex h-16 basis-1/2 items-center justify-center px-3 sm:basis-1/3 ${index < 5 ? "lg:basis-1/5" : "lg:basis-1/4"}`}><img src={client.asset.src} alt={client.name} loading="lazy" className="h-10 w-auto max-w-full object-contain opacity-90" /></div>)}</div></section>

    <section id="besoins" className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-16"><p className="section-eyebrow">Vos enjeux</p><h2 className="mt-3 text-3xl font-semibold">Quel est votre besoin ?</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{needs.map(need => <a key={need.label} href={`${site}${need.path}`} className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/60"><need.icon className="size-7 text-accent" /><h3 className="mt-4 font-semibold leading-snug">{need.label}</h3><p className="mt-3 text-base leading-relaxed text-muted-foreground">{need.sub}</p><ArrowRight className="mt-6 size-4 text-primary" /></a>)}</div><div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-border py-5 text-base text-accent"><span className="font-semibold text-foreground">Autres expertises</span>{[["DORA", "/dora"], ["TISAX", "/tisax"], ["HDS", "/hds"], ["RGPD", "/rgpd"], ["Audit Microsoft 365", "/audit-o365"]].map(([label, path]) => <a key={path} className="underline underline-offset-4" href={`${site}${path}`}>{label}</a>)}</div></section>

    <section id="cas" className="border-y border-border bg-section py-14 md:py-16"><div className="mx-auto max-w-6xl px-5 md:px-6"><p className="section-eyebrow">Cas clients</p><h2 className="mt-3 text-3xl font-semibold">Des enjeux concrets, des missions réelles</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{cases.map(item => <a href={`${site}${item.path}`} key={item.client} className="group flex flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent"><p className="text-base text-muted-foreground">{item.sector}</p><h3 className="mt-4 text-xl font-semibold leading-snug">{item.title}</h3><p className="mt-4 font-medium text-accent">{item.client}</p><span className="mt-6 flex items-center gap-2 text-base text-primary">Lire le cas client <ArrowRight className="size-4" /></span></a>)}</div></div></section>

    <section id="avis" className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-16"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-eyebrow">La parole à nos clients</p><h2 className="mt-3 text-3xl font-semibold">Leur expérience avec SecuriTrust</h2></div><span className="flex items-center gap-2 text-base text-muted-foreground"><Star className="size-4 fill-current text-primary" /> Avis Google publiés sur SecuriTrust</span></div><a href="https://www.google.com/maps/search/?api=1&query=SecuriTrust%2011%20rue%20Saint-Didier%2075116%20Paris" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-base text-primary">Voir tous les avis <ArrowRight className="size-4" /></a><div className="mt-8 grid gap-7 md:grid-cols-3">{reviews.map(review => <figure key={review.name} className="border-t border-border pt-5"><div aria-label="5 étoiles sur 5" className="flex gap-1 text-primary">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-current" />)}</div><blockquote className="mt-4 text-base leading-relaxed">{"«\u00a0"}{review.quote.replace(/\s+(\S+)$/, "\u00a0$1")}{"\u00a0»"}</blockquote><figcaption className="mt-5 text-base"><span className="font-semibold">{review.name}</span>{review.company && <span className="mt-1 block text-muted-foreground">{review.company}</span>}</figcaption></figure>)}</div></section>

    <section id="equipe" className="border-y border-border bg-section py-14 md:py-16"><div className="mx-auto max-w-6xl px-5 md:px-6"><p className="section-eyebrow">L’équipe</p><h2 className="mt-3 text-3xl font-semibold">Les personnes derrière votre sécurité</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{team.map(person => <article key={person.name} className="rounded-lg border border-border bg-background p-6"><div className="flex items-center gap-4"><div aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-md bg-secondary font-display text-lg text-accent">{person.initials}</div><h3 className="text-lg font-semibold">{person.name}</h3></div><p className="mt-4 text-base font-medium text-accent">{person.role}</p><p className="mt-3 text-base leading-relaxed text-muted-foreground">{person.description}</p></article>)}</div><a href={`${site}/equipe`} className="mt-6 inline-flex items-center gap-2 text-base text-primary">Rencontrer notre équipe <ArrowRight className="size-4" /></a></div></section>

    <section id="methode" className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-16"><p className="section-eyebrow">Notre méthode</p><h2 className="mt-3 text-3xl font-semibold">De votre besoin à un plan d’action</h2><div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, index) => <div key={step.title} className="border-t border-border pt-5"><span className="font-display text-base text-primary">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{step.title}</h3><p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.description}</p></div>)}</div><p className="mt-7 text-base text-muted-foreground">Un calendrier défini avec vous, selon votre périmètre et vos priorités.</p></section>

    <section id="faq" className="faq-section border-y border-border bg-paper py-14 md:py-16"><div className="mx-auto max-w-6xl px-5 md:px-6"><p className="section-eyebrow">Questions fréquentes</p><h2 className="mt-3 text-3xl font-semibold">Avant notre premier échange</h2><div className="mt-8 max-w-3xl">{faq.map(item => <details key={item.question} open={item === faq[0]} className="group border-b border-border py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium"><span>{item.question}</span><ChevronDown className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180" /></summary><p className="mt-4 text-base leading-relaxed text-muted-foreground">{item.answer}</p><a href={`${site}${item.path}`} className="mt-4 inline-flex items-center gap-2 text-base text-primary">{item.link}<ArrowRight className="size-4" /></a></details>)}</div></div></section>

    <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-16"><h2 className="max-w-2xl text-3xl font-semibold leading-snug">Votre prochain pas : un échange avec un expert.</h2><div className="mt-7 flex flex-wrap items-center gap-5"><Button asChild className="h-12 text-base"><a href="#contact">Être rappelé sous 2 h <ArrowRight /></a></Button><a href={contact.calendar} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground"><CalendarClock className="size-4" /> Réserver un créneau</a></div></section>
    <footer className="border-t border-border bg-card py-10"><div className="mx-auto max-w-6xl px-5 md:px-6"><div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><img src={logo.src} alt="SecuriTrust" loading="lazy" className="h-9 w-28 sm:w-36 object-contain object-left" /><p className="mt-4 text-base leading-relaxed text-muted-foreground">Cabinet de conseil en cybersécurité à Paris depuis 2016.</p><address className="mt-4 grid gap-2 text-base not-italic text-muted-foreground"><span>11 rue Saint-Didier · 75116 Paris</span><a href={contact.phoneHref}>{contact.phone}</a><a href={`mailto:${contact.email}`} className="break-all">{contact.email}</a></address></div>{[{ title: "Expertises", links: [["ISO 27001", "/iso27001"], ["NIS2", "/nis2"], ["DORA", "/dora"], ["Pentest", "/pentest"], ["RSSI externalisé", "/rssi-externalise"]] }, { title: "Cabinet", links: [["Équipe", "/equipe"], ["Certifications", "/certifications"], ["Cas clients", "/cas-clients"], ["Articles", "/articles"], ["Contact", "/contact"]] }, { title: "Informations légales", links: [["Mentions légales", "/mentions-legales"], ["Confidentialité", "/politique-de-confidentialite"], ["Cookies", "/politique-de-cookies"], ["CGV", "/cgv"]] }].map(column => <div key={column.title}><h3 className="text-base font-semibold">{column.title}</h3><div className="mt-4 grid gap-3 text-base text-muted-foreground">{column.links.map(([label, path]) => <a key={path} className="hover:text-foreground" href={`${site}${path}`}>{label}</a>)}</div></div>)}</div><p className="mt-9 border-t border-border pt-5 text-base text-muted-foreground">© 2016–2026 SecuriTrust. Tous droits réservés.</p></div></footer>
  </div>;
}
