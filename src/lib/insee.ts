import axios, { AxiosError } from 'axios';

export interface InseeEtablissement {
  siret: string;
  statutDiffusionEtablissement: string;
  dateCreationEtablissement: string;
  trancheEffectifsEtablissement: string | null;
  anneeEffectifsEtablissement: string | null;
  activitePrincipaleRegistreMetiersEtablissement: string | null;
  dateDernierTraitementEtablissement: string;
  etablissementSiege: boolean;
  nombrePeriodesEtablissement: number;
  uniteLegale: {
    etatAdministratifUniteLegale: string;
    statutDiffusionUniteLegale: string;
    dateCreationUniteLegale: string;
    categorieJuridiqueUniteLegale: string;
    denominationUniteLegale: string | null;
    sigleUniteLegale: string | null;
    denominationUsuelle1UniteLegale: string | null;
    denominationUsuelle2UniteLegale: string | null;
    denominationUsuelle3UniteLegale: string | null;
    sexeUniteLegale: string | null;
    nomUniteLegale: string | null;
    nomUsageUniteLegale: string | null;
    prenom1UniteLegale: string | null;
    prenom2UniteLegale: string | null;
    prenom3UniteLegale: string | null;
    prenom4UniteLegale: string | null;
    prenomUsuelUniteLegale: string | null;
    pseudonymeUniteLegale: string | null;
    activitePrincipaleUniteLegale: string;
    nomenclatureActivitePrincipaleUniteLegale: string;
    identifiantAssociationUniteLegale: string | null;
    economieSocialeSolidaireUniteLegale: string | null;
    societeMissionUniteLegale: string | null;
    caractereEmployeurUniteLegale: string;
    trancheEffectifsUniteLegale: string | null;
    anneeEffectifsUniteLegale: string | null;
    nicSiegeUniteLegale: string;
    dateDernierTraitementUniteLegale: string;
    categorieEntreprise: string;
    anneeCategorieEntreprise: string;
  };
  adresseEtablissement: {
    complementAdresseEtablissement: string | null;
    numeroVoieEtablissement: string | null;
    indiceRepetitionEtablissement: string | null;
    typeVoieEtablissement: string | null;
    libelleVoieEtablissement: string | null;
    codePostalEtablissement: string;
    libelleCommuneEtablissement: string;
    libelleCommuneEtrangerEtablissement: string | null;
    distributionSpecialeEtablissement: string | null;
    codeCommuneEtablissement: string;
    codeCedexEtablissement: string | null;
    libelleCedexEtablissement: string | null;
    codePaysEtrangerEtablissement: string | null;
    libellePaysEtrangerEtablissement: string | null;
  };
  adresse2Etablissement: {
    complementAdresse2Etablissement: string | null;
    numeroVoie2Etablissement: string | null;
    indiceRepetition2Etablissement: string | null;
    typeVoie2Etablissement: string | null;
    libelleVoie2Etablissement: string | null;
    codePostal2Etablissement: string | null;
    libelleCommune2Etablissement: string | null;
    libelleCommuneEtranger2Etablissement: string | null;
    distributionSpeciale2Etablissement: string | null;
    codeCommune2Etablissement: string | null;
    codeCedex2Etablissement: string | null;
    libelleCedex2Etablissement: string | null;
    codePaysEtranger2Etablissement: string | null;
    libellePaysEtranger2Etablissement: string | null;
  };
  periodesEtablissement: Array<{
    dateFin: string | null;
    dateDebut: string;
    etatAdministratifEtablissement: string;
    changementEtatAdministratifEtablissement: boolean;
    enseigne1Etablissement: string | null;
    enseigne2Etablissement: string | null;
    enseigne3Etablissement: string | null;
    changementEnseigneEtablissement: boolean;
    denominationUsuelleEtablissement: string | null;
    changementDenominationUsuelleEtablissement: boolean;
    activitePrincipaleEtablissement: string;
    nomenclatureActivitePrincipaleEtablissement: string;
    changementActivitePrincipaleEtablissement: boolean;
    caractereEmployeurEtablissement: string;
    changementCaractereEmployeurEtablissement: boolean;
  }>;
}

