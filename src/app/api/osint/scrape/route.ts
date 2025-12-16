import { NextRequest, NextResponse } from 'next/server';

interface CompanyData {
  basicInfo: {
    name: string;
    activity: string;
    address: string;
    phone: string;
    email: string;
  };
  legalInfo: {
    siret: string;
    siren: string;
    legalForm: string;
    capital: string;
    registration: string;
  };
  financialInfo: {
    turnover: string;
    employees: string;
    creditRating: string;
    financialHealth: string;
  };
  digitalFootprint: {
    website: string;
    domains: string;
    emailDomains: string;
    technicalStack: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { siret } = await request.json();

    if (!siret || siret.length !== 14) {
      return NextResponse.json(
        { error: 'Numéro SIRET invalide. Veuillez entrer un SIRET de 14 chiffres.' },
        { status: 400 }
      );
    }

    const siren = siret.substring(0, 9);

    // Fetch data from API
    const sireneData = await fetchSireneData(siren, siret);
    
    if (!sireneData) {
      return NextResponse.json(
        { error: 'Entreprise non trouvée. Vérifiez le numéro SIRET ou réessayez dans quelques instants.' },
        { status: 404 }
      );
    }

    const companyData: CompanyData = {
      basicInfo: {
        name: sireneData.name || 'Nom non disponible',
        activity: sireneData.activity || 'Activité non spécifiée',
        address: sireneData.address || 'Adresse non disponible',
        phone: sireneData.phone || 'Consultez Infogreffe pour le téléphone',
        email: sireneData.email || 'Consultez le site officiel de l\'entreprise'
      },
      legalInfo: {
        siret: siret,
        siren: siren,
        legalForm: sireneData.legalForm || 'Non spécifié',
        capital: sireneData.capital || 'Non disponible publiquement',
        registration: sireneData.registration || 'Date inconnue'
      },
      financialInfo: {
        turnover: sireneData.turnover || 'Consultez Société.com ou Verif.com',
        employees: sireneData.employees || 'Non spécifié',
        creditRating: 'Requiert un accès payant (Ellisphere, Altares)',
        financialHealth: 'Analyse détaillée disponible sur Société.com'
      },
      digitalFootprint: {
        website: sireneData.website || 'Recherchez sur Google',
        domains: `Analysez manuellement via ${sireneData.name || 'le nom de l\'entreprise'}`,
        emailDomains: 'Analyse manuelle requise',
        technicalStack: 'Utilisez BuiltWith ou Wappalyzer pour l\'analyse'
      }
    };

    return NextResponse.json({
      success: true,
      data: companyData,
      sources: {
        sirene: 'success',
        infogreffe: 'available',
        societe: 'available',
        verif: 'available'
      }
    });

  } catch (error) {
    console.error('OSINT scraping error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la collecte des données OSINT' },
      { status: 500 }
    );
  }
}

async function fetchSireneData(siren: string, siret: string) {
  try {
    // Try establishment endpoint first (more reliable)
    const estabResponse = await fetch(
      `https://api.insee.fr/entreprises/sirene/V3/siret/${siret}`,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer',
        }
      }
    );

    if (estabResponse.ok) {
      const estabData = await estabResponse.json();
      const etablissement = estabData.etablissement;
      
      if (!etablissement) {
        console.log('No establishment data found');
        return tryAlternativeAPI(siren, siret);
      }

      const periodesEtab = etablissement.periodesEtablissement?.[0] || {};
      const adresseEtab = etablissement.adresseEtablissement || {};
      const unite = etablissement.uniteLegale || {};
      const periodesUnite = unite.periodesUniteLegale?.[0] || {};

      return {
        name: periodesUnite.denominationUniteLegale || 
              unite.denominationUniteLegale ||
              periodesUnite.nomUniteLegale ||
              periodesEtab.denominationUsuelleEtablissement ||
              periodesEtab.enseigne1Etablissement ||
              'Nom non disponible',
        activity: periodesEtab.activitePrincipaleEtablissement || 
                 periodesUnite.activitePrincipaleUniteLegale || 
                 'Activité non spécifiée',
        address: formatAddress(adresseEtab),
        legalForm: periodesUnite.categorieJuridiqueUniteLegale 
          ? getCategorieJuridique(periodesUnite.categorieJuridiqueUniteLegale)
          : 'Non spécifié',
        capital: 'Non disponible via API publique',
        registration: unite.dateCreationUniteLegale 
          ? `Créée le ${formatDate(unite.dateCreationUniteLegale)}` 
          : 'Date inconnue',
        employees: formatEmployeeCount(periodesUnite.trancheEffectifsUniteLegale),
        phone: 'Non disponible',
        email: 'Non disponible publiquement',
        website: 'Non disponible via API',
        turnover: 'Non disponible publiquement'
      };
    }

    // Try alternative API if first one fails
    return await tryAlternativeAPI(siren, siret);

  } catch (error) {
    console.error('Error fetching Sirene data:', error);
    return await tryAlternativeAPI(siren, siret);
  }
}

