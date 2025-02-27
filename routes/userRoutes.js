const express = require('express');
const Business = require("../models/Bussiness");
const router = express.Router();
const mongoose = require('mongoose');

// Get all businesses
router.get('/', async (req, res) => {
    const businesses = await Business.find();
    res.json(businesses);
});

// Create a business
router.post('/', async (req, res) => {
    try
    {
        let newBusiness =  {...req.body}; 
        const lastBusiness = await Business.findOne().sort({ sno: -1 }).select("sno");
        const lastSno = lastBusiness ? lastBusiness.sno : 0;
        newBusiness.sno = lastSno + 1;
        const businessInstance = new Business(newBusiness);
        await businessInstance.save();
        res.json(businessInstance);
    }
    catch(error)
    {
        res.json(error);
        console.log(error);
    }
});



// Create a business
router.post('/find', async (req, res) => {
    try
    {
        let _id = req.body;
        console.log(_id);
        const data = await Business.findOne({ _id:_id });
        
        if (!data) {
          return res.status(404).json({ error: "No business found" });
        }
        
        let businessData = data.toObject();
        businessData.registrationNumber = "";
        businessData.password = "";
        businessData.owner.aadhaarOrPAN = "";
        businessData.owner.idProofNumber = "";
        res.json(businessData);
        
    }
    catch(error)
    {
        res.json(error);
        console.log(error);
    }
});



// Update business status
router.post("/update", async (req, res) => {
    const { sno } = req.body;  // Only extract 'sno'
    
    if (!sno) {
        return res.status(400).json({ message: "SNO is required" });
    }

    console.log(sno);
    try {
        const business = await Business.findOne({ sno });
        const newStatus = business.status === "Active" ? "Inactive" : "Active";
        business.status = newStatus;
        const updatedBusiness = await business.save();
        const businesses = await Business.find();  

        res.status(200).json(businesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating business", error });
    }
});

module.exports = router;
