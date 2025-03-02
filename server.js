const express = require('express'); 
const path = require('path');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Enable CORS for the frontend
const allowedOrigins = [
  "https://dice-zzam-repo-a0gkgnfue3hdbjc6.uaenorth-01.azurewebsites.net"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET"],
  allowedHeaders: ["Content-Type"]
}));

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Function to roll a dice
function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// ✅ API endpoint to roll dice with variable sides
app.get('/roll', (req, res) => {
  const sides = parseInt(req.query.sides); 

  if (!sides || isNaN(sides) || sides < 2) {
    return res.status(400).json({ error: "Invalid dice sides! Please use a number greater than 1." });
  }

  const roll = rollDice(sides);
  res.json({ roll });
});

// ✅ Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🎲 Dice Roller API running at http://localhost:${PORT}`);
});
