# Suivi des leads (GTM → GA4)

Le site pousse ces événements dans `window.dataLayer` (`public/site-tracking.js`
pour toutes les pages, `src/lib/analytics.ts` pour les formulaires React) :

| Événement          | Quand                                         | Paramètres                                  |
|--------------------|-----------------------------------------------|---------------------------------------------|
| `generate_lead`    | lead enregistré par l'API (réponse 2xx)       | form_id, form_location, lead_service        |
| `lead_form_start`  | 1re saisie dans un formulaire de lead         | form_id, form_location                      |
| `lead_form_error`  | échec d'envoi (réseau / API)                  | form_id, form_location, error_type          |
| `calendly_click`   | clic vers Calendly                            | link_location, link_text, form_location     |
| `calendly_booking` | rendez-vous pris dans le widget (/prise-de-rdv) | form_location                             |
| `phone_click`      | clic sur un lien `tel:`                       | link_location, form_location                |
| `email_click`      | clic sur un lien `mailto:`                    | link_location, form_location                |

`form_id` : `lp_rappel` (landing pages statiques), `contact`, `rssi_rappel`,
`rssi_rappel_en`, `hero_audit`.

## Mise en place dans GTM

1. GTM › Admin › Importer un conteneur › `gtm-import-leads.json`, espace de
   travail existant, option **Fusionner › Renommer les éléments en conflit**.
   Le fichier crée 7 balises « GA4 - … » (ID de mesure G-MX5KFW6M42), 7
   déclencheurs « CE - … » et les variables « DLV - … ».
2. Mode Aperçu : soumettre un formulaire et vérifier `generate_lead`, puis publier.
3. GA4 › Admin › Événements : marquer `generate_lead` (et `calendly_booking`)
   comme **événements clés**. Facultatif : déclarer `form_id`, `lead_service`,
   `link_location` en dimensions personnalisées (portée événement).
4. Google Ads (AW-704286147) : créer une action de conversion « Lead » et une
   balise de conversion déclenchée par `CE - generate_lead` (le libellé de
   conversion n'est connu que dans Google Ads).
