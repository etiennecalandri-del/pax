// ═══════════════════════════════════════════════════════════════════════════
//  MOTEUR JURIDIQUE — Règlement (CE) n° 261/2004
//  Calcul d'éligibilité, indemnisation, probabilité, prescription
// ═══════════════════════════════════════════════════════════════════════════

// Liste des compagnies UE/EEA/Suisse (CE 261/2004 applicable en tant que transporteur)
const EU_AIRLINES = new Set([
  'Air France','Lufthansa','Ryanair','easyJet','easyJet Europe',
  'Vueling','Iberia','Iberia Express','ITA Airways','KLM','Brussels Airlines',
  'TAP Air Portugal','Finnair','Norwegian Air Shuttle','Norwegian Air International',
  'SAS Scandinavian Airlines','Austrian Airlines','LOT Polish Airlines',
  'Wizz Air','Wizz Air UK','Transavia France','Transavia Netherlands',
  'TUI fly Germany','TUI fly Belgium','TUI Airways','Condor','Eurowings',
  'Aer Lingus','Aegean Airlines','Blue Air','TAROM','Czech Airlines',
  'airBaltic','Volotea','LEVEL','Air Malta','Croatia Airlines','Luxair',
  'Jet2','British Airways','Virgin Atlantic','Icelandair','SWISS',
  'Edelweiss Air','Air Corsica','ASL Airlines France','French Bee',
  'Air Caraïbes','Chalair','Neos','Smartwings','Binter Canarias',
  'Air Europa','Pobeda (HU)','Widerøe','DAT','Flyr','Air Dolomiti',
  'Lauda','Germanwings','Air Berlin','HOP!','Régional','Transavia',
]);

// Données de prescription par pays (code pays ISO-2)
const PRESCRIPTION_DATA = {
  FR: { years: 5,  label: 'France',       text: '5 ans — art. 2224 Code civil (Cour de cassation, oct. 2019)' },
  DE: { years: 3,  label: 'Allemagne',    text: '3 ans — § 195 BGB' },
  ES: { years: 5,  label: 'Espagne',      text: '5 ans' },
  GB: { years: 6,  label: 'Royaume-Uni',  text: '6 ans — Limitation Act 1980 (UK261)' },
  BE: { years: 2,  label: 'Belgique',     text: '2 ans' },
  NL: { years: 2,  label: 'Pays-Bas',     text: '2 ans' },
  IT: { years: 2,  label: 'Italie',       text: '2 ans' },
  PL: { years: 3,  label: 'Pologne',      text: '3 ans' },
  PT: { years: 3,  label: 'Portugal',     text: '3 ans' },
  AT: { years: 3,  label: 'Autriche',     text: '3 ans' },
  SE: { years: 3,  label: 'Suède',        text: '3 ans' },
  NO: { years: 3,  label: 'Norvège',      text: '3 ans' },
  FI: { years: 3,  label: 'Finlande',     text: '3 ans' },
  DK: { years: 3,  label: 'Danemark',     text: '3 ans' },
  IE: { years: 6,  label: 'Irlande',      text: '6 ans — Statute of Limitations' },
  CH: { years: 2,  label: 'Suisse',       text: '2 ans — Code des obligations' },
  GR: { years: 3,  label: 'Grèce',        text: '3 ans' },
  HU: { years: 3,  label: 'Hongrie',      text: '3 ans' },
  RO: { years: 3,  label: 'Roumanie',     text: '3 ans' },
  CZ: { years: 3,  label: 'Rép. Tchèque',text: '3 ans' },
  HR: { years: 3,  label: 'Croatie',      text: '3 ans' },
  LV: { years: 3,  label: 'Lettonie',     text: '3 ans' },
  LT: { years: 3,  label: 'Lituanie',     text: '3 ans' },
  EE: { years: 3,  label: 'Estonie',      text: '3 ans' },
  SK: { years: 3,  label: 'Slovaquie',    text: '3 ans' },
  SI: { years: 3,  label: 'Slovénie',     text: '3 ans' },
  CY: { years: 6,  label: 'Chypre',       text: '6 ans' },
  MT: { years: 5,  label: 'Malte',        text: '5 ans' },
  LU: { years: 10, label: 'Luxembourg',   text: '10 ans' },
  BG: { years: 5,  label: 'Bulgarie',     text: '5 ans' },
  IS: { years: 4,  label: 'Islande',      text: '4 ans' },
};

/**
 * Calcule l'éligibilité et l'indemnisation selon CE 261/2004.
 * @param {Object} data  — données du formulaire (toutes les étapes)
 * @returns {Object}     — résultat complet du calcul
 */
