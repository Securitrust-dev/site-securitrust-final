# 📋 Briefing Commercial DocuSign - SecuriTrust
**Date de préparation** : Décembre 2025  
**Objectif** : Intégration complète de la signature électronique dans le tunnel de conversion

---

## 🎯 RÉSUMÉ EXÉCUTIF

**Projet** : SecuriTrust - Plateforme de cybersécurité et conformité  
**Besoin** : Signature électronique embedded dans le parcours client  
**Use Case Principal** : Signature de propositions commerciales après test d'éligibilité  
**Volume estimé** : 50-200 signatures/mois (phase de lancement)  
**Type d'intégration** : Embedded Signing via JWT Authentication

---

## 🏗️ STACK TECHNIQUE COMPLÈTE

### **Frontend**
```json
Framework Principal: Next.js 15.3.5 (App Router)
Runtime: React 19.0.0
Language: TypeScript 5.x
Styling: Tailwind CSS 4.x
UI Components: Radix UI + shadcn/ui
Animations: Framer Motion 12.23.24
```

### **Backend & API**
```json
Platform: Next.js API Routes (serverless)
Runtime: Node.js via Bun
Database: Turso (LibSQL) via Drizzle ORM 0.44.7
Authentication: Better-auth 1.3.10
Payments: Stripe + Autumn.js (automne)
```

### **Intégrations Tierces Actuelles**
- **Pappers API** : Vérification SIRET/entreprises françaises
- **Stripe** : Paiements et abonnements
- **DocuSign** : ⚠️ EN COURS D'INTÉGRATION (mode démo actif)

### **Infrastructure**
- **Hosting** : Vercel / Cloud provider
- **Database** : Turso (serverless SQLite)
- **Storage** : Supabase Storage (assets/documents)
- **Environment** : Production + Staging

---

## 📊 CONTEXTE BUSINESS & PARCOURS UTILISATEUR

### **Tunnel de Conversion Actuel**

```
1. Landing Page (/) 
   ↓
2. Test d'Éligibilité (/eligibilite)
   • Vérification SIRET via Pappers API
   • Questionnaire cybersécurité (10 questions)
   • Calcul d'éligibilité automatique
   ↓
3. Proposition Commerciale (/proposition)
   • Affichage de l'offre : 4 999€ HT
   • Présentation de l'équipe (3 consultants)
   • Détails techniques et timeline
   ↓
4. 🔴 POINT D'INTÉGRATION DOCUSIGN
   • Bouton "Signer ma proposition"
   • Génération du contrat PDF dynamique
   • Signature embedded DocuSign
   ↓
5. Page de Paiement (/paiement)
   • Intégration Stripe
   • Validation finale
```

### **Données Collectées Avant Signature**

```typescript
{
  company: {
    name: string,              // "Acme Corp"
    siret: string,             // "12345678901234"
    activityLabel: string,     // "Services informatiques"
    employeeCount: number,     // 150
    status: "ACTIVE" | "INACTIVE"
  },
  contact: {
    email: string,             // "contact@acme.fr"
  },
  answers: [
    // 10 questions cybersécurité avec réponses
    { questionId: "email", answer: "contact@acme.fr" },
    { questionId: "hasAD", answer: "Oui" },
    { questionId: "securityMaturity", answer: "Politique documentée" },
    // ... etc
  ],
  eligibility: {
    eligible: true,
    message: "Entreprise éligible",
    price: 4999,
    currency: "EUR"
  }
}
```

---

## 🔧 INTÉGRATION DOCUSIGN : ÉTAT ACTUEL

### **Ce qui est DÉJÀ implémenté** ✅

#### 1. **API Route Backend** (`/api/docusign/sign-url/route.ts`)
```typescript
POST /api/docusign/sign-url
Request Body: {
  companyName: string,
  email: string,
  siret: string
}

Response: {
  success: boolean,
  url: string,           // URL de signature DocuSign
  envelopeId: string,    // ID de l'enveloppe
  demo?: boolean         // true si mode démo
}
```

