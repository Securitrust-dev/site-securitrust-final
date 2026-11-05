# Journal des agents SEO

Une entrée par action publiée ou proposée, la plus récente en haut :
`AAAA-MM-JJ · agent · action · pages · pourquoi · résultat attendu`.

## Contexte de départ (3 novembre 2026)

- Refonte SEO du 26 octobre au 3 novembre 2026 : fusion de ~20 pages faibles (301),
  pages refaites (accueil, RSSI externalisé, audit, DPO, pentest externe), 23 cas
  clients, avis Google, identité visuelle unifiée, chargement différé des scripts
  tiers (score mobile ~55 → ~90), conteneur GTM-NB64TX95, suivi `generate_lead`.
- Repères Search Console (28 jours au 2 novembre) : ~370 impressions/jour avant, ~590
  après ; « entreprise sécurité informatique paris » position ~4 ; « rssi externalisé »
  position ~35 ; nombreuses positions 1–4 sur l'ancienne adresse sans www sans clic
  (citations probables dans l'Aperçu IA de Google).
- Priorités suivantes : `/gouvernance-conformite/accompagnement` (153 impressions,
  position 36), `/pentest-mobile` (« audit application mobile », 112 impressions,
  position 44), pages pentest en positions 50–90, enrichissement des 7 articles de fond,
  liens externes (ExpertCyber, CLUSIF, AFNOR, Polyvia).
- En attente côté humain : clé Resend (envoi des e-mails de leads en échec), base Turso
  (sauvegarde des leads et /admin-stats en échec), rotation des secrets présents dans
  l'historique Git (le dépôt est public).

## Entrées

- 2026-11-05 · Claude (demande explicite de l'utilisateur, zones interdites) · filtre des
  adresses e-mail non professionnelles sur tous les formulaires de demande · /contact,
  pages d'offre (LeadForm), /rssi-externalise, /lp/rssi-externalise, /en/outsourced-ciso,
  formulaire hero, pages statiques, /api/contact, /api/lead · ne recevoir que des leads
  professionnels · messageries grand public, FAI, adresses jetables et domaines factices
  bloqués dans le navigateur (message au visiteur) et refusés par le serveur (422
  personal_email, rien n'est enregistré ni transmis). Source unique : src/lib/email-pro.ts.

- 2026-11-05 · Claude (validation humaine explicite, zones interdites) · captcha anti-spam
  Cloudflare Turnstile sur tous les formulaires de demande · /contact, pages d'offre
  (LeadForm), /rssi-externalise, /lp/rssi-externalise, /en/outsourced-ciso, formulaires
  des pages statiques (site-tracking.js), /api/contact, /api/lead, CSP · bloquer le spam
  des formulaires sans gêner les prospects (widget invisible sauf défi, chargé à la
  première interaction) · captcha inactif tant que NEXT_PUBLIC_TURNSTILE_SITE_KEY et
  TURNSTILE_SECRET_KEY ne sont pas définies dans Vercel, puis demandes sans jeton valide
  refusées (403 captcha_failed). Constat hors périmètre : /dora déborde déjà de 21 px à
  390 px (tableau), à corriger séparément.
