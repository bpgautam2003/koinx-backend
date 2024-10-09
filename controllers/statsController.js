const Crypto = require('../models/Crypto');
const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  const validCoins = ['bitcoin', 'ethereum', 'matic-network'];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin requested' });
  }

  try {
    const latestData = await Crypto.findOne({ id: coin }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    const response = {
      price: latestData.price_usd,
      marketCap: latestData.market_cap_usd,
      "24hChange": latestData.change_24h,
    };

    return res.json(response);
  } catch (error) {
    console.error('Error fetching cryptocurrency stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getCryptoStats };