**Fonctionnalités prêtes** :
- ✅ Structure d'authentification JWT
- ✅ Création d'enveloppe (commenté, prêt à activer)
- ✅ Embedded signing avec clientUserId
- ✅ Gestion des erreurs et logs
- ✅ Mode démo pour tests

#### 2. **Frontend Integration** (`/proposition/page.tsx`)
```typescript
// Bouton de signature avec loading states
<button onClick={handleSignProposal}>
  Signer ma proposition
</button>

// Fonction de signature
const handleSignProposal = async () => {
  const response = await fetch('/api/docusign/sign-url', {
    method: 'POST',
    body: JSON.stringify({ companyName, email, siret })
  });
  
  const { url, envelopeId } = await response.json();
  
  // Ouvrir DocuSign dans un nouvel onglet
  window.open(url, '_blank');
  
  // Redirection vers paiement après signature
  router.push('/paiement');
};
```

**États UI** :
- ✅ Bouton avec icône FileSignature
- ✅ Loading state pendant la génération
- ✅ Gestion des erreurs avec toasts
- ✅ Redirection post-signature

#### 3. **Packages Installés** ✅
```json
"docusign-esign": "^8.5.0"  // SDK officiel DocuSign Node.js
```

### **Ce qui MANQUE (à configurer avec vous)** ⚠️

#### 1. **Credentials DocuSign** (priorité absolue)
```env
DOCUSIGN_INTEGRATION_KEY=???        # Client ID de votre app
DOCUSIGN_USER_ID=???                # API Username (GUID)
DOCUSIGN_ACCOUNT_ID=???             # Account ID DocuSign
DOCUSIGN_PRIVATE_KEY=???            # Clé privée RSA en base64
DOCUSIGN_BASE_PATH=???              # demo.docusign.net ou na3.docusign.net
```

**Questions à poser au commercial** :
- Quel type de compte recommandez-vous ? (Developer, Go Live, Production)
- Quel plan tarifaire pour 50-200 signatures/mois ?
- Support pour environnement de staging + production ?
- Délai de provision des credentials ?

#### 2. **Template de Contrat PDF**
```
BESOIN : Document PDF dynamique à générer
Format : Contrat de prestation SecuriTrust
Contenu dynamique :
  - Nom de l'entreprise
  - SIRET
  - Email de contact
  - Montant : 4 999€ HT
  - Date de signature
  - Conditions générales
```

**Questions à poser** :
- DocuSign propose-t-il un service de génération de PDF ?
- Recommandez-vous un template designer DocuSign ?
- Ou devons-nous générer le PDF nous-mêmes (via PDFKit, Puppeteer) ?

#### 3. **Webhooks & Callbacks**
```typescript
// Besoin de webhooks pour :
POST /api/docusign/webhook
{
  event: "envelope-completed",
  envelopeId: "xxx",
  status: "completed" | "declined" | "voided"
}

// Actions à déclencher :
- Marquer la proposition comme signée en DB
- Envoyer email de confirmation
- Débloquer l'accès au paiement
- Notifier l'équipe commerciale
```

**Questions à poser** :
- Configuration des webhooks DocuSign Connect
- Events disponibles et leur payload
- Sécurisation des webhooks (signature HMAC ?)
- Retry policy en cas d'échec

#### 4. **Stockage des Documents Signés**
```
BESOIN : Récupérer et stocker le contrat signé
Options :
  1. API DocuSign pour télécharger le PDF signé
  2. Stockage dans Supabase Storage
  3. Lien vers DocuSign permanent (Document Vault)
```

**Questions à poser** :
- Durée de rétention des documents dans DocuSign ?
- API pour télécharger les documents signés ?
- Certificat de signature électronique : format et accès ?

---

## 💼 QUESTIONS COMMERCIALES STRATÉGIQUES

### **1. Tarification & Plans**
```
Volume prévu : 50-200 enveloppes/mois
- Plan recommandé ?
- Coût par enveloppe ?
- Engagement annuel vs pay-as-you-go ?
- Surcoût pour embedded signing ?
```

