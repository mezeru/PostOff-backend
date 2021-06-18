const credentials = require('./model/credentials');
const bcrypt = require('bcrypt');

module.exports = async function enter(dataList){
    for (let i = 0; i < dataList.length ; i++){

        const data = dataList[i];
        const hashPass = await bcrypt.hash(data.branchName,10);

        const credential = new credentials({
            name:data.branchName,
            password:hashPass
        });

        try{
            const resp = await credential.save();
            console.log(resp);
        }
        catch(e){
            console.log(e);
        }

    }
}


