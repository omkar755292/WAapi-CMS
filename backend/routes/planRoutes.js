const express = require('express');
const asyncHandler = require('express-async-handler');
const PlansData = require('../models/Plans');
const uuid = require('uuid').v4;

const router = express.Router();

router.route('/add-new-plan').post(
    asyncHandler(async (req, res) => {
        const { planName, monthlyPrice, yearlyPrice, planDetails, monthlyDiscount, yearlyDiscount, keywords } = req.body;

        if (!planName || !planDetails || !yearlyPrice || !monthlyPrice) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }

        console.log(req.body)

        try {
            const plan_id = uuid();
            const createdDate = new Date();

            const newPlan = new PlansData({
                plan_id,
                planName,
                planDetails,
                monthlyPrice,
                yearlyPrice,
                monthlyDiscount,
                yearlyDiscount,
                keywords,
                createdDate
            });

            await newPlan.save();

            return res.status(201).json({ message: 'Plan added successfully' });
        } catch (error) {
            console.error('Error adding new plan:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

router.route('/all-plan-data').post(
    asyncHandler(async (req, res) => {
        try {
            const plans = await PlansData.find();
            return res.status(200).json(plans);
        } catch (error) {
            console.error('Error fetching all plans:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

router.route('/one-plan-data').post(
    asyncHandler(async (req, res) => {
        const { planId } = req.body;

        if (!planId) {
            return res.status(400).json({ message: 'planId not found' });
        }

        try {
            const plan = await PlansData.findOne({ plan_id: planId });

            if (!plan) {
                return res.status(404).json({ message: 'Plan not found' });
            }

            return res.status(200).json(plan);
        } catch (error) {
            console.error('Error fetching plan data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    })
);

// Edit plan route
router.post('/edit-plan', asyncHandler(async (req, res) => {
    const { planId, planName, planDetails, monthlyPrice, yearlyPrice, monthlyDiscount, yearlyDiscount, keywords } = req.body;

    if (!planId) {
        return res.status(400).json({ message: 'planId is required' });
    }

    console.log(req.body);

    try {
        const plan = await PlansData.findOneAndUpdate(
            { plan_id: planId },
            {
                planName,
                planDetails,
                monthlyPrice,
                yearlyPrice,
                monthlyDiscount,
                yearlyDiscount,
                keywords
            },
            { new: true }
        );

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        return res.status(200).json({ message: 'Plan updated successfully', plan });
    } catch (error) {
        console.error('Error updating plan:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));

// Delete Plan route
router.post('/delete-plan', asyncHandler(async (req, res) => {
    const { planId } = req.body;

    if (!planId) {
        return res.status(400).json({ message: 'planId is required' });
    }
    console.log(req.body)

    try {
        const plan = await PlansData.findOneAndDelete( { plan_id: planId });

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        return res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));


const planRouter = router;
module.exports = planRouter;