### **2. Conformité & Légal (FRANCE)** 🇫🇷
```
Contexte : Contrats B2B pour services de cybersécurité
- Conformité eIDAS (règlement européen) ?
- Valeur légale des signatures en France ?
- Certification ANSSI / RGS (Référentiel Général de Sécurité) ?
- Archivage légal : durée et format ?
- Certificat de signature : personnalisable avec notre branding ?
```

### **3. Fonctionnalités Avancées**
```
Besoins futurs :
- Multi-signataires (client + SecuriTrust) ?
- Workflows d'approbation interne ?
- Branding personnalisé (logo, couleurs) ?
- Signature mobile (responsive design) ?
- Langues : Français obligatoire
```

### **4. Support & Onboarding**
```
- Délai de mise en production ?
- Support technique : email, phone, chat ?
- Documentation en français ?
- Sandbox / environnement de test ?
- Migration depuis le mode démo actuel ?
```

### **5. Intégrations Techniques**
```
Stack : Next.js 15 + TypeScript + Serverless
- SDK Node.js : version recommandée ?
- Compatibilité avec Vercel/serverless ?
- Rate limits API ?
- Monitoring et observability ?
- SLA disponible ?
```

---

## 🚀 PLAN D'IMPLÉMENTATION (POST-COMMERCIAL)

### **Phase 1 : Configuration (J1-J2)**
1. Création du compte DocuSign
2. Génération des credentials (Integration Key, RSA keys)
3. Configuration OAuth 2.0 et JWT
4. Accorder le consentement administrateur
5. Ajout des variables d'environnement

### **Phase 2 : Développement (J3-J5)**
1. Décommenter le code de production dans `/api/docusign/sign-url/route.ts`
2. Créer le template PDF du contrat
3. Implémenter la génération dynamique du PDF
4. Configurer les webhooks DocuSign
5. Tests unitaires et d'intégration

### **Phase 3 : Tests (J6-J7)**
1. Tests en environnement de démo DocuSign
2. Tests end-to-end du tunnel complet
3. Tests de signature sur mobile
4. Validation légale du document signé
5. Tests de charge (simulations de volume)

### **Phase 4 : Production (J8+)**
1. Migration vers compte DocuSign production
2. Déploiement sur l'environnement de prod
3. Monitoring et alerting
4. Formation de l'équipe support
5. Documentation utilisateur

---

## 📝 TEMPLATE DE CONTRAT À SIGNER

### **Structure du Document**
```
┌─────────────────────────────────────────┐
│   LOGO SECURITRUST                      │
│                                         │
│   PROPOSITION COMMERCIALE               │
│   Date : [DATE_AUTOMATIQUE]             │
│                                         │
├─────────────────────────────────────────┤
│   INFORMATIONS CLIENT                   │
│   • Entreprise : [COMPANY_NAME]         │
│   • SIRET : [SIRET]                     │
│   • Email : [EMAIL]                     │
│                                         │
├─────────────────────────────────────────┤
│   PRESTATION                            │
│   • Service : Évaluation Sécurité       │
│   • Durée : 5 jours                     │
│   • Montant : 4 999€ HT (5 998,80€ TTC) │
│                                         │
├─────────────────────────────────────────┤
│   PÉRIMÈTRE DES TRAVAUX                 │
│   • Reconnaissance & OSINT              │
│   • Évaluation des vulnérabilités       │
│   • Tests d'intrusion                   │
│   • Rapport final et recommandations    │
│                                         │
├─────────────────────────────────────────┤
│   CONDITIONS GÉNÉRALES                  │
│   [TEXTE LÉGAL]                         │
│                                         │
├─────────────────────────────────────────┤
│   SIGNATURES                            │
│                                         │
│   Client :                              │
│   [ZONE DE SIGNATURE DOCUSIGN]          │
│   Nom : [COMPANY_NAME]                  │
│   Date : [DATE_AUTO]                    │
│                                         │
│   SecuriTrust :                         │
│   [ZONE DE SIGNATURE DOCUSIGN]          │
│   Nom : Martin Crossland                │
│   Fonction : Directeur Commercial       │
│   Date : [DATE_AUTO]                    │
│                                         │
└─────────────────────────────────────────┘
```

### **Champs DocuSign à placer**
```javascript
// Zones de signature
signHereTabs: [
  { 
    documentId: "1",
    pageNumber: "1",
    recipientId: "1",    // Client
    xPosition: "100",
    yPosition: "650",
    tabLabel: "SignatureClient"
  },
  {
    documentId: "1",
    pageNumber: "1", 
    recipientId: "2",    // SecuriTrust
    xPosition: "400",
    yPosition: "650",
    tabLabel: "SignatureSecuriTrust"
  }
]

// Champs date automatique
dateSignedTabs: [
  { documentId: "1", pageNumber: "1", recipientId: "1", xPosition: "100", yPosition: "700" },
  { documentId: "1", pageNumber: "1", recipientId: "2", xPosition: "400", yPosition: "700" }
]
```

---

## 🔒 SÉCURITÉ & CONFORMITÉ

### **Données Sensibles**
```
Données personnelles traitées :
- Nom de l'entreprise
- SIRET (donnée publique)
- Email professionnel
- Réponses au questionnaire cybersécurité

Base légale RGPD : Exécution du contrat
Durée de conservation : 5 ans (obligations comptables)
```

### **Checklist Sécurité**
- [ ] Clés privées stockées en variables d'environnement
- [ ] Jamais commitées dans Git
- [ ] Rotation des clés tous les 12 mois
- [ ] Logs d'audit des signatures
- [ ] HTTPS obligatoire
- [ ] Validation des webhooks (HMAC)
- [ ] Rate limiting sur les API routes

---

## 📞 CONTACTS & NEXT STEPS

### **Pendant le RDV Commercial**
1. ✅ Présenter le use case et le tunnel de conversion
2. ✅ Demander une démo live de l'embedded signing
3. ✅ Obtenir un devis détaillé (setup + mensuel)
4. ✅ Clarifier les délais de mise en production
5. ✅ Demander l'accès à un compte de démo/sandbox
6. ✅ Récupérer les contacts support technique

### **Post-RDV**
- [ ] Créer le compte DocuSign Developer
- [ ] Obtenir les credentials de test
- [ ] Activer le code de production
- [ ] Tester le flow complet en démo
- [ ] Planifier une session technique avec DocuSign
- [ ] Préparer le contrat PDF final
- [ ] Configurer les webhooks
- [ ] Go Live !

---

## 📚 RESSOURCES UTILES

### **Documentation Officielle**
- [DocuSign Developer Center](https://developers.docusign.com/)
- [Node.js SDK GitHub](https://github.com/docusign/docusign-node-client)
- [Embedded Signing Guide](https://developers.docusign.com/docs/esign-rest-api/how-to/embedded-signing/)
- [JWT Authentication](https://developers.docusign.com/docs/esign-rest-api/how-to/request-jwt/)

### **Fichiers du Projet**
- Code backend : `src/app/api/docusign/sign-url/route.ts`
- Code frontend : `src/app/proposition/page.tsx`
- Config : `.env` (à créer depuis `.env.example`)
- Doc setup : `DOCUSIGN_SETUP.md`

### **Support SecuriTrust**
- Dev Lead : [Votre Nom]
- Email : contact@securitrust.fr
- Projet : Next.js 15 + TypeScript
- Repo : [URL du repo si applicable]

---

## ✨ POINTS FORTS À MENTIONNER

### **Pourquoi DocuSign pour SecuriTrust ?**

1. **Expérience Utilisateur Premium**
   - Signature embedded = pas de sortie du site
   - Mobile-friendly natif
   - Branding personnalisable

2. **Conformité Légale**
   - Valeur juridique en France 🇫🇷
   - Certificat de signature officiel
   - Archivage sécurisé

3. **Conversion Optimale**
   - Réduction des frictions
   - Taux de signature plus élevé
   - Tunnel fluide jusqu'au paiement

4. **Scalabilité**
   - API robuste et éprouvée
   - Gestion automatique des volumes
   - Monitoring intégré

---

**🎯 OBJECTIF DU RDV** : Obtenir un compte de test, un devis clair, et un plan d'activation sous 7 jours.

**💪 Vous êtes prêt ! Bon meeting commercial !**
