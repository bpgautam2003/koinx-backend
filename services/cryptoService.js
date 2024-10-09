const cron = require('node-cron');
const fetchAndStoreCryptoData = require('../controllers/cryptoController');

const scheduleCryptoDataFetch = () => {
  cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching cryptocurrency data...');
    await fetchAndStoreCryptoData();
  });
};

module.exports = scheduleCryptoDataFetch;
