// Airport database — IATA, name, city, country, country code, EU flag, lat, lon
// eu: true = EU/EEA/CH (CE 261/2004 applies as departure), 'uk' = UK (UK261)
const AIRPORTS = [
  // ── France ───────────────────────────────────────────────────────────────
  { iata:'CDG', name:'Charles de Gaulle', city:'Paris',      country:'France',      cc:'FR', eu:true,  lat:49.0097,  lon:2.5478 },
  { iata:'ORY', name:'Orly',              city:'Paris',      country:'France',      cc:'FR', eu:true,  lat:48.7262,  lon:2.3652 },
  { iata:'LYS', name:'Saint-Exupéry',     city:'Lyon',       country:'France',      cc:'FR', eu:true,  lat:45.7256,  lon:5.0811 },
  { iata:'MRS', name:'Provence',          city:'Marseille',  country:'France',      cc:'FR', eu:true,  lat:43.4365,  lon:5.2214 },
  { iata:'NCE', name:'Côte d\'Azur',      city:'Nice',       country:'France',      cc:'FR', eu:true,  lat:43.6584,  lon:7.2159 },
  { iata:'TLS', name:'Blagnac',           city:'Toulouse',   country:'France',      cc:'FR', eu:true,  lat:43.6291,  lon:1.3678 },
  { iata:'BOD', name:'Mérignac',          city:'Bordeaux',   country:'France',      cc:'FR', eu:true,  lat:44.8283,  lon:-0.7156},
  { iata:'NTE', name:'Nantes Atlantique', city:'Nantes',     country:'France',      cc:'FR', eu:true,  lat:47.1532,  lon:-1.6107},
  { iata:'RNS', name:'Saint-Jacques',     city:'Rennes',     country:'France',      cc:'FR', eu:true,  lat:48.0695,  lon:-1.7279},
  { iata:'SXB', name:'Entzheim',          city:'Strasbourg', country:'France',      cc:'FR', eu:true,  lat:48.5383,  lon:7.6282 },
  { iata:'MPL', name:'Méditerranée',      city:'Montpellier',country:'France',      cc:'FR', eu:true,  lat:43.5762,  lon:3.9630 },
  { iata:'BES', name:'Bretagne',          city:'Brest',      country:'France',      cc:'FR', eu:true,  lat:48.4479,  lon:-4.4183},
  { iata:'LIL', name:'Lesquin',           city:'Lille',      country:'France',      cc:'FR', eu:true,  lat:50.5633,  lon:3.0886 },
  // ── Allemagne ────────────────────────────────────────────────────────────
  { iata:'FRA', name:'Frankfurt am Main', city:'Francfort',  country:'Allemagne',   cc:'DE', eu:true,  lat:50.0333,  lon:8.5706 },
  { iata:'MUC', name:'Franz Josef Strauss',city:'Munich',    country:'Allemagne',   cc:'DE', eu:true,  lat:48.3537,  lon:11.7750},
  { iata:'BER', name:'Brandenburg',       city:'Berlin',     country:'Allemagne',   cc:'DE', eu:true,  lat:52.3667,  lon:13.5033},
  { iata:'DUS', name:'Düsseldorf',        city:'Düsseldorf', country:'Allemagne',   cc:'DE', eu:true,  lat:51.2895,  lon:6.7668 },
  { iata:'HAM', name:'Hamburg',           city:'Hambourg',   country:'Allemagne',   cc:'DE', eu:true,  lat:53.6303,  lon:9.9882 },
  { iata:'STR', name:'Stuttgart',         city:'Stuttgart',  country:'Allemagne',   cc:'DE', eu:true,  lat:48.6899,  lon:9.2218 },
  { iata:'CGN', name:'Cologne Bonn',      city:'Cologne',    country:'Allemagne',   cc:'DE', eu:true,  lat:50.8659,  lon:7.1427 },
  { iata:'NUE', name:'Nuremberg',         city:'Nuremberg',  country:'Allemagne',   cc:'DE', eu:true,  lat:49.4987,  lon:11.0669},
  // ── Espagne ──────────────────────────────────────────────────────────────
  { iata:'MAD', name:'Adolfo Suárez Barajas',city:'Madrid',  country:'Espagne',     cc:'ES', eu:true,  lat:40.4719,  lon:-3.5626},
  { iata:'BCN', name:'El Prat',           city:'Barcelone',  country:'Espagne',     cc:'ES', eu:true,  lat:41.2971,  lon:2.0785 },
  { iata:'VLC', name:'Valencia',          city:'Valence',    country:'Espagne',     cc:'ES', eu:true,  lat:39.4893,  lon:-0.4816},
  { iata:'SVQ', name:'San Pablo',         city:'Séville',    country:'Espagne',     cc:'ES', eu:true,  lat:37.4180,  lon:-5.8931},
  { iata:'AGP', name:'Costa del Sol',     city:'Malaga',     country:'Espagne',     cc:'ES', eu:true,  lat:36.6749,  lon:-4.4991},
  { iata:'ALC', name:'El Altet',          city:'Alicante',   country:'Espagne',     cc:'ES', eu:true,  lat:38.2822,  lon:-0.5582},
  { iata:'PMI', name:'Son Sant Joan',     city:'Palma de Majorque',country:'Espagne',cc:'ES',eu:true, lat:39.5517,  lon:2.7388 },
  { iata:'LPA', name:'Gran Canaria',      city:'Las Palmas', country:'Espagne',     cc:'ES', eu:true,  lat:27.9319,  lon:-15.3866},
  { iata:'TFS', name:'Tenerife Sur',      city:'Tenerife',   country:'Espagne',     cc:'ES', eu:true,  lat:28.0445,  lon:-16.5725},
  { iata:'ACE', name:'Lanzarote',         city:'Lanzarote',  country:'Espagne',     cc:'ES', eu:true,  lat:28.9455,  lon:-13.6052},
  { iata:'FUE', name:'Fuerteventura',     city:'Fuerteventura',country:'Espagne',   cc:'ES', eu:true,  lat:28.4527,  lon:-13.8638},
  { iata:'IBZ', name:'Ibiza',             city:'Ibiza',      country:'Espagne',     cc:'ES', eu:true,  lat:38.8729,  lon:1.3731 },
  { iata:'GRX', name:'Federico García Lorca',city:'Grenade',country:'Espagne',     cc:'ES', eu:true,  lat:37.1887,  lon:-3.7774},
  // ── Italie ───────────────────────────────────────────────────────────────
  { iata:'FCO', name:'Fiumicino',         city:'Rome',       country:'Italie',      cc:'IT', eu:true,  lat:41.8003,  lon:12.2389},
  { iata:'MXP', name:'Malpensa',          city:'Milan',      country:'Italie',      cc:'IT', eu:true,  lat:45.6301,  lon:8.7237 },
  { iata:'LIN', name:'Linate',            city:'Milan',      country:'Italie',      cc:'IT', eu:true,  lat:45.4454,  lon:9.2767 },
  { iata:'VCE', name:'Marco Polo',        city:'Venise',     country:'Italie',      cc:'IT', eu:true,  lat:45.5053,  lon:12.3519},
  { iata:'NAP', name:'Capodichino',       city:'Naples',     country:'Italie',      cc:'IT', eu:true,  lat:40.8860,  lon:14.2908},
  { iata:'CTA', name:'Fontanarossa',      city:'Catane',     country:'Italie',      cc:'IT', eu:true,  lat:37.4668,  lon:15.0664},
  { iata:'BLQ', name:'Guglielmo Marconi', city:'Bologne',    country:'Italie',      cc:'IT', eu:true,  lat:44.5354,  lon:11.2887},
  { iata:'PMO', name:'Falcone-Borsellino',city:'Palerme',    country:'Italie',      cc:'IT', eu:true,  lat:38.1759,  lon:13.0910},
  { iata:'BRI', name:'Karol Wojtyla',     city:'Bari',       country:'Italie',      cc:'IT', eu:true,  lat:41.1389,  lon:16.7606},
  // ── Pays-Bas ─────────────────────────────────────────────────────────────
  { iata:'AMS', name:'Schiphol',          city:'Amsterdam',  country:'Pays-Bas',    cc:'NL', eu:true,  lat:52.3086,  lon:4.7639 },
  { iata:'EIN', name:'Eindhoven',         city:'Eindhoven',  country:'Pays-Bas',    cc:'NL', eu:true,  lat:51.4501,  lon:5.3746 },
  // ── Belgique ─────────────────────────────────────────────────────────────
  { iata:'BRU', name:'Brussels Airport',  city:'Bruxelles',  country:'Belgique',    cc:'BE', eu:true,  lat:50.9014,  lon:4.4844 },
  { iata:'CRL', name:'Brussels South',    city:'Charleroi',  country:'Belgique',    cc:'BE', eu:true,  lat:50.4592,  lon:4.4528 },
  // ── Portugal ─────────────────────────────────────────────────────────────
  { iata:'LIS', name:'Humberto Delgado',  city:'Lisbonne',   country:'Portugal',    cc:'PT', eu:true,  lat:38.7813,  lon:-9.1359},
  { iata:'OPO', name:'Francisco Sá Carneiro',city:'Porto',   country:'Portugal',    cc:'PT', eu:true,  lat:41.2481,  lon:-8.6814},
  { iata:'FAO', name:'Faro',              city:'Faro',       country:'Portugal',    cc:'PT', eu:true,  lat:37.0144,  lon:-7.9659},
  { iata:'FNC', name:'Cristiano Ronaldo', city:'Madère',     country:'Portugal',    cc:'PT', eu:true,  lat:32.6979,  lon:-16.7745},
  // ── Grèce ────────────────────────────────────────────────────────────────
  { iata:'ATH', name:'Elefthérios Venizélos',city:'Athènes', country:'Grèce',       cc:'GR', eu:true,  lat:37.9364,  lon:23.9445},
  { iata:'SKG', name:'Macédoine',         city:'Thessalonique',country:'Grèce',     cc:'GR', eu:true,  lat:40.5197,  lon:22.9709},
  { iata:'HER', name:'Níkos Kazantzákis', city:'Héraklion', country:'Grèce',       cc:'GR', eu:true,  lat:35.3397,  lon:25.1803},
  { iata:'RHO', name:'Diagoras',          city:'Rhodes',     country:'Grèce',       cc:'GR', eu:true,  lat:36.4054,  lon:28.0862},
  { iata:'CFU', name:'Ioannis Kapodistrias',city:'Corfou',  country:'Grèce',       cc:'GR', eu:true,  lat:39.6019,  lon:19.9117},
  { iata:'JMK', name:'Mykonos',           city:'Mykonos',    country:'Grèce',       cc:'GR', eu:true,  lat:37.4351,  lon:25.3481},
  { iata:'JTR', name:'Santorin',          city:'Santorin',   country:'Grèce',       cc:'GR', eu:true,  lat:36.3992,  lon:25.4793},
  // ── Autriche ─────────────────────────────────────────────────────────────
  { iata:'VIE', name:'Schwechat',         city:'Vienne',     country:'Autriche',    cc:'AT', eu:true,  lat:48.1103,  lon:16.5697},
  // ── Danemark ─────────────────────────────────────────────────────────────
  { iata:'CPH', name:'Kastrup',           city:'Copenhague', country:'Danemark',    cc:'DK', eu:true,  lat:55.6181,  lon:12.6561},
  { iata:'BLL', name:'Billund',           city:'Billund',    country:'Danemark',    cc:'DK', eu:true,  lat:55.7403,  lon:9.1518 },
  // ── Finlande ─────────────────────────────────────────────────────────────
  { iata:'HEL', name:'Helsinki-Vantaa',   city:'Helsinki',   country:'Finlande',    cc:'FI', eu:true,  lat:60.3172,  lon:24.9633},
  // ── Suède ────────────────────────────────────────────────────────────────
  { iata:'ARN', name:'Stockholm Arlanda', city:'Stockholm',  country:'Suède',       cc:'SE', eu:true,  lat:59.6519,  lon:17.9186},
  { iata:'GOT', name:'Landvetter',        city:'Göteborg',   country:'Suède',       cc:'SE', eu:true,  lat:57.6628,  lon:12.2798},
  // ── Irlande ──────────────────────────────────────────────────────────────
  { iata:'DUB', name:'Dublin',            city:'Dublin',     country:'Irlande',     cc:'IE', eu:true,  lat:53.4213,  lon:-6.2701},
  { iata:'ORK', name:'Cork',              city:'Cork',       country:'Irlande',     cc:'IE', eu:true,  lat:51.8413,  lon:-8.4912},
  // ── Pologne ──────────────────────────────────────────────────────────────
  { iata:'WAW', name:'Frédéric Chopin',   city:'Varsovie',   country:'Pologne',     cc:'PL', eu:true,  lat:52.1657,  lon:20.9671},
  { iata:'KRK', name:'Jean-Paul II',      city:'Cracovie',   country:'Pologne',     cc:'PL', eu:true,  lat:50.0777,  lon:19.7848},
  { iata:'GDN', name:'Lech Wałęsa',       city:'Gdansk',     country:'Pologne',     cc:'PL', eu:true,  lat:54.3776,  lon:18.4662},
  { iata:'KTW', name:'Katowice',          city:'Katowice',   country:'Pologne',     cc:'PL', eu:true,  lat:50.4743,  lon:19.0800},
  // ── Rép. Tchèque ─────────────────────────────────────────────────────────
  { iata:'PRG', name:'Václav Havel',      city:'Prague',     country:'Rép. Tchèque',cc:'CZ', eu:true,  lat:50.1008,  lon:14.2600},
  // ── Hongrie ──────────────────────────────────────────────────────────────
  { iata:'BUD', name:'Budapest Ferihegy', city:'Budapest',   country:'Hongrie',     cc:'HU', eu:true,  lat:47.4298,  lon:19.2610},
  // ── Roumanie ─────────────────────────────────────────────────────────────
  { iata:'OTP', name:'Henri Coandă',      city:'Bucarest',   country:'Roumanie',    cc:'RO', eu:true,  lat:44.5722,  lon:26.1022},
  { iata:'CLJ', name:'Avram Iancu',       city:'Cluj-Napoca',country:'Roumanie',    cc:'RO', eu:true,  lat:46.7852,  lon:23.6862},
  // ── Bulgarie ─────────────────────────────────────────────────────────────
  { iata:'SOF', name:'Sofia',             city:'Sofia',      country:'Bulgarie',    cc:'BG', eu:true,  lat:42.6952,  lon:23.4114},
  // ── Croatie ──────────────────────────────────────────────────────────────
  { iata:'ZAG', name:'Zagreb',            city:'Zagreb',     country:'Croatie',     cc:'HR', eu:true,  lat:45.7429,  lon:16.0688},
  { iata:'DBV', name:'Dubrovnik',         city:'Dubrovnik',  country:'Croatie',     cc:'HR', eu:true,  lat:42.5614,  lon:18.2682},
  { iata:'SPU', name:'Split',             city:'Split',      country:'Croatie',     cc:'HR', eu:true,  lat:43.5389,  lon:16.2980},
  // ── Chypre ───────────────────────────────────────────────────────────────
  { iata:'LCA', name:'Larnaca',           city:'Larnaca',    country:'Chypre',      cc:'CY', eu:true,  lat:34.8751,  lon:33.6249},
  { iata:'PFO', name:'Paphos',            city:'Paphos',     country:'Chypre',      cc:'CY', eu:true,  lat:34.7180,  lon:32.4857},
  // ── Malte ────────────────────────────────────────────────────────────────
  { iata:'MLA', name:'Malta International',city:'La Valette',country:'Malte',       cc:'MT', eu:true,  lat:35.8574,  lon:14.4775},
  // ── Luxembourg ───────────────────────────────────────────────────────────
  { iata:'LUX', name:'Luxembourg Findel', city:'Luxembourg', country:'Luxembourg',  cc:'LU', eu:true,  lat:49.6233,  lon:6.2044 },
  // ── Lettonie ─────────────────────────────────────────────────────────────
  { iata:'RIX', name:'Riga',              city:'Riga',       country:'Lettonie',    cc:'LV', eu:true,  lat:56.9236,  lon:23.9711},
  // ── Lituanie ─────────────────────────────────────────────────────────────
  { iata:'VNO', name:'Vilnius',           city:'Vilnius',    country:'Lituanie',    cc:'LT', eu:true,  lat:54.6341,  lon:25.2858},
  // ── Estonie ──────────────────────────────────────────────────────────────
  { iata:'TLL', name:'Lennart Meri',      city:'Tallinn',    country:'Estonie',     cc:'EE', eu:true,  lat:59.4133,  lon:24.8328},
  // ── Slovaquie ────────────────────────────────────────────────────────────
  { iata:'BTS', name:'Milan Rastislav Štefánik',city:'Bratislava',country:'Slovaquie',cc:'SK',eu:true,lat:48.1702,  lon:17.2127},
  // ── Slovénie ─────────────────────────────────────────────────────────────
  { iata:'LJU', name:'Jože Pučnik',       city:'Ljubljana',  country:'Slovénie',    cc:'SI', eu:true,  lat:46.2237,  lon:14.4576},
  // ── Norvège (EEA) ────────────────────────────────────────────────────────
  { iata:'OSL', name:'Oslo Gardermoen',   city:'Oslo',       country:'Norvège',     cc:'NO', eu:true,  lat:60.1939,  lon:11.1004},
  { iata:'BGO', name:'Bergen Flesland',   city:'Bergen',     country:'Norvège',     cc:'NO', eu:true,  lat:60.2934,  lon:5.2181 },
  { iata:'TRD', name:'Trondheim Værnes',  city:'Trondheim',  country:'Norvège',     cc:'NO', eu:true,  lat:63.4578,  lon:10.9260},
  // ── Islande (EEA) ────────────────────────────────────────────────────────
  { iata:'KEF', name:'Keflavík',          city:'Reykjavik',  country:'Islande',     cc:'IS', eu:true,  lat:63.9850,  lon:-22.6056},
  // ── Suisse (accords bilatéraux) ──────────────────────────────────────────
  { iata:'ZRH', name:'Zurich',            city:'Zurich',     country:'Suisse',      cc:'CH', eu:true,  lat:47.4582,  lon:8.5555 },
  { iata:'GVA', name:'Genève Cointrin',   city:'Genève',     country:'Suisse',      cc:'CH', eu:true,  lat:46.2380,  lon:6.1089 },
  { iata:'BSL', name:'Euro Airport',      city:'Bâle-Mulhouse',country:'Suisse/France',cc:'CH',eu:true,lat:47.5896,  lon:7.5290 },
  // ── Royaume-Uni (UK261) ──────────────────────────────────────────────────
  { iata:'LHR', name:'Heathrow',          city:'Londres',    country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:51.4700,  lon:-0.4543},
  { iata:'LGW', name:'Gatwick',           city:'Londres',    country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:51.1537,  lon:-0.1821},
  { iata:'LTN', name:'Luton',             city:'Londres',    country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:51.8747,  lon:-0.3683},
  { iata:'STN', name:'Stansted',          city:'Londres',    country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:51.8850,  lon:0.2350 },
  { iata:'LCY', name:'London City',       city:'Londres',    country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:51.5053,  lon:0.0553 },
  { iata:'MAN', name:'Manchester',        city:'Manchester', country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:53.3537,  lon:-2.2750},
  { iata:'BHX', name:'Birmingham',        city:'Birmingham', country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:52.4539,  lon:-1.7480},
  { iata:'EDI', name:'Edinburgh',         city:'Édimbourg',  country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:55.9500,  lon:-3.3725},
  { iata:'GLA', name:'Glasgow',           city:'Glasgow',    country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:55.8717,  lon:-4.4333},
  { iata:'BRS', name:'Bristol',           city:'Bristol',    country:'Royaume-Uni', cc:'GB', eu:'uk',  lat:51.3827,  lon:-2.7191},
  // ── États-Unis ───────────────────────────────────────────────────────────
  { iata:'JFK', name:'John F. Kennedy',   city:'New York',   country:'États-Unis',  cc:'US', eu:false, lat:40.6413,  lon:-73.7781},
  { iata:'EWR', name:'Newark',            city:'New York',   country:'États-Unis',  cc:'US', eu:false, lat:40.6925,  lon:-74.1687},
  { iata:'LAX', name:'Los Angeles',       city:'Los Angeles',country:'États-Unis',  cc:'US', eu:false, lat:33.9425,  lon:-118.4081},
  { iata:'ORD', name:'O\'Hare',           city:'Chicago',    country:'États-Unis',  cc:'US', eu:false, lat:41.9742,  lon:-87.9073},
  { iata:'MIA', name:'Miami',             city:'Miami',      country:'États-Unis',  cc:'US', eu:false, lat:25.7959,  lon:-80.2870},
  { iata:'BOS', name:'Logan',             city:'Boston',     country:'États-Unis',  cc:'US', eu:false, lat:42.3656,  lon:-71.0096},
  { iata:'SFO', name:'San Francisco',     city:'San Francisco',country:'États-Unis',cc:'US', eu:false, lat:37.6213,  lon:-122.3790},
  { iata:'ATL', name:'Hartsfield-Jackson',city:'Atlanta',    country:'États-Unis',  cc:'US', eu:false, lat:33.6407,  lon:-84.4277},
  { iata:'IAD', name:'Dulles',            city:'Washington', country:'États-Unis',  cc:'US', eu:false, lat:38.9531,  lon:-77.4565},
  { iata:'DFW', name:'Dallas-Fort Worth', city:'Dallas',     country:'États-Unis',  cc:'US', eu:false, lat:32.8998,  lon:-97.0403},
  { iata:'MCO', name:'Orlando',           city:'Orlando',    country:'États-Unis',  cc:'US', eu:false, lat:28.4312,  lon:-81.3081},
  // ── Canada ───────────────────────────────────────────────────────────────
  { iata:'YYZ', name:'Pearson',           city:'Toronto',    country:'Canada',      cc:'CA', eu:false, lat:43.6777,  lon:-79.6248},
  { iata:'YUL', name:'Montréal-Trudeau',  city:'Montréal',   country:'Canada',      cc:'CA', eu:false, lat:45.4707,  lon:-73.7408},
  { iata:'YVR', name:'Vancouver',         city:'Vancouver',  country:'Canada',      cc:'CA', eu:false, lat:49.1967,  lon:-123.1815},
  // ── Mexique / Caraïbes ───────────────────────────────────────────────────
  { iata:'MEX', name:'Benito Juárez',     city:'Mexico',     country:'Mexique',     cc:'MX', eu:false, lat:19.4363,  lon:-99.0721},
  { iata:'CUN', name:'Cancún',            city:'Cancún',     country:'Mexique',     cc:'MX', eu:false, lat:21.0365,  lon:-86.8771},
  // ── Amérique du Sud ──────────────────────────────────────────────────────
  { iata:'GRU', name:'Guarulhos',         city:'São Paulo',  country:'Brésil',      cc:'BR', eu:false, lat:-23.4356, lon:-46.4731},
  { iata:'GIG', name:'Galeão',            city:'Rio de Janeiro',country:'Brésil',   cc:'BR', eu:false, lat:-22.8100, lon:-43.2506},
  { iata:'EZE', name:'Ministro Pistarini',city:'Buenos Aires',country:'Argentine',  cc:'AR', eu:false, lat:-34.8222, lon:-58.5358},
  { iata:'BOG', name:'El Dorado',         city:'Bogotá',     country:'Colombie',    cc:'CO', eu:false, lat:4.7016,   lon:-74.1469},
  { iata:'LIM', name:'Jorge Chávez',      city:'Lima',       country:'Pérou',       cc:'PE', eu:false, lat:-12.0219, lon:-77.1143},
  { iata:'SCL', name:'Arturo Merino Benítez',city:'Santiago',country:'Chili',       cc:'CL', eu:false, lat:-33.3928, lon:-70.7931},
  // ── Moyen-Orient ─────────────────────────────────────────────────────────
  { iata:'DXB', name:'Dubaï International',city:'Dubaï',     country:'Émirats Arabes',cc:'AE',eu:false,lat:25.2532,  lon:55.3657},
  { iata:'DOH', name:'Hamad',             city:'Doha',       country:'Qatar',       cc:'QA', eu:false, lat:25.2731,  lon:51.6080},
  { iata:'AUH', name:'Abu Dhabi Zayed',   city:'Abou Dabi',  country:'Émirats Arabes',cc:'AE',eu:false,lat:24.4330,  lon:54.6511},
  { iata:'IST', name:'Istanbul',          city:'Istanbul',   country:'Turquie',     cc:'TR', eu:false, lat:41.2753,  lon:28.7519},
  { iata:'SAW', name:'Istanbul Sabiha',   city:'Istanbul',   country:'Turquie',     cc:'TR', eu:false, lat:40.8985,  lon:29.3092},
  { iata:'TLV', name:'Ben Gourion',       city:'Tel Aviv',   country:'Israël',      cc:'IL', eu:false, lat:32.0055,  lon:34.8854},
  { iata:'AMM', name:'Queen Alia',        city:'Amman',      country:'Jordanie',    cc:'JO', eu:false, lat:31.7226,  lon:35.9932},
  { iata:'BEY', name:'Rafic Hariri',      city:'Beyrouth',   country:'Liban',       cc:'LB', eu:false, lat:33.8209,  lon:35.4883},
  // ── Afrique ──────────────────────────────────────────────────────────────
  { iata:'CMN', name:'Mohammed V',        city:'Casablanca', country:'Maroc',       cc:'MA', eu:false, lat:33.3675,  lon:-7.5900},
  { iata:'RAK', name:'Ménara',            city:'Marrakech',  country:'Maroc',       cc:'MA', eu:false, lat:31.6069,  lon:-8.0363},
  { iata:'TUN', name:'Tunis-Carthage',    city:'Tunis',      country:'Tunisie',     cc:'TN', eu:false, lat:36.8510,  lon:10.2271},
  { iata:'ALG', name:'Houari Boumediene', city:'Alger',      country:'Algérie',     cc:'DZ', eu:false, lat:36.6910,  lon:3.2154 },
  { iata:'CAI', name:'Le Caire',          city:'Le Caire',   country:'Égypte',      cc:'EG', eu:false, lat:30.1219,  lon:31.4056},
  { iata:'JNB', name:'OR Tambo',          city:'Johannesburg',country:'Afrique du Sud',cc:'ZA',eu:false,lat:-26.1392, lon:28.2460},
  { iata:'CPT', name:'Cape Town',         city:'Le Cap',     country:'Afrique du Sud',cc:'ZA',eu:false,lat:-33.9648, lon:18.6017},
  { iata:'NBO', name:'Jomo Kenyatta',     city:'Nairobi',    country:'Kenya',       cc:'KE', eu:false, lat:-1.3192,  lon:36.9275},
  { iata:'ADD', name:'Bole',              city:'Addis-Abeba',country:'Éthiopie',    cc:'ET', eu:false, lat:8.9779,   lon:38.7993},
  // ── Asie ─────────────────────────────────────────────────────────────────
  { iata:'DEL', name:'Indira Gandhi',     city:'New Delhi',  country:'Inde',        cc:'IN', eu:false, lat:28.5665,  lon:77.1031},
  { iata:'BOM', name:'Chhatrapati Shivaji',city:'Mumbai',    country:'Inde',        cc:'IN', eu:false, lat:19.0896,  lon:72.8656},
  { iata:'SIN', name:'Changi',            city:'Singapour',  country:'Singapour',   cc:'SG', eu:false, lat:1.3644,   lon:103.9915},
  { iata:'HKG', name:'Hong Kong',         city:'Hong Kong',  country:'Hong Kong',   cc:'HK', eu:false, lat:22.3080,  lon:113.9185},
  { iata:'NRT', name:'Narita',            city:'Tokyo',      country:'Japon',       cc:'JP', eu:false, lat:35.7720,  lon:140.3929},
  { iata:'HND', name:'Haneda',            city:'Tokyo',      country:'Japon',       cc:'JP', eu:false, lat:35.5494,  lon:139.7798},
  { iata:'PEK', name:'Capital',           city:'Pékin',      country:'Chine',       cc:'CN', eu:false, lat:40.0799,  lon:116.6031},
  { iata:'PVG', name:'Pudong',            city:'Shanghai',   country:'Chine',       cc:'CN', eu:false, lat:31.1443,  lon:121.8083},
  { iata:'ICN', name:'Incheon',           city:'Séoul',      country:'Corée du Sud',cc:'KR', eu:false, lat:37.4602,  lon:126.4407},
  { iata:'BKK', name:'Suvarnabhumi',      city:'Bangkok',    country:'Thaïlande',   cc:'TH', eu:false, lat:13.6900,  lon:100.7501},
  { iata:'KUL', name:'Kuala Lumpur',      city:'Kuala Lumpur',country:'Malaisie',   cc:'MY', eu:false, lat:2.7456,   lon:101.7099},
  { iata:'CGK', name:'Soekarno-Hatta',    city:'Jakarta',    country:'Indonésie',   cc:'ID', eu:false, lat:-6.1256,  lon:106.6559},
  // ── Océanie ──────────────────────────────────────────────────────────────
  { iata:'SYD', name:'Kingsford Smith',   city:'Sydney',     country:'Australie',   cc:'AU', eu:false, lat:-33.9399, lon:151.1753},
  { iata:'MEL', name:'Melbourne',         city:'Melbourne',  country:'Australie',   cc:'AU', eu:false, lat:-37.6690, lon:144.8410},
  { iata:'AKL', name:'Auckland',          city:'Auckland',   country:'Nouvelle-Zélande',cc:'NZ',eu:false,lat:-37.0082, lon:174.7850},
  // ── Russie ───────────────────────────────────────────────────────────────
  { iata:'SVO', name:'Sheremetyevo',      city:'Moscou',     country:'Russie',      cc:'RU', eu:false, lat:55.9726,  lon:37.4146},
  { iata:'LED', name:'Pulkovo',           city:'Saint-Pétersbourg',country:'Russie', cc:'RU', eu:false, lat:59.8003,  lon:30.2625},
];

// Index for fast lookup by IATA code
const AIRPORTS_MAP = {};
AIRPORTS.forEach(a => { AIRPORTS_MAP[a.iata] = a; });

// Search airports — returns up to 8 matches
function searchAirports(query) {
  if (!query || query.length < 2) return [];
  const q = query.toUpperCase().trim();
  const ql = query.toLowerCase().trim();
  const results = [];
  for (const a of AIRPORTS) {
    if (
      a.iata === q ||
      a.city.toLowerCase().startsWith(ql) ||
      a.name.toLowerCase().includes(ql) ||
      a.country.toLowerCase().startsWith(ql)
    ) {
      results.push(a);
      if (results.length >= 8) break;
    }
  }
  return results;
}

// Haversine great-circle distance in km
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
