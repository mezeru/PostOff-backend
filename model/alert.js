const mongoose = require('mongoose');
const alert = new mongoose.Schema({
    
    contactinfo: {
        type:Number,
        required:True,
    },

    Time:{
        type:Date,
        default:Date.now
    }

});

module.exports = alert;