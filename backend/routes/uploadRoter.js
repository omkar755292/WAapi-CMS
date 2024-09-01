const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

let sessionFiles = [];

const createDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.toLocaleString('default', { month: 'long' });
        const day = now.getDate();
        const uploadDir = path.join(
            __dirname,
            '../uploads',
            `${day}${month}${year}`
        );
        createDirectory(uploadDir);

        const timeDir = ('0' + now.getHours()).slice(-2) + '.' +
            ('0' + now.getMinutes()).slice(-2) + '.' +
            ('0' + now.getSeconds()).slice(-2);
        const fullUploadDir = path.join(uploadDir, timeDir);
        createDirectory(fullUploadDir);

        cb(null, fullUploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.array('files'), (req, res) => {

    try {
        const uploadedFiles = req.files.map(file => ({
            filename: file.originalname,
            filepath: file.path
        }));
        res.status(200).json({ message: 'Files uploaded successfully', files: uploadedFiles });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading files', error });
    }
});

router.get('/uploaded-files', (req, res) => {
    const uploadedFiles = sessionFiles.map(file => ({
        filename: file.name,
        filepath: file.path
    }));
    res.status(200).json({ files: uploadedFiles });
});

const uploadRouter = router;

module.exports = uploadRouter;
