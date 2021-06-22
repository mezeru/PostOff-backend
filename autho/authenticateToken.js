require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = function(token){

    if(token === null){
        return null
    }


    try{
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            return true;
        
    }
    catch(e){
            return false;

    }
    

}
