require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')
const credentialsModel = require('../model/credentials');
const refreshTokenDb = require('../model/refreshTokens')

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
           
           const token = generateToken(user);
           const refreshToken = jwt.sign(user , process.env.REFRESH_TOKEN_SECRET )

            try{
            const RefreshToken = new refreshTokenDb({
            refreshToken: refreshToken
            })

            const resp = await RefreshToken.save();
            }
            catch(e){
                console.log(e);
            }

            
           res.status(200).json({accessToken:token , refreshToken:refreshToken });

        }
        else{
            res.status(401).send("BAD-Credentials")
        }
    
    }
    catch(e){
        return res.status(500).json({message: error.message})
    }
});

router.get('/token',async (req,res) =>{

});


const generateToken = (user) => {
    const token = jwt.sign( user , process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'} );
    return token;
}


module.exports = router;
