"use client";

import { useEffect, useRef } from "react";
import { isOfficialOrigin } from "@/lib/accueil-v2/securitrust-contact";

type Turnstile = { render: (container: HTMLElement, options: { sitekey: string; appearance: string; language: string; action: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile; } }

export function ContactCaptcha({ active, reset, onToken }: { active: boolean; reset: number; onToken: (token: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || !isOfficialOrigin(window.location.origin)) return;
    let cancelled = false;
    let widget: string | undefined;
    onToken("");
    async function load() {
      try {
        const response = await fetch("/api/contact");
        if (!response.ok) return;
        const config: unknown = await response.json();
        if (!config || typeof config !== "object" || !("turnstileSiteKey" in config) || typeof config.turnstileSiteKey !== "string" || !config.turnstileSiteKey) return;
        if (!window.turnstile) await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          script.onload = () => resolve(); script.onerror = () => reject(new Error("captcha"));
          document.head.appendChild(script);
        });
        if (cancelled || !box.current || !window.turnstile) return;
        widget = window.turnstile.render(box.current, { sitekey: config.turnstileSiteKey, appearance: "interaction-only", language: "fr", action: "lead", callback: onToken, "expired-callback": () => onToken(""), "error-callback": () => onToken("") });
      } catch { onToken(""); }
    }
    void load();
    return () => { cancelled = true; if (widget) window.turnstile?.remove(widget); };
  }, [active, reset, onToken]);
  return <div ref={box} className="max-w-full overflow-hidden" />;
}