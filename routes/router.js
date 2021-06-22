const express = require('express');
const alertModel = require('../model/alert');
const branchModel = require('../model/branch')
const router = express.Router();

router.put('/',async (req,res) => {


    console.log(req.body);

    const pincode = req.body.pincode;
    const contact = req.body.contact;

    let atm = new Date();
    let date = atm.getDate()+'-'+(atm.getMonth()+1)+'-'+atm.getFullYear();
    let time = atm.getHours() + ":" + atm.getMinutes() + ":" + atm.getSeconds();
    let dateTime = date+' '+time;

    const alert = {
        contactinfo:contact,
        Time:dateTime
    };

    try{
        const resp = await branchModel.updateMany(
        { pincode: {$all:[pincode]} },
        { $push: { alerts : alert } }
        );

        if(resp.n === 0){
            res.sendStatus(404);
        }
        else{
            res.sendStatus(200);
        }

    }catch(e){
        res.sendStatus(400);
    }


  

});

module.exports = router;