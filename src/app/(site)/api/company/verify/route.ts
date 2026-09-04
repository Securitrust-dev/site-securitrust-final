import { NextRequest, NextResponse } from 'next/server';
import { verifyCompanyBySiret, extractCompanyInfo } from '@/lib/insee';

type Answer = {
  questionId: string;
  answer: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if it's a SIRET verification (old behavior)
    if (body.siret) {
      const { siret } = body;

      if (typeof siret !== 'string') {
        return NextResponse.json(
          { error: 'SIRET valide requis' },
          { status: 400 }
        );
      }

      // Validate SIRET format (14 digits)
      const cleanSiret = siret.replace(/\s/g, '');
      if (!/^\d{14}$/.test(cleanSiret)) {
        return NextResponse.json(
          { error: 'Le SIRET doit contenir 14 chiffres' },
          { status: 400 }
        );
      }

      const result = await verifyCompanyBySiret(cleanSiret);

      if (!result.valid) {
        return NextResponse.json(
          { error: result.error || 'Vérification échouée' },
          { status: 404 }
        );
      }

      const companyInfo = extractCompanyInfo(result.company!);

      return NextResponse.json({
        verified: true,
        company: companyInfo,
      });
    }

    // Check if it's an eligibility questionnaire (new behavior)
    if (body.answers) {
      const { answers } = body;

      if (!Array.isArray(answers)) {
        return NextResponse.json(
          { error: 'Invalid request format' },
          { status: 400 }
        );
      }

      // Extract answers
      const answerMap: Record<string, string> = {};
      answers.forEach((a: Answer) => {
        answerMap[a.questionId] = a.answer;
      });

      // Eligibility logic
      let eligible = true;
      let score = 0;
      const benefits: string[] = [];
      let message = '';

      // Check company name
      if (!answerMap.company || answerMap.company.length < 2) {
        eligible = false;
        message = "Nom d'entreprise invalide";
        return NextResponse.json({ eligible, message });
      }

      // Score based on employees
      if (answerMap.employees === '11-50') score += 20;
      else if (answerMap.employees === '51-200') score += 30;
      else if (answerMap.employees === '200+') score += 40;
      else score += 10;

      // Score based on sector
      if (['Finance', 'Santé'].includes(answerMap.sector)) {
        score += 30;
        benefits.push('Audit prioritaire pour secteur réglementé');
      } else if (answerMap.sector === 'Tech') {
        score += 20;
        benefits.push('Analyse approfondie des infrastructures cloud');
      } else {
        score += 10;
      }

      // Previous security audit
      if (answerMap.security === 'Non') {
        score += 25;
        benefits.push('Premier audit de sécurité GRATUIT (valeur 2500€)');
      } else {
        score += 10;
        benefits.push('Audit de suivi avec réduction de 20%');
      }

      // Compliance requirements
      if (answerMap.compliance === 'Oui') {
        score += 25;
        benefits.push('Accompagnement certification ISO 27001/RGPD inclus');
        benefits.push('Rapport de conformité détaillé');
      } else {
        benefits.push('Évaluation des besoins de conformité');
      }

      // Determine eligibility based on score
      if (score >= 60) {
        eligible = true;
        message = `Félicitations ${answerMap.company} ! Vous êtes éligible à notre programme d'audit avec un score de ${score}/100.`;
        benefits.unshift('🎉 Consultation stratégique offerte (1h)');
        benefits.push('📊 Accès à notre plateforme de monitoring 3 mois');
        benefits.push('🛡️ Support prioritaire pendant 6 mois');
      } else if (score >= 40) {
        eligible = true;
        message = `${answerMap.company} est éligible à notre programme standard (score: ${score}/100).`;
        benefits.push('📞 Consultation téléphonique de 30min');
      } else {
        eligible = false;
        message = `Malheureusement, ${answerMap.company} ne remplit pas encore tous les critères (score: ${score}/100). Nous vous recommandons de nous contacter pour une évaluation personnalisée.`;
      }

      return NextResponse.json({
        eligible,
        message,
        benefits: eligible ? benefits : [],
        score,
        companyName: answerMap.company,
      });
    }

    // If neither siret nor answers provided
    return NextResponse.json(
      { error: 'SIRET ou réponses au questionnaire requis' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}