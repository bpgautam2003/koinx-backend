const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    id: String,
    name: String,
    symbol: String, 
    price_usd: Number,
    market_cap_usd: Number,
    change_24h: Number,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Crypto', cryptoSchema);
