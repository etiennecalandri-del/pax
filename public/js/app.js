// ═══════════════════════════════════════════════════════════════════════════
//  PAX — Main Application Logic
// ═══════════════════════════════════════════════════════════════════════════

// ── State ────────────────────────────────────────────────────────────────────
const state = {
  currentStep: 1,
  formData: {},
  result: null,
  letterText: null,
};

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Set max date to today (can't claim for future flights)
  const dateInput = document.getElementById('flightDate');
  if (dateInput) dateInput.max = new Date().toISOString().split('T')[0];

  // Init airport autocompletes
  initAirportAC('depInput',  'depDropdown',  'depCode',  'depLabel');
  initAirportAC('arrInput',  'arrDropdown',  'arrCode',  'arrLabel');

  // Auto-detect airline EU status when user types
  document.getElementById('airlineInput').addEventListener('input', autoDetectAirlineEU);

  // Show/hide rerouting question based on cancellation notice
  document.querySelectorAll('input[name="cancellationNotice"]').forEach(r => {
    r.addEventListener('change', () => {
      const rg = document.getElementById('reroutingGroup');
      rg.style.display = (r.value === '7-14' || r.value === '<7') ? 'block' : 'none';
    });
  });

  // Load stat for hero
  loadHeroStat();
});

// ── Airport Autocomplete ──────────────────────────────────────────────────────
function initAirportAC(inputId, dropId, codeId, labelId) {
  const input    = document.getElementById(inputId);
  const dropdown = document.getElementById(dropId);
  let focusIdx   = -1;

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) { dropdown.classList.remove('open'); return; }
    const matches = searchAirports(q);
    renderAC(matches, dropdown, input, codeId, labelId);
    focusIdx = -1;
  });

  input.addEventListener('keydown', e => {
    const items = dropdown.querySelectorAll('.ac-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusIdx = Math.min(focusIdx + 1, items.length - 1);
      items.forEach((it, i) => it.classList.toggle('focused', i === focusIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusIdx = Math.max(focusIdx - 1, 0);
      items.forEach((it, i) => it.classList.toggle('focused', i === focusIdx));
    } else if (e.key === 'Enter' && focusIdx >= 0) {
      e.preventDefault();
      items[focusIdx].click();
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('open');
    }
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}

function renderAC(airports, dropdown, input, codeId, labelId) {
  if (!airports.length) { dropdown.classList.remove('open'); return; }
  dropdown.innerHTML = airports.map(a => {
    const euTag = a.eu === true
      ? `<span class="ac-eu">UE</span>`
      : a.eu === 'uk'
        ? `<span class="ac-uk">UK</span>`
        : '';
    return `<div class="ac-item" data-iata="${a.iata}" data-label="${a.city} — ${a.name} (${a.iata})">
      <span class="ac-iata">${a.iata}</span>
      <span class="ac-name">${a.city} — ${a.name}<br><small>${a.country}</small></span>
      ${euTag}
    </div>`;
  }).join('');
  dropdown.classList.add('open');

  dropdown.querySelectorAll('.ac-item').forEach(item => {
    item.addEventListener('click', () => {
      input.value = item.dataset.label;
      document.getElementById(codeId).value  = item.dataset.iata;
      if (labelId) state.formData[labelId] = item.dataset.label;
      dropdown.classList.remove('open');
      clearError(input.id === 'depInput' ? 'err-dep' : 'err-arr');
    });
  });
}

// ── Auto-detect EU airline ────────────────────────────────────────────────────
function autoDetectAirlineEU() {
  const val = document.getElementById('airlineInput').value.trim();
  if (!val) return;
  const isEU = EU_AIRLINES.has(val);
  if (isEU) {
    const r = document.querySelector('input[name="airlineIsEU"][value="yes"]');
    if (r) r.checked = true;
    const card = r ? r.closest('.radio-card') : null;
    if (card) card.style.border = '2px solid var(--navy)';
  }
}

// ── Step Navigation ───────────────────────────────────────────────────────────
function goToStep(n) {
  if (n > state.currentStep && !validateStep(state.currentStep)) return;

  // Save current step data
  collectFormData();

  // Update UI
  document.querySelectorAll('.form-card').forEach(c => c.classList.remove('active'));
  document.getElementById(`step-${n}`).classList.add('active');

  // Update stepper
  [1,2,3].forEach(i => {
    const el = document.getElementById(`si-${i}`);
    el.classList.remove('active', 'done');
    if (i < n) el.classList.add('done');
    if (i === n) el.classList.add('active');
  });

  state.currentStep = n;
  document.getElementById('simulator').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Validation ────────────────────────────────────────────────────────────────
function validateStep(step) {
  let ok = true;

  if (step === 1) {
    if (!document.getElementById('depCode').value) {
      showError('err-dep', 'Veuillez sélectionner un aéroport de départ.'); ok = false;
    } else clearError('err-dep');
    if (!document.getElementById('arrCode').value) {
      showError('err-arr', 'Veuillez sélectionner un aéroport d\'arrivée.'); ok = false;
    } else clearError('err-arr');
    if (!document.getElementById('flightDate').value) {
      showError('err-date', 'Veuillez indiquer la date du vol.'); ok = false;
    } else clearError('err-date');
    if (!document.getElementById('airlineInput').value.trim()) {
      showError('err-airline', 'Veuillez indiquer le nom de la compagnie aérienne.'); ok = false;
    } else clearError('err-airline');
    if (!document.querySelector('input[name="airlineIsEU"]:checked')) {
      showError('err-euairline', 'Veuillez indiquer si la compagnie est européenne.'); ok = false;
    } else clearError('err-euairline');
    if (!document.getElementById('departureCountry').value) {
      showError('err-country', 'Veuillez sélectionner le pays de départ.'); ok = false;
    } else clearError('err-country');
  }

  if (step === 2) {
    const incType = document.querySelector('input[name="incidentType"]:checked');
    if (!incType) {
      showError('err-incident', 'Veuillez sélectionner un type d\'incident.'); ok = false;
    } else {
      clearError('err-incident');
      if (incType.value === 'delay' && !document.querySelector('input[name="delayDuration"]:checked')) {
        showError('err-incident', 'Veuillez indiquer la durée du retard.'); ok = false;
      }
      if (incType.value === 'cancellation' && !document.querySelector('input[name="cancellationNotice"]:checked')) {
        showError('err-incident', 'Veuillez indiquer le délai de prévenance.'); ok = false;
      }
    }
  }

  return ok;
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = '';
}

// ── Collect form data ─────────────────────────────────────────────────────────
function collectFormData() {
  const fd = state.formData;

  fd.departure        = document.getElementById('depCode').value;
  fd.arrival          = document.getElementById('arrCode').value;
  fd.flightDate       = document.getElementById('flightDate').value;
  fd.flightNumber     = document.getElementById('flightNumber').value.trim();
  fd.airline          = document.getElementById('airlineInput').value.trim();
  fd.departureCountry = document.getElementById('departureCountry').value;

  const airlineEU = document.querySelector('input[name="airlineIsEU"]:checked');
  fd.airlineIsEU = airlineEU ? airlineEU.value : '';

  const incident = document.querySelector('input[name="incidentType"]:checked');
  fd.incidentType = incident ? incident.value : '';

  const delay = document.querySelector('input[name="delayDuration"]:checked');
  fd.delayDuration = delay ? delay.value : '';

  const notice = document.querySelector('input[name="cancellationNotice"]:checked');
  fd.cancellationNotice = notice ? notice.value : '';

  const rerouting = document.querySelector('input[name="reroutingOffered"]:checked');
  fd.reroutingOffered = rerouting ? rerouting.value : '';

  const ec = document.querySelector('input[name="extraordinaryCircumstances"]:checked');
  fd.extraordinaryCircumstances = ec ? ec.value : '';

  fd.firstName         = document.getElementById('firstName').value.trim();
  fd.lastName          = document.getElementById('lastName').value.trim();
  fd.email             = document.getElementById('emailInput').value.trim();
  fd.residenceCountry  = document.getElementById('residenceCountry').value;

  const booking = document.querySelector('input[name="confirmedBooking"]:checked');
  fd.confirmedBooking = booking ? booking.value : '';

  const checkin = document.querySelector('input[name="checkedIn"]:checked');
  fd.checkedIn = checkin ? checkin.value : '';
}

// ── Submit & Calculate ────────────────────────────────────────────────────────
async function submitSimulation() {
  if (!validateStep(3)) return;

  const bookingChecked = document.querySelector('input[name="confirmedBooking"]:checked');
  const checkinChecked = document.querySelector('input[name="checkedIn"]:checked');
  const firstOk = document.getElementById('firstName').value.trim();
  const lastOk  = document.getElementById('lastName').value.trim();
  const emailOk = document.getElementById('emailInput').value.trim();

  let ok = true;
  if (!firstOk) { showError('err-first', 'Prénom requis.'); ok = false; } else clearError('err-first');
  if (!lastOk)  { showError('err-last', 'Nom requis.'); ok = false; } else clearError('err-last');
  if (!emailOk || !emailOk.includes('@')) { showError('err-email', 'Email valide requis.'); ok = false; } else clearError('err-email');
  if (!bookingChecked) { showError('err-booking', 'Veuillez répondre.'); ok = false; } else clearError('err-booking');
  if (!checkinChecked) { showError('err-checkin', 'Veuillez répondre.'); ok = false; } else clearError('err-checkin');
  if (!ok) return;

  // Show loader
  document.getElementById('submitLabel').style.display = 'none';
  document.getElementById('submitLoader').style.display = 'inline-flex';
  document.getElementById('submitBtn').disabled = true;

  collectFormData();

  // Small delay for UX
  await new Promise(r => setTimeout(r, 800));

  const result = calculateEligibility(state.formData);
  state.result = result;

  // Save anonymous data to backend (fire and forget)
  saveSimulation(result);

  // Render results
  renderResults(result);

  // Restore button
  document.getElementById('submitLabel').style.display = 'inline';
  document.getElementById('submitLoader').style.display = 'none';
  document.getElementById('submitBtn').disabled = false;
}

// ── Save to backend ───────────────────────────────────────────────────────────
async function saveSimulation(result) {
  try {
    const fd = state.formData;
    await fetch('/api/simulations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        airline:          fd.airline,
        departureAirport: fd.departure,
        arrivalAirport:   fd.arrival,
        flightDate:       fd.flightDate,
        incidentType:     fd.incidentType,
        departureCountry: fd.departureCountry,
        eligible:         result.eligible,
        compensationAmount: result.amount,
        distanceKm:       result.distance,
        successProbability: result.successProbability,
      }),
    });
  } catch (_) { /* Graceful degradation */ }
}

// ── Render Results ────────────────────────────────────────────────────────────
function renderResults(result) {
  const fd = state.formData;

  // Badge & hero
  const badge = document.getElementById('resultBadge');
  badge.className = 'result-status-badge';
  if (result.eligible) {
    badge.classList.add('eligible');
    badge.textContent = '✅ Éligible à une indemnisation';
  } else if (result.status === 'disputed') {
    badge.classList.add('disputed');
    badge.textContent = '⚠️ Cas litigieux — à évaluer';
  } else {
    badge.classList.add('ineligible');
    badge.textContent = '❌ Non éligible à ce stade';
  }

  // Amount
  const amountEl = document.getElementById('resultAmount');
  if (result.eligible) {
    amountEl.textContent = result.amount + ' €';
    amountEl.style.color = '';
  } else {
    amountEl.textContent = '0 €';
    amountEl.style.color = 'rgba(255,255,255,0.4)';
  }

  // Route & incident
  const depLabel = state.formData.departureLabel  || fd.departure || '–';
  const arrLabel = state.formData.arrivalLabel    || fd.arrival   || '–';
  document.getElementById('resultRoute').textContent = `${depLabel} → ${arrLabel}`;
  const incLabel = INCIDENT_LABELS[fd.incidentType] || fd.incidentType;
  document.getElementById('resultIncident').textContent = incLabel;

  // Probability bar (animate after a short delay)
  const prob = result.successProbability;
  document.getElementById('probPct').textContent = prob + ' %';
  setTimeout(() => {
    document.getElementById('probBar').style.width = prob + '%';
  }, 300);

  // Distance card
  document.getElementById('rcDistance').textContent = result.distance > 0
    ? result.distance.toLocaleString('fr-FR') + ' km' : 'Non calculé';
  document.getElementById('rcDistCat').textContent = DISTANCE_LABELS[result.distanceCategory] || '–';

  // Legal articles
  document.getElementById('rcLegal').innerHTML = result.legalArticles.length
    ? result.legalArticles.map(a => `<div style="margin-bottom:4px">• ${a}</div>`).join('')
    : '—';

  // Prescription
  const prescEl = document.getElementById('rcPrescription');
  const prescSub = document.getElementById('rcPrescSub');
  if (result.prescriptionYears) {
    prescEl.textContent = result.prescriptionYears + ' ans';
    prescSub.textContent = result.prescriptionLabel;
  } else {
    prescEl.textContent = 'À vérifier';
    prescSub.textContent = 'Droit national applicable';
  }

  // Deadline
  const dlEl  = document.getElementById('rcDeadline');
  const dlSub = document.getElementById('rcDeadlineSub');
  if (result.prescriptionDeadline) {
    dlEl.textContent = result.prescriptionDeadline.toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    const days = result.daysRemaining;
    if (days <= 0) {
      dlSub.textContent = 'Délai expiré !';
      dlSub.className = 'rc-sub deadline-warn';
    } else if (days < 180) {
      dlSub.textContent = `Dans ${days} jours — agissez vite !`;
      dlSub.className = 'rc-sub deadline-warn';
    } else if (days < 365) {
      dlSub.textContent = `Dans ${Math.round(days / 30)} mois`;
      dlSub.className = 'rc-sub deadline-mid';
    } else {
      const yrs = Math.floor(days / 365);
      const mos = Math.round((days % 365) / 30);
      dlSub.textContent = mos > 0 ? `Dans ${yrs} an${yrs>1?'s':''} et ${mos} mois` : `Dans ${yrs} an${yrs>1?'s':''}`;
      dlSub.className = 'rc-sub deadline-ok';
    }
  } else {
    dlEl.textContent = 'Inconnu';
    dlSub.textContent = 'Vérifiez la loi nationale';
    dlSub.className = 'rc-sub';
  }

  // Explanation
  const ul = document.getElementById('reasonsList');
  ul.innerHTML = '';
  // Main reasons
  if (result.regulationNote) {
    ul.innerHTML += `<li>${result.regulationNote}</li>`;
  }
  result.reasons.forEach(r => { ul.innerHTML += `<li>${r}</li>`; });
  if (result.eligible && result.legalArticles.length) {
    ul.innerHTML += `<li>Bases légales applicables : ${result.legalArticles.join(' — ')}</li>`;
  }
  if (result.amountReduced) {
    ul.innerHTML += `<li>Indemnisation réduite de 50 % en raison du réacheminement proposé (art. 7 §2).</li>`;
  }

  // Warnings
  const warningsEl = document.getElementById('resultWarnings');
  warningsEl.innerHTML = '';
  result.warnings.forEach(w => {
    warningsEl.innerHTML += `<div class="warning-card"><span class="w-icon">⚠️</span><p>${w}</p></div>`;
  });

  // Assistance rights
  if (result.assistanceRights.length) {
    document.getElementById('assistanceCard').style.display = 'block';
    const al = document.getElementById('assistanceList');
    al.innerHTML = result.assistanceRights.map(r => `<li>${r}</li>`).join('');
  } else {
    document.getElementById('assistanceCard').style.display = 'none';
  }

  // Prescription detail
  const pd = document.getElementById('prescriptionDetail');
  if (result.prescriptionYears) {
    pd.innerHTML = `<strong>${result.prescriptionLabel} :</strong> ${result.prescriptionText}.`;
    if (result.prescriptionDeadline) {
      pd.innerHTML += ` Vous avez jusqu'au <strong>${result.prescriptionDeadline.toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}</strong> pour agir.`;
    }
  } else {
    pd.textContent = 'Délai de prescription non déterminé pour ce pays — consultez un professionnel.';
  }

  // Show/hide letter button
  document.getElementById('generateLetterBtn').style.display = result.eligible || result.status === 'disputed' ? '' : 'none';

  // Show results section
  const resultsSection = document.getElementById('results');
  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Incident sub-form display ─────────────────────────────────────────────────
function showIncidentSub(type) {
  ['delay', 'cancellation', 'denied_boarding'].forEach(t => {
    const el = document.getElementById(`sub-${t}`);
    if (el) el.classList.toggle('visible', t === type);
  });
  // Hide extraordinary circumstances for denied boarding
  const ecGroup = document.getElementById('extraordinaryGroup');
  if (ecGroup) ecGroup.style.display = type === 'denied_boarding' ? 'none' : '';
}

// ── Letter Section ────────────────────────────────────────────────────────────
function showLetterSection() {
  collectFormData();
  if (!state.result) return;

  const letter = generateLetter(state.formData, state.result);
  state.letterText = letter;

  document.getElementById('letterText').textContent = letter;

  const letterSection = document.getElementById('letter-section');
  letterSection.style.display = 'block';
  letterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function copyLetter() {
  if (!state.letterText) return;
  navigator.clipboard.writeText(state.letterText)
    .then(() => showToast('Texte copié dans le presse-papier !', 'success'))
    .catch(() => {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = state.letterText;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Texte copié !', 'success');
    });
}

function printLetter() {
  if (!state.result) return;
  collectFormData();
  const html = generateLetterHTML(state.formData, state.result);
  const win = window.open('', '_blank');
  if (!win) { showToast('Veuillez autoriser les pop-ups.', 'error'); return; }
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

function showPremiumMsg() {
  showToast('Fonctionnalité premium — intégration paiement à venir.', '');
}

// ── Reset ─────────────────────────────────────────────────────────────────────
function resetSimulator() {
  // Reset state
  state.formData = {};
  state.result   = null;
  state.letterText = null;

  // Reset form fields
  document.getElementById('depInput').value = '';
  document.getElementById('depCode').value  = '';
  document.getElementById('arrInput').value = '';
  document.getElementById('arrCode').value  = '';
  document.getElementById('flightDate').value    = '';
  document.getElementById('flightNumber').value  = '';
  document.getElementById('airlineInput').value  = '';
  document.getElementById('departureCountry').value = '';
  document.getElementById('residenceCountry').value = '';
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value  = '';
  document.getElementById('emailInput').value = '';
  document.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
  document.querySelectorAll('.sub-form').forEach(sf => sf.classList.remove('visible'));
  document.getElementById('reroutingGroup').style.display = 'none';
  document.getElementById('extraordinaryGroup').style.display = '';

  // Hide result + letter sections
  document.getElementById('results').style.display = 'none';
  document.getElementById('letter-section').style.display = 'none';

  // Go to step 1
  goToStep(1);
  document.getElementById('simulator').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const ans  = item.querySelector('.faq-a');
  const wasOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').classList.remove('open');
  });

  if (!wasOpen) {
    item.classList.add('open');
    ans.classList.add('open');
  }
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('mobile-open');
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show' + (type ? ' ' + type : '');
  setTimeout(() => { t.className = ''; }, 3000);
}

// ── Hero stat loader ──────────────────────────────────────────────────────────
async function loadHeroStat() {
  try {
    const res = await fetch('/api/admin/stats');
    if (!res.ok) return;
    const data = await res.json();
    const el = document.getElementById('statTotal');
    if (el && data.total !== undefined) {
      el.textContent = data.total.toLocaleString('fr-FR');
    }
  } catch (_) { /* Ignore */ }
}
