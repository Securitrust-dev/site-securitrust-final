// Page pilier TISAX (J3.8) — requête principale : « tisax ».
// Faits : TISAX géré par l'ENX Association, fondé sur le catalogue VDA ISA.

export default {
  slug: 'tisax',
  file: 'tisax.html',
  path: '/tisax',
  name: 'TISAX',
  service: 'TISAX',
  updated: '2026-10-26',
  guideTitle: 'TISAX : le guide complet de l’évaluation sécurité de la filière automobile',
  intro:
    'TISAX est le mécanisme d’évaluation et d’échange des résultats de sécurité de l’information de l’industrie automobile. Si un constructeur ou un équipementier vous demande « un label TISAX », ce guide explique ce qu’il recouvre réellement, comment se préparer et comment partager votre résultat.',
  sections: [
    {
      id: 'tisax-definition',
      title: 'Qu’est-ce que TISAX ?',
      html: `<p><strong>TISAX</strong> (Trusted Information Security Assessment Exchange) est un dispositif créé par l’association <strong>ENX</strong> pour le compte de l’industrie automobile allemande (VDA). Il répond à un problème concret : au lieu que chaque constructeur audite séparément chacun de ses fournisseurs, une évaluation unique, réalisée par un auditeur agréé, est <strong>partagée</strong> avec les partenaires qui en ont besoin.</p>
<p>TISAX n’est pas une certification au sens d’ISO 27001 : on ne parle pas de « certificat » mais d’un <strong>label</strong> et d’un résultat d’évaluation, échangé via la plateforme ENX. Le référentiel sous-jacent est le catalogue <strong>VDA ISA</strong> (Information Security Assessment), largement aligné sur ISO/IEC 27001, enrichi d’exigences propres au secteur : protection des prototypes, protection des données à caractère personnel, connexion aux tiers.</p>`,
    },
    {
      id: 'tisax-concerne',
      title: 'Qui a besoin de TISAX ?',
      html: `<p>TISAX concerne toute organisation qui traite des informations pour un acteur de la filière automobile et à qui un donneur d’ordre demande une évaluation :</p>
<ul>
<li>équipementiers de rang 1, 2 et au-delà ;</li>
<li>bureaux d’études, prestataires d’ingénierie et de design ;</li>
<li>éditeurs de logiciels, prestataires informatiques et cloud du secteur ;</li>
<li>prestataires marketing, agences, centres d’essais manipulant des prototypes.</li>
</ul>
<p>C’est presque toujours une <strong>exigence contractuelle</strong> : un constructeur conditionne un marché à la présentation d’un résultat TISAX au niveau attendu. Le besoin est défini par le donneur d’ordre, pas par vous.</p>`,
    },
    {
      id: 'tisax-niveaux',
      title: 'Objectifs d’évaluation et niveaux',
      html: `<p>Avant toute chose, vous définissez un <strong>périmètre</strong> (sites, activités concernées) et des <strong>objectifs d’évaluation</strong> (assessment objectives), qui dépendent de la sensibilité des informations traitées : sécurité de l’information « normale » ou « haute », protection des prototypes, protection des données personnelles.</p>
<p>À chaque objectif correspond un <strong>niveau d’évaluation</strong> (assessment level), qui détermine la profondeur de l’audit :</p>
<table>
<thead><tr><th>Niveau</th><th>Profondeur de l’évaluation</th></tr></thead>
<tbody>
<tr><td>AL 1</td><td>Auto-évaluation, sans vérification externe (rarement suffisant pour un échange).</td></tr>
<tr><td>AL 2</td><td>Auto-évaluation vérifiée par un auditeur, principalement sur preuves documentaires et entretien à distance.</td></tr>
<tr><td>AL 3</td><td>Évaluation approfondie avec audit sur site et vérification des preuves ; exigée pour les informations les plus sensibles, dont les prototypes.</td></tr>
</tbody>
</table>
<p>Le donneur d’ordre indique l’objectif et le niveau attendus ; c’est ce qui pilote tout le projet.</p>`,
    },
    {
      id: 'tisax-deroule',
      title: 'Comment se déroule une évaluation TISAX',
      html: `<ol>
<li><strong>Enregistrement sur le portail ENX</strong> : déclaration de votre périmètre et des objectifs d’évaluation.</li>
<li><strong>Auto-évaluation selon le VDA ISA</strong> : vous mesurez votre maturité sur chaque exigence et constituez les preuves.</li>
<li><strong>Audit par un prestataire agréé ENX</strong> (c’est lui, et lui seul, qui réalise l’évaluation officielle), à distance ou sur site selon le niveau.</li>
<li><strong>Traitement des écarts</strong> : en cas de non-conformités, un plan d’action correctif est établi et vérifié.</li>
<li><strong>Obtention et partage du label</strong> : le résultat est publié sur le portail ENX et vous choisissez avec quels partenaires le partager.</li>
</ol>
<p>Le label TISAX est valable <strong>trois ans</strong>. Un cabinet de conseil comme SecuriTrust vous prépare à l’évaluation (diagnostic, mise à niveau, constitution des preuves) ; il ne délivre pas le label lui-même, réservé aux auditeurs agréés par ENX.</p>`,
    },
    {
      id: 'tisax-preparer',
      title: 'Bien se préparer : les points de vigilance',
      html: `<ul>
<li><strong>Définir le bon périmètre</strong> : trop large, l’audit devient lourd ; trop étroit, il ne répond pas à la demande du client.</li>
<li><strong>Partir de l’existant ISO 27001</strong> : si vous disposez déjà d’un SMSI, une grande partie des exigences VDA ISA est couverte.</li>
<li><strong>Anticiper la protection des prototypes</strong> (AL 3) : sécurité physique, cloisonnement, contrôle d’accès aux zones sensibles — ce sont souvent les exigences les plus coûteuses à mettre en place.</li>
<li><strong>Constituer les preuves au fil de l’eau</strong>, et non la veille de l’audit.</li>
<li><strong>Prévoir les délais</strong> : entre l’enregistrement, la préparation et la disponibilité d’un auditeur agréé, un projet TISAX se planifie plusieurs mois à l’avance.</li>
</ul>`,
    },
  ],
  faq: [
    {
      question: 'TISAX est-il une certification comme ISO 27001 ?',
      answer:
        'Non. TISAX est un mécanisme d’évaluation et d’échange de résultats propre à l’industrie automobile, géré par l’association ENX. On n’obtient pas un « certificat » mais un label et un résultat partageable via la plateforme ENX. Le référentiel VDA ISA est toutefois largement aligné sur ISO 27001.',
    },
    {
      question: 'Qui peut délivrer un résultat TISAX ?',
      answer:
        'Seuls les prestataires d’audit agréés par ENX réalisent l’évaluation officielle. Un cabinet de conseil vous prépare — diagnostic, mise à niveau, constitution des preuves — mais ne peut pas être l’auditeur agréé, pour garantir l’indépendance.',
    },
    {
      question: 'Que signifient les niveaux AL 2 et AL 3 ?',
      answer:
        'Le niveau d’évaluation fixe la profondeur de l’audit. AL 2 repose surtout sur des preuves documentaires et un entretien à distance ; AL 3 ajoute un audit sur site et une vérification approfondie, exigée pour les informations les plus sensibles comme les prototypes. Le donneur d’ordre précise le niveau attendu.',
    },
    {
      question: 'Combien de temps est valable un label TISAX ?',
      answer:
        'Le label TISAX est valable trois ans. Il faut donc anticiper son renouvellement, et maintenir le niveau de sécurité entre deux évaluations plutôt que de tout reconstruire à l’approche de l’échéance.',
    },
    {
      question: 'Avons-nous besoin d’ISO 27001 avant TISAX ?',
      answer:
        'Ce n’est pas obligatoire, mais un SMSI ISO 27001 existant couvre une grande partie des exigences du catalogue VDA ISA et accélère nettement la préparation. À l’inverse, préparer TISAX constitue une bonne base si vous visez ensuite ISO 27001.',
    },
  ],
  related: [
    { label: 'Gouvernance & conformité', href: '/gouvernance-conformite', description: 'Tous nos accompagnements réglementaires et sectoriels.' },
    { label: 'Certification ISO 27001', href: '/iso27001', description: 'Le socle commun qui accélère une préparation TISAX.' },
    { label: 'Secteur industrie', href: '/secteurs/industrie', description: 'Nos interventions auprès des acteurs industriels et automobiles.' },
    { label: 'Pilotage du SMSI', href: '/pilotage-smsi', description: 'Maintenir le niveau de sécurité entre deux évaluations.' },
    { label: 'RSSI externalisé', href: '/rssi-externalise', description: 'Porter la démarche et le maintien du label dans la durée.' },
  ],
  articles: [],
};
