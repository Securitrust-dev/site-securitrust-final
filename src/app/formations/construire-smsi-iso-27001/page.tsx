import Link from 'next/link';
import { ArrowRight, Phone, MapPin, Clock, Users, Award, Euro } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { JsonLd } from '@/components/StructuredData';
import { SITE_URL } from '@/site-chrome/schema.mjs';

// Formation en présentiel dispensée par Cybermanager (organisme de formation professionnelle).
// Les contenus reprennent la fiche programme fournie ; toute modification (tarif, indicateurs,
// lieu) doit être répercutée ici ET dans le JSON-LD ci-dessous.

const PATH = '/formations/construire-smsi-iso-27001';
const UPDATED = '27 octobre 2026';
const PHONE_DISPLAY = '06 08 94 87 97';
const PHONE_HREF = 'tel:+33608948797';

const INFOS: [string, string][] = [
  ['Durée', '3 jours – 21 heures'],
  ['Modalité', 'Présentiel uniquement'],
  ['Lieu', 'Cybermanager – 11 rue Saint-Didier, 75016 Paris'],
  ['Tarif', '3 500 € HT par participant'],
  ['Public concerné', 'RSSI, DSI, chefs de projet sécurité, consultants, DPO'],
  ['Prérequis', 'Notions de cybersécurité. Deux années d’expérience en systèmes d’information recommandées'],
  ['Dates', 'Selon le calendrier des sessions, communiqué sur demande'],
  ['Délai de traitement des inscriptions', '48 heures après réception du dossier complet'],
  ['Délai d’accès', 'Selon les prochaines dates de formation disponibles'],
];

const OBJECTIFS = [
  'Comprendre les exigences de la norme ISO/IEC 27001:2022.',
  'Définir le contexte, le périmètre et la gouvernance d’un SMSI.',
  'Réaliser une analyse de risques selon les principes de l’ISO 27005.',
  'Élaborer une Déclaration d’Applicabilité (SoA).',
  'Identifier et planifier les mesures de sécurité de l’annexe A de l’ISO 27001.',
  'Organiser le déploiement et le pilotage opérationnel du SMSI.',
  'Préparer les audits internes et la démarche de certification ISO 27001.',
  'Mettre en œuvre une démarche d’amélioration continue.',
];

const PROGRAMME = [
  {
    jour: 'Jour 1',
    titre: 'Cadrage et contexte du SMSI',
    points: [
      'Introduction à la sécurité de l’information et à l’ISO 27001.',
      'Analyse du contexte de l’organisation.',
      'Identification des parties intéressées.',
      'Définition du périmètre du SMSI.',
      'Gouvernance et responsabilités.',
      'Élaboration de la politique de sécurité de l’information.',
    ],
    pratique: 'définition du périmètre d’un SMSI et élaboration d’une politique de sécurité.',
  },
  {
    jour: 'Jour 2',
    titre: 'Analyse de risques et mesures de sécurité',
    points: [
      'Identification des actifs, menaces et vulnérabilités.',
      'Appréciation et traitement des risques.',
      'Présentation des 93 mesures de sécurité de l’annexe A.',
      'Construction de la Déclaration d’Applicabilité (SoA).',
      'Élaboration du plan de traitement des risques.',
    ],
    pratique: 'réalisation d’une matrice de risques et construction d’une Déclaration d’Applicabilité.',
  },
  {
    jour: 'Jour 3',
    titre: 'Déploiement, audit et certification',
    points: [
      'Organisation du déploiement du SMSI.',
      'Gestion des incidents et continuité d’activité.',
      'Documentation et pilotage du SMSI.',
      'Organisation des audits internes.',
      'Revue de direction et amélioration continue.',
      'Préparation aux audits de certification ISO 27001.',
    ],
    pratique: 'simulation d’audit interne et élaboration d’un plan d’action de certification.',
  },
];

