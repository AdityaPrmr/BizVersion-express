const express = require("express");
const Task = require("../models/Task");

const router = express.Router();


router.post("/",async(req,res)=>{
    try
    {
        const d = {...req.body};
        const t = await Task.find(d);
        res.status(200).json(t);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
});



router.post("/update",async(req,res)=>{
    try
    {
        const data = {...req.body};
        const t = await Task.findByIdAndUpdate(data._id,data,{ new: true });
        res.status(200).json(t);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});


router.post("/find",async(req,res)=>{
    try
    {
        const data = {...req.body};
        const d = await Task.find({id:data.id});
        if(!d)
        {
            res.status(404).json({message:"Task not found"});
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


router.post("/create",async(req,res)=>{
    try
    {
        let d =  {...req.body};
        const last = await Task.findOne().sort({ id: -1 }).select("id");
        const lastID = last ? last.id : 0;
        d.id = lastID + 1;
        d.doc = new Date();
        const dd = new Task(d);
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
        const dd = await Task.findAndDelete({id:d.id});
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


module.exports = router;
