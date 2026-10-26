# Cartographie mots-clés, hubs et gabarit de page pilier (tâche J2.3)

Sprint SEO securitrust.fr — version du 26/10/2026.

> **À valider (contrôle humain J2.3)** : les requêtes ci-dessous sont des hypothèses de
> ciblage construites à partir de l'offre et du vocabulaire des clients. Les volumes et
> la difficulté n'ont pas encore été mesurés : les confronter à l'export Search Console
> de la baseline (J1.1) et à un outil de volumes avant d'arbitrer. Une requête = une page
> cible ; deux pages ne doivent jamais viser la même requête principale (cannibalisation).

## 1. Architecture : 3 hubs, 8 pages piliers, des pages satellites

```
Accueil (/)
├── Hub Pentest ............................ /pentest
│   ├── Pilier  Pentest web ................ /pentest-web
│   ├── Pilier  Pentest Active Directory ... /pentest-ad
│   ├── Pilier  Audit Microsoft 365 ........ /audit-o365
│   └── Satellites : /pentest-externe, /pentest-interne, /pentest-mobile,
│       /pentest-physique, /red-team, /osint, /pentest-paris (local)
├── Hub Gouvernance & conformité ........... /gouvernance-conformite
│   ├── Pilier  NIS2 ....................... /nis2
│   ├── Pilier  DORA ....................... /dora
│   ├── Pilier  ISO 27001 .................. /iso27001
│   ├── Pilier  TISAX ...................... /tisax
│   └── Satellites : /hds, /rgpd, /ebios-rm, /gap-analysis, /pcapra, /ia-act,
│       /dpo-externalise, /pilotage-smsi, /grc-cyber
└── Hub RSSI externalisé ................... /rssi-externalise  (hub et pilier)
    └── Satellites : /pilotage-smsi, /strategie-cybersecurite, /gestion-risques,
        /evaluation-maturite, /sensibilisation-formation
Blog (/articles) : articles de fond reliés à leur pilier (voir § 4)
Page locale : /contact (Paris 16e) + /pentest-paris
```

Règles de maillage :

