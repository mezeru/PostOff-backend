const branchModel = require("./model/branch");

module.exports = async function(branchName){
    try{
        const branch = await branchModel.findOne({
            branchName:branchName
        });
        
        
    }
    catch(e){
        return e;
    }

}