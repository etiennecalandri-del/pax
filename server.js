const express = require('express');
const path    = require('path');
const fs      = require('fs');
const { v4: uuidv4 } = require('uuid');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── JSON file storage (no native deps) ──────────────────────────────────────
const DB_FILE = path.join(__dirname, 'data.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) return { simulations: [] };
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch { return { simulations: [] }; }
}

function writeDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── API Routes ───────────────────────────────────────────────────────────────

// POST /api/simulations — save anonymous simulation (no personal data)
app.post('/api/simulations', (req, res) => {
  try {
    const {
      airline, departureAirport, arrivalAirport, flightDate,
      incidentType, departureCountry, eligible, compensationAmount,
      distanceKm, successProbability
    } = req.body;

    if (!airline || !departureAirport || !arrivalAirport || !flightDate || !incidentType || !departureCountry) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    const db  = readDB();
    const sim = {
      id:                  uuidv4(),
      created_at:          new Date().toISOString(),
      airline:             String(airline).substring(0, 100),
      departure_airport:   String(departureAirport).substring(0, 10),
      arrival_airport:     String(arrivalAirport).substring(0, 10),
      flight_date:         String(flightDate).substring(0, 10),
      incident_type:       String(incidentType).substring(0, 30),
      departure_country:   String(departureCountry).substring(0, 5),
      eligible:            !!eligible,
      compensation_amount: Number(compensationAmount) || 0,
      distance_km:         Number(distanceKm) || 0,
      success_probability: Number(successProbability) || 0,
    };

    db.simulations.push(sim);
    writeDB(db);
    res.json({ success: true, id: sim.id });
  } catch (err) {
    console.error('Error saving simulation:', err);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
  }
});

// GET /api/admin/stats — aggregate statistics
app.get('/api/admin/stats', (req, res) => {
  try {
    const { simulations } = readDB();

    const total    = simulations.length;
    const eligible = simulations.filter(s => s.eligible).length;
    const amounts  = simulations.filter(s => s.eligible && s.compensation_amount > 0).map(s => s.compensation_amount);
    const avgAmount = amounts.length ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length) : 0;

    // Top 5 airlines
    const airlineCounts = {};
    simulations.forEach(s => { airlineCounts[s.airline] = (airlineCounts[s.airline] || 0) + 1; });
    const topAirlines = Object.entries(airlineCounts)
      .map(([airline, count]) => ({ airline, count }))
      .sort((a, b) => b.count - a.count).slice(0, 5);

    // By incident type
    const incidentCounts = {};
    simulations.forEach(s => { incidentCounts[s.incident_type] = (incidentCounts[s.incident_type] || 0) + 1; });
    const byIncident = Object.entries(incidentCounts)
      .map(([incident_type, count]) => ({ incident_type, count }));

    // By country
    const countryCounts = {};
    simulations.forEach(s => { countryCounts[s.departure_country] = (countryCounts[s.departure_country] || 0) + 1; });
    const byCountry = Object.entries(countryCounts)
      .map(([departure_country, count]) => ({ departure_country, count }))
      .sort((a, b) => b.count - a.count).slice(0, 10);

    // By day (last 30 days)
    const dayCounts = {};
    simulations.forEach(s => {
      const day = s.created_at.split('T')[0];
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const byDay = Object.entries(dayCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30);

    // Recent 20
    const recent = [...simulations]
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 20);

    res.json({
      total, eligible,
      eligibilityRate: total > 0 ? Math.round((eligible / total) * 100) : 0,
      avgAmount, topAirlines, byIncident, byCountry, byDay, recent
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

// Serve admin SPA — protégé par token via variable d'environnement
app.get('/admin', (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN;
  if (adminToken && req.query.token !== adminToken) {
    return res.status(401).send('Accès refusé. Ajoutez ?token=VOTRE_TOKEN à l\'URL.');
  }
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Même protection pour l'API stats
app.use('/api/admin', (req, res, next) => {
  const adminToken = process.env.ADMIN_TOKEN;
  if (adminToken && req.query.token !== adminToken) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  next();
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✈  FlightRight Simulator démarré !`);
  console.log(`   Simulateur  → http://localhost:${PORT}`);
  console.log(`   Admin       → http://localhost:${PORT}/admin\n`);
});
