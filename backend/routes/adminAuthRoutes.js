const express = require('express');
const validateToken = require('../middleware/validateToken');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Admin = require('../models/Admin');

const router = express.Router();

// Public - Sign Up
router.route('/sign-up').post(
    asyncHandler(async (req, res) => {
        const { adminName, adminMail, adminPassword, adminRole } = req.body;

        if (!adminName || !adminMail || !adminPassword) {
            return res.status(400).json({ message: "All fields are mandatory" });
        }

        const userExist = await Admin.findOne({ adminMail });
        if (userExist) {
            return res.status(409).json({ message: "Admin already exists" });
        }

        const admin_id = uuidv4();
        const hashPassword = await bcrypt.hash(adminPassword, 10);
        const admin = new Admin({
            admin_id,
            adminName,
            adminMail,
            adminRole,
            adminPassword: hashPassword
        });

        await admin.save();
        res.status(201).json({ message: "Admin created successfully" });
    })
);

// Public - Login
router.route('/login').post(
    asyncHandler(async (req, res) => {
        const { adminMail, adminPassword } = req.body;

        if (!adminMail || !adminPassword) {
            return res.status(400).json({ status: 0, message: "All fields are mandatory" });
        }

        const admin = await Admin.findOne({ adminMail });
        if (!admin) {
            return res.status(404).json({ status: 0, message: "Admin does not exist" });
        }

        const passwordMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
        if (passwordMatch) {
            const accessToken = jwt.sign(
                {
                    user: {
                        adminName: admin.adminName,
                        adminMail: admin.adminMail,
                        admin_id: admin.admin_id,
                        adminRole: admin.adminRole
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "150m" }
            );

            res.status(200).json({
                status: 1,
                message: "Login successful",
                accessToken,
                adminName: admin.adminName,
                adminMail: admin.adminMail,
                admin_id: admin.admin_id
            });
        } else {
            res.status(401).json({ status: 0, message: "Invalid password or email" });
        }
    })
);

// Private - Current Admin
router.route('/current-admin').get(
    validateToken,
    asyncHandler(async (req, res) => {
        res.status(200).json(req.user);
    })
);

const adminAuthRouter = router;

module.exports = adminAuthRouter;