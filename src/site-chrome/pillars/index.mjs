// Registre des pages piliers (gabarit J2.3). Chaque pilier décrit son contenu de guide ;
// le rendu commun est dans ../pillar-render.mjs.

import nis2 from './nis2.mjs';
import dora from './dora.mjs';
import iso27001 from './iso27001.mjs';
import pentestWeb from './pentest-web.mjs';
import auditO365 from './audit-o365.mjs';
import pentestAd from './pentest-ad.mjs';
import tisax from './tisax.mjs';
import rssiExternalise from './rssi-externalise.mjs';

export const PILLARS = [nis2, dora, iso27001, pentestWeb, auditO365, pentestAd, tisax, rssiExternalise];

/** Piliers rendus dans une landing page statique public/*.html (file non nul). */
export const STATIC_PILLARS = PILLARS.filter((p) => p.file);

export const pillarBySlug = (slug) => PILLARS.find((p) => p.slug === slug) || null;
