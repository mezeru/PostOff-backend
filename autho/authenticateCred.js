require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')
const credentialsModel = require('../model/credentials');

router.get('/login',async (req,res) => {
    let branch;

    try{
        branch = await credentialsModel.findOne({name: req.body.name});
        if(branch == null){
            return res.status(500).send("Not-Found");
        }
        
        if (await bcrypt.compare(req.body.password,branch.password)){
            const user = {
                name:req.body.name
            }
           const token  = jwt.sign( user , process.env.ACCESS_TOKEN_SECRET)
           res.status(200).json({token:token});

        }
        else{
            res.status(401).send("BAD-Credentials")
        }
    
    }
    catch(e){
        return res.status(500).json({message: error.message})
    }
});




module.exports = router;
