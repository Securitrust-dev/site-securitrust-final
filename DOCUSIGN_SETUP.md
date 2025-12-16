# Configuration DocuSign pour SecuriTrust

## 📋 Vue d'ensemble

Le flux de signature électronique est implémenté et prêt à être activé avec vos identifiants DocuSign.

## 🔧 Étapes de configuration

### 1. Créer un compte DocuSign Developer

1. Visitez [DocuSign Developer Center](https://developers.docusign.com/)
2. Créez un compte gratuit de développement
3. Accédez à votre **Dashboard**

### 2. Créer une application d'intégration

1. Dans le Dashboard, allez dans **Settings** → **Apps and Keys**
2. Cliquez sur **Add App and Integration Key**
3. Notez votre **Integration Key** (Client ID)
4. Générez une **RSA Keypair**:
   - Cliquez sur **Generate RSA**
   - Téléchargez la clé privée (fichier `.key`)
   - Conservez précieusement ce fichier

### 3. Configurer les redirections

1. Dans les paramètres de votre app, ajoutez les **Redirect URIs**:
   ```
   http://localhost:3000/proposition-commerciale?signed=true
   https://votre-domaine.com/proposition-commerciale?signed=true
   ```

### 4. Obtenir votre User ID et Account ID

1. **User ID**: Dans Settings → Apps and Keys, copiez votre **API Username** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
2. **Account ID**: Visible dans l'URL de votre dashboard DocuSign ou dans Settings → API and Keys

### 5. Accorder le consentement (Consent)

Exécutez cette URL dans votre navigateur (remplacez `YOUR_INTEGRATION_KEY` par votre clé):

```
https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=YOUR_INTEGRATION_KEY&redirect_uri=http://localhost:3000/proposition-commerciale?signed=true
```

Cliquez sur **Allow** pour accorder les permissions.

### 6. Configurer les variables d'environnement

Ajoutez ces variables à votre fichier `.env`:

```env
# DocuSign Configuration
DOCUSIGN_INTEGRATION_KEY=your-integration-key-here
DOCUSIGN_USER_ID=your-user-id-here
DOCUSIGN_ACCOUNT_ID=your-account-id-here
DOCUSIGN_BASE_PATH=https://demo.docusign.net/restapi
DOCUSIGN_PRIVATE_KEY=base64-encoded-private-key-here

# URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 7. Encoder la clé privée en Base64

Pour Linux/Mac:
```bash
base64 -i private.key > private_base64.txt
```

Pour Windows (PowerShell):
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("private.key")) > private_base64.txt
```

Copiez le contenu de `private_base64.txt` dans `DOCUSIGN_PRIVATE_KEY`.

### 8. Activer le code de production

Dans `src/app/api/docusign/sign-url/route.ts`:

1. **Décommentez** le bloc de code de production (lignes commentées)
2. **Commentez** le bloc de simulation
3. **Redémarrez** votre serveur Next.js

## 📝 Génération du PDF du contrat

Vous devez implémenter la fonction `generateContractPDF()` qui crée le document PDF à partir des données:

```typescript
function generateContractPDF(company: any, answers: any[]): string {
  // Utilisez une bibliothèque comme PDFKit, jsPDF ou Puppeteer
  // pour générer le PDF et le retourner en base64
  
  const pdfBase64 = '...'; // Votre logique de génération
  return pdfBase64;
}
```

Bibliothèques recommandées:
- **pdfkit**: Pour créer des PDFs programmatiquement
- **@react-pdf/renderer**: Pour créer des PDFs avec React
- **puppeteer**: Pour convertir HTML en PDF

## 🧪 Mode démo vs Production

**Mode démo actuel** (aucune configuration requise):
- URL de signature simulée
- Signature marquée comme complète après 2 secondes
- Idéal pour tester le flux UX

**Mode production** (configuration DocuSign requise):
- Signature électronique légale via DocuSign
- Enveloppes DocuSign réelles
- Certificat de signature authentique
- Conformité eIDAS/ESIGN

## 🔐 Sécurité

⚠️ **Important**:
- Ne commitez JAMAIS vos clés privées dans Git
- Ajoutez `.env` à votre `.gitignore`
- Utilisez des variables d'environnement sécurisées en production
- Stockez les clés dans un vault (AWS Secrets Manager, Azure Key Vault, etc.)

## 📚 Documentation officielle

- [DocuSign Developer Center](https://developers.docusign.com/)
- [DocuSign Node.js SDK](https://github.com/docusign/docusign-node-client)
- [Embedded Signing Guide](https://developers.docusign.com/docs/esign-rest-api/how-to/embedded-signing/)

## 🆘 Support

En cas de problème:
1. Vérifiez que tous les identifiants sont corrects
2. Consultez les logs de l'API: `/api/docusign/sign-url`
3. Testez d'abord en mode démo pour valider le flux
4. Contactez le support DocuSign si nécessaire

---

**Statut actuel**: Mode démo activé ✅  
**Pour activer la production**: Suivez les étapes 1-8 ci-dessus
