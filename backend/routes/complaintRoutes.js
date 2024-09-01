const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const ComplaintData = require('../models/ComplaintData');

router.post('/add-new-complaint', asyncHandler(async (req, res) => {
    const { complaintData, filesData } = req.body;

    if (!complaintData) {
        return res.status(400).json({ message: 'Complaint data is required' });
    }

    const complaint_id = uuidv4();
    const createdDate = new Date();

    try {
        const newComplaint = new ComplaintData({
            complaint_id,
            files: filesData,
            complaintData,
            createdDate
        });

        await newComplaint.save();

        res.status(201).json({ message: 'Complaint added successfully' });
    } catch (error) {
        console.error('Error adding complaint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));

router.post('/all-complaint-data', asyncHandler(async (req, res) => {
    try {
        const complaint = await ComplaintData.find();
        return res.status(200).json(complaint);
    } catch (error) {
        console.error('Error fetching all users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));

const complaintRouter = router;
module.exports = complaintRouter;
