import axios, { AxiosError } from 'axios';

export interface PappersCompany {
  siren: string;
  nom_entreprise: string;
  code_naf: string;
  libelle_code_naf: string;
  domaine_activite: string;
  effectif_min?: number;
  effectif_max?: number;
  effectif?: string;
  entreprise_cessee: boolean;
  date_creation: string;
  siege: {
    siret: string;
    code_postal: string;
    ville: string;
    adresse_ligne_1: string;
  };
}

interface SiretVerificationResult {
  valid: boolean;
  company?: PappersCompany;
  error?: string;
}

export async function verifyCompanyBySiret(
  siret: string
): Promise<SiretVerificationResult> {
  const apiKey = process.env.PAPPERS_API_KEY;
  
  if (!apiKey) {
    throw new Error('PAPPERS_API_KEY not configured');
  }

  try {
    const response = await axios.get(
      'https://api.pappers.fr/v2/entreprise',
      {
        params: {
          siret: siret.replace(/\s/g, ''),
          api_token: apiKey,
        },
        timeout: 10000,
      }
    );

    if (!response.data) {
      return { valid: false, error: 'Company not found' };
    }

    const company: PappersCompany = response.data;
    
    return {
      valid: !company.entreprise_cessee,
      company,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response?.status === 404) {
      return { valid: false, error: 'SIRET introuvable' };
    }
    
    return {
      valid: false,
      error: 'Erreur de vérification',
    };
  }
}

export function extractCompanyInfo(company: PappersCompany) {
  const employeeCount = company.effectif_min && company.effectif_max
    ? Math.floor((company.effectif_min + company.effectif_max) / 2)
    : null;

  return {
    siret: company.siege.siret,
    siren: company.siren,
    name: company.nom_entreprise,
    status: company.entreprise_cessee ? 'CEASED' : 'ACTIVE',
    activityCode: company.code_naf,
    activityLabel: company.libelle_code_naf,
    domain: company.domaine_activite,
    employeeCount,
    hasLessThan15Employees: employeeCount ? employeeCount < 15 : false,
    createdAt: company.date_creation,
    address: {
      line1: company.siege.adresse_ligne_1,
      city: company.siege.ville,
      postalCode: company.siege.code_postal,
    },
  };
}
