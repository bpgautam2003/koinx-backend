const Crypto = require('../models/Crypto');
const { std } = require('mathjs'); 
const getPriceDeviation = async (req, res) => {
  const { coin } = req.query;

  const validCoins = ['bitcoin', 'ethereum', 'matic-network'];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin requested' });
  }

  try {
    const records = await Crypto.find({ id: coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    const prices = records.map(record => record.price_usd);

    const deviation = std(prices);

    return res.json({ deviation: parseFloat(deviation.toFixed(2)) }); 
  } catch (error) {
    console.error('Error fetching cryptocurrency price deviation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getPriceDeviation };
