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

## 2026-11-04 — Lot SEO préparé avec Claude (validation humaine, à publier)
- Googlebot ajouté à `htmlLimitedBots` (next.config.js, validé par l'humain) : title,
  description et canonique dans le `<head>` du HTML initial (86 pages React concernées).
- Veille (39 actualités reprises) en noindex et hors du plan du site ; titres d'articles
  et de cas clients sous 65 caractères ; titres de 30 pages raccourcis.
- /pentest repositionnée sur « test d'intrusion » (title, H1, meta, guide pilier, FAQ sans
  montant) ; liens depuis les guides pentest web et AD. /pentest-externe (gelée) inchangée.
- /rssi-externalise : guide dé-sur-optimisé (« RSSI externalisé » 57 → 31 occurrences sur
  la page), seule correction autorisée pendant le gel ; plus rien jusqu'au 15 décembre.
- Attendu : clics sur les requêtes en positions 10–20, remontée de « test d'intrusion »
  (positions 55–75), stabilisation de RSSI externalisé. Contrôle mi-décembre.
- Corrections ajoutées avant publication (Claude, validées par l'humain le 4 novembre) :
  tableaux des guides piliers défilants sous 640 px (/dora débordait à 411 px) ; étiquettes
  « 01 // CERTIFICATION » et « 02 // LIVRABLES » masquées sur mobile et title raccourci
  (77 → 58 caractères) sur /gouvernance-conformite/accompagnement ; titres courts dédiés
  (`SEO_TITLES`, src/lib/blog-store.ts) pour les 6 articles d'expertise dont le title
  dépassait 65 caractères, H1 inchangés ; package-lock.json resynchronisé
  (@anthropic-ai/sdk manquant, aucune version existante modifiée).
- Le lot touche next.config.js et /rssi-externalise (gelée) : validation humaine explicite
  du 4 novembre.

## Entrées

- 2026-11-05 · Claude (demande explicite de l'utilisateur, pages gelées et zones
  interdites) · correctifs de conversion rapides · /, /iso27001, /rssi-externalise,
  en-tête commun · faciliter la demande de devis sur mobile · boutons « Échanger avec
  un expert », « Être rappelé », « Évaluer ma situation », « Demander un échange » et
  « Je veux un RDV » vers le formulaire (#contact) au lieu de Calendly, Calendly en lien
  secondaire ; bouton fixe « Être rappelé sous 2h » sur mobile (accueil, ISO 27001),
  décalé pour ne plus être masqué par le badge Axeptio (idem /rssi-externalise) ;
  téléphone cliquable dans l'en-tête sous 1 200 px ; case de consentement obligatoire
  retirée du formulaire RSSI (base légale : mesures précontractuelles, art. 6.1.b RGPD).
  À aligner : la politique de confidentialité cite encore le consentement pour les
  formulaires (page légale, validation humaine requise).

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

- 2026-11-09 · Claude (demande explicite de l'utilisateur, suppression de page et
  next.config.js) · fusion de /cybersecurite-operationnelle dans /pentest et title de
  /services · /pentest, /services, /cybersecurite-operationnelle (301 → /pentest),
  /pentest-ad (lien retiré) · recommandations ChatSEO du 9 novembre : page faible (305
  mots) qui doublonnait /pentest, et /services en concurrence avec l'accueil sur
  « prestataire cybersécurité » · section « Quel test pour quel enjeu ? » sur /pentest
  (contenu repris de l'ancienne page, rien d'ajouté) ; anciennes sous-pages et
  /protection-ransomware redirigées directement vers /pentest ; title /services
  « Services cybersécurité : audit, pentest et RSSI ». Non fait : canonique de
  /dpo-externalise et /rssi-externalise, déjà présente dans le HTML serveur (faux positif
  ChatSEO). Le H1 de /services contient encore « prestataire en cybersécurité ».
  Attendu : /pentest consolide les signaux de l'ancienne URL ; l'accueil seul sur
  « prestataire cybersécurité ». Contrôle mi-décembre.

- 2026-11-09 · Claude (demande explicite de l'utilisateur) · pentest web, mobile et Active
  Directory présentés séparément · /pentest (grille des tests et section enjeux),
  /audit-code-source (maillage) · la carte « Pentest Web & Mobile » de /pentest renvoyait
  le web et le mobile vers /pentest-web, et /pentest-ad n'avait pas de carte : la page hub
  ne transmettait pas de lien distinct à /pentest-mobile et /pentest-ad · une carte par
  page (web, mobile, AD), descriptions reprises des meta descriptions de chaque page.
  Attendu : chaque page de pentest reçoit son propre lien depuis la page hub.

- 2026-11-09 · Claude (demande explicite de l'utilisateur, zones interdites : suivi et
  consentement, API, dépendances) · PostHog installé par le wizard (PR #3), corrigé avant
  publication · toutes les pages · analyse des parcours, heatmaps, enregistrement de
  sessions, erreurs JavaScript, logs serveur et suivi des appels Claude · corrections :
  dépendances manquantes ajoutées (posthog-node, @posthog/ai, OpenTelemetry) et
  package-lock.json régénéré (le build aurait échoué) ; mode sans cookie par défaut et
  opt-in via le service « posthog » d'Axeptio ; chargement différé ; pages statiques
  couvertes (public/site-tracking.js, clé lue via GET /api/contact) ; e-mail et nom des
  acheteurs de formations retirés, identification seulement après consentement ;
  contenu des prompts Claude jamais envoyé (privacyMode) ; instrumentation-client.ts
  déplacé dans src/ (ignoré à la racine), logs serveur déplacés dans src/lib/posthog-logs.ts.
  Logique de paiement Stripe inchangée (ajout de logs seulement). À faire côté humain :
  variables Vercel NEXT_PUBLIC_POSTHOG_KEY et NEXT_PUBLIC_POSTHOG_HOST, « Cookieless
  server hash mode » dans PostHog, service « posthog » dans Axeptio, mention dans la
  politique de cookies (page légale). Constat : le projet Axeptio publié ne contient aucun
  service ni étape Consent Mode ; le consentement GA4 n'est probablement jamais accordé.

- 2026-11-09 · Claude (demande explicite de l'utilisateur, validation de la direction pour
  les montants et pour la page gelée /pentest-externe) · tarifs indicatifs des tests
  d'intrusion · /pentest (section « Quel est le prix d'un test d'intrusion ? » + FAQ),
  /pentest-web (FAQ), /pentest-externe (FAQ, bandeau du haut, appel à l'action),
  /pentest-interne (bloc tarif + FAQ avec données structurées FAQPage), meta descriptions
  des 4 pages, exception ajoutée à la règle 2 de CLAUDE.md · fourchettes HT : web 3 500 à
  5 500 €, externe 2 000 à 3 500 €, interne 2 500 à 4 500 €, combiné web + infrastructure
  5 000 à 9 000 € · capter les requêtes « prix / tarif / combien coûte un pentest » et
  améliorer le CTR (montants visibles dans les extraits) tout en qualifiant les leads.
  /pentest-externe est gelée jusqu'au 15 décembre : modification validée par l'humain,
  contenu existant inchangé (ajouts seulement). Attendu : hausse du CTR des 4 pages et
  impressions sur les requêtes de prix. Contrôle mi-décembre.

- 2026-11-09 · Claude (demande explicite de l'utilisateur ; tarif validé par la direction,
  remplace l'arbitrage « pas de TJM affiché » ; modification de la page gelée
  /rssi-externalise validée par l'humain) · tarif journalier du RSSI externalisé ·
  /rssi-externalise (encadré « 850 € HT par jour » dans la section prix, texte du prix,
  ligne « Coût » du comparatif, phrase sur l'expérience dans « Expertise », FAQ « Combien
  coûte un RSSI externalisé ? »), meta description, CLAUDE.md · RSSI senior, plus de
  5 ans d'expérience, multi-certifié, 850 € HT par jour · répondre aux recherches de prix
  et qualifier les demandes. La LP Google Ads /lp/rssi-externalise (même composant) reste
  sans montant (variant "ads"). Attention : la page était en évaluation Google jusqu'au
  15 décembre, l'effet de la refonte du 2 novembre ne pourra plus être isolé. Contrôle
  mi-décembre.

- 2026-11-12 · Claude (demande explicite de l'utilisateur) · charte graphique alignée
  sur le logo, sur tout le site (pages gelées comprises, validé par l'utilisateur :
  seules les couleurs changent, aucun texte) : accents cyan → #80ace1, boutons orange →
  ardoise #496383 avec texte blanc, fond sombre conservé. Échelles Tailwind cyan/sky/
  blue/orange/amber/yellow recalées sur ces deux couleurs. Contrastes AA vérifiés.
