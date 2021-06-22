const mongoose = require('mongoose');
const alert = new mongoose.Schema({
    
    contactinfo: {
        type:Number,
        required:true,
    },

    Time:{
        type:String,
        required:true
    }

});

module.exports = alert;