// Cas clients où SecuriTrust a tenu la fonction RSSI, affichés sur /rssi-externalise
// et sa LP Google Ads. Calcul côté serveur : seul le résumé part dans le JS client.
import { casBySlug } from '@/content/cas-clients';
import type { CasResume } from '@/components/rssi/RssiLanding';

const CAS_RSSI = [
  'abeille-assurances-rssi-externalise',
  'polyconseil-rssi-externalise-rgpd-iso-27001',
  'afluens-gouvernance-cyber-rgpd-rssi-externalise',
  'cfdp-conformite-dora-iso-27001',
];

export const casRssi = (): CasResume[] =>
  CAS_RSSI.map((slug) => casBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map(({ slug, client, activite, mission, referentiels, chapeau }) => ({ slug, client, activite, mission, referentiels, chapeau }));
