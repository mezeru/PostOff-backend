require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    const user = {
        name: req.body.name,
    }
    if(token === null){
        res.sendStatus(401);
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET ,(e,user) => {

        if(e){
            res.sendStatus(403);
        }
        req.user = user;
        
        next();

    });

}
