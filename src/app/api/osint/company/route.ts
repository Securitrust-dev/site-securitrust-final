import { NextRequest, NextResponse } from 'next/server';
import { verifyCompanyBySiret, extractCompanyInfo } from '@/lib/insee';

function isAuthorizedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer') ?? '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://securitrust.fr';
  return origin.startsWith(appUrl) || origin.startsWith('http://localhost');
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedOrigin(request)) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const siret = searchParams.get('siret');

    if (!siret) {
      return NextResponse.json(
        { error: 'SIRET requis' },
        { status: 400 }
      );
    }

    const cleanSiret = siret.replace(/\s/g, '');
    if (!/^\d{14}$/.test(cleanSiret)) {
      return NextResponse.json(
        { error: 'Le SIRET doit contenir 14 chiffres' },
        { status: 400 }
      );
    }

    const result = await verifyCompanyBySiret(cleanSiret);

    if (!result.valid || !result.company) {
      return NextResponse.json(
        { error: result.error || 'Entreprise non trouvée' },
        { status: 404 }
      );
    }

    const etablissement = result.company;
    const companyInfo = extractCompanyInfo(etablissement);
    const currentPeriod = etablissement.periodesEtablissement[0];
    const uniteLegale = etablissement.uniteLegale;
    const adresse = etablissement.adresseEtablissement;

    const employeeCount = companyInfo.employeeCount 
      ? `${companyInfo.employeeCount} employés`
      : 'Non renseigné';

    const representative = uniteLegale.nomUniteLegale && uniteLegale.prenom1UniteLegale
      ? `${uniteLegale.prenom1UniteLegale} ${uniteLegale.nomUniteLegale}`
      : 'Non renseigné';

    const addressParts = [
      companyInfo.address.line1,
      `${companyInfo.address.postalCode} ${companyInfo.address.city}`
    ].filter(Boolean);
    const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : 'Non renseigné';

      const formattedData = {
        legalInfo: {
          siret: companyInfo.siret,
          siren: companyInfo.siren,
          formeJuridique: uniteLegale.categorieJuridiqueUniteLegale || 'Non renseigné',
          capitalSocial: 'Non disponible',
          dateCreation: new Date(etablissement.dateCreationEtablissement).toLocaleDateString('fr-FR'),
          dirigeant: representative,
          siegeSocial: fullAddress,
          codeNaf: `${currentPeriod?.activitePrincipaleEtablissement || ''} - ${companyInfo.activityLabel || ''}`,
          statut: companyInfo.status === 'ACTIVE' ? 'Actif' : 'Cessé',
          effectif: employeeCount,
          etablissementSiege: etablissement.etablissementSiege ? 'Oui' : 'Non',
          categorieEntreprise: uniteLegale.categorieEntreprise || 'Non renseigné',
          caractereEmployeur: uniteLegale.caractereEmployeurUniteLegale === 'O' ? 'Oui' : 'Non',
          economieSocialeSolidaire: uniteLegale.economieSocialeSolidaireUniteLegale === 'O' ? 'Oui' : 'Non',
          societeMission: uniteLegale.societeMissionUniteLegale === 'O' ? 'Oui' : 'Non'
        },
        financialData: null,
        digitalPresence: {
          siteWeb: null,
        },
        companyName: companyInfo.name,
        domain: companyInfo.domain,
      };

    return NextResponse.json(formattedData);

  } catch (error: unknown) {
    console.error('OSINT API error:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}
