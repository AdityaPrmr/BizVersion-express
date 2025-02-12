const express = require("express");
const Bussiness = require("../models/Bussiness");
const Departments = require("../models/Departments");
const Employee = require("../models/Employee");

const router = express.Router();


router.get("/",async(req,res)=>{
    try
    {
        const dep = await Departments.find();
        res.status(200).json(dep);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
});


router.post("/find",async(req,res)=>{
    try
    {
        const data = {...req.body};
        const d = await Departments.find({sno:data.sno});
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


router.post("/",async(req,res)=>{
    try
    {
        let d =  {...req.body};
        d.manager = null;
        const dd = new Departments(d);
        await dd.save();

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
        const name = await Departments.findOne({id:d.id});
        const e = await Employee.find({department:name.name});
        if(e.length === 0)
        {
            const dd = await Departments.findOneAndDelete({id:d.id});
            if(!dd)
            {
                res.status(404).json({message:"deatils not found"});
            }
            else
            {
                res.status(200).json({message:"Sucessfully deleted"});
            }
        }
        else
        {
            res.status(404).json({message:"delete employees first"});
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
});


module.exports = router;
