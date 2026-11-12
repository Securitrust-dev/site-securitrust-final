"use client";

import { useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/accueil-v2/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/accueil-v2/ui/popover";
import { contact } from "@/lib/accueil-v2/securitrust-content";
import logo from "@/assets/accueil-v2/logo-securitrust-original.png";

const site = "https://www.securitrust.fr";
const groups = [
  { title: "Certifier", links: [["ISO 27001", "/iso27001"], ["TISAX", "/tisax"], ["HDS", "/hds"]] },
  { title: "Se conformer", links: [["NIS2", "/nis2"], ["DORA", "/dora"], ["RGPD", "/rgpd"]] },
  { title: "Tester", links: [["Pentest web", "/pentest-web"], ["Pentest externe", "/pentest-externe"], ["Pentest interne", "/pentest-interne"], ["Active Directory", "/pentest-ad"], ["Microsoft 365", "/audit-o365"]] },
  { title: "Piloter", links: [["RSSI externalisé", "/rssi-externalise"], ["DPO externalisé", "/dpo-externalise"], ["Audit cybersécurité", "/audit-cybersecurite"]] },
];
const pages = [["Cas clients", "/cas-clients"], ["Le cabinet", "/equipe"], ["Ressources", "/articles"]];

export function SecuriTrustHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <header className="sticky top-0 z-30 border-b border-border bg-background">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 md:px-6">
      <a href="/" aria-label="SecuriTrust, accueil" className="shrink-0"><img src={logo.src} alt="SecuriTrust" className="h-9 w-28 object-contain object-left sm:w-36" /></a>
      <nav aria-label="Navigation principale" className="hidden items-center gap-4 text-base text-muted-foreground lg:flex">
        <Popover><PopoverTrigger asChild><Button variant="ghost" className="h-11 px-2 text-base text-muted-foreground hover:bg-secondary hover:text-foreground">Expertises <ChevronDown /></Button></PopoverTrigger>
          <PopoverContent align="start" sideOffset={20} className="grid w-[min(800px,calc(100vw-48px))] grid-cols-4 gap-6 p-6 text-base" aria-label="Nos expertises">
            {groups.map(group => <div key={group.title}><p className="mb-4 font-semibold text-accent">{group.title}</p><div className="grid gap-3">{group.links.map(([label, path]) => <a key={path} href={`${site}${path}`} className="leading-relaxed hover:text-primary">{label}</a>)}</div></div>)}
          </PopoverContent>
        </Popover>
        {pages.map(([label, path]) => <a key={path} href={`${site}${path}`} className="py-3 hover:text-foreground">{label}</a>)}
      </nav>
      <a href={contact.phoneHref} className="hidden shrink-0 items-center gap-2 text-base text-muted-foreground hover:text-foreground sm:flex"><Phone className="size-4" /><span>{contact.phone}</span></a>
      <Button asChild className="h-11 shrink-0 px-3 text-base"><a href="#contact" onClick={() => setMobileOpen(false)}>Être rappelé</a></Button>
      <Button size="icon" variant="ghost" aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={mobileOpen} aria-controls="navigation-mobile" onClick={() => setMobileOpen(!mobileOpen)} className="min-h-11 min-w-11 lg:hidden">{mobileOpen ? <X /> : <Menu />}</Button>
    </div>
    {mobileOpen && <nav id="navigation-mobile" aria-label="Navigation mobile" className="absolute inset-x-0 top-full max-h-[calc(100dvh-77px)] overflow-y-auto border-b border-border bg-background px-5 py-4 lg:hidden">
      <details className="group border-b border-border"><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-semibold">Expertises <ChevronDown className="size-5 transition-transform group-open:rotate-180" /></summary>
        <div className="pb-3">{groups.map(group => <details key={group.title} className="group/category border-t border-border"><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-accent">{group.title}<ChevronDown className="size-4 transition-transform group-open/category:rotate-180" /></summary><div className="grid pb-3 pl-3">{group.links.map(([label,path]) => <a key={path} href={`${site}${path}`} className="py-3 text-base text-muted-foreground hover:text-foreground">{label}</a>)}</div></details>)}</div>
      </details>
      {pages.map(([label,path]) => <a key={path} href={`${site}${path}`} className="block border-b border-border py-4">{label}</a>)}
      <a href={contact.phoneHref} className="flex items-center gap-2 py-4 text-muted-foreground"><Phone className="size-4" />{contact.phone}</a>
    </nav>}
  </header>;
}