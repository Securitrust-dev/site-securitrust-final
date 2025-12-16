# 🔒 Checklist Sécurité PROD — SecuriTrust

## ✅ Implémenté

### A) Configuration PROD
- ✅ **Headers de sécurité globaux** (`next.config.ts`)
  - HSTS (Strict-Transport-Security)
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy (camera/mic/geo désactivés)
  - X-Frame-Options: DENY
  - Content-Security-Policy (CSP)

### B) Middleware de sécurité (`src/middleware.ts`)
- ✅ **Rate limiting** par IP et par route
  - `/api/checkout`: 5 req/min
  - `/api/osint/*`: 10 req/min
  - `/api/webhooks/*`: 100 req/min
  - `/api/upload`: 5 req/min
  - Autres APIs: 30 req/min
- ✅ **CORS** configuré (production: whitelist uniquement)
- ✅ **Logging sécurité** (sans PII)

### C) Base de données — Idempotence webhooks
- ✅ Tables créées dans `schema.ts`:
  - `stripe_events` (eventId UNIQUE)
  - `docusign_events` (eventId UNIQUE)
  - `opensign_events` (eventId UNIQUE)
  - `uploaded_files` (métadonnées sécurité)

### D) Validation stricte (`src/lib/validation.ts`)
- ✅ **Zod schemas** pour toutes les entrées:
  - Checkout (plan, montant, email, nom)
  - Email breaches (email)
  - Company search (SIRET/nom/domaine)
  - Proposal (companyName, email, SIRET)
  - Upload (filename, mimeType, size)
- ✅ **Validation MIME types**
- ✅ **Extensions dangereuses bloquées** (.exe, .bat, .html, .svg, .js, etc.)
- ✅ **Sanitization des noms de fichiers**

### E) Gestion des erreurs (`src/lib/errorHandler.ts`)
- ✅ **Jamais de stacktrace côté client** (production)
- ✅ **Logging sécurisé** (PII redacted)
- ✅ **Gestion Zod, AppError, Stripe errors**

### F) Routes sécurisées
- ✅ **`/api/checkout`**: Validation Zod + prix côté serveur uniquement
- ✅ **`/api/webhooks/stripe`**: Signature Stripe vérifiée + idempotence
- ✅ **`/api/osint/email-breaches`**: Validation email + rate limit + logging

### G) Fichiers de configuration
- ✅ **robots.txt** (production ready)
- ✅ **.env.example** (template complet)

---

## ⚠️ À FAIRE MANUELLEMENT

### 1. Variables d'environnement
```bash
# CRITIQUE: Ajouter ces variables en production
STRIPE_WEBHOOK_SECRET=whsec_...
ALLOWED_ORIGINS=https://yourdomain.com
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. Stripe Webhook
1. Aller sur [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Créer un endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Sélectionner les événements:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copier le **Webhook Secret** → `.env` (`STRIPE_WEBHOOK_SECRET`)

### 3. Turso Database
```bash
# Appliquer les migrations manuellement si erreur drizzle-kit
turso db shell <your-db> < migration.sql
```

### 4. Upload de fichiers (si pas encore implémenté)
- ⚠️ Ajouter route `/api/upload` avec:
  - Validation MIME réelle (pas juste extension)
  - Stockage hors webroot ou bucket privé (S3, R2, etc.)
  - Renommage systématique (générer UUID + timestamp)
  - Scanner antivirus (ClamAV ou service cloud si budget)

### 5. DocuSign / OpenSign Webhooks
- 🔄 Créer routes `/api/webhooks/docusign` et `/api/webhooks/opensign`
- Implémenter idempotence (table `docusign_events`, `opensign_events`)
- Vérifier signatures si disponibles

### 6. Monitoring & Alerting
- 📊 Intégrer un service de logging (Sentry, Datadog, CloudWatch)
- 🚨 Alertes sur:
  - Rate limit dépassé (haute fréquence)
  - Webhook signature invalide
  - Upload refusé (extensions dangereuses)
  - Erreurs 500 répétées

### 7. Tests de sécurité
```bash
# Tester rate limiting
for i in {1..15}; do curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"plan":"Audit Flash","amount":990,"email":"test@test.com","name":"Test"}'; done

# Tester validation Zod
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"plan":"Hack","amount":1,"email":"invalid","name":""}'

# Tester HIBP
curl "http://localhost:3000/api/osint/email-breaches?email=test@example.com"
```

### 8. Configuration serveur PROD
- ✅ Activer HTTPS uniquement (HSTS appliqué)
- ⚠️ Configurer firewall (bloquer ports non nécessaires)
- ⚠️ Limiter les connexions DB (pool size adapté)
- ⚠️ Backup automatique DB (Turso managed backups)

### 9. Staging/Preprod
- 🔒 Activer **Basic Auth** sur environnements non-prod
- 🤖 Modifier `robots.txt` → `Disallow: /`

### 10. Documentation
- 📝 Former l'équipe sur:
  - Gestion des secrets (jamais commiter dans Git)
  - Process de déploiement sécurisé
  - Réponse aux incidents (rate limit, webhook failure)

---

## 🎯 Résumé des protections actives

| Protection | Status | Notes |
|------------|--------|-------|
| Headers sécurité | ✅ | HSTS, CSP, X-Frame-Options, etc. |
| Rate limiting | ✅ | Par IP + route, in-memory (Redis recommandé PROD) |
| CORS | ✅ | Whitelist en PROD |
| Validation inputs | ✅ | Zod sur toutes les routes sensibles |
| Webhook Stripe | ✅ | Signature + idempotence |
| Webhook DocuSign/OpenSign | ⚠️ | À implémenter avec idempotence |
| Upload files | ⚠️ | Validation prête, route à créer |
| Erreurs sécurisées | ✅ | Pas de stacktrace client |
| Logging sécurité | ✅ | PII redacted |
| DB idempotence | ✅ | Tables créées |
| Secrets env | ⚠️ | `.env.example` fourni, à configurer |

---

## 🚀 Commandes utiles

```bash
# Lancer en dev
bun run dev

# Build production
bun run build
bun run start

# Appliquer migrations DB
bun run drizzle-kit generate
bun run drizzle-kit push

# Tester rate limiting
./scripts/test-rate-limit.sh  # À créer
```

---

## 📞 Support

En cas de problème de sécurité détecté:
1. **NE PAS commiter de fix directement en prod**
2. Créer un environnement isolé
3. Tester le fix
4. Déployer via CI/CD avec review
5. Monitorer les logs post-déploiement

---

**Date de dernière mise à jour:** 2025-12-15  
**Version:** 1.0.0  
**Responsable sécurité:** [À définir]