const METHODES = [
  'Des cours théoriques présentés à l’aide de supports PowerPoint.',
  'Des échanges interactifs avec le formateur.',
  'Des études de cas et des exercices pratiques.',
  'Des questionnaires de connaissances sur papier.',
  'Un accompagnement personnalisé pendant les exercices.',
];

const INDICATEURS: [string, string][] = [
  ['100 %', 'Taux de satisfaction (« Très bien »)'],
  ['100 %', 'Taux d’assiduité'],
  ['100 %', 'Taux de réussite'],
  ['0 %', 'Taux d’abandon'],
  ['100 %', 'Taux de retour des enquêtes de satisfaction'],
];

const courseSchema = {
  '@type': 'Course',
  '@id': `${SITE_URL}${PATH}#course`,
  name: 'Construire un SMSI ISO 27001',
  description:
    'Formation professionnelle de 3 jours (21 heures) en présentiel pour concevoir, déployer et piloter un Système de Management de la Sécurité de l’Information conforme à la norme ISO/IEC 27001:2022.',
  url: `${SITE_URL}${PATH}`,
  inLanguage: 'fr',
  timeRequired: 'PT21H',
  coursePrerequisites: 'Notions de cybersécurité. Deux années d’expérience en systèmes d’information recommandées.',
  teaches: OBJECTIFS,
  provider: {
    '@type': 'Organization',
    name: 'Cybermanager',
    address: { '@type': 'PostalAddress', streetAddress: '11 rue Saint-Didier', postalCode: '75016', addressLocality: 'Paris', addressCountry: 'FR' },
  },
  offers: {
    '@type': 'Offer',
    category: 'Paid',
    price: '3500',
    priceCurrency: 'EUR',
    priceSpecification: { '@type': 'UnitPriceSpecification', price: '3500', priceCurrency: 'EUR', valueAddedTaxIncluded: false },
    url: `${SITE_URL}${PATH}`,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Onsite',
    courseWorkload: 'PT21H',
    location: {
      '@type': 'Place',
      name: 'Cybermanager',
      address: { '@type': 'PostalAddress', streetAddress: '11 rue Saint-Didier', postalCode: '75016', addressLocality: 'Paris', addressCountry: 'FR' },
    },
    instructor: { '@type': 'Person', name: 'Jad Joumblat' },
  },
};

