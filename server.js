const express = require('express');
const path = require('path');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;


//app.use(cors({ origin: "https://sprint-3-b8d8b6aqgzdnavez.uaenorth-01.azurewebsites.net/", methods: ["GET", "POST", "UPDATE"] }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Function to roll a dice
function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// API endpoint for rolling the dice
app.get('/roll', (req, res) => {
  const sides = parseInt(req.query.sides) || 6;
  const roll = rollDice(sides);
  res.json({ roll });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
