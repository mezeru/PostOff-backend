const branch = require('./model/branch');

module.exports = async function enter(dataList){
    for(let i = 0 ; i < dataList.length ; i++){

        const data = dataList[i];

        try{

            if(typeof(data.contact) === "string"){
                data.contact = data.contact.split(", ");
            }
            else{
                data.contact = data.contact.toString();
            }

            if(typeof(data.pincode) === "string"){
                data.pincode = data.pincode.split(", ");
            }
            else{
                data.pincode = data.pincode.toString();
            }

            const Branch = new branch({
                insitutionName:data.insitutionName,
                branchName:data.branchName,
                address:data.address,
                contact:data.contact,
                city:data.city,
                branchIncharge:data.branchIncharge,
                pincode:data.pincode
            });

            const resp = await Branch.save();
        }
        catch(e){
            console.log(e);
        }
    }
}