export default function FormationSmsiIso27001Page() {
  return (
    <StaticThemeShell active="formations">
      <JsonLd data={courseSchema} />

      {/* Hero */}
      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <Link href="/formations">Formations</Link>
            <span className="sep">›</span>
            <span className="now">Construire un SMSI ISO 27001</span>
          </p>
          <span className="eyebrow">Formation professionnelle · 3 jours · 100 % présentiel</span>
          <h1>Construire un SMSI ISO 27001</h1>
          <p className="hero-sub">
            Apprenez à concevoir, déployer et piloter un <b>Système de Management de la Sécurité de l’Information (SMSI)</b>{' '}
            conforme à la norme <b>ISO/IEC 27001:2022</b>.
          </p>
          <ul className="fact-row">
            <li><Clock size={16} /> 3 jours – 21 heures</li>
            <li><MapPin size={16} /> Présentiel, Paris 16e</li>
            <li><Euro size={16} /> 3 500 € HT / participant</li>
            <li><Users size={16} /> RSSI, DSI, chefs de projet, consultants, DPO</li>
          </ul>
          <div className="hero-actions">
            <a href={PHONE_HREF} className="btn-primary">
              <Phone size={16} /> Appeler le {PHONE_DISPLAY}
            </a>
            <a href="#inscription" className="btn-ghost">
              Dates, devis et inscription <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section className="sec" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="grid-2 grid-2--top">
            <div className="prose">
              <span className="eyebrow">Présentation de la formation</span>
              <h2 className="h2-sm">Une approche concrète et opérationnelle de l’ISO 27001</h2>
              <p>
                La mise en place d’un SMSI permet aux organisations de structurer leur démarche de cybersécurité, de maîtriser
                les risques liés à l’information et de s’inscrire dans une dynamique d’amélioration continue.
              </p>
              <p>
                Cette formation de trois jours propose une approche concrète et opérationnelle des exigences de la norme
                ISO/IEC 27001:2022.
              </p>
              <p>
                À travers des apports théoriques, des exercices pratiques et une étude de cas fil rouge, les participants
                découvrent les différentes étapes de construction d’un SMSI, depuis son cadrage jusqu’à la préparation de
                l’audit de certification.
              </p>
            </div>
            <div className="table-card">
              <h2 className="table-title">Informations pratiques</h2>
              <table className="data-table">
                <tbody>
                  {INFOS.map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Objectifs pédagogiques</span>
            <h2>Ce que vous saurez faire</h2>
            <p>À l’issue de la formation, les participants seront capables de :</p>
          </div>
          <ul className="check-list check-list--cols">
            {OBJECTIFS.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programme */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Programme de formation</span>
            <h2>Trois jours, du cadrage à la certification</h2>
          </div>
          <div className="grid-3">
            {PROGRAMME.map((d) => (
              <article key={d.jour} className="pilier">
                <span className="tag">{d.jour}</span>
                <h3>{d.titre}</h3>
                <ul className="check-list check-list--sm">
                  {d.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="practice">
                  <b>Mise en pratique :</b> {d.pratique}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modalités pédagogiques et évaluation */}
      <section className="sec sec--dark">
        <div className="wrap">
          <div className="grid-2">
            <article className="pilier">
              <span className="tag">Modalités et moyens pédagogiques</span>
              <h3>100 % en présentiel, avec un formateur expérimenté</h3>
              <p className="p-static">
                La formation est dispensée intégralement en présentiel, dans les locaux de Cybermanager, par un formateur
                expérimenté en cybersécurité. Les méthodes pédagogiques comprennent :
              </p>
              <ul className="check-list check-list--sm">
                {METHODES.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p className="p-static" style={{ marginTop: 16 }}>
                Les supports pédagogiques présentés pendant les séances sont transmis aux participants via Microsoft Teams.
                Aucune plateforme d’apprentissage en ligne (LMS) n’est utilisée : l’ensemble des enseignements et des
                évaluations se déroule en présentiel.
              </p>
            </article>
            <article className="pilier">
              <span className="tag">Modalités d’évaluation</span>
              <h3>Des acquis évalués à chaque étape</h3>
              <ul className="check-list check-list--sm">
                <li><b>Avant la formation :</b> questionnaire de positionnement initial et analyse des besoins du participant.</li>
                <li><b>Pendant la formation :</b> exercices pratiques, études de cas et échanges avec le formateur.</li>
                <li>
                  <b>En fin de formation :</b> QCM de 60 questions réalisé sur papier, avec un seuil de réussite de 70 % ;
                  cas pratique de construction d’un SMSI ; correction et évaluation des résultats par le formateur.
                </li>
              </ul>
              <p className="p-static" style={{ marginTop: 16 }}>
                <Award size={15} style={{ display: 'inline', verticalAlign: '-2px', color: 'var(--cyan)', marginRight: 6 }} />
                Un certificat de réalisation est délivré à l’issue de la formation. Cette formation ne délivre pas de
                certification professionnelle ISO 27001.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Indicateurs */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Indicateurs de performance</span>
            <h2>Résultats de la session du 9 au 11 septembre 2026</h2>
          </div>
          <div className="kpi-grid">
            {INDICATEURS.map(([val, label]) => (
              <div key={label} className="kpi">
                <span className="val">{val}</span>
                <span className="lbl">{label}</span>
              </div>
            ))}
          </div>
          <div className="notes">
            <p>
              Ces indicateurs portent sur une première session réalisée auprès d’un seul participant (1 inscrit). Ils sont
              issus du bilan interne de septembre 2026 et demeurent provisoires dans l’attente de la consolidation des
              justificatifs.
            </p>
            <p>
              Le taux de réussite correspond à la validation du QCM final avec un résultat d’au moins 70 %, ainsi qu’à la
              validation du cas pratique. Le taux de satisfaction correspond à la proportion d’enquêtes reçues ayant obtenu
              l’appréciation « Très bien ».
            </p>
            <p>Dernière période de référence : septembre 2026.</p>
          </div>
        </div>
      </section>

      {/* Inscription, tarif, accessibilité */}
      <section className="sec sec--dark" id="inscription">
        <div className="wrap">
          <div className="grid-3">
            <article className="pilier">
              <span className="tag">Inscription et délais d’accès</span>
              <h3>Comment s’inscrire</h3>
              <p className="p-static">
                L’inscription s’effectue directement auprès de Cybermanager par une demande de renseignements ou de devis.
              </p>
              <p className="p-static">
                Avant l’inscription, un recueil des besoins et une vérification des prérequis permettent de s’assurer de
                l’adéquation de la formation au profil du participant.
              </p>
              <p className="p-static">
                L’inscription est confirmée après validation du dossier et signature des documents contractuels applicables.
                Les demandes complètes sont traitées sous 48 heures. L’entrée effective en formation dépend des dates des
                sessions disponibles.
              </p>
            </article>
            <article className="pilier">
              <span className="tag">Tarif et financement</span>
              <h3>3 500 € HT par participant</h3>
              <p className="p-static">
                La formation peut être financée personnellement ou prise en charge par l’employeur.
              </p>
              <p className="p-static">
                Les possibilités de financement complémentaires peuvent être étudiées sur demande, sous réserve de leur
                disponibilité et des conditions d’éligibilité applicables.
              </p>
            </article>
            <article className="pilier">
              <span className="tag">Accessibilité</span>
              <h3>Personnes en situation de handicap</h3>
              <p className="p-static">
                Cybermanager étudie les besoins spécifiques des personnes en situation de handicap afin de proposer, lorsque
                cela est possible, des adaptations pédagogiques, techniques ou organisationnelles.
              </p>
              <p className="p-static">Les participants sont invités à signaler leurs besoins lors de l’inscription.</p>
              <p className="p-static">
                <b>Référent handicap :</b> Jad JOUMBLAT
                <br />
                <b>Téléphone :</b> <a href={PHONE_HREF} className="link">{PHONE_DISPLAY}</a>
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Formateur */}
      <section className="sec">
        <div className="wrap wrap--narrow">
          <article className="pilier">
            <span className="tag">Votre formateur</span>
            <h3>Jad JOUMBLAT – Formateur et référent pédagogique</h3>
            <p className="p-static">
              Fort de plus de 20 ans d’expérience dans la cybersécurité, Jad JOUMBLAT accompagne les organisations dans
              leurs démarches de gouvernance, d’audit, de gestion des risques et de sécurisation des systèmes
              d’information.
            </p>
            <p className="p-static">
              Il assure l’animation de la formation, l’accompagnement des participants et l’évaluation des compétences
              acquises.
            </p>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-box">
            <h2>Contact et inscription</h2>
            <p>
              Contactez-nous pour connaître les prochaines dates de formation, obtenir un devis ou vous inscrire.
            </p>
            <p>
              <b style={{ color: 'var(--ink)' }}>CYBERMANAGER – Organisme de formation professionnelle</b>
              <br />
              11 rue Saint-Didier, 75016 Paris
              <br />
              Contact : Jad JOUMBLAT
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a href={PHONE_HREF} className="btn-primary">
                <Phone size={16} /> {PHONE_DISPLAY}
              </a>
              <Link href="/contact" className="btn-ghost">
                Demande de renseignements <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <p className="notes" style={{ textAlign: 'center' }}>
            Dernière mise à jour : {UPDATED}. Voir aussi notre accompagnement à la{' '}
            <Link href="/iso27001" className="link">certification ISO 27001</Link> et le{' '}
            <Link href="/pilotage-smsi" className="link">pilotage de SMSI</Link>.
          </p>
        </div>
      </section>
    </StaticThemeShell>
  );
}
