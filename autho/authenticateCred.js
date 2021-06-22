require('dotenv').config();
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const credentialsModel = require('../model/credentials');
const refreshTokenDb = require('../model/refreshTokens');
const generateToken = require('./generateToken');
const passport = require('passport');

router.post('/login', passport.authenticate('local') ,async (req,res) => {
    console.log(req.user);
    res.json({msg:"OK"})
    // let branch;

    // try{

    //     branch = await credentialsModel.findOne({name: req.body.name}).catch(e => {
    //     });
        
    //     if(branch == null){
    //         return res.send("Not-Found");
    //     }
        
    //     if (await bcrypt.compare(req.body.password,branch.password).catch(e => console.log(e))){
    //         const user = {
    //             name:req.body.name
    //         }
           
    //        const token = generateToken(user);
    //        const refreshToken = jwt.sign(user , process.env.REFRESH_TOKEN_SECRET )

    //         try{
    //         const RefreshToken = new refreshTokenDb({
    //         refreshToken: refreshToken
    //         })

    //         const resp = await RefreshToken.save();
    //         }
    //         catch(e){
    //             console.log(e);
    //         }

            
    //        res.status(200).json({accessToken:token , refreshToken:refreshToken });

    //     }
    //     else{
    //         res.status(401).send("BAD-Credentials")
    //     }
    
    // }
    // catch(e){
    //     return res.status(500).json({message: e.message})
    // }
});

router.post('/token', async (req,res,next) =>{

    const refreshToken = req.body.token;
    if(!refreshToken){
        res.sendStatus(401);
    }

    const tokenFromDb = await refreshTokenDb.findOne({refreshToken:refreshToken});

    if(tokenFromDb === null){
        res.json(403)
    }

    const resp = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(e,user) => {
        
        const accessToken = generateToken({name:req.body.name});

        next()

    });

    
    
});

router.delete('/logout',async (req,res) => {

    const token = req.body.token;
    const resp = await refreshTokenDb.deleteOne({refreshToken:token}).catch(e =>{
        res.sendStatus(500);
    });

    res.json({msg:resp});

});





module.exports = router;