async function tryAlternativeAPI(siren: string, siret: string) {
  try {
    // Try recherche-entreprises.api.gouv.fr (more reliable public API)
    const response = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${siret}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      console.log('Alternative API also failed');
      return null;
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      console.log('No results from alternative API');
      return null;
    }

    const company = data.results[0];

    return {
      name: company.nom_complet || company.nom_raison_sociale || 'Nom non disponible',
      activity: company.activite_principale || 'Activité non spécifiée',
      address: formatAddressFromAPI(company),
      legalForm: company.nature_juridique || 'Non spécifié',
      capital: 'Non disponible via API publique',
      registration: company.date_creation 
        ? `Créée le ${formatDate(company.date_creation)}` 
        : 'Date inconnue',
      employees: formatEmployeeCount(company.tranche_effectif_salarie),
      phone: 'Non disponible',
      email: 'Non disponible publiquement',
      website: 'Non disponible via API',
      turnover: 'Non disponible publiquement'
    };

  } catch (error) {
    console.error('Error with alternative API:', error);
    return null;
  }
}

function formatAddress(adresse: any): string {
  if (!adresse) return 'Adresse non disponible';
  
  const parts = [
    adresse.numeroVoieEtablissement,
    adresse.indiceRepetitionEtablissement,
    adresse.typeVoieEtablissement,
    adresse.libelleVoieEtablissement,
    adresse.complementAdresseEtablissement,
    adresse.codePostalEtablissement,
    adresse.libelleCommuneEtablissement
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' ') : 'Adresse non disponible';
}

function formatAddressFromAPI(company: any): string {
  if (!company) return 'Adresse non disponible';
  
  const parts = [
    company.siege?.numero_voie,
    company.siege?.type_voie,
    company.siege?.libelle_voie,
    company.siege?.code_postal,
    company.siege?.libelle_commune
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' ') : 'Adresse non disponible';
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'Date inconnue';
  
  // Format: YYYY-MM-DD to DD/MM/YYYY
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

function formatEmployeeCount(tranche: string): string {
  if (!tranche) return 'Non spécifié';
  
  const tranches: Record<string, string> = {
    'NN': 'Non spécifié',
    '00': '0 salarié',
    '01': '1 ou 2 salariés',
    '02': '3 à 5 salariés',
    '03': '6 à 9 salariés',
    '11': '10 à 19 salariés',
    '12': '20 à 49 salariés',
    '21': '50 à 99 salariés',
    '22': '100 à 199 salariés',
    '31': '200 à 249 salariés',
    '32': '250 à 499 salariés',
    '41': '500 à 999 salariés',
    '42': '1000 à 1999 salariés',
    '51': '2000 à 4999 salariés',
    '52': '5000 à 9999 salariés',
    '53': '10000 salariés et plus'
  };

  return tranches[tranche] || 'Non spécifié';
}

function getCategorieJuridique(code: string): string {
  const categories: Record<string, string> = {
    '1000': 'Entrepreneur individuel',
    '5498': 'SARL unipersonnelle',
    '5499': 'Société à responsabilité limitée (SARL)',
    '5505': 'Société anonyme à conseil d\'administration',
    '5510': 'Société anonyme à directoire',
    '5520': 'Société par actions simplifiée',
    '5585': 'Société par actions simplifiée à associé unique',
    '5599': 'Société à responsabilité limitée (SARL)',
    '5710': 'SAS, société par actions simplifiée',
    '5720': 'Société par actions simplifiée à associé unique',
    '9220': 'Association déclarée',
    '9230': 'Association déclarée d\'insertion par l\'économique',
  };

  return categories[code] || `Forme juridique ${code}`;
}