const mongoose = require('mongoose');
const alert = require('./alert')

const admin = new mongoose.Schema({
    pincode:{
        type:String
    },

    alert:{
        type:alert
    },
    noFound:{
        type:Boolean
    }

})

module.exports = mongoose.model("admin",admin);