const mongoose = require('mongoose');
const alert = new mongoose.Schema({
    
    contactinfo: {
        type:Number,
        required:true,
    },

    Time:{
        type:String,
        required:true
    },
    Seen:{
        type:Boolean,
        default:false
    },
    pincode:{
        type:String
    }

});

module.exports = alert;