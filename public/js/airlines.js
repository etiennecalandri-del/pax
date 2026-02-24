// airlines.js — Principales compagnies aériennes mondiales
// ~300 compagnies majeures, low-cost et régionales

const AIRLINES = [
  // ═══════════════════════════════════════════════════════════════════════════
  // EUROPE — UE / EEE / CH  (eu: true)
  // ═══════════════════════════════════════════════════════════════════════════
  // France
  { iata:'AF', name:'Air France', cc:'FR', eu:true },
  { iata:'TO', name:'Transavia France', cc:'FR', eu:true },
  { iata:'SS', name:'Corsair International', cc:'FR', eu:true },
  { iata:'XK', name:'Air Corsica', cc:'FR', eu:true },
  { iata:'FBU',name:'French Bee', cc:'FR', eu:true },
  { iata:'TX', name:'Air Caraïbes', cc:'FR', eu:true },
  { iata:'A5', name:'HOP!', cc:'FR', eu:true },
  { iata:'SM', name:'Air Cairo', cc:'EG', eu:false },
  { iata:'CE', name:'Chalair Aviation', cc:'FR', eu:true },
  // Allemagne
  { iata:'LH', name:'Lufthansa', cc:'DE', eu:true },
  { iata:'EW', name:'Eurowings', cc:'DE', eu:true },
  { iata:'DE', name:'Condor', cc:'DE', eu:true },
  { iata:'X3', name:'TUI fly Deutschland', cc:'DE', eu:true },
  { iata:'4Y', name:'Discover Airlines', cc:'DE', eu:true },
  { iata:'EN', name:'Air Dolomiti', cc:'IT', eu:true },
  // Espagne
  { iata:'IB', name:'Iberia', cc:'ES', eu:true },
  { iata:'I2', name:'Iberia Express', cc:'ES', eu:true },
  { iata:'VY', name:'Vueling', cc:'ES', eu:true },
  { iata:'UX', name:'Air Europa', cc:'ES', eu:true },
  { iata:'NT', name:'Binter Canarias', cc:'ES', eu:true },
  { iata:'YW', name:'Air Nostrum', cc:'ES', eu:true },
  { iata:'EB', name:'Wamos Air', cc:'ES', eu:true },
  { iata:'PM', name:'Plus Ultra Líneas Aéreas', cc:'ES', eu:true },
  { iata:'5M', name:'LEVEL', cc:'ES', eu:true },
  // Italie
  { iata:'AZ', name:'ITA Airways', cc:'IT', eu:true },
  { iata:'NO', name:'Neos', cc:'IT', eu:true },
  { iata:'V7', name:'Volotea', cc:'IT', eu:true },
  // Pays-Bas
  { iata:'KL', name:'KLM', cc:'NL', eu:true },
  { iata:'HV', name:'Transavia', cc:'NL', eu:true },
  // Belgique
  { iata:'SN', name:'Brussels Airlines', cc:'BE', eu:true },
  { iata:'TB', name:'TUI fly Belgium', cc:'BE', eu:true },
  // Portugal
  { iata:'TP', name:'TAP Air Portugal', cc:'PT', eu:true },
  { iata:'S4', name:'Azores Airlines', cc:'PT', eu:true },
  // Irlande
  { iata:'FR', name:'Ryanair', cc:'IE', eu:true },
  { iata:'EI', name:'Aer Lingus', cc:'IE', eu:true },
  // Autriche
  { iata:'OS', name:'Austrian Airlines', cc:'AT', eu:true },
  { iata:'OE', name:'Lauda Europe', cc:'AT', eu:true },
  // Grèce
  { iata:'A3', name:'Aegean Airlines', cc:'GR', eu:true },
  { iata:'OA', name:'Olympic Air', cc:'GR', eu:true },
  { iata:'GQ', name:'Sky Express', cc:'GR', eu:true },
  // Pologne
  { iata:'LO', name:'LOT Polish Airlines', cc:'PL', eu:true },
  // Hongrie
  { iata:'W6', name:'Wizz Air', cc:'HU', eu:true },
  // Roumanie
  { iata:'0B', name:'Blue Air', cc:'RO', eu:true },
  { iata:'RO', name:'TAROM', cc:'RO', eu:true },
  // Tchéquie
  { iata:'QS', name:'Smartwings', cc:'CZ', eu:true },
  { iata:'OK', name:'Czech Airlines', cc:'CZ', eu:true },
  // Finlande
  { iata:'AY', name:'Finnair', cc:'FI', eu:true },
  // Suède
  { iata:'SK', name:'SAS Scandinavian Airlines', cc:'SE', eu:true },
  // Danemark
  { iata:'DX', name:'DAT Danish Air Transport', cc:'DK', eu:true },
  // Croatie
  { iata:'OU', name:'Croatia Airlines', cc:'HR', eu:true },
  // Luxembourg
  { iata:'LG', name:'Luxair', cc:'LU', eu:true },
  // Malte
  { iata:'KM', name:'Air Malta', cc:'MT', eu:true },
  // Lettonie
  { iata:'BT', name:'airBaltic', cc:'LV', eu:true },
  // Bulgarie
  { iata:'FB', name:'Bulgaria Air', cc:'BG', eu:true },
  // Chypre
  { iata:'CY', name:'Cyprus Airways', cc:'CY', eu:true },
  // Slovénie
  { iata:'JP', name:'Adria Airways', cc:'SI', eu:true },
  // Lituanie
  { iata:'TE', name:'Smartlynx Airlines', cc:'LT', eu:true },
  // Estonie
  { iata:'OV', name:'Estonian Air', cc:'EE', eu:true },

  // EEE hors UE
  // Norvège
  { iata:'DY', name:'Norwegian Air Shuttle', cc:'NO', eu:true },
  { iata:'D8', name:'Norwegian Air International', cc:'NO', eu:true },
  { iata:'WF', name:'Widerøe', cc:'NO', eu:true },
  { iata:'FK', name:'Flyr', cc:'NO', eu:true },
  // Islande
  { iata:'FI', name:'Icelandair', cc:'IS', eu:true },
  { iata:'WW', name:'WOW air', cc:'IS', eu:true },
  // Suisse
  { iata:'LX', name:'SWISS', cc:'CH', eu:true },
  { iata:'WK', name:'Edelweiss Air', cc:'CH', eu:true },

  // easyJet (multi-pays EU)
  { iata:'U2', name:'easyJet', cc:'GB', eu:'uk' },
  { iata:'EC', name:'easyJet Europe', cc:'AT', eu:true },

  // ═══════════════════════════════════════════════════════════════════════════
  // ROYAUME-UNI  (eu: 'uk')
  // ═══════════════════════════════════════════════════════════════════════════
  { iata:'BA', name:'British Airways', cc:'GB', eu:'uk' },
  { iata:'VS', name:'Virgin Atlantic', cc:'GB', eu:'uk' },
  { iata:'LS', name:'Jet2', cc:'GB', eu:'uk' },
  { iata:'BY', name:'TUI Airways', cc:'GB', eu:'uk' },
  { iata:'MT', name:'Thomas Cook Airlines', cc:'GB', eu:'uk' },
  { iata:'ZT', name:'Titan Airways', cc:'GB', eu:'uk' },
  { iata:'W9', name:'Wizz Air UK', cc:'GB', eu:'uk' },
  { iata:'BE', name:'Flybe', cc:'GB', eu:'uk' },
  { iata:'T3', name:'Eastern Airways', cc:'GB', eu:'uk' },
  { iata:'LM', name:'Loganair', cc:'GB', eu:'uk' },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOYEN-ORIENT  (eu: false)
  // ═══════════════════════════════════════════════════════════════════════════
  { iata:'EK', name:'Emirates', cc:'AE', eu:false },
  { iata:'EY', name:'Etihad Airways', cc:'AE', eu:false },
  { iata:'FZ', name:'flydubai', cc:'AE', eu:false },
  { iata:'G9', name:'Air Arabia', cc:'AE', eu:false },
  { iata:'QR', name:'Qatar Airways', cc:'QA', eu:false },
  { iata:'SV', name:'Saudia', cc:'SA', eu:false },
  { iata:'XY', name:'flynas', cc:'SA', eu:false },
  { iata:'GF', name:'Gulf Air', cc:'BH', eu:false },
  { iata:'WY', name:'Oman Air', cc:'OM', eu:false },
  { iata:'J9', name:'Jazeera Airways', cc:'KW', eu:false },
  { iata:'RJ', name:'Royal Jordanian', cc:'JO', eu:false },
  { iata:'ME', name:'Middle East Airlines', cc:'LB', eu:false },
  { iata:'LY', name:'El Al Israel Airlines', cc:'IL', eu:false },
  { iata:'6H', name:'Israir Airlines', cc:'IL', eu:false },
  { iata:'TK', name:'Turkish Airlines', cc:'TR', eu:false },
  { iata:'PC', name:'Pegasus Airlines', cc:'TR', eu:false },
  { iata:'XQ', name:'SunExpress', cc:'TR', eu:false },
  { iata:'XC', name:'Corendon Airlines', cc:'TR', eu:false },
  { iata:'W5', name:'Mahan Air', cc:'IR', eu:false },
  { iata:'EP', name:'Iran Aseman Airlines', cc:'IR', eu:false },
  { iata:'IR', name:'Iran Air', cc:'IR', eu:false },
  { iata:'IA', name:'Iraqi Airways', cc:'IQ', eu:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // ASIE — Extrême-Orient & Pacifique  (eu: false)
  // ═══════════════════════════════════════════════════════════════════════════
  // Chine
  { iata:'CA', name:'Air China', cc:'CN', eu:false },
  { iata:'MU', name:'China Eastern Airlines', cc:'CN', eu:false },
  { iata:'CZ', name:'China Southern Airlines', cc:'CN', eu:false },
  { iata:'HU', name:'Hainan Airlines', cc:'CN', eu:false },
  { iata:'3U', name:'Sichuan Airlines', cc:'CN', eu:false },
  { iata:'ZH', name:'Shenzhen Airlines', cc:'CN', eu:false },
  { iata:'MF', name:'Xiamen Airlines', cc:'CN', eu:false },
  { iata:'FM', name:'Shanghai Airlines', cc:'CN', eu:false },
  { iata:'SC', name:'Shandong Airlines', cc:'CN', eu:false },
  { iata:'9C', name:'Spring Airlines', cc:'CN', eu:false },
  // Hong Kong
  { iata:'CX', name:'Cathay Pacific', cc:'HK', eu:false },
  { iata:'HX', name:'Hong Kong Airlines', cc:'HK', eu:false },
  { iata:'UO', name:'HK Express', cc:'HK', eu:false },
  // Taïwan
  { iata:'CI', name:'China Airlines', cc:'TW', eu:false },
  { iata:'BR', name:'EVA Air', cc:'TW', eu:false },
  { iata:'B7', name:'Uni Air', cc:'TW', eu:false },
  // Japon
  { iata:'JL', name:'Japan Airlines', cc:'JP', eu:false },
  { iata:'NH', name:'All Nippon Airways (ANA)', cc:'JP', eu:false },
  { iata:'GK', name:'Jetstar Japan', cc:'JP', eu:false },
  { iata:'MM', name:'Peach Aviation', cc:'JP', eu:false },
  { iata:'7G', name:'StarFlyer', cc:'JP', eu:false },
  { iata:'BC', name:'Skymark Airlines', cc:'JP', eu:false },
  // Corée du Sud
  { iata:'KE', name:'Korean Air', cc:'KR', eu:false },
  { iata:'OZ', name:'Asiana Airlines', cc:'KR', eu:false },
  { iata:'TW', name:'T\'way Air', cc:'KR', eu:false },
  { iata:'7C', name:'Jeju Air', cc:'KR', eu:false },
  { iata:'LJ', name:'Jin Air', cc:'KR', eu:false },
  { iata:'BX', name:'Air Busan', cc:'KR', eu:false },
  // Asie du Sud-Est
  { iata:'SQ', name:'Singapore Airlines', cc:'SG', eu:false },
  { iata:'TR', name:'Scoot', cc:'SG', eu:false },
  { iata:'TG', name:'Thai Airways', cc:'TH', eu:false },
  { iata:'FD', name:'Thai AirAsia', cc:'TH', eu:false },
  { iata:'WE', name:'Thai Smile', cc:'TH', eu:false },
  { iata:'DD', name:'Nok Air', cc:'TH', eu:false },
  { iata:'SL', name:'Thai Lion Air', cc:'TH', eu:false },
  { iata:'MH', name:'Malaysia Airlines', cc:'MY', eu:false },
  { iata:'AK', name:'AirAsia', cc:'MY', eu:false },
  { iata:'D7', name:'AirAsia X', cc:'MY', eu:false },
  { iata:'OD', name:'Batik Air Malaysia', cc:'MY', eu:false },
  { iata:'GA', name:'Garuda Indonesia', cc:'ID', eu:false },
  { iata:'QZ', name:'AirAsia Indonesia', cc:'ID', eu:false },
  { iata:'JT', name:'Lion Air', cc:'ID', eu:false },
  { iata:'ID', name:'Batik Air', cc:'ID', eu:false },
  { iata:'QG', name:'Citilink', cc:'ID', eu:false },
  { iata:'PR', name:'Philippine Airlines', cc:'PH', eu:false },
  { iata:'5J', name:'Cebu Pacific', cc:'PH', eu:false },
  { iata:'VN', name:'Vietnam Airlines', cc:'VN', eu:false },
  { iata:'VJ', name:'VietJet Air', cc:'VN', eu:false },
  { iata:'QH', name:'Bamboo Airways', cc:'VN', eu:false },
  { iata:'K6', name:'Cambodia Angkor Air', cc:'KH', eu:false },
  { iata:'QV', name:'Lao Airlines', cc:'LA', eu:false },
  { iata:'UB', name:'Myanmar National Airlines', cc:'MM', eu:false },
  { iata:'BI', name:'Royal Brunei Airlines', cc:'BN', eu:false },
  // Inde & sous-continent
  { iata:'AI', name:'Air India', cc:'IN', eu:false },
  { iata:'6E', name:'IndiGo', cc:'IN', eu:false },
  { iata:'UK', name:'Vistara', cc:'IN', eu:false },
  { iata:'SG', name:'SpiceJet', cc:'IN', eu:false },
  { iata:'G8', name:'Go First', cc:'IN', eu:false },
  { iata:'IX', name:'Air India Express', cc:'IN', eu:false },
  { iata:'QP', name:'Akasa Air', cc:'IN', eu:false },
  { iata:'UL', name:'SriLankan Airlines', cc:'LK', eu:false },
  { iata:'BG', name:'Biman Bangladesh Airlines', cc:'BD', eu:false },
  { iata:'RA', name:'Nepal Airlines', cc:'NP', eu:false },
  { iata:'PK', name:'Pakistan International Airlines', cc:'PK', eu:false },
  // Asie Centrale
  { iata:'KC', name:'Air Astana', cc:'KZ', eu:false },
  { iata:'HY', name:'Uzbekistan Airways', cc:'UZ', eu:false },
  { iata:'T5', name:'Turkmenistan Airlines', cc:'TM', eu:false },
  // Mongolie
  { iata:'OM', name:'MIAT Mongolian Airlines', cc:'MN', eu:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // OCÉANIE  (eu: false)
  // ═══════════════════════════════════════════════════════════════════════════
  { iata:'QF', name:'Qantas', cc:'AU', eu:false },
  { iata:'JQ', name:'Jetstar Airways', cc:'AU', eu:false },
  { iata:'VA', name:'Virgin Australia', cc:'AU', eu:false },
  { iata:'ZL', name:'Rex Airlines', cc:'AU', eu:false },
  { iata:'NZ', name:'Air New Zealand', cc:'NZ', eu:false },
  { iata:'FJ', name:'Fiji Airways', cc:'FJ', eu:false },
  { iata:'PX', name:'Air Niugini', cc:'PG', eu:false },
  { iata:'SB', name:'Aircalin', cc:'NC', eu:false },
  { iata:'TN', name:'Air Tahiti Nui', cc:'PF', eu:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMÉRIQUE DU NORD  (eu: false)
  // ═══════════════════════════════════════════════════════════════════════════
  // États-Unis
  { iata:'AA', name:'American Airlines', cc:'US', eu:false },
  { iata:'DL', name:'Delta Air Lines', cc:'US', eu:false },
  { iata:'UA', name:'United Airlines', cc:'US', eu:false },
  { iata:'WN', name:'Southwest Airlines', cc:'US', eu:false },
  { iata:'B6', name:'JetBlue Airways', cc:'US', eu:false },
  { iata:'AS', name:'Alaska Airlines', cc:'US', eu:false },
  { iata:'NK', name:'Spirit Airlines', cc:'US', eu:false },
  { iata:'F9', name:'Frontier Airlines', cc:'US', eu:false },
  { iata:'HA', name:'Hawaiian Airlines', cc:'US', eu:false },
  { iata:'SY', name:'Sun Country Airlines', cc:'US', eu:false },
  { iata:'G4', name:'Allegiant Air', cc:'US', eu:false },
  // Canada
  { iata:'AC', name:'Air Canada', cc:'CA', eu:false },
  { iata:'WS', name:'WestJet', cc:'CA', eu:false },
  { iata:'PD', name:'Porter Airlines', cc:'CA', eu:false },
  { iata:'TS', name:'Air Transat', cc:'CA', eu:false },
  { iata:'WG', name:'Sunwing Airlines', cc:'CA', eu:false },
  { iata:'MO', name:'Calm Air', cc:'CA', eu:false },
  // Mexique
  { iata:'AM', name:'Aeroméxico', cc:'MX', eu:false },
  { iata:'4O', name:'Volaris', cc:'MX', eu:false },
  { iata:'Y4', name:'VivaAerobus', cc:'MX', eu:false },
  // Caraïbes
  { iata:'BW', name:'Caribbean Airlines', cc:'TT', eu:false },
  { iata:'CM', name:'Copa Airlines', cc:'PA', eu:false },
  { iata:'UP', name:'Bahamasair', cc:'BS', eu:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMÉRIQUE LATINE  (eu: false)
  // ═══════════════════════════════════════════════════════════════════════════
  { iata:'LA', name:'LATAM Airlines', cc:'CL', eu:false },
  { iata:'JA', name:'LATAM Airlines Brasil', cc:'BR', eu:false },
  { iata:'G3', name:'GOL Linhas Aéreas', cc:'BR', eu:false },
  { iata:'AD', name:'Azul Brazilian Airlines', cc:'BR', eu:false },
  { iata:'AR', name:'Aerolíneas Argentinas', cc:'AR', eu:false },
  { iata:'FO', name:'Flybondi', cc:'AR', eu:false },
  { iata:'H2', name:'Sky Airline', cc:'CL', eu:false },
  { iata:'JB', name:'JetSMART', cc:'CL', eu:false },
  { iata:'AV', name:'Avianca', cc:'CO', eu:false },
  { iata:'P5', name:'Wingo', cc:'CO', eu:false },
  { iata:'OB', name:'Boliviana de Aviación', cc:'BO', eu:false },
  { iata:'PZ', name:'LATAM Airlines Paraguay', cc:'PY', eu:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // AFRIQUE  (eu: false)
  // ═══════════════════════════════════════════════════════════════════════════
  // Afrique du Nord
  { iata:'AT', name:'Royal Air Maroc', cc:'MA', eu:false },
  { iata:'AH', name:'Air Algérie', cc:'DZ', eu:false },
  { iata:'TU', name:'Tunisair', cc:'TN', eu:false },
  { iata:'UG', name:'Tunisair Express', cc:'TN', eu:false },
  { iata:'MS', name:'EgyptAir', cc:'EG', eu:false },
  { iata:'NP', name:'Nile Air', cc:'EG', eu:false },
  { iata:'LN', name:'Libyan Airlines', cc:'LY', eu:false },
  // Afrique de l'Ouest
  { iata:'ET', name:'Ethiopian Airlines', cc:'ET', eu:false },
  { iata:'KQ', name:'Kenya Airways', cc:'KE', eu:false },
  { iata:'SA', name:'South African Airways', cc:'ZA', eu:false },
  { iata:'FA', name:'FlySafair', cc:'ZA', eu:false },
  { iata:'WB', name:'RwandAir', cc:'RW', eu:false },
  { iata:'TC', name:'Air Tanzania', cc:'TZ', eu:false },
  { iata:'UM', name:'Air Zimbabwe', cc:'ZW', eu:false },
  { iata:'QC', name:'Camair-Co', cc:'CM', eu:false },
  { iata:'HF', name:'Air Côte d\'Ivoire', cc:'CI', eu:false },
  { iata:'W3', name:'Arik Air', cc:'NG', eu:false },
  { iata:'P4', name:'Air Peace', cc:'NG', eu:false },
  { iata:'5Z', name:'CemAir', cc:'ZA', eu:false },
  { iata:'MK', name:'Air Mauritius', cc:'MU', eu:false },
  { iata:'UU', name:'Air Austral', cc:'RE', eu:true },
  { iata:'MD', name:'Air Madagascar', cc:'MG', eu:false },
  { iata:'KP', name:'ASKY Airlines', cc:'TG', eu:false },
  { iata:'ZF', name:'AZUR air', cc:'RU', eu:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // RUSSIE & ex-URSS  (eu: false)
  // ═══════════════════════════════════════════════════════════════════════════
  { iata:'SU', name:'Aeroflot', cc:'RU', eu:false },
  { iata:'S7', name:'S7 Airlines', cc:'RU', eu:false },
  { iata:'UT', name:'UTair', cc:'RU', eu:false },
  { iata:'U6', name:'Ural Airlines', cc:'RU', eu:false },
  { iata:'DP', name:'Pobeda', cc:'RU', eu:false },
  { iata:'N4', name:'Nordwind Airlines', cc:'RU', eu:false },
  { iata:'5N', name:'Nordavia', cc:'RU', eu:false },
  { iata:'PS', name:'Ukraine International Airlines', cc:'UA', eu:false },
  { iata:'B2', name:'Belavia', cc:'BY', eu:false },
  { iata:'4G', name:'Gazpromavia', cc:'RU', eu:false },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPAGNIES CARGO (les plus connues, parfois passagers)
  // ═══════════════════════════════════════════════════════════════════════════
  { iata:'5X', name:'UPS Airlines', cc:'US', eu:false },
  { iata:'FX', name:'FedEx Express', cc:'US', eu:false },
  { iata:'CV', name:'Cargolux', cc:'LU', eu:true },
];

// Index par code IATA
// eslint-disable-next-line no-unused-vars
const AIRLINES_MAP = {};
AIRLINES.forEach(a => { AIRLINES_MAP[a.iata] = a; });

// Index par nom (pour auto-détection EU)
// eslint-disable-next-line no-unused-vars
const AIRLINES_BY_NAME = {};
AIRLINES.forEach(a => { AIRLINES_BY_NAME[a.name.toLowerCase()] = a; });

/**
 * Recherche de compagnies — normalise les accents, retourne max 10 résultats.
 * @param {string} query
 * @returns {Array}
 */
// eslint-disable-next-line no-unused-vars
function searchAirlines(query) {
  if (!query || query.length < 1) return [];
  function norm(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  const q    = norm(query);
  const qUp  = query.toUpperCase();
  const results = [];
  for (const a of AIRLINES) {
    if (results.length >= 10) break;
    if (a.iata === qUp)              { results.unshift(a); continue; }
    if (norm(a.name).startsWith(q))  { results.push(a); continue; }
    if (norm(a.name).includes(q))    { results.push(a); continue; }
  }
  return results.slice(0, 10);
}

/**
 * Vérifie si une compagnie (par nom) est UE/EEE/CH.
 * @param {string} name — nom de la compagnie
 * @returns {boolean|string} true (EU), 'uk', ou false
 */
// eslint-disable-next-line no-unused-vars
function isAirlineEU(name) {
  if (!name) return false;
  const a = AIRLINES_BY_NAME[name.toLowerCase()];
  return a ? a.eu : false;
}
