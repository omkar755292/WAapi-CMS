const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp_number: { type: String },
    phone_number: { type: String, required: true },
    user_id: { type: String, required: true },
    createdDate: { type: Date, required: true }
}, { timestamps: true });

const UserData = mongoose.model('user-data', schema);

module.exports = UserData;
