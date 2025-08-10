// models/Receipt.js
const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    tenantName: String,
    propertyType: String,
    monthlyRent: Number,
    electricityRate: Number,
    electricityUnits: Number,
    waterUsage: Number,
    totalAmount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
