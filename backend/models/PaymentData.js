const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    payment_id: { type: String, required: true },
    amount: { type: String, required: true },
    plan_id: { type: String, required: true  },
    plan_data: { type: Schema.Types.ObjectId, ref: 'plan-data', required: true },
    offerCode: { type: String, required: true },
    user_id: { type: String, required: true },
    agent_id: { type: String, required: true },
    agentPrice: { type: String, required: true },
    paymentDate: { type: String, required: true },
    status: { type: String, required: true },
    createdDate: { type: Date, required: true }
}, { timestamps: true });

const PaymentData = mongoose.model('payment-data', schema);

module.exports = PaymentData;