- chaque pilier renvoie à son hub (fil d'Ariane + bloc « Pour aller plus loin ») ;
- chaque hub liste tous ses piliers et satellites ;
- chaque pilier renvoie à 2 ou 3 piliers voisins (ex. NIS2 → ISO 27001, RSSI externalisé, Pentest AD) ;
- chaque article de fond renvoie à **un** pilier avec une ancre descriptive, jamais « cliquez ici » ;
- les satellites renvoient à leur pilier ou à leur hub, pas l'inverse systématiquement.

## 2. Requêtes cibles par page

| Page | Requête principale | Requêtes secondaires | Intention |
|---|---|---|---|
| `/pentest` (hub) | pentest | test d'intrusion, cabinet pentest, société de pentest, prestataire test d'intrusion | Commerciale |
| `/pentest-web` | pentest web | test d'intrusion application web, audit sécurité site web, pentest API, OWASP Top 10 audit | Commerciale |
| `/pentest-ad` | pentest active directory | audit sécurité active directory, audit AD, test d'intrusion interne AD, sécurité ADCS | Commerciale |
| `/audit-o365` | audit microsoft 365 | audit sécurité office 365, audit tenant M365, secure score microsoft, sécurité Entra ID | Commerciale |
| `/pentest-externe` | test d'intrusion externe | pentest externe, audit surface d'attaque | Commerciale |
| `/pentest-interne` | test d'intrusion interne | pentest interne, audit réseau interne | Commerciale |
| `/pentest-mobile` | pentest mobile | audit sécurité application mobile, OWASP MASVS | Commerciale |
| `/red-team` | red team | exercice red team, simulation d'attaque | Commerciale |
| `/pentest-paris` | pentest paris | test d'intrusion paris, cabinet pentest paris | Locale |
| `/gouvernance-conformite` (hub) | conformité cybersécurité | cabinet conformité cyber, accompagnement conformité réglementaire | Commerciale |
| `/nis2` | conformité nis2 | directive nis2, nis2 france, loi résilience, entités essentielles importantes, audit nis2 | Informationnelle + commerciale |
| `/dora` | conformité dora | règlement dora, dora banque assurance, registre d'informations dora, TLPT | Informationnelle + commerciale |
| `/iso27001` | certification iso 27001 | accompagnement iso 27001, norme iso 27001 2022, SMSI, déclaration d'applicabilité | Commerciale |
| `/tisax` | tisax | label tisax, évaluation tisax, VDA ISA, AL2 AL3 | Informationnelle + commerciale |
| `/hds` | certification hds | hébergeur de données de santé, référentiel HDS | Commerciale |
| `/rgpd` | mise en conformité rgpd | accompagnement rgpd, registre des traitements | Commerciale |
| `/rssi-externalise` (hub + pilier) | rssi externalisé | rssi à temps partagé, rssi as a service, ciso externalisé, rssi pme | Commerciale |
| `/contact` | cabinet cybersécurité paris | consultant cybersécurité paris 16, contact securitrust | Locale / navigationnelle |
| `/articles` | — | (porte les articles ; pas de requête commerciale) | Informationnelle |

Requêtes de marque (securitrust, securitrust paris) : accueil.

## 3. Gabarit type de page pilier

Les 8 piliers suivent le même plan, rendu par un composant commun
(`src/site-chrome/pillars/*.mjs` → injecté par `npm run chrome:sync` dans les
landing pages statiques, et par `<PillarGuide />` dans les pages React) :

1. **Haut de page commercial (existant)** : H1 contenant la requête principale, promesse,
   formulaire de rappel, preuves (certifications).
2. **Sections existantes** : en quelques mots, bénéfices, méthode, encadré « À retenir ».
3. **Guide complet** (nouveau, 1 200 à 1 800 mots) :
   - sommaire ancré ;
   - définitions et cadre (texte de référence, dates, autorités) ;
   - qui est concerné / quand le faire ;
   - exigences ou méthode détaillée (H3 par exigence, listes, tableau si utile) ;
   - erreurs fréquentes ;
   - par où commencer (plan en étapes) ;
   - date de mise à jour visible.
4. **FAQ** (5 à 8 questions réelles, réponses de 40 à 80 mots), balisée `FAQPage`.
5. **Ressource à télécharger** quand elle existe (lead magnet J3.9).
6. **Pour aller plus loin** : hub, 2–3 piliers voisins, articles liés.
7. **CTA final (existant)**.

Points de contrôle avant publication : un seul H1 ; requête principale dans le title,
le H1, l'introduction et un H2 ; chiffres et dates sourcés (texte officiel, ANSSI, ENX,
ISO, Commission européenne) ; aucune promesse commerciale non validée (prix, délais,
statuts) ; FAQ visible identique au JSON-LD.

## 4. Plan éditorial : 6 articles d'avance (J3.11)

| # | Sujet | Pilier relié | Requête visée |
|---|---|---|---|
| 1 | NIS2 : êtes-vous entité essentielle ou importante ? Méthode pas à pas | `/nis2` | entité essentielle importante nis2 |
| 2 | DORA : constituer le registre d'informations des prestataires TIC | `/dora` | registre d'informations dora |
| 3 | Déclaration d'applicabilité ISO 27001 : la construire sans se perdre dans les 93 mesures | `/iso27001` | déclaration d'applicabilité iso 27001 |
| 4 | Les 10 failles que nous retrouvons le plus souvent en pentest Active Directory | `/pentest-ad` | failles active directory |
| 5 | Microsoft 365 : 12 réglages de sécurité à vérifier en priorité | `/audit-o365` | sécurité microsoft 365 |
| 6 | Préparer un pentest web : périmètre, comptes de test, règles d'engagement | `/pentest-web` | préparer un pentest |

Les articles sont versionnés dans `src/content/blog-articles.json` avec
`published: false` : ils passent en ligne après relecture experte et signature
(nom de l'expert dans `author`), en mettant `published: true` et la date de
publication voulue dans `createdAt` (une date future les masque jusqu'à ce jour).
