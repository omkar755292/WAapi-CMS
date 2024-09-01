const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    subscription_id: { type: String, required: true },
    user_id: { type: String, required: true },
    user_data: { type: Schema.Types.ObjectId, ref: 'user-data' },
    plans: [{
        plan_id: { type: String, required: true },
        plan_data: { type: Schema.Types.ObjectId, ref: 'plan-data', required: true },
        status: { type: String, enum: ['active', 'expired', 'inactive'], default: 'inactive', required: true },
        starting_date: { type: Date },
        ending_date: { type: Date },
        transaction_type: { type: String },
        transaction_Id: { type: String },
        createdDate: { type: Date, default: Date.now, required: true } // Default to current date/time
    }],
    login_email: { type: String },
    login_url: { type: String },
}, { timestamps: true });

const SubscriptionData = mongoose.model('subscription-data', schema);

module.exports = SubscriptionData;
