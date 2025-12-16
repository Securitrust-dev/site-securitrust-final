# 📝 API Documentation - Extension Chrome SecuriTrust

## 🔐 URL de base de l'API

```
https://votre-domaine.com/api/articles
```

## 🔑 Authentification

Toutes les requêtes de création, modification et suppression nécessitent une clé API.

**Header requis :**
```
x-api-key: VOTRE_CLE_API
```

⚠️ **Important :** Vous devez définir la variable d'environnement `ARTICLE_API_KEY` dans votre fichier `.env` :

```env
ARTICLE_API_KEY=votre_cle_secrete_tres_complexe
```

---

## 📋 Endpoints disponibles

### 1️⃣ **Créer un article** (POST)

**Endpoint :** `POST /api/articles`

**Headers :**
```http
Content-Type: application/json
x-api-key: VOTRE_CLE_API
```

**Body (JSON) :**
```json
{
  "title": "Titre de votre article",
  "excerpt": "Résumé court de l'article (quelques phrases)",
  "content": "Contenu complet de l'article en HTML ou Markdown",
  "image": "https://images.unsplash.com/photo-xxxxx",
  "category": "Cybersécurité",
  "author": "SecuriTrust",
  "published": true
}
```

**Champs requis :**
- `title` (string) - Titre de l'article
- `excerpt` (string) - Résumé court
- `content` (string) - Contenu complet
- `image` (string) - URL de l'image
- `category` (string) - Catégorie (ex: "Cybersécurité", "IA & Sécurité", "Conformité")

**Champs optionnels :**
- `author` (string, défaut: "SecuriTrust") - Auteur de l'article
- `slug` (string, auto-généré si absent) - URL-friendly slug
- `published` (boolean, défaut: false) - Publier immédiatement ou non

**Réponse (201 Created) :**
```json
{
  "id": 7,
  "title": "Titre de votre article",
  "excerpt": "Résumé court...",
  "content": "Contenu complet...",
  "image": "https://images.unsplash.com/photo-xxxxx",
  "author": "SecuriTrust",
  "category": "Cybersécurité",
  "slug": "titre-de-votre-article",
  "published": true,
  "createdAt": "2024-12-08T10:30:00.000Z",
  "updatedAt": "2024-12-08T10:30:00.000Z"
}
```

**Exemple avec cURL :**
```bash
curl -X POST https://votre-domaine.com/api/articles \
  -H "Content-Type: application/json" \
  -H "x-api-key: VOTRE_CLE_API" \
  -d '{
    "title": "Les 5 tendances cybersécurité 2025",
    "excerpt": "Découvrez les menaces émergentes et les stratégies de protection...",
    "content": "<h2>Introduction</h2><p>La cybersécurité évolue...</p>",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    "category": "Cybersécurité",
    "published": true
  }'
```

**Exemple avec JavaScript :**
```javascript
const createArticle = async (articleData) => {
  const response = await fetch('https://votre-domaine.com/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'VOTRE_CLE_API'
    },
    body: JSON.stringify(articleData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.json();
};

// Utilisation
const newArticle = await createArticle({
  title: "Les 5 tendances cybersécurité 2025",
  excerpt: "Découvrez les menaces émergentes...",
  content: "<h2>Introduction</h2><p>La cybersécurité évolue...</p>",
  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
  category: "Cybersécurité",
  published: true
});

console.log('Article créé:', newArticle);
```

---

### 2️⃣ **Lister tous les articles** (GET)

**Endpoint :** `GET /api/articles`

**Headers :** Aucun header requis (accès public)

**Paramètres de requête (query params) :**
- `limit` (number, défaut: 20, max: 100) - Nombre d'articles par page
- `offset` (number, défaut: 0) - Décalage pour la pagination
- `search` (string) - Rechercher dans titre, excerpt et contenu
- `category` (string) - Filtrer par catégorie

