const express = require("express");
const Bussiness = require("../models/Bussiness");
const Departments = require("../models/Departments");
const Employee = require("../models/Employee");

const router = express.Router();

router.post("/find",async(req,res)=>{
    try
    {
        const data = {...req.body};
        let d = {};
        if(data.department)
        {
            d = await Employee.find({sno: data.sno , department: data.department});
        }
        else
        {
            d = await Employee.find({sno: data.sno});
        }
        if(!d)
        {
            res.status(404).json({message:"User not found"});
        }
        else
        {
            res.status(200).json(d);
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
});



const mongoose = require("mongoose");

router.post("/one", async (req, res) => {
    try {
        let { _id } = req.body;

        // Ensure _id is a valid ObjectId
        if (!_id || typeof _id !== "string") {
            return res.status(400).json({ error: "Invalid Employee ID format" });
        }

        _id = _id.replace(/"/g, ""); // Remove extra quotes

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: "Invalid Employee ID" });
        }

        const data = await Employee.findOne({ _id });

        if (!data) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




router.post("/",async(req,res)=>{
    try
    {
        let d =  {...req.body};
        const last = await Employee.findOne().sort({ id: -1 }).select("id");
        d.id = last ? last.id + 1 : 1;
        const e = new Employee(d);
        await e.save();

        if(!d)
        {
            res.status(404).json({message:"deatils not found"});
        }
        else
        {
            res.status(200).json({message:"deatils saved"});
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
});


router.post("/delete",async(req,res)=>{
    try
    {
        let d =  {...req.body};
        const dd = await Employee.findOneAndDelete({id:d.id});
        if(!dd)
        {
            res.status(404).json({message:"deatils not found"});
        }
        else
        {
            res.status(200).json({message:"Sucessfully deleted"});
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
});

router.post("/update", async (req, res) => {
    try {
        let info = { ...req.body };

        // Find the current manager
        const currentManager = await Employee.findOne({
            sno: info.sno,
            department: info.department,
            manager: true
        });

        if (currentManager) {
            currentManager.manager = false;
            await currentManager.save();
        }

        // Find the new manager
        const newManager = await Employee.findOne({
            sno: info.sno,
            department: info.department,
            id: info.id
        });

        if (!newManager) {
            return res.status(404).json({ message: "Details not found" });
        }

        newManager.manager = true;
        await newManager.save();

        res.status(200).json({ message: "Successfully updated" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
