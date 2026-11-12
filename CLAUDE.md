# securitrust.fr — règles pour les agents (humains et IA)

Site du cabinet de conseil en cybersécurité SecuriTrust (Paris 16e, depuis 2016).
Next.js 16 (App Router) déployé sur Vercel ; chaque push sur `main` part en production.
Langue du site et des messages de commit : **français**.

## Architecture en bref

- Pages React : `src/app/**/page.tsx`. Pages statiques : `public/*.html` (accueil, nis2,
  dora, iso27001, hds, tisax, rgpd, audit-o365, pentest-web/ad/mobile), servies par
  réécritures (`next.config.js`).
- `npm run chrome:sync` (`scripts/sync-site-chrome.mjs`) réinjecte dans les pages
  statiques l'en-tête, le pied de page, les guides piliers (`src/site-chrome/pillars/*.mjs`),
  les meta descriptions et les empreintes CSP. **À lancer après toute modification**
  de `src/site-chrome/**` ou de `public/*.html`, puis commiter les fichiers régénérés.
- Meta descriptions : source unique `src/site-chrome/meta-descriptions.mjs`
  (160 caractères maximum, toutes différentes : le script échoue sinon).
- Fil d'Ariane : `src/site-chrome/schema.mjs` (PAGES). Redirections : `next.config.js`.
- Plan du site : `src/app/sitemap.ts` + `npm run sitemap:lastmod` (dates de dernier commit).
- Cas clients : `src/content/cas-clients.ts`. Équipe : `src/content/equipe.ts`.
- Articles : `src/content/blog-articles.json` (copie de la base). **Ne jamais lancer
  `npm run blog:export`** : il écrase cette copie. Maillage articles → offres :
  `ARTICLE_SERVICES` dans `src/lib/blog-store.ts`.
- Identité visuelle de référence : la page `/rssi-externalise`
  (`src/components/rssi/RssiLanding.tsx`, `src/app/rssi-externalise/lp*.css`) et le
  gabarit `StaticThemeShell` + `src/styles/static-theme.css`.

## Règles éditoriales (non négociables)

1. **Rien d'inventé.** Pas de chiffre, de client, de certification, de témoignage, de
   date ou de résultat qui ne figure pas déjà dans le dépôt ou qui n'a pas été fourni par
   SecuriTrust. En cas de doute, ne pas écrire : le signaler dans le rapport.
2. **Aucun montant** (TJM, prix, budget en euros pour SecuriTrust) : arbitrage de la
   direction. Exceptions publiées : le coût d'un RSSI salarié (80 000 à
   120 000 € chargés par an) dans les comparatifs, et les tarifs indicatifs HT des tests
   d'intrusion validés par la direction le 9 novembre 2026 — pentest web 3 500 à
   5 500 €, externe 2 000 à 3 500 €, interne 2 500 à 4 500 €, audit combiné (web +
   infrastructure) 5 000 à 9 000 € — sur /pentest, /pentest-web, /pentest-externe et
   /pentest-interne ; le tarif journalier du RSSI externalisé, 850 € HT par jour (RSSI
   senior, plus de 5 ans d'expérience, multi-certifié), validé le 9 novembre 2026, sur
   /rssi-externalise uniquement (pas sur la LP Ads). Ne pas en créer d'autres ni les
   modifier sans nouvelle validation.
3. **Cas clients** : ni prix, ni dates, ni nombre de jours ; jamais de lien entre un
   client nommé et un test d'intrusion, une vulnérabilité ou un incident. On parle
   d'« audit de sécurité » et d'« accompagnement ».
4. **Auteurs** : seuls Jad Joumblat (président-fondateur) et Brice Gilbert (consultant
   senior GRC) signent, et seulement les contenus qui leur ont été attribués. Ne pas
   ajouter de certification individuelle non confirmée.
5. Ton professionnel, sans familiarité ni superlatifs. Faits réglementaires (NIS2, DORA,
   ISO 27001, RGPD…) vérifiés sur une source officielle avant publication.
6. Pas de nouvelle page qui viserait la même requête qu'une page existante
   (cannibalisation) : enrichir la page existante.

## Zones interdites aux agents autonomes

Ne pas modifier sans validation humaine explicite :
- suivi et consentement : `GTM_LOADER` et `GTM_ID` (`src/site-chrome/chrome.mjs`),
  `src/lib/analytics.ts`, `public/site-tracking.js`, conteneur GTM-NB64TX95 ;
- `src/site-chrome/csp.mjs`, `middleware.ts`, `next.config.js` (sauf ajout d'une
  redirection 301 vers une page existante) ;
- tout `src/app/api/**`, `src/lib/leads-store.ts`, `src/db/**`, formulaires et LeadForm ;
- pages légales (mentions, confidentialité, cookies, CGV), `/lp/**` (Google Ads),
  `/admin-stats`, `/en/**`, `package.json`, dépendances ;
- suppression d'une page, d'une redirection ou d'un cas client.

Pages refaites, **gelées jusqu'au 15 décembre 2026** (évaluation Google en cours) :
`/` (public/index.html), `/rssi-externalise`, `/audit-cybersecurite`,
`/dpo-externalise`, `/pentest-externe`.

## Procédure de publication (agents autonomes)

1. Partir de `main` à jour. Un seul sujet par exécution, **5 fichiers de contenu au plus**.
2. Après modification : `npm run chrome:sync` si besoin, puis un build complet :
   `TURSO_CONNECTION_URL=file:/tmp/qa.db TURSO_AUTH_TOKEN=x STRIPE_SECRET_KEY=sk_test_x
   STRIPE_WEBHOOK_SECRET=whsec_x RESEND_API_KEY=re_x npx next build` (les erreurs « no such
   table: articles » sont normales en local). **Build en échec = pas de push.**
3. Vérifier en local (`npx next start`) que chaque page touchée répond 200, garde son
   title, son H1 et sa canonique, et ne déborde pas à 390 px de large.
4. Commit en français décrivant le pourquoi, puis `npm run sitemap:lastmod` et
   `git commit --amend --no-edit` avec `src/site-chrome/generated/lastmod.json`.
5. Push sur `main`, puis contrôle en production 3 minutes après (200, contenu présent).
   En cas de problème : `git revert` immédiat et alerte dans le rapport.
6. Consigner l'action dans `docs/seo-agents/journal.md` (date, agent, quoi, pourquoi,
   pages, résultat attendu).
7. Toute modification touchant une zone interdite : ne pas pousser ; décrire le
   correctif proposé dans le rapport.

## Données

Via les API Google (Supermetrics n'est plus utilisé depuis le 12 novembre 2026), avec
`scripts/seo_data.py` et le compte de service en lecture seule
`seo-agents@securitrust-seo.iam.gserviceaccount.com` (clé dans la variable
d'environnement `GOOGLE_SA_KEY_B64`, jamais dans le dépôt) :
- Search Console : `python3 scripts/seo_data.py gsc --days 28 --dims query` (propriété
  `sc-domain:securitrust.fr` ; données disponibles avec 2 à 3 jours de retard).
- Google Analytics 4 : `python3 scripts/seo_data.py ga4 --days 7 --dims sessionDefaultChannelGroup`
  (propriété `543893918` ; événement clé `generate_lead`, filtre `--event generate_lead`).
- Google Ads (AW-704286147) : pas encore relié.
Le domaine canonique est `https://www.securitrust.fr` (l'ancienne adresse sans www
redirige en 308 ; Google consolide encore).

Historique des décisions et des actions : `docs/seo-agents/journal.md`.
