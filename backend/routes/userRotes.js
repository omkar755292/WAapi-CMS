const express = require('express');
const validateToken = require('../middleware/validateToken');
const asyncHandler = require('express-async-handler');
const UserData = require('../models/UserData');
const SubscriptionData = require('../models/SubscriptionData');
const PlansData = require('../models/Plans');
const uuid = require('uuid').v4;

const router = express.Router();

router.post('/reg-new-user', asyncHandler(async (req, res) => {
    const { name, email, whatsapp_number, phone_number } = req.body;

    if (!name || !email || !whatsapp_number || !phone_number) {
        return res.status(400).json({ message: 'All fields are mandatory' });
    }

    try {
        const existingUser = await UserData.findOne({ email, phone_number });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const user_id = uuid();
        const createdDate = new Date();

        const newUser = new UserData({
            user_id,
            name,
            email,
            whatsapp_number,
            phone_number,
            createdDate
        });

        await newUser.save();

        return res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error registering new user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));

router.post('/all-user-data', asyncHandler(async (req, res) => {
    try {
        const users = await UserData.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));

router.post('/one-user-data', asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'userId not found' });
    }

    try {
        const user = await UserData.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));

// Edit user route
router.post('/edit-user', asyncHandler(async (req, res) => {
    const { userId, name, email, whatsapp_number, phone_number } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    console.log(req.body);

    try {
        const user = await UserData.findOneAndUpdate(
            { user_id: userId },
            {
                name,
                email,
                whatsapp_number,
                phone_number
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));

// Delete user route
router.post('/delete-user', asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }
    console.log(req.body)

    try {
        const user = await UserData.findOneAndDelete({ user_id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));


router.post('/add-new-plan', asyncHandler(async (req, res) => {
    const { userId, planId} = req.body;

    if (!userId || !planId) {
        return res.status(400).json({ message: 'userId and planId are required' });
    }

    try {
        const user = await UserData.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const plan = await PlansData.findOne({ plan_id: planId });
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        const existingSubscription = await SubscriptionData.findOne({ user_id: userId });

        if (existingSubscription) {
            const planExists = existingSubscription.plans.some(existingPlan => existingPlan.plan_id === planId);
            if (planExists) {
                return res.status(400).json({ message: 'Plan already exists in the subscription' });
            }

            existingSubscription.plans.push({
                plan_id: planId,
                plan_data: plan._id,
                status: 'inactive',
                createdDate: new Date()
            });

            await existingSubscription.save();

            return res.status(201).json({ message: 'New Plan Added to Existing Subscription', updatedSubscription: existingSubscription });
        } else {
            const subscription_id = uuid();

            const newSubscription = new SubscriptionData({
                subscription_id,
                user_id: userId,
                user_data: user._id,
                plans: [{
                    plan_id: planId,
                    plan_data: plan._id,
                    status: 'inactive',
                    createdDate: new Date()
                }],
            });

            await newSubscription.save();

            return res.status(201).json({ message: 'New Subscription Created with Plan', newSubscription });
        }
    } catch (error) {
        console.error('Error adding new Plan:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));


router.post('/all-subscription-data', asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'userId not found' });
    }

    try {
        const subscription_data = await SubscriptionData.findOne({ user_id: userId })
        .populate('plans.plan_data')
        .populate('user_data');
        return res.status(200).json(subscription_data);
    } catch (error) {
        console.error('Error fetching subscription plan:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));

router.post('/activate-subscription', asyncHandler(async (req, res) => {
    const { userId, subscriptionId, planId } = req.body;

    console.log(req.body);

    if (!userId || !subscriptionId || !planId) {
        return res.status(400).json({ message: 'userId, subscriptionId, and planId are required' });
    }

    try {
        const user = await UserData.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the existing subscription by subscriptionId
        const subscription = await SubscriptionData.findOne({ subscription_id: subscriptionId });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }


        // Check if the plan exists in the subscription
        const plan = subscription.plans.find(p => p.plan_id === planId);
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found in the subscription' });
        }

        const createdDate = new Date();
        const endingDate = new Date(createdDate);
        endingDate.setFullYear(createdDate.getFullYear() + 1);

        // Update the plan status to 'active'
        const updatedSubscription = await SubscriptionData.findOneAndUpdate(
            { _id: subscription._id, 'plans.plan_id': planId },
            {
                $set: {
                    'plans.$.status': 'active',
                    'plans.$.starting_date': createdDate,
                    'plans.$.ending_date': endingDate,
                    'plans.$.createdDate': createdDate
                }
            },
            { new: true }
        );

        return res.status(200).json({ message: 'Subscription activated successfully', updatedSubscription });
    } catch (error) {
        console.error('Error activating subscription:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));

const userRouter = router;
module.exports = userRouter;