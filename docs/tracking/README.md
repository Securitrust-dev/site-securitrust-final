# Suivi des leads (GTM → GA4)

Le site pousse ces événements dans `window.dataLayer` (`public/site-tracking.js`
pour toutes les pages, `src/lib/analytics.ts` pour les formulaires React) :

| Événement          | Quand                                         | Paramètres                                  |
|--------------------|-----------------------------------------------|---------------------------------------------|
| `generate_lead`    | lead enregistré par l'API (réponse 2xx)       | form_id, form_location, lead_service, lead_id, user_data |
| `lead_form_start`  | 1re saisie dans un formulaire de lead         | form_id, form_location                      |
| `lead_form_error`  | échec d'envoi (réseau / API)                  | form_id, form_location, error_type          |
| `calendly_click`   | clic vers Calendly                            | link_location, link_text, form_location     |
| `calendly_booking` | rendez-vous pris dans le widget (/prise-de-rdv) | form_location                             |
| `phone_click`      | clic sur un lien `tel:`                       | link_location, form_location                |
| `email_click`      | clic sur un lien `mailto:`                    | link_location, form_location                |

`form_id` : `lp_rappel` (landing pages statiques), `contact`, `rssi_rappel`,
`rssi_rappel_ads` (LP Google Ads /lp/rssi-externalise), `rssi_rappel_en`, `hero_audit`.

## Conteneur GTM-NB64TX95 (depuis le 2 novembre 2026)

Le site charge le conteneur **GTM-NB64TX95** (compte Tag Manager « Analyse SEO »).
L'ancien conteneur GTM-P5D5S5WJ, auquel SecuriTrust n'avait plus accès, n'est plus
chargé ; ses balises défectueuses (conversion Ads sur tout envoi de formulaire,
conversion au premier clic dans le champ « nom ») ne tournent donc plus.

Le bandeau **Axeptio** n'est plus injecté par GTM : le site le charge lui-même
(`GTM_LOADER` dans `src/site-chrome/chrome.mjs`), avec le mode consentement Google v2
(tout refusé par défaut, mis à jour par Axeptio au choix du visiteur).

### Mise en place (à faire une fois)

1. GTM › conteneur GTM-NB64TX95 › Administration › **Importer un conteneur** ›
   `gtm-NB64TX95-import.json`, espace de travail existant, **Fusionner › Renommer
   les éléments en conflit**. Le fichier crée :
   - « Google tag - GA4 » (G-MX5KFW6M42) et « Google tag - Google Ads » (AW-704286147),
     déclenchés à l'initialisation de toutes les pages ;
   - « Conversion Linker » (conserve le clic Google Ads) ;
   - 7 balises « GA4 - … » (generate_lead, lead_form_start, lead_form_error,
     calendly_click, calendly_booking, phone_click, email_click) ;
   - « Google Ads - Lead confirmé (generate_lead) » : libellé `sQTFCPDZys0cEMOb6s8C`,
     ID de transaction = `lead_id` ;
   - « Google Ads - Début de saisie (lead_form_start) » : libellé `umWQCMP6_dUcEMOb6s8C`.
2. **Envoyer › Publier** (avant la mise en ligne du code qui charge ce conteneur).
3. GA4 › Admin › Événements : `generate_lead` (et `calendly_booking`) en **événements clés**.
4. Google Ads › Objectifs › Conversions : action `sQTFCPDZys0cEMOb6s8C` en **principale**,
   action `umWQCMP6_dUcEMOb6s8C` en **secondaire**.
5. Facultatif, conversions améliorées : dans « Google Ads - Lead confirmé », cocher
   « Inclure les données fournies par l'utilisateur » › variable « Données fournies
   par l'utilisateur » › manuelle › E-mail `{{DLV - user_data.email}}`, Téléphone
   `{{DLV - user_data.phone_number}}` ; puis activer les conversions améliorées dans
   Google Ads (Objectifs › Conversions › Paramètres).

`generate_lead` porte `lead_id` (identifiant du lead, aussi dans l'e-mail reçu et
dans /admin-stats) et `user_data` (e-mail et téléphone, hachés par Google avant envoi,
vidés du dataLayer juste après). `gtm-import-leads.json` est l'ancien fichier prévu
pour GTM-P5D5S5WJ, conservé pour mémoire.