function calculateEligibility(data) {
  const result = {
    regulationApplies: false,
    regulationNote: '',
    eligible: false,
    status: 'not_eligible', // 'eligible' | 'not_eligible' | 'disputed'
    amount: 0,
    amountReduced: false,      // 50 % réduction
    distance: 0,
    distanceCategory: '',      // 'short' | 'medium' | 'long'
    successProbability: 0,
    prescriptionYears: null,
    prescriptionLabel: '',
    prescriptionText: '',
    prescriptionDeadline: null,
    daysRemaining: null,
    legalArticles: [],
    reasons: [],
    warnings: [],
    assistanceRights: [],
  };

  // ── 1. Conditions préalables ─────────────────────────────────────────────
  if (data.confirmedBooking === 'no') {
    result.reasons.push('Aucune réservation confirmée — le règlement exige une réservation valide (art. 3 §2a).');
    return result;
  }
  if (data.checkedIn === 'no' && data.incidentType !== 'denied_boarding') {
    result.reasons.push('Non présenté à l\'enregistrement dans les délais — condition requise (art. 3 §2a), sauf en cas de refus d\'embarquement.');
    return result;
  }

  // ── 2. Champ d'application territorial ──────────────────────────────────
  const depAp = AIRPORTS_MAP[data.departure] || null;
  const arrAp = AIRPORTS_MAP[data.arrival]   || null;
  const airlineIsEU = data.airlineIsEU === 'yes' || EU_AIRLINES.has(data.airline);

  if (depAp && (depAp.eu === true || depAp.eu === 'uk')) {
    result.regulationApplies = true;
    result.regulationNote = depAp.eu === 'uk'
      ? 'Le règlement UK 261 (équivalent post-Brexit) s\'applique — vol au départ du Royaume-Uni.'
      : 'CE 261/2004 s\'applique — vol au départ d\'un aéroport de l\'UE/EEE.';
  } else if (arrAp && (arrAp.eu === true || arrAp.eu === 'uk') && airlineIsEU) {
    result.regulationApplies = true;
    result.regulationNote = 'CE 261/2004 s\'applique — compagnie UE à destination de l\'UE/EEE.';
  } else {
    result.reasons.push('Le règlement CE 261/2004 ne s\'applique pas à ce vol (départ hors UE sur compagnie non-européenne).');
    result.regulationNote = 'Hors champ d\'application.';
    return result;
  }

  // ── 3. Distance du vol ───────────────────────────────────────────────────
  if (depAp && arrAp) {
    result.distance = Math.round(haversineDistance(depAp.lat, depAp.lon, arrAp.lat, arrAp.lon));
  } else {
    result.distance = 0; // distance inconnue — on appliquera les règles sans seuil
    result.warnings.push('Aéroports non identifiés dans notre base — la distance a été estimée. Vérifiez le montant selon les catégories réglementaires.');
  }

  // ── 4. Catégorie de distance & montant de base ───────────────────────────
  // Art. 7 §1 CE 261/2004
  const bothEU = depAp?.eu && arrAp?.eu; // vol intra-UE
  if (result.distance === 0) {
    // Fallback : demander à l'utilisateur
    result.distanceCategory = 'unknown';
    result.amount = 400; // valeur médiane par défaut
  } else if (result.distance <= 1500) {
    result.distanceCategory = 'short';
    result.amount = 250;
  } else if (bothEU || result.distance <= 3500) {
    result.distanceCategory = 'medium';
    result.amount = 400;
  } else {
    result.distanceCategory = 'long';
    result.amount = 600;
  }

  // ── 5. Logique par type d'incident ───────────────────────────────────────

  if (data.incidentType === 'delay') {
    // Art. 6 + CJUE Sturgeon (C-402/07, C-432/07, 19 nov. 2009)
    if (data.delayDuration === '>3h') {
      result.eligible = true;
      result.status = 'eligible';
      result.legalArticles = [
        'Art. 6 CE 261/2004 (retard important)',
        'Art. 7 CE 261/2004 (droit à indemnisation)',
        'CJUE arrêt Sturgeon, C-402/07 & C-432/07, 19 nov. 2009',
      ];
      result.assistanceRights = _assistanceDelay();
      result.successProbability = 88;
    } else if (data.delayDuration === '2h-3h') {
      result.eligible = false;
      result.status = 'not_eligible';
      result.reasons.push('Le retard doit être d\'au moins 3 heures à l\'arrivée pour ouvrir droit à indemnisation (CJUE, Sturgeon, 2009). En dessous de ce seuil, seuls les droits d\'assistance (repas, téléphone) peuvent s\'appliquer.');
      result.assistanceRights = _assistanceDelay();
      result.successProbability = 8;
      return result;
    } else {
      result.eligible = false;
      result.status = 'not_eligible';
      result.reasons.push('Retard inférieur à 2 heures — aucune indemnisation ni assistance prévue.');
      result.successProbability = 0;
      return result;
    }

  } else if (data.incidentType === 'cancellation') {
    // Art. 5 CE 261/2004
    if (data.cancellationNotice === '>14') {
      result.eligible = false;
      result.status = 'not_eligible';
      result.reasons.push('Vol annulé plus de 14 jours avant le départ — aucune indemnisation prévue par l\'art. 5 §1 c) CE 261/2004. Le remboursement intégral du billet reste dû (art. 8).');
      result.assistanceRights = ['Remboursement intégral du billet (art. 8 §1a).'];
      result.successProbability = 0;
      return result;
    } else if (data.cancellationNotice === '7-14') {
      result.eligible = true;
      result.status = 'eligible';
      result.legalArticles = ['Art. 5 §1 c) ii) CE 261/2004', 'Art. 7 CE 261/2004'];
      result.assistanceRights = _assistanceCancellationDenied();
      result.successProbability = 80;
      // Réduction 50 % si réacheminement proposé dans les délais
      if (data.reroutingOffered === 'yes') {
        result.amountReduced = true;
        result.amount = result.amount / 2;
        result.warnings.push('Réacheminement accepté dans les délais → indemnisation réduite de 50 % (art. 7 §2).');
      }
    } else {
      // < 7 jours
      result.eligible = true;
      result.status = 'eligible';
      result.legalArticles = ['Art. 5 §1 c) iii) CE 261/2004', 'Art. 7 CE 261/2004'];
      result.assistanceRights = _assistanceCancellationDenied();
      result.successProbability = 85;
      if (data.reroutingOffered === 'yes') {
        result.amountReduced = true;
        result.amount = result.amount / 2;
        result.warnings.push('Réacheminement accepté dans les délais → indemnisation réduite de 50 % (art. 7 §2).');
      }
    }

  } else if (data.incidentType === 'denied_boarding') {
    // Art. 4 CE 261/2004 — aucune exception pour circonstances extraordinaires
    result.eligible = true;
    result.status = 'eligible';
    result.legalArticles = [
      'Art. 4 CE 261/2004 (refus d\'embarquement)',
      'Art. 7 CE 261/2004 (droit à indemnisation immédiate)',
    ];
    result.assistanceRights = _assistanceCancellationDenied();
    result.successProbability = 93;
    result.reasons.push('Le refus d\'embarquement involontaire ouvre droit à une indemnisation immédiate — aucune exception pour circonstances extraordinaires (art. 4 §3).');
  }

  // ── 6. Circonstances extraordinaires ────────────────────────────────────
  if (result.eligible && data.incidentType !== 'denied_boarding') {
    if (data.extraordinaryCircumstances === 'yes') {
      result.status = 'disputed';
      result.warnings.push(
        'La compagnie invoque des circonstances extraordinaires (art. 5 §3). ' +
        'Si elles sont avérées et inévitables, l\'indemnisation peut être refusée. ' +
        'Cependant, la charge de la preuve incombe à la compagnie — beaucoup d\'invocations sont rejetées par les tribunaux. ' +
        'Les droits d\'assistance (repas, hôtel) restent dus dans tous les cas.'
      );
      result.successProbability = Math.min(result.successProbability, 55);
    } else if (data.extraordinaryCircumstances === 'not_communicated') {
      result.warnings.push(
        'Si la compagnie invoque ultérieurement des circonstances extraordinaires, elle devra en apporter la preuve. ' +
        'Conservez tous vos justificatifs.'
      );
    }
  }

  // ── 7. Prescription ──────────────────────────────────────────────────────
  const depCountry = data.departureCountry || (depAp ? depAp.cc : null);
  if (depCountry && PRESCRIPTION_DATA[depCountry]) {
    const p = PRESCRIPTION_DATA[depCountry];
    result.prescriptionYears = p.years;
    result.prescriptionLabel = p.label;
    result.prescriptionText  = p.text;
    if (data.flightDate) {
      const d = new Date(data.flightDate);
      const deadline = new Date(d);
      deadline.setFullYear(deadline.getFullYear() + p.years);
      result.prescriptionDeadline = deadline;
      result.daysRemaining = Math.max(0, Math.floor((deadline - Date.now()) / 86400000));
    }
  } else {
    result.prescriptionLabel = 'Autre pays';
    result.prescriptionText  = 'Vérifiez la loi nationale applicable.';
  }

  return result;
}

