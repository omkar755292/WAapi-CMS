const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    admin_id: { type: String, required: true },
    adminName: { type: String, required: true },
    adminRole: { type: String, enum: ['admin', 'super-admin'], default: 'admin', required: true },
    adminMail: { type: String, required: true, trim: true },
    adminPassword: { type: String, required: true, trim: true }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
