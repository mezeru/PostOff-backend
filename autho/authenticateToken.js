require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = function(res,req,next){
    console.log(req.header);
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    const user = {
        name: "Hello"
    }
    if(token === null){
        res.status(401);
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET ,(e,user) => {

        if(e){
            res.status(403);
        }
        req.user = user;
        
        next();

    });

}