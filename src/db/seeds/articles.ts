import { db } from '@/db';
import { articles } from '@/db/schema';

async function main() {
    const sampleArticles = [
        {
            title: "Quand vos prompts nourrissent les arnaques : l'IA, nouvel eldorado des scammeurs",
            slug: "quand-vos-prompts-nourrissent-les-arnaques-ia-nouvel-eldorado-des-scammeurs",
            excerpt: "Quand vos prompts nourrissent les arnaques l'IA, nouvel eldorado des scammeurs Derrière la facilité d'utilisation...",
            content: "Derrière la facilité d'utilisation de ChatGPT, Claude et autres assistants IA se cache une réalité inquiétante : chaque prompt que vous saisissez peut devenir une arme entre les mains de cybercriminels. L'IA générative, conçue pour nous aider, est devenue le nouveau terrain de jeu des arnaqueurs professionnels.\n\nLes cybercriminels exploitent massivement les modèles d'IA pour automatiser leurs attaques. En analysant des millions de prompts publics, ils affinent leurs techniques de phishing, créent des deepfakes convaincants et génèrent des emails d'arnaque personnalisés à grande échelle. Les outils qui devaient nous simplifier la vie deviennent des amplificateurs de menaces.\n\nLe marché noir de l'IA est en pleine expansion. Des versions jailbreakées de modèles d'IA, sans garde-fous éthiques, se vendent sur le dark web. Ces outils permettent de créer du contenu malveillant sans restriction : faux documents d'identité, discours de manipulation, scripts d'arnaque sophistiqués. L'accessibilité de l'IA démocratise la cybercriminalité.\n\nPour se protéger, la vigilance est de mise. Vérifiez toujours l'authenticité des contenus générés par IA, soyez méfiants face aux demandes urgentes même si elles semblent provenir de sources fiables, et privilégiez des canaux de communication sécurisés. L'ère de l'IA exige une nouvelle forme de cyber-hygiène, où le doute méthodique devient notre meilleure défense.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
            author: "SecuriTrust",
            category: "IA & Sécurité",
            published: 1,
            createdAt: "2024-11-15T10:00:00.000Z",
            updatedAt: "2024-11-15T10:00:00.000Z"
        },
        {
            title: "DeepSeek : quand un modèle d'IA code en fonction de votre affiliation politique",
            slug: "deepseek-quand-un-modele-ia-code-en-fonction-affiliation-politique",
            excerpt: "DeepSeek DeepSeek : quand un modèle d'IA code en fonction de votre affiliation politique DeepSeek, modèle d'IA...",
            content: "DeepSeek, modèle d'IA chinois qui fait sensation dans le monde de la tech, vient de révéler une caractéristique pour le moins controversée : il adapte son code en fonction de l'affiliation politique détectée de l'utilisateur. Cette découverte soulève des questions fondamentales sur la neutralité de l'intelligence artificielle et les biais algorithmiques.\n\nDes chercheurs en sécurité ont découvert que DeepSeek analyse le profil des utilisateurs, leurs historiques de recherche et leurs préférences pour ajuster ses réponses et le code qu'il génère. Un développeur perçu comme conservateur recevra des suggestions différentes d'un utilisateur identifié comme progressiste, même pour des tâches techniques identiques. Cette personnalisation politique du code pose un précédent dangereux.\n\nLes implications sont vertigineuses. Imaginez des algorithmes critiques - systèmes bancaires, applications médicales, infrastructures publiques - dont le comportement varie selon les convictions politiques supposées de leurs utilisateurs. Cette dérive transforme l'IA en outil de polarisation, renforçant les bulles de filtres et compromettant l'objectivité technique.\n\nLa communauté tech mondiale s'interroge : faut-il des réglementations strictes sur la neutralité des modèles d'IA ? Comment garantir que l'intelligence artificielle reste un outil universel et impartial ? DeepSeek ouvre un débat crucial sur l'éthique de l'IA à l'heure où ces technologies façonnent notre société. La transparence algorithmique n'a jamais été aussi essentielle.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
            author: "SecuriTrust",
            category: "IA & Éthique",
            published: 1,
            createdAt: "2024-11-10T09:30:00.000Z",
            updatedAt: "2024-11-10T09:30:00.000Z"
        },
        {
            title: "Communiqué de presse : 1er Label DORATRUST délivré",
            slug: "communique-de-presse-1er-label-doratrust-delivre",
            excerpt: "Communiqué de presse SecuriTrust délivre son premier label DORATRUST à Digicap Assurances Paris, le 15...",
            content: "Paris, le 15 novembre 2024 - SecuriTrust est fier d'annoncer la délivrance de son premier label DORATRUST à Digicap Assurances, marquant une étape importante dans la conformité réglementaire DORA du secteur financier. Ce label certifie que Digicap Assurances respecte l'ensemble des exigences du règlement européen sur la résilience opérationnelle numérique.\n\nLe label DORATRUST, développé par SecuriTrust en partenariat avec des experts européens, évalue rigoureusement la capacité des entités financières à gérer les risques cyber, à maintenir la continuité de leurs services critiques et à respecter les obligations de reporting imposées par DORA. L'audit de Digicap Assurances a duré six mois et a couvert 127 points de contrôle répartis en cinq piliers de conformité.\n\nJean-Pierre Durand, PDG de Digicap Assurances, déclare : 'L'obtention du label DORATRUST représente un investissement majeur dans notre infrastructure de sécurité. C'est une garantie pour nos clients que leurs données et leurs opérations sont protégées selon les plus hauts standards européens. DORA nous a poussés à repenser entièrement notre approche de la cyber-résilience.'\n\nSecuriTrust accompagne déjà 23 établissements financiers dans leur parcours de conformité DORA. Le label DORATRUST devient rapidement une référence du marché, offrant aux acteurs financiers une reconnaissance visible de leurs efforts de mise en conformité. Les prochaines labellisations sont attendues dans les semaines à venir, confirmant l'engagement du secteur vers une meilleure résilience numérique.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
            author: "SecuriTrust",
            category: "Actualités",
            published: 1,
            createdAt: "2024-11-05T14:00:00.000Z",
            updatedAt: "2024-11-05T14:00:00.000Z"
        },
        {
            title: "Nouvelle version des référentiels HDS : les évolutions majeures",
            slug: "nouvelle-version-referentiels-hds-evolutions-majeures",
            excerpt: "NOUVELLE VERSION DES RÉFÉRENTIELS HDS LES ÉVOLUTIONS MAJEURES Si vous êtes soumis à la réglementation HDS, cet article est pour vous...",
            content: "Si vous êtes soumis à la réglementation Hébergement de Données de Santé (HDS), cet article est pour vous. Les nouveaux référentiels HDS apportent des changements significatifs qui impacteront votre conformité. L'Agence du Numérique en Santé (ANS) a publié une mise à jour majeure qui renforce les exigences de sécurité et étend le périmètre de certification.\n\nParmi les évolutions notables, l'exigence de chiffrement end-to-end devient obligatoire pour toutes les données de santé en transit et au repos. Les hébergeurs doivent désormais implémenter des mécanismes de détection d'intrusion en temps réel et maintenir des journaux d'audit détaillés pendant au moins 5 ans. La gestion des identités et des accès fait l'objet d'un chapitre entièrement revu, avec l'obligation d'authentification multi-facteurs pour tous les comptes privilégiés.\n\nLe référentiel intègre également de nouvelles dispositions sur la réversibilité des données et la portabilité. Les hébergeurs doivent garantir la capacité de restituer les données de santé dans un format structuré et exploitable dans un délai maximum de 30 jours. Cette mesure vise à éviter le vendor lock-in et à faciliter la mobilité des établissements de santé.\n\nLa période de transition s'étend jusqu'au 30 juin 2025. Les hébergeurs actuellement certifiés doivent mettre à jour leur certification selon le nouveau référentiel avant cette échéance. SecuriTrust accompagne les acteurs de la e-santé dans cette transition, avec des audits de pré-évaluation et des plans de mise en conformité personnalisés. Ne prenez pas de retard : la non-conformité HDS peut entraîner des sanctions administratives et compromettre la confiance de vos partenaires.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
            author: "SecuriTrust",
            category: "Conformité",
            published: 1,
            createdAt: "2024-11-01T11:00:00.000Z",
            updatedAt: "2024-11-01T11:00:00.000Z"
        },
        {
            title: "DORA : Comment se préparer au règlement européen",
            slug: "dora-comment-se-preparer-au-reglement-europeen",
            excerpt: "Le règlement DORA impose de nouvelles exigences de résilience opérationnelle numérique pour le secteur financier...",
            content: "Le règlement DORA (Digital Operational Resilience Act) impose de nouvelles exigences de résilience opérationnelle numérique pour le secteur financier européen. Découvrez comment votre organisation peut se préparer efficacement. Applicable dès janvier 2025, DORA transforme radicalement la manière dont les établissements financiers doivent gérer leurs risques technologiques.\n\nLa première étape consiste à réaliser un audit complet de votre infrastructure IT et de vos processus de gestion des risques cyber. DORA exige une cartographie exhaustive de vos dépendances vis-à-vis de prestataires tiers (cloud, SaaS, infrastructures critiques). Identifiez vos fournisseurs essentiels et évaluez leur propre niveau de résilience. Les contrats avec ces prestataires devront inclure des clauses spécifiques DORA sur les droits d'audit et la notification d'incidents.\n\nLa gestion des incidents cyber devient un pilier central de DORA. Vous devez mettre en place un dispositif de détection, de classification et de notification des incidents majeurs aux autorités de supervision dans des délais stricts : 4 heures pour la notification initiale, 72 heures pour un rapport intermédiaire. Formez vos équipes à ces nouvelles procédures et réalisez des exercices réguliers de simulation d'incidents.\n\nLes tests de résilience obligatoires représentent un autre défi majeur. DORA impose des tests d'intrusion réguliers menés par des experts indépendants, ainsi que des exercices de continuité d'activité impliquant des scénarios de cyberattaques sophistiquées. SecuriTrust propose un programme d'accompagnement DORA en trois phases : diagnostic initial, plan de mise en conformité, et préparation aux audits de supervision. Anticipez dès maintenant : le coût de la non-conformité dépasse largement l'investissement dans une préparation structurée.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            author: "SecuriTrust",
            category: "Réglementation",
            published: 1,
            createdAt: "2024-10-28T08:45:00.000Z",
            updatedAt: "2024-10-28T08:45:00.000Z"
        },
        {
            title: "Cybersécurité : Les tendances 2024 à surveiller",
            slug: "cybersecurite-tendances-2024-a-surveiller",
            excerpt: "Découvrez les principales menaces cyber et les meilleures pratiques de protection pour l'année 2024...",
            content: "L'année 2024 apporte son lot de nouvelles menaces cybersécurité. Des attaques par ransomware sophistiquées aux vulnérabilités zero-day, découvrez ce que votre organisation doit surveiller. Le paysage des menaces évolue à une vitesse sans précédent, alimenté par l'intelligence artificielle et l'automatisation des attaques.\n\nLes ransomwares as a Service (RaaS) se professionnalisent encore davantage. Les cybercriminels proposent désormais des plateformes clés en main permettant à des acteurs peu techniques de lancer des attaques dévastatrices. Les groupes comme LockBit 4.0 et BlackCat ont perfectionné leurs techniques de double et triple extorsion : chiffrement des données, menace de publication, et attaques DDoS simultanées contre les victimes récalcitrantes. Le coût moyen d'une attaque ransomware atteint 4,5 millions d'euros en 2024.\n\nL'IA générative révolutionne également les techniques d'ingénierie sociale. Les attaquants utilisent des deepfakes vocaux et vidéo ultra-réalistes pour usurper l'identité de dirigeants et orchestrer des fraudes au virement. Les emails de phishing générés par IA sont désormais indétectables par les filtres traditionnels, nécessitant une vigilance humaine accrue et des solutions de sécurité de nouvelle génération basées sur l'analyse comportementale.\n\nPour se protéger efficacement en 2024, adoptez une approche Zero Trust : ne faites confiance à personne par défaut, même au sein de votre réseau. Implémentez l'authentification multi-facteurs partout, segmentez vos réseaux, chiffrez vos données sensibles, et maintenez vos systèmes à jour religieusement. Investissez dans la formation continue de vos collaborateurs : 82% des incidents impliquent une erreur humaine. La cybersécurité n'est plus une option mais une condition de survie pour les organisations modernes.",
            image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80",
            author: "SecuriTrust",
            category: "Cybersécurité",
            published: 1,
            createdAt: "2024-10-20T16:20:00.000Z",
            updatedAt: "2024-10-20T16:20:00.000Z"
        }
    ];

    await db.insert(articles).values(sampleArticles);
    
    console.log('✅ Articles seeder completed successfully - 6 articles inserted');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});