const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    tenantName: String,
    propertyType: String,
    monthlyRent: Number,
    electricityRate: Number,
    electricityUnits: Number,
    waterUsage: Number,
    totalAmount: Number,
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
