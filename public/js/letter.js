// ═══════════════════════════════════════════════════════════════════════════
//  GÉNÉRATEUR DE LETTRE DE RÉCLAMATION — CE 261/2004
// ═══════════════════════════════════════════════════════════════════════════

function generateLetter(formData, result) {
  const today = new Date().toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' });
  const flightDate = formData.flightDate
    ? new Date(formData.flightDate).toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : '[date du vol]';
  const fullName    = `${formData.firstName || '[Prénom]'} ${formData.lastName || '[Nom]'}`.trim();
  const email       = formData.email || '[votre e-mail]';
  const depLabel    = formData.departureLabel  || formData.departure  || '[aéroport de départ]';
  const arrLabel    = formData.arrivalLabel    || formData.arrival    || '[aéroport d\'arrivée]';
  const airline     = formData.airline         || '[compagnie aérienne]';
  const flightNum   = formData.flightNumber    ? ` n° ${formData.flightNumber}` : '';
  const amount      = result.amount;
  const distKm      = result.distance > 0 ? `${result.distance.toLocaleString('fr-FR')} km` : 'distance non déterminée';
  const distCat     = DISTANCE_LABELS[result.distanceCategory] || '';

  // Paragraphe incident
  let incidentParagraph = '';
  let legalParagraph    = '';

  if (formData.incidentType === 'delay') {
    const delayStr = formData.delayDuration === '>3h'  ? 'plus de 3 heures'
                   : formData.delayDuration === '2h-3h'? 'entre 2 et 3 heures'
                   : 'moins de 2 heures';
    incidentParagraph = `Ce vol a accusé un retard à l'arrivée de ${delayStr}. En application de la jurisprudence de la Cour de Justice de l'Union européenne (arrêts Sturgeon c/ Condor, affaires jointes C-402/07 et C-432/07, 19 novembre 2009), un retard d'au moins 3 heures à la destination finale ouvre droit à la même indemnisation que pour une annulation.`;
    legalParagraph = `En vertu de l'article 6 du Règlement (CE) n° 261/2004, combiné à l'interprétation donnée par la Cour de Justice de l'Union européenne dans ses arrêts du 19 novembre 2009 (Sturgeon c/ Condor, C-402/07 et C-432/07), et conformément à l'article 7 §1 dudit règlement, je suis en droit de prétendre à une indemnisation forfaitaire.`;
  } else if (formData.incidentType === 'cancellation') {
    const noticeStr = formData.cancellationNotice === '<7'  ? 'moins de 7 jours'
                    : formData.cancellationNotice === '7-14'? 'entre 7 et 14 jours'
                    : 'plus de 14 jours';
    incidentParagraph = `Ce vol a été annulé. J'ai été informé(e) de cette annulation ${noticeStr} avant la date de départ prévue.`;
    legalParagraph = `En vertu de l'article 5 §1 c) du Règlement (CE) n° 261/2004, en cas d'annulation notifiée moins de 14 jours avant le départ, et à défaut de proposition de réacheminement satisfaisante dans les délais réglementaires, le passager a droit à l'indemnisation forfaitaire prévue à l'article 7 §1 du même règlement.`;
  } else if (formData.incidentType === 'denied_boarding') {
    incidentParagraph = `Je me suis présenté(e) dans les délais requis à l'enregistrement et à la porte d'embarquement, disposant d'une réservation confirmée. Votre compagnie a néanmoins refusé de me permettre d'embarquer (surbooking / refus involontaire d'embarquement).`;
    legalParagraph = `En vertu de l'article 4 §3 du Règlement (CE) n° 261/2004, en cas de refus d'embarquement involontaire, le transporteur aérien est tenu de verser immédiatement l'indemnisation forfaitaire prévue à l'article 7 §1, sans possibilité d'invoquer des circonstances extraordinaires.`;
  }

  const articleRef = result.amount === 250 ? 'art. 7 §1 a)' :
                     result.amount === 400 ? 'art. 7 §1 b)' :
                     result.amount === 600 ? 'art. 7 §1 c)' : 'art. 7 §1';

  const reductionNote = result.amountReduced
    ? ` (montant réduit de 50 % en application de l'art. 7 §2, compte tenu du réacheminement proposé)`
    : '';

  const extraordinaryNote = formData.extraordinaryCircumstances === 'yes'
    ? `\nJe note que vous avez invoqué des circonstances extraordinaires. Je vous rappelle que la charge de la preuve vous incombe entièrement (CJUE, C-549/07, Wallentin-Hermann, 22 déc. 2008), et que les circonstances invoquées doivent être à la fois extérieures à votre activité et inévitables. À défaut de justification probante, l'indemnisation reste intégralement due.\n`
    : '';

  const letter = `${fullName}
${email}


À l'attention du Service Relations Clientèle
${airline}


                                                   Fait à _____________, le ${today}


LETTRE RECOMMANDÉE AVEC ACCUSÉ DE RÉCEPTION


OBJET : Demande d'indemnisation — Vol${flightNum} du ${flightDate}
         Application du Règlement (CE) n° 261/2004 du 11 février 2004


Madame, Monsieur,

Par la présente, je me permets de vous adresser une demande d'indemnisation
concernant le vol${flightNum} opéré par ${airline} le ${flightDate}, au départ
de ${depLabel} à destination de ${arrLabel}.

1. EXPOSÉ DES FAITS

${incidentParagraph}

Je disposais d'une réservation confirmée pour ce vol et m'étais présenté(e)
à l'enregistrement dans les délais requis.

2. BASE LÉGALE

${legalParagraph}

Le Règlement (CE) n° 261/2004 du Parlement européen et du Conseil du
11 février 2004 s'applique au présent vol (${result.regulationNote}).
${extraordinaryNote}
3. MONTANT RÉCLAMÉ

La distance du vol ${depLabel} → ${arrLabel} est de ${distKm} (${distCat}).

En application de l'${articleRef} du Règlement (CE) n° 261/2004, je suis en
droit de prétendre à une indemnisation forfaitaire de ${amount} €${reductionNote}.

Je vous réclame donc la somme de ${amount} € (${_spellAmount(amount)} euros).

4. MISE EN DEMEURE

Je vous mets formellement en demeure de me verser cette somme dans un délai
de 21 jours à compter de la réception de la présente.

À défaut de règlement dans ce délai, je me verrai contraint(e) de :

1. Saisir la Direction Générale de l'Aviation Civile (DGAC), autorité
   nationale de contrôle chargée de faire respecter le règlement
   (art. 16 CE 261/2004) — www.ecologique-solidaire.gouv.fr/dgac ;

2. Recourir à la médiation obligatoire de la consommation (Médiation
   Tourisme et Voyage — MTV) avant tout recours judiciaire, conformément
   à la loi n° 2015-990 du 6 août 2015 et à l'obligation issue du
   dispositif entré en vigueur le 7 février 2026 ;

3. Porter cette affaire devant le tribunal judiciaire compétent afin
   d'obtenir le paiement de la somme due, augmentée des intérêts légaux
   à compter de la mise en demeure, ainsi que des dépens.

Veuillez me faire parvenir votre réponse à l'adresse e-mail suivante :
${email}

Dans l'attente de votre réponse favorable, je vous adresse mes salutations
distinguées.


${fullName}


Pièces jointes :
  - Copie de la réservation / du billet
  - Carte d'embarquement
  - Tout document probant de l'incident (courriels de la compagnie, etc.)

────────────────────────────────────────────────────────────────────────────
Références légales : Règlement (CE) n° 261/2004 du Parlement européen et
du Conseil, 11 février 2004 (JOUE L 46/1) — CJUE, Sturgeon c/ Condor,
C-402/07 & C-432/07, 19 nov. 2009 — CJUE, Wallentin-Hermann, C-549/07,
22 déc. 2008.
`;

  return letter;
}

function generateLetterHTML(formData, result) {
  const text = generateLetter(formData, result);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Lettre de réclamation CE 261/2004</title>
<style>
  body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; margin: 0; background: #fff; color: #000; }
  .page { max-width: 700px; margin: 40px auto; padding: 40px; }
  pre { white-space: pre-wrap; word-break: break-word; font-family: inherit; font-size: inherit; line-height: inherit; }
  @media print {
    body { margin: 0; }
    .page { margin: 0; padding: 20mm; max-width: 100%; }
    .no-print { display: none !important; }
  }
  .print-btn {
    display: block; margin: 0 auto 30px;
    padding: 12px 32px;
    background: #0A1628; color: #fff;
    border: none; border-radius: 8px;
    font-size: 14px; cursor: pointer;
    font-family: Arial, sans-serif;
  }
</style>
</head>
<body>
<div class="page">
  <button class="print-btn no-print" onclick="window.print()">Imprimer / Enregistrer en PDF</button>
  <pre>${escapeHtml(text)}</pre>
</div>
</body>
</html>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function _spellAmount(n) {
  const map = { 250:'deux cent cinquante', 300:'trois cents', 400:'quatre cents', 600:'six cents' };
  return map[n] || String(n);
}
