const mongoose = require('mongoose');
const branchAuth = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('branch',branch);