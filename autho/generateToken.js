const jwt = require('jsonwebtoken');

module.exports = function(user){
    const token = jwt.sign( user , process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"} );
    return token;
}