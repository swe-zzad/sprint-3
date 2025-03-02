app.use(express.static(path.join(__dirname, 'public')));
const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Restrict CORS (for CORS failure demonstration)
const allowedOrigins = ["https://dice-zzam-repo-a0gkgnfue3hdbjc6.uaenorth-01.azurewebsites.net"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked: Unauthorized Origin"));
    }
  }
}));

// ✅ Dice rolling logic
function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// ✅ Dice API with query parameters
app.get('/roll', (req, res) => {
  const sides = parseInt(req.query.sides);
  if (isNaN(sides) || sides < 2) {
    return res.status(400).json({ error: "Invalid dice sides!" });
  }

  const roll = rollDice(sides);
  res.json({ roll });
});

// ✅ Wake-up API (asynchronous call)
app.get('/wake-up', (req, res) => {
  res.json({ message: "Backend is awake!" });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🎲 Dice Roller API running at http://localhost:${PORT}`);
});
