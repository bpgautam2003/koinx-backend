const express = require('express');
const connectDB = require('./config/db');
const scheduleCryptoDataFetch = require('./services/cryptoService');
const { getCryptoStats } = require('./controllers/statsController'); 
const { getPriceDeviation } = require('./controllers/deviationController'); 
require('dotenv').config(); 

const app = express();

connectDB();

scheduleCryptoDataFetch();

app.get('/stats', getCryptoStats);
app.get('/deviation', getPriceDeviation);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
