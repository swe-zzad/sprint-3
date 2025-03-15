const express = require('express'); 
const path = require('path');
var bodyParser = require('body-parser')
const cors = require("cors");
var jsonParser = bodyParser.json()

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for frontend
app.use(cors({ origin: '*', method: ["GET", "POST" ,"UPDATE"]}));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'stc')));

app.post("/calculate-risk", jsonParser, function (req, res) {
  const { age, height, weight, bloodPressure, familyHistory } = req.body;
  
  let riskScore = 0;

  // Age-related risk adjustment
  if (age < 30) {
    riskScore += 0;
  } else if (age < 45) {
    riskScore += 10;
  } else if (age < 60) {
    riskScore += 20;
  } else {
    riskScore += 30;
  }

  // BMI calculation
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  // BMI-related risk adjustment
  if (bmi < 25) {
    riskScore += 0;
  } else if (bmi < 30) {
    riskScore += 30;
  } else {
    riskScore += 75;
  }

  // Blood pressure adjustment
  switch (bloodPressure) {
    case 'normal':
      riskScore += 0;
      break;
    case 'elevated':
      riskScore += 15;
      break;
    case 'stage1':
      riskScore += 30;
      break;
    case 'stage2':
      riskScore += 75;
      break;
    case 'crisis':
      riskScore += 100;
      break;
  }

  // Family history adjustment
  if (familyHistory.includes('diabetes')) riskScore += 10;
  if (familyHistory.includes('cancer')) riskScore += 10;
  if (familyHistory.includes('Alzheimer’s')) riskScore += 10;

  // Determine risk category based on score
  let riskCategory;
  if (riskScore <= 20) {
    riskCategory = 'Low Risk';
  } else if (riskScore <= 50) {
    riskCategory = 'Moderate Risk';
  } else if (riskScore <= 75) {
    riskCategory = 'High Risk';
  } else {
    riskCategory = 'Uninsurable';
  }

  res.json({ riskCategory });
});



// Serve index.html for direct access
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎲 Dice Roller API running at http://localhost:${PORT}`);
});
