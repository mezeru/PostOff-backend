const branchModel = require("./model/branch");
const adminModel = require('./model/admin');

module.exports = async function(branchName){
    
    if(branchName !== "admin")
    {
        try{
            const branch = await branchModel.findOne({
                branchName:branchName
            });
        
            return branch.alerts.reverse();        
        }
        catch(e){
            return e;
        }
    }
    else{
        const alerts = await adminModel.find();
        return alerts.alerts;
    }

}