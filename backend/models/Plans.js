const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    plan_id: { type: String, required: true },
    planName: { type: String, required: true },
    planDetails: { type: String },
    monthlyPrice: { type: String, required: true },
    yearlyPrice: { type: String, required: true },
    monthlyDiscount: { type: String, required: true },
    yearlyDiscount: { type: String, required: true },
    keywords: { type: String },
    status: { type: String, enum: ['active', 'expired', 'deactive'], default: 'active' },
    createdDate: { type: Date }
});

const PlansData = mongoose.model('plan-data', schema);

module.exports = PlansData;
