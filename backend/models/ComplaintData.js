const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    complaint_id: { type: String, required: true },
    complaintData: { type: String, required: true },
    status: { type: String, enum: ['active', 'closed'], default: 'active', required: true },
    createdDate: { type: Date, required: true },
    files: [{ 
        filename: { type: String, required: true },
        filepath: { type: String, required: true }
    }]
}, { timestamps: true });

const ComplaintData = mongoose.model('complaint-data', schema);

module.exports = ComplaintData;
