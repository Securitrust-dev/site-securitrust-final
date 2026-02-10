# Page Formations Cybersécurité avec E-Learning et Paiement

## Requirements
Créer une plateforme de formation e-learning en cybersécurité comprenant :
- Un catalogue de formations vidéo (Pentest, OWASP, Hacking éthique, etc.)
- Un formulaire d'inscription menant vers un paiement Stripe
- Un système de paiement unique ET par abonnement mensuel
- Un accès direct aux formations après validation du paiement (sans espace personnel)
- Protection des pages de formation pour les utilisateurs payants uniquement

## Tech Stack
- **Frontend**: Next.js 14+ App Router, TypeScript, Tailwind CSS
- **Paiement**: Stripe Checkout (mode payment + subscription)
- **Base de données**: Turso (libsql) avec Drizzle ORM
- **Authentification d'accès**: Token JWT stocké dans cookies httpOnly
- **Email**: Resend pour confirmation de paiement

## Architecture Overview

```
src/
├── app/
│   ├── formations/
│   │   ├── page.tsx                    # Catalogue public
│   │   ├── [slug]/
│   │   │   └── page.tsx                # Détail formation (public)
│   │   └── apprendre/
│   │       ├── page.tsx                # Page protégée - liste des cours
│   │       └── [slug]/
│   │           └── page.tsx            # Page protégée - vidéo du cours
│   ├── formations-paiement/
│   │   ├── page.tsx                    # Formulaire + checkout
│   │   └── success/
│   │       └── page.tsx                # Confirmation + génération token
│   └── api/
│       ├── formations/
│       │   ├── checkout/route.ts       # Création session Stripe
│       │   ├── verify-access/route.ts  # Vérification token d'accès
│       │   └── webhook/route.ts        # Webhook Stripe formations
│       └── ...
├── components/
│   └── sections/
│       └── formations/
│           ├── FormationsCatalog.tsx
│           ├── FormationCard.tsx
│           ├── FormationHero.tsx
│           ├── FormationPricing.tsx
│           ├── VideoPlayer.tsx
│           └── AccessGate.tsx          # Protection d'accès
├── db/
│   └── schema.ts                       # + tables formations
├── lib/
│   ├── formations-auth.ts              # Logique JWT pour accès
│   └── formations-data.ts              # Données des formations
└── middleware.ts                       # Protection routes /formations/apprendre
```

## Implementation Phases

### Phase 1: Base de données et données des formations
- [ ] Ajouter les tables `formations` et `formation_purchases` au schéma Drizzle
- [ ] Créer le fichier de données des formations (titre, description, prix, durée, modules vidéo)
- [ ] Exécuter la migration de base de données

### Phase 2: Page catalogue public
- [ ] Créer la page `/formations` avec le catalogue de toutes les formations
- [ ] Créer le composant `FormationsCatalog.tsx` avec grille de cartes
- [ ] Créer le composant `FormationCard.tsx` pour afficher chaque formation
- [ ] Créer le composant `FormationHero.tsx` pour la section hero
- [ ] Créer la page détail `/formations/[slug]` avec description complète et aperçu

### Phase 3: Système de paiement
- [ ] Créer le composant `FormationPricing.tsx` avec options unique/abonnement
- [ ] Créer la page `/formations-paiement` avec formulaire d'inscription
- [ ] Créer l'API `/api/formations/checkout` pour Stripe Checkout
- [ ] Ajouter le schéma de validation Zod pour les formations
- [ ] Créer la page `/formations-paiement/success` de confirmation

### Phase 4: Protection d'accès et authentification
- [ ] Créer `lib/formations-auth.ts` avec génération/vérification JWT
- [ ] Créer l'API `/api/formations/verify-access` pour valider les tokens
- [ ] Mettre à jour le middleware pour protéger `/formations/apprendre/*`
- [ ] Créer le composant `AccessGate.tsx` pour rediriger les non-payants

### Phase 5: Pages de formation protégées
- [ ] Créer la page `/formations/apprendre` listant les formations achetées
- [ ] Créer la page `/formations/apprendre/[slug]` avec lecteur vidéo
- [ ] Créer le composant `VideoPlayer.tsx` pour intégrer les vidéos
- [ ] Implémenter la progression des modules (localStorage)

### Phase 6: Webhook et emails
- [ ] Créer l'API `/api/formations/webhook` pour les événements Stripe
- [ ] Envoyer email de confirmation avec lien d'accès après paiement
- [ ] Gérer les abonnements (renouvellement, annulation)

## Database Schema

