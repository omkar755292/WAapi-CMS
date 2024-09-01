const express = require('express');
const asyncHandler = require('express-async-handler');
const AgentData = require('../models/AgentData');
const validateToken = require('../middleware/validateToken');
const uuid = require('uuid').v4;

const router = express.Router();

router.use(validateToken);

router.route('/enrol-new-agent').post(
    asyncHandler(async (req, res) => {
        const { agentName, agentEmail, agentPhoneNumber, agentWhatsappNumber } = req.body;

        if (!agentName || !agentEmail || !agentPhoneNumber || !agentWhatsappNumber) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }

        try {
            const agent_id = uuid();
            const createdDate = new Date();

            const newAgent = new AgentData({
                agent_id,
                agentName, agentEmail, agentPhoneNumber, agentWhatsappNumber,
                createdDate
            });

            await newAgent.save();

            return res.status(201).json({ message: 'Agent added successfully' });
        } catch (error) {
            console.error('Error adding new Agent:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

router.route('/all-agent-data').post(
    asyncHandler(async (req, res) => {
        try {
            const agents = await AgentData.find();
            return res.status(200).json(agents);
        } catch (error) {
            console.error('Error fetching all data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

router.route('/one-agent-data').post(
    asyncHandler(async (req, res) => {
        const { agentId } = req.body;

        if (!agentId) {
            return res.status(400).json({ message: 'agentId not found' });
        }

        try {
            const agent = await AgentData.findOne({ agent_id: agentId });

            if (!agent) {
                return res.status(404).json({ message: 'Agent not found' });
            }

            return res.status(200).json(agent);
        } catch (error) {
            console.error('Error fetching agent data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

const agentRouter = router;
module.exports = agentRouter;