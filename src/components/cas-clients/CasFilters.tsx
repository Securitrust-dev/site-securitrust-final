'use client';

import { useState } from 'react';
import { CAS_CLIENTS, OFFRES, SECTEURS, type OffreKey, type SecteurKey } from '@/content/cas-clients';
import { CasCard } from './CasCard';

// Tous les cas sont rendus côté serveur (indexables) ; les filtres ne font que masquer.
export function CasFilters() {
  const [offre, setOffre] = useState<OffreKey | null>(null);
  const [secteur, setSecteur] = useState<SecteurKey | null>(null);

  const usedOffres = (Object.keys(OFFRES) as OffreKey[]).filter((o) => CAS_CLIENTS.some((c) => c.offres.includes(o)));
  const usedSecteurs = (Object.keys(SECTEURS) as SecteurKey[]).filter((s) => CAS_CLIENTS.some((c) => c.secteur === s));
  const visible = CAS_CLIENTS.filter(
    (c) => (!offre || c.offres.includes(offre)) && (!secteur || c.secteur === secteur),
  );

  return (
    <>
      <div className="case-filters" role="group" aria-label="Filtrer par expertise">
        <span className="case-filters-label">Expertise</span>
        <button type="button" className="chip" aria-pressed={offre === null} onClick={() => setOffre(null)}>Toutes</button>
        {usedOffres.map((o) => (
          <button key={o} type="button" className="chip" aria-pressed={offre === o} onClick={() => setOffre(offre === o ? null : o)}>
            {OFFRES[o].label}
          </button>
        ))}
      </div>
      <div className="case-filters" role="group" aria-label="Filtrer par secteur">
        <span className="case-filters-label">Secteur</span>
        <button type="button" className="chip" aria-pressed={secteur === null} onClick={() => setSecteur(null)}>Tous</button>
        {usedSecteurs.map((s) => (
          <button key={s} type="button" className="chip" aria-pressed={secteur === s} onClick={() => setSecteur(secteur === s ? null : s)}>
            {SECTEURS[s].label}
          </button>
        ))}
      </div>
      <p className="case-count" aria-live="polite">
        {visible.length} cas client{visible.length > 1 ? 's' : ''}
      </p>
      <div className="case-grid">
        {visible.map((c) => (
          <CasCard key={c.slug} cas={c} />
        ))}
      </div>
    </>
  );
}
