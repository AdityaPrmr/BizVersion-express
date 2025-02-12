const express = require("express");
const File = require("../models/TaskUpload");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure the 'uploads' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Initialize multer
const upload = multer({ storage });

const router = express.Router();



router.post("/upload", upload.single("file"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const { taskID, sno, byID } = req.body;
        const filename = req.file.originalname.split(".")[0];
        const timestamp = new Date().toLocaleDateString().replace(/[\/:.]/g, "-");
        const newFilename = `${byID}_${filename}_${timestamp}${path.extname(req.file.originalname)}`;
        const newDir = path.join(__dirname, "../uploads"); 
        const newPath = path.join(newDir, newFilename);


        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
        }

        const oldPath = req.file.path;

        console.log(`Moving file from: ${oldPath} to ${newPath}`);

        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
        } else {
            throw new Error(`Source file not found: ${oldPath}`);
        }

        const fileURL = `${req.protocol}://${req.get("host")}/uploads/${newFilename}`;

        const fileEntry = new File({
            taskID,
            sno,
            byID,
            filename: newFilename,
            path: "/uploads/"+newFilename,
            mimetype: req.file.mimetype,
            size: req.file.size,
            url: fileURL,
        });

        await fileEntry.save();
        res.status(201).json({ message: "File uploaded successfully", file: fileEntry });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }

});


router.get("/uploads/:filename", (req, res) => {
    const allowedExtensions = [".pdf", ".jpg", ".png"];
    const filePath = path.join(__dirname, "../uploads", req.params.filename);
    const ext = path.extname(filePath);

    if (!allowedExtensions.includes(ext)) {
        return res.status(403).json({ error: "Access denied to this file type" });
    }

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: "File not found" });
        }
    });
});


router.post("/files", async (req, res) => {
    try {
        const data = {...req.body};
        console.log(data);
        if (!data.taskID) return res.status(400).json({ error: "taskID is required" });

        const files = await File.find({ taskID:data.taskID });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch files" });
    }
});

module.exports = router;
