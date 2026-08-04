import Link from 'next/link';
import { Users, Lightbulb, Award, Target, BrainCircuit, Hammer, Rocket, ArrowRight } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { InternalLinks } from '@/components/InternalLinks';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';

export default function NousRejoindre() {
  const positions = [
    {
      slug: 'consultant-junior-cybersecurite',
      icon: BrainCircuit,
      category: 'Junior',
      title: 'Consultant(e) Junior Cybersécurité',
      description: 'Pour les talents en début de parcours, motivés à apprendre et à relever de nouveaux défis techniques et stratégiques.'
    },
    {
      slug: 'consultant-senior-cybersecurite',
      icon: Hammer,
      category: 'Senior',
      title: 'Consultant(e) Senior Cybersécurité',
      description: 'Tu veux évoluer dans un environnement dynamique, au cœur des enjeux cyber des grandes organisations ? Rejoins une équipe engagée, experte et passionnée !'
    },
    {
      slug: 'manager-cybersecurite',
      icon: Rocket,
      category: 'Manager',
      title: 'Manager Cybersécurité',
      description: 'Pour les leaders confirmés souhaitant piloter des équipes et faire grandir les talents.'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Esprit d\'équipe',
      description: 'Nous croyons que les plus grandes réussites naissent de la collaboration. Chez SecuriTrust, chaque collaborateur participe à la compétence de ses collègues.'
    },
    {
      icon: Lightbulb,
      title: 'Montée en compétences',
      description: 'Nous accompagnons chacun dans le développement continu de ses compétences techniques et managériales, pour grandir et se perfectionner.'
    },
    {
      icon: Award,
      title: 'Cadre',
      description: 'Vous rejoindrez une équipe à taille humaine, dans un cadre de travail clair et structuré, propice à la concentration et au bien-être.'
    },
    {
      icon: Target,
      title: 'Expertise',
      description: 'Chez SecuriTrust, l\'expertise n\'est pas un acquis, c\'est un engagement. Nous œuvrons en faveur du niveau de pratique le plus élevé qui s\'élève.'
    }
  ];

  return (
    <StaticThemeShell active="nous-rejoindre">
      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <span className="now">Nous rejoindre</span>
          </p>
          <h1>Carrières</h1>
          <p className="hero-sub">
            Partagez plus qu&apos;un métier : une vision. Rejoignez une équipe passionnée où l&apos;excellence du service est la norme.
            SecuriTrust s&apos;engage à être le catalyseur de votre carrière en vous offrant un espace où liberté d&apos;action rime
            avec évolution constante. Venez laisser votre empreinte dans la cybersécurité.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Équipe</span>
            <h2>Postes disponibles</h2>
          </div>

          <div className="grid-3">
            {positions.map((position, index) => {
              const Icon = position.icon;
              return (
                <div key={index} className="pilier reveal">
                  <div className="pilier-icon">
                    <Icon size={22} />
                  </div>
                  <span className="tag">{position.category}</span>
                  <h3>{position.title}</h3>
                  <p>{position.description}</p>
                  <Link href={`/nous-rejoindre/${position.slug}`} className="btn-ghost" style={{ marginTop: 'auto', justifyContent: 'center' }}>
                    Voir l&apos;offre
                    <ArrowRight />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head sec-head--center">
            <span className="eyebrow">Valeurs</span>
            <h2>Nos Valeurs</h2>
          </div>

          <div className="grid-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="pilier reveal" style={{ textAlign: 'center', alignItems: 'center' }}>
                  <div className="pilier-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap wrap--narrow">
          <div className="cta-box reveal">
            <h2>Prêt à rejoindre l&apos;aventure ?</h2>
            <p>
              Chez SecuriTrust, l&apos;expertise se construit chaque jour grâce à la pratique et au partage. Vous évoluez dans un
              cadre à taille humaine, où la montée en compétences est un moteur essentiel.
            </p>
            <p>
              Vous évoluez dans des contextes variés et stimulants, où chaque projet contribue à faire grandir les compétences
              de l&apos;équipe et à lever des défis concrets.
            </p>
            <Link href="/contact" className="btn-primary">Nous contacter</Link>
          </div>
        </div>
      </section>

      <section className="sec" style={{ textAlign: 'center', paddingTop: 0 }}>
        <ExpertCTAButton />
      </section>

      <InternalLinks pageKey="nous-rejoindre" />
    </StaticThemeShell>
  );
}
