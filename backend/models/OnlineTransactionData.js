const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: { type: String, required: true },
    price: { type: String, required: true },
    issueDate: { type: Date, required: true },
    issueBy: { type: String, required: true },  // Assuming this field stores a name or ID of the issuer
    onlineTransactionId: { type: String, required: true },
}, { timestamps: true });

const OnlineTransactionData = mongoose.model('online-transaction-data', schema);

module.exports = OnlineTransactionData;
