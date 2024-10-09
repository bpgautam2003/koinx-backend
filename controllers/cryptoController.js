const axios = require('axios');
const Crypto = require('../models/Crypto');

const fetchAndStoreCryptoData = async () => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,matic-network',
    };

    try {
        const response = await axios.get(url, { params });
        const data = response.data;

        for (const coin of data) {
            const cryptoData = new Crypto({
                id:coin.id,
                name: coin.name,
                symbol: coin.symbol, 
                price_usd: coin.current_price,
                market_cap_usd: coin.market_cap,
                change_24h: coin.price_change_percentage_24h,
                timestamp: new Date(), 
            });

            await cryptoData.save(); 
        }

        console.log(`Data successfully stored at ${new Date().toLocaleString()}`);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
};

module.exports = fetchAndStoreCryptoData;
