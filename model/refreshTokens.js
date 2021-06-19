const mongoose = require('mongoose');
const refreshTokenDb = new mongoose.Schema({
    refreshToken:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('refreshTokens',refreshTokenDb);