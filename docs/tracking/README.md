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

## Mise en place dans GTM (mise à jour du 2 novembre 2026)

État constaté sur le conteneur publié (GTM-P5D5S5WJ) :
- aucune balise GA4 d'événement : GA4 ne reçoit aucun lead ;
- conversion Google Ads `sQTFCPDZys0cEMOb6s8C` déclenchée par « Envoi de
  formulaire » sur **tous** les formulaires (recherche du blog, paiement des
  formations, login admin…), avant même la réponse de l'API ;
- conversion Google Ads `umWQCMP6_dUcEMOb6s8C` déclenchée au premier clic dans
  le champ « nom » (début de saisie).

Étapes :

1. GTM › Admin › Importer un conteneur › `gtm-import-leads.json`, espace de
   travail existant, option **Fusionner › Renommer les éléments en conflit**.
   Le fichier crée 7 balises « GA4 - … » (ID de mesure G-MX5KFW6M42), la balise
   **« Google Ads - Lead confirmé (generate_lead) »** (même libellé de conversion
   `sQTFCPDZys0cEMOb6s8C`, ID de transaction = `lead_id` pour le dédoublonnage),
   7 déclencheurs « CE - … » et les variables « DLV - … ».
2. **Mettre en pause l'ancienne balise de conversion Ads** déclenchée par
   « Envoi de formulaire » (même libellé `sQTFCPDZys0cEMOb6s8C`) : sinon chaque
   lead compte deux fois et les faux envois continuent.
3. Conversions améliorées : dans la nouvelle balise Ads, cocher « Inclure les
   données fournies par l'utilisateur » › nouvelle variable « Données fournies par
   l'utilisateur » › Configuration manuelle › E-mail = `{{DLV - user_data.email}}`,
   Téléphone = `{{DLV - user_data.phone_number}}`. Dans Google Ads : Objectifs ›
   Conversions › Paramètres › activer les conversions améliorées (via GTM).
4. Mode Aperçu : envoyer un vrai formulaire et vérifier que `generate_lead`
   déclenche « GA4 - generate_lead » et « Google Ads - Lead confirmé », puis **publier**.
5. GA4 › Admin › Événements : marquer `generate_lead` (et `calendly_booking`)
   comme **événements clés**. Facultatif : dimensions personnalisées `form_id`,
   `lead_service`, `link_location` (portée événement).
6. Google Ads › Objectifs › Conversions : l'action liée à `sQTFCPDZys0cEMOb6s8C`
   en **principale** ; celle de `umWQCMP6_dUcEMOb6s8C` (début de saisie) en
   **secondaire**. Lier GA4 et Google Ads (GA4 › Admin › Association Google Ads).

`generate_lead` porte désormais `lead_id` (identifiant du lead, aussi visible
dans l'e-mail reçu et dans /admin-stats) et `user_data` (e-mail et téléphone,
hachés par GTM avant envoi, vidés du dataLayer juste après).