interface InseeApiResponse {
  header: {
    statut: number;
    message: string;
  };
  etablissement: InseeEtablissement;
}

interface SiretVerificationResult {
  valid: boolean;
  company?: InseeEtablissement;
  error?: string;
}

export async function verifyCompanyBySiret(
  siret: string
): Promise<SiretVerificationResult> {
  const apiKey = process.env.INSEE_API_KEY;
  
  if (!apiKey) {
    throw new Error('INSEE_API_KEY not configured');
  }

    try {
      const cleanSiret = siret.replace(/\s/g, '');
      const response = await axios.get<InseeApiResponse>(
        `https://api.insee.fr/api-sirene/3.11/siret/${cleanSiret}`,
        {
          headers: {
            'Accept': 'application/json',
            'X-INSEE-Api-Key-Integration': apiKey,
          },
          timeout: 10000,
        }
      );

    if (!response.data || !response.data.etablissement) {
      return { valid: false, error: 'Établissement non trouvé' };
    }

    const etablissement = response.data.etablissement;
    const currentPeriod = etablissement.periodesEtablissement[0];
    const isActive = currentPeriod?.etatAdministratifEtablissement === 'A';
    
    return {
      valid: isActive,
      company: etablissement,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response?.status === 404) {
      return { valid: false, error: 'SIRET introuvable' };
    }

    if (axiosError.response?.status === 401) {
      return { valid: false, error: 'Erreur d\'authentification API INSEE' };
    }
    
    return {
      valid: false,
      error: 'Erreur de vérification',
    };
  }
}

export function extractCompanyInfo(etablissement: InseeEtablissement) {
  const currentPeriod = etablissement.periodesEtablissement[0];
  const uniteLegale = etablissement.uniteLegale;
  const adresse = etablissement.adresseEtablissement;

  const companyName = uniteLegale.denominationUniteLegale ||
    uniteLegale.denominationUsuelle1UniteLegale ||
    (uniteLegale.nomUniteLegale && uniteLegale.prenom1UniteLegale
      ? `${uniteLegale.prenom1UniteLegale} ${uniteLegale.nomUniteLegale}`
      : 'N/A');

  const addressLine1 = [
    adresse.numeroVoieEtablissement,
    adresse.indiceRepetitionEtablissement,
    adresse.typeVoieEtablissement,
    adresse.libelleVoieEtablissement,
  ]
    .filter(Boolean)
    .join(' ');

  const effectifMap: Record<string, number> = {
    '00': 0,
    '01': 2,
    '02': 5,
    '03': 10,
    '11': 12,
    '12': 17,
    '21': 35,
    '22': 75,
    '31': 150,
    '32': 250,
    '41': 750,
    '42': 2500,
    '51': 7500,
    '52': 10000,
  };

  const employeeCount = uniteLegale.trancheEffectifsUniteLegale
    ? effectifMap[uniteLegale.trancheEffectifsUniteLegale] || null
    : null;

  return {
    siret: etablissement.siret,
    siren: etablissement.siret.substring(0, 9),
    name: companyName,
    status: currentPeriod?.etatAdministratifEtablissement === 'A' ? 'ACTIVE' : 'CEASED',
    activityCode: currentPeriod?.activitePrincipaleEtablissement || '',
    activityLabel: currentPeriod?.activitePrincipaleEtablissement || '',
    domain: currentPeriod?.activitePrincipaleEtablissement || '',
    employeeCount,
    hasLessThan15Employees: employeeCount ? employeeCount < 15 : false,
    createdAt: etablissement.dateCreationEtablissement,
    address: {
      line1: addressLine1,
      city: adresse.libelleCommuneEtablissement,
      postalCode: adresse.codePostalEtablissement,
    },
  };
}
