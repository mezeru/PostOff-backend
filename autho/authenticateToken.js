require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = req.body.token;
    const user = {
        name: req.body.name,
    }
    if(token === null){
        res.snedStatus(401);
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET ,(e,user) => {

        if( e ){
            res.json({msg:"Denied"});
        }
        else{
            
            req.user = user;
        
            next();
        }
        
        

    });

}
