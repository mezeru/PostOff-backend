const mongoose = require('mongoose');
const branch = new mongoose.Schema({
    
    insitutionName:{
        type: String,
        required:true
    },
    branchName:{
        unique:true,
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:false
    },
    contact:{
        type: [String],
        required:true
    },
    branchIncharge:{
        type: String,
        required:true
    },
    pincode:{
        type: [String],
        required:true
    }

});

module.exports = mongoose.model('branch',branch);