**Exemples d'URLs :**
```
GET /api/articles
GET /api/articles?limit=10
GET /api/articles?limit=10&offset=20
GET /api/articles?search=DORA
GET /api/articles?category=Cybersécurité
GET /api/articles?category=IA%20%26%20Sécurité&limit=5
```

**Réponse (200 OK) :**
```json
[
  {
    "id": 1,
    "title": "Quand vos prompts nourrissent les arnaques...",
    "excerpt": "Derrière la facilité d'utilisation...",
    "content": "Contenu complet...",
    "image": "https://images.unsplash.com/photo-xxxxx",
    "author": "SecuriTrust",
    "category": "IA & Sécurité",
    "slug": "quand-vos-prompts-nourrissent-les-arnaques",
    "published": true,
    "createdAt": "2024-11-15T10:00:00.000Z",
    "updatedAt": "2024-11-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "DeepSeek : quand un modèle d'IA...",
    ...
  }
]
```

**Exemple avec JavaScript :**
```javascript
// Récupérer tous les articles
const articles = await fetch('https://votre-domaine.com/api/articles').then(r => r.json());

// Recherche avec filtres
const searchResults = await fetch(
  'https://votre-domaine.com/api/articles?search=DORA&limit=5'
).then(r => r.json());

// Pagination
const page2 = await fetch(
  'https://votre-domaine.com/api/articles?limit=20&offset=20'
).then(r => r.json());
```

---

### 3️⃣ **Récupérer un article par slug** (GET)

**Endpoint :** `GET /api/articles/[slug]`

**Headers :** Aucun header requis (accès public)

**Exemple :**
```
GET /api/articles/quand-vos-prompts-nourrissent-les-arnaques
```

**Réponse (200 OK) :**
```json
{
  "id": 1,
  "title": "Quand vos prompts nourrissent les arnaques...",
  "excerpt": "Derrière la facilité d'utilisation...",
  "content": "Contenu complet HTML/Markdown...",
  "image": "https://images.unsplash.com/photo-xxxxx",
  "author": "SecuriTrust",
  "category": "IA & Sécurité",
  "slug": "quand-vos-prompts-nourrissent-les-arnaques",
  "published": true,
  "createdAt": "2024-11-15T10:00:00.000Z",
  "updatedAt": "2024-11-15T10:00:00.000Z"
}
```

**Réponse (404 Not Found) :**
```json
{
  "error": "Article not found or not published",
  "code": "NOT_FOUND"
}
```

---

### 4️⃣ **Mettre à jour un article** (PUT)

**Endpoint :** `PUT /api/articles?id=[id]`

**Headers :**
```http
Content-Type: application/json
x-api-key: VOTRE_CLE_API
```

**Body (JSON) :** Seuls les champs à modifier
```json
{
  "title": "Nouveau titre modifié",
  "published": true
}
```

**Exemple d'URL :**
```
PUT /api/articles?id=7
```

**Exemple avec cURL :**
```bash
curl -X PUT "https://votre-domaine.com/api/articles?id=7" \
  -H "Content-Type: application/json" \
  -H "x-api-key: VOTRE_CLE_API" \
  -d '{
    "title": "Titre mis à jour",
    "published": true
  }'
```

**Réponse (200 OK) :**
```json
{
  "id": 7,
  "title": "Titre mis à jour",
  "excerpt": "Résumé original...",
  "content": "Contenu original...",
  "image": "https://images.unsplash.com/photo-xxxxx",
  "author": "SecuriTrust",
  "category": "Cybersécurité",
  "slug": "titre-mis-a-jour",
  "published": true,
  "createdAt": "2024-12-08T10:30:00.000Z",
  "updatedAt": "2024-12-08T11:45:00.000Z"
}
```

---

### 5️⃣ **Supprimer un article** (DELETE)

**Endpoint :** `DELETE /api/articles?id=[id]`

**Headers :**
```http
x-api-key: VOTRE_CLE_API
```

**Exemple d'URL :**
```
DELETE /api/articles?id=7
```

**Exemple avec cURL :**
```bash
curl -X DELETE "https://votre-domaine.com/api/articles?id=7" \
  -H "x-api-key: VOTRE_CLE_API"
```

**Réponse (200 OK) :**
```json
{
  "success": true,
  "message": "Article deleted successfully",
  "article": {
    "id": 7,
    "title": "Article supprimé",
    ...
  }
}
```

---

## ⚠️ Codes d'erreur

| Code HTTP | Message | Description |
|-----------|---------|-------------|
| **400** | `MISSING_REQUIRED_FIELDS` | Champs obligatoires manquants (title, excerpt, content, image, category) |
| **400** | `INVALID_ID` | ID d'article invalide (doit être un nombre) |
| **400** | `MISSING_SLUG` | Slug manquant dans la requête |
| **401** | `UNAUTHORIZED` | Clé API invalide ou manquante |
| **404** | `NOT_FOUND` | Article introuvable ou non publié |
| **500** | `Internal server error` | Erreur serveur interne |

**Exemple de réponse d'erreur :**
```json
{
  "error": "Missing required fields: title, excerpt, content, image, category",
  "code": "MISSING_REQUIRED_FIELDS"
}
```

---

## 🌐 Exemple complet pour Extension Chrome

```javascript
// Configuration
const API_BASE_URL = 'https://votre-domaine.com/api/articles';
const API_KEY = 'votre_cle_api';

// Service API
class ArticlesAPI {
  static async createArticle(articleData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(articleData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la création');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  static async listArticles(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}?${params}`);
    return await response.json();
  }

  static async updateArticle(id, updates) {
    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return await response.json();
  }

  static async deleteArticle(id) {
    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return await response.json();
  }
}

// Utilisation dans votre extension Chrome
async function publishArticle() {
  // Récupérer les données du formulaire
  const articleData = {
    title: document.getElementById('title').value,
    excerpt: document.getElementById('excerpt').value,
    content: document.getElementById('content').value,
    image: document.getElementById('image').value,
    category: document.getElementById('category').value,
    published: true
  };

  try {
    // Publier l'article
    const result = await ArticlesAPI.createArticle(articleData);
    
    // Afficher un message de succès
    alert(`✅ Article publié avec succès! ID: ${result.id}`);
    console.log('Article créé:', result);
    
    // Rediriger vers l'article
    window.open(`https://votre-domaine.com/articles`, '_blank');
    
  } catch (error) {
    alert(`❌ Erreur: ${error.message}`);
    console.error('Erreur de publication:', error);
  }
}

// Bouton de publication
document.getElementById('publishBtn').addEventListener('click', publishArticle);
```

---

## 📊 Catégories disponibles

Voici les catégories existantes dans la base de données :
- `IA & Sécurité`
- `IA & Éthique`
- `Actualités`
- `Conformité`
- `Réglementation`
- `Cybersécurité`

Vous pouvez créer de nouvelles catégories simplement en les spécifiant dans le champ `category`.

---

## 🔒 Sécurité

1. **Gardez votre clé API secrète** - Ne la partagez jamais publiquement
2. **Utilisez HTTPS** - Toujours utiliser une connexion sécurisée
3. **Validez les entrées** - Vérifiez les données avant de les envoyer
4. **Gestion des erreurs** - Implémentez une gestion robuste des erreurs
5. **Rate limiting** - Évitez d'envoyer trop de requêtes simultanées

---

## 📝 Notes importantes

- Le `slug` est automatiquement généré à partir du titre si vous ne le spécifiez pas
- Les articles avec `published: false` ne sont pas visibles dans l'API publique (GET /api/articles)
- Le champ `updatedAt` est automatiquement mis à jour lors des modifications
- Les dates sont au format ISO 8601 (UTC)
- La recherche (paramètre `search`) est insensible à la casse
- Limite maximale : 100 articles par requête

---

## 🆘 Support

Pour toute question ou problème :
- 📧 Email : support@securitrust.com
- 🌐 Site web : https://securitrust.com/contact
- 📚 Documentation complète : https://securitrust.com/api-docs
