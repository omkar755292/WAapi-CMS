const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    agent_id: { type: String, required: true },
    agentName: { type: String, required: true },
    agentEmail: { type: String, required: true },
    agentPhoneNumber: { type: String, required: true },
    agentWhatsappNumber: { type: String, required: true },
    createdDate: { type: Date, required: true }
}, { timestamps: true });

const AgentData = mongoose.model('agent-data', schema);

module.exports = AgentData;
