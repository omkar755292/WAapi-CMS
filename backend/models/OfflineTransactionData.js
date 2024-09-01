const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: { type: String, required: true },
    createdDate: { type: Date, required: true },
    price: { type: String, required: true },
    refId: { type: String, required: true },
    offlineTransactionId: { type: String, required: true },
}, { timestamps: true });

const OfflineTransactionData = mongoose.model('offline-transaction-data', schema);

module.exports = OfflineTransactionData;