// ── Helpers droits d'assistance ─────────────────────────────────────────────
function _assistanceDelay() {
  return [
    'Repas et rafraîchissements proportionnels au temps d\'attente (art. 9)',
    '2 appels téléphoniques, SMS, télex ou e-mails offerts (art. 9)',
    'Hébergement en hôtel si report au lendemain + transport hôtel/aéroport (art. 9)',
  ];
}
function _assistanceCancellationDenied() {
  return [
    'Remboursement intégral du billet OU réacheminement vers la destination (art. 8)',
    'Repas et rafraîchissements pendant l\'attente (art. 9)',
    '2 appels téléphoniques, SMS ou e-mails (art. 9)',
    'Hébergement en hôtel si nécessaire + transport hôtel/aéroport (art. 9)',
  ];
}

// ── Libellés ─────────────────────────────────────────────────────────────────
const INCIDENT_LABELS = {
  delay:           'Retard',
  cancellation:    'Annulation',
  denied_boarding: 'Refus d\'embarquement',
};
const DISTANCE_LABELS = {
  short:   'Court-courrier (≤ 1 500 km)',
  medium:  'Moyen-courrier (≤ 3 500 km ou intra-UE)',
  long:    'Long-courrier (> 3 500 km)',
  unknown: 'Distance non déterminée',
};