```typescript
// Nouvelles tables à ajouter dans schema.ts

export const formations = sqliteTable('formations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  thumbnail: text('thumbnail').notNull(),
  price: integer('price').notNull(), // Prix en centimes
  priceMonthly: integer('price_monthly'), // Prix abonnement mensuel en centimes
  duration: text('duration').notNull(), // ex: "12h30"
  level: text('level').notNull(), // "Débutant", "Intermédiaire", "Avancé"
  category: text('category').notNull(),
  modules: text('modules').notNull(), // JSON array des modules vidéo
  instructor: text('instructor').notNull(),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const formationPurchases = sqliteTable('formation_purchases', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull(),
  formationId: integer('formation_id').notNull(),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'), // Si abonnement
  purchaseType: text('purchase_type').notNull(), // 'one_time' ou 'subscription'
  accessToken: text('access_token').notNull().unique(),
  accessTokenExpiry: text('access_token_expiry').notNull(),
  status: text('status').notNull().default('active'), // 'active', 'expired', 'cancelled'
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
```

## API Endpoints

### POST /api/formations/checkout
```typescript
// Request
{
  formationSlug: string;
  email: string;
  name: string;
  purchaseType: 'one_time' | 'subscription';
}

// Response
{
  url: string; // Stripe Checkout URL
}
```

### GET /api/formations/verify-access
```typescript
// Headers: Cookie avec access_token

// Response
{
  valid: boolean;
  formation?: { slug, title, modules };
  expiresAt?: string;
}
```

## Formations Data Structure

```typescript
// lib/formations-data.ts
export const FORMATIONS = [
  {
    slug: 'pentest-web-owasp',
    title: 'Pentest Web & OWASP Top 10',
    shortDescription: 'Maîtrisez les tests d\'intrusion web et les vulnérabilités OWASP',
    description: 'Formation complète sur les tests d\'intrusion web...',
    thumbnail: '/formations/pentest-web.jpg',
    price: 49900, // 499€
    priceMonthly: 4900, // 49€/mois
    duration: '18h',
    level: 'Intermédiaire',
    category: 'Pentest',
    instructor: 'SecuriTrust Expert',
    modules: [
      { id: 1, title: 'Introduction au Pentest Web', duration: '45min', videoUrl: '...' },
      { id: 2, title: 'Injection SQL', duration: '1h30', videoUrl: '...' },
      // ...
    ]
  },
  {
    slug: 'hacking-ethique-fondamentaux',
    title: 'Hacking Éthique - Les Fondamentaux',
    // ...
  },
  // Autres formations...
];
```

## Security Considerations

1. **JWT Access Tokens**
   - Durée de vie: 30 jours (achat unique) ou jusqu'à fin d'abonnement
   - Stockage: Cookie httpOnly, Secure, SameSite=Strict
   - Refresh automatique via webhook Stripe pour abonnements

2. **Protection des routes**
   - Middleware Next.js vérifie le token sur `/formations/apprendre/*`
   - Redirection vers `/formations-paiement` si non authentifié

3. **Protection des vidéos**
   - URLs signées avec expiration courte
   - Ou hébergement sur plateforme sécurisée (Vimeo Pro, Bunny Stream)

4. **Rate limiting**
   - Ajouter `/api/formations/checkout` au middleware existant

## UI/UX Design

### Page Catalogue (`/formations`)
- Hero section avec titre "Formations Cybersécurité"
- Filtres par catégorie (Pentest, OWASP, GRC, etc.)
- Grille de cartes avec thumbnail, titre, prix, durée, niveau
- CTA "Voir le programme" sur chaque carte

### Page Détail (`/formations/[slug]`)
- Header avec thumbnail large et titre
- Description complète
- Liste des modules avec durées
- Sidebar avec prix et bouton "S'inscrire"
- Section instructeur

### Page Paiement (`/formations-paiement`)
- Récapitulatif de la formation
- Formulaire (email, nom)
- Choix: Paiement unique OU Abonnement mensuel
- Bouton redirigeant vers Stripe Checkout

### Page Apprendre (`/formations/apprendre/[slug]`)
- Lecteur vidéo principal
- Liste des modules à gauche avec progression
- Boutons précédent/suivant

## Stripe Configuration

### Produits à créer dans Stripe Dashboard
1. **Produits one-time** pour chaque formation
2. **Produits recurring** (monthly) pour abonnements

### Métadonnées Stripe
```json
{
  "formation_slug": "pentest-web-owasp",
  "purchase_type": "one_time",
  "customer_email": "user@example.com"
}
```

## Estimated Effort
- Phase 1: 1-2 heures
- Phase 2: 3-4 heures  
- Phase 3: 3-4 heures
- Phase 4: 2-3 heures
- Phase 5: 3-4 heures
- Phase 6: 2-3 heures

**Total estimé: 14-20 heures**

## Dependencies
- `stripe` (déjà installé)
- `jsonwebtoken` (à installer pour JWT)
- `drizzle-orm` (déjà installé)
- `zod` (déjà installé)
- `resend` (déjà configuré)

## Notes
- Les vidéos peuvent être hébergées sur YouTube (unlisted), Vimeo, ou Bunny Stream
- Pour la V1, on peut utiliser des iframes YouTube/Vimeo
- La progression des modules peut être stockée en localStorage côté client
- Possibilité future: certificat de formation téléchargeable après complétion
