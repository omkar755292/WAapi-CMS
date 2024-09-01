const express = require('express');
const asyncHandler = require('express-async-handler');
const PaymentData = require('../models/PaymentData');
const AgentData = require('../models/AgentData');
const UserData = require('../models/UserData');
const PlansData = require('../models/Plans');
const uuid = require('uuid').v4;

const router = express.Router();

router.route('/create-new-payment').post(
    asyncHandler(async (req, res) => {
        const { amount, planId, userName, userEmail, offerCode, agentName, agentEmail, paymentDate, agentPrice } = req.body;
        if (!amount || !planId || !offerCode || !agentName || !agentEmail || !userName || !userEmail) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }

        console.log(req.body)
        try {
            const agent = await AgentData.findOne({ agentEmail });

            if (!agent) {
                console.log('Agent not found');
                return res.status(404).json({ message: 'Agent not found' });
            }

            const user = await UserData.findOne({ email: userEmail });

            if (!user) {
                console.log('User not found');
                return res.status(404).json({ message: 'User not found' });
            }

            const plan = await PlansData.findOne({ plan_id: planId });
            if (!plan) {
                return res.status(404).json({ message: 'Plan not found' });
            }

            const agent_id = agent.agent_id;
            const user_id = user.user_id;
            const payment_id = uuid();
            const createdDate = new Date();

            const newPayment = new PaymentData({
                payment_id,
                amount,
                plan_id: planId,
                plan_data: plan._id,
                offerCode,
                user_id,
                agent_id,
                paymentDate,
                agentPrice,
                status: 'complete',
                createdDate,
            });

            await newPayment.save();

            return res.status(201).json({ message: 'New payment created successfully' });
        } catch (error) {
            console.error('Error while creating payment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

router.route('/all-payment-data').post(
    asyncHandler(async (req, res) => {
        try {
            const payments = await PaymentData.find().populate('plan_data');
            return res.status(200).json(payments);
        } catch (error) {
            console.error('Error fetching payment data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

router.route('/one-payment-data').post(
    asyncHandler(async (req, res) => {
        const { paymentId } = req.body;
        if (!paymentId) {
            return res.status(400).json({ message: 'Payment Id not found' });
        }

        try {
            const payment = await PaymentData.findOne({ payment_id: paymentId }).populate('plan_data');
            if (!payment) {
                return res.status(404).json({ message: 'Data not found' });
            }

            return res.status(200).json(payment);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

const paymentRouter = router;
module.exports = paymentRouter;