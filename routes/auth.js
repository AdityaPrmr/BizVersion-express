const express = require("express");
const User = require("../models/User"); // Import User Model
const Employee = require("../models/Employee");
const Bussiness = require("../models/Bussiness");

const router = express.Router();

router.post("/login",async(req,res)=>{
    try
    {
        const {email,password} = req.body;
        console.log(email +" "+password);
        const user = await User.findOne({ email, password });
        if(!user)
        {
            const b = await Bussiness.findOne({businessEmail: email, password });
            if(!b)
            {
                const e = await Employee.findOne({email, password });
                if(!e)
                {
                    res.status(404).json({message:"User not found"});
                    console.log(e);
                }
                else
                {
                    res.status(200).json(e);
                }
            }
            else
            {
                res.status(200).json(b);
            }

        }
        else
        {
            res.status(200).json(user);
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
