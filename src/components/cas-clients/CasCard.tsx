import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { OFFRES, SECTEURS, type CasClient } from '@/content/cas-clients';

export function CasCard({ cas }: { cas: CasClient }) {
  return (
    <Link href={`/cas-clients/${cas.slug}`} className="case-card">
      <span className="case-sector">{SECTEURS[cas.secteur].label}</span>
      <span className="case-client">{cas.client}</span>
      <span className="case-mission">{cas.mission.charAt(0).toUpperCase() + cas.mission.slice(1)}</span>
      <span className="case-tags">
        {cas.offres.map((o) => (
          <span key={o} className="case-tag">{OFFRES[o].label}</span>
        ))}
      </span>
      <span className="case-more">
        Lire le cas client <ArrowRight size={14} />
      </span>
    </Link>
  );
}
