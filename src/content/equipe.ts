// Experts du cabinet (page /equipe, tâche J2.4).
// Faits issus de sources publiques (registre, profils publics). Les certifications
// individuelles et les photos ne sont PAS renseignées ici tant qu'elles ne sont pas
// confirmées par chaque expert : on n'affiche que ce qui est vérifié.

export type Expert = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  alumniOf?: string;
  /** Certifications confirmées par l'intéressé ; vide tant que non validé. */
  certifications?: string[];
};

export const EXPERTS: Expert[] = [
  {
    slug: 'jad-joumblat',
    name: 'Jad Joumblat',
    role: 'Président & fondateur',
    bio: "Jad a fondé SecuriTrust en 2016. Il dirige le cabinet et pilote les missions à forts enjeux — RSSI externalisé, conformité et accompagnement des directions sur leur stratégie de cybersécurité.",
    linkedin: 'https://www.linkedin.com/company/securitrust',
  },
  {
    slug: 'brice-gilbert',
    name: 'Brice Gilbert',
    role: 'Consultant senior — Gouvernance, Risques & Conformité',
    bio: "Brice accompagne les organisations sur la mise en conformité et la gestion des risques : NIS2, DORA, ISO 27001. Diplômé de l'École Centrale de Nantes.",
    linkedin: 'https://fr.linkedin.com/in/brice-gilbert-cyber',
    alumniOf: 'École Centrale de Nantes',
  },
  {
    slug: 'camelia-megherbi',
    name: 'Camelia Megherbi',
    role: 'Consultante cybersécurité',
    bio: "Camelia intervient sur les missions de cybersécurité et de conformité du cabinet, aux côtés des équipes clientes.",
    linkedin: 'https://www.linkedin.com/in/camelia-megherbi/',
  },
];

/** Initiales pour l'avatar (pas de photo tant qu'elle n'est pas fournie). */
export const initials = (name: string) =>
  name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
