const express = require('express');
const alertModel = require('../model/alert');
const branchModel = require('../model/branch')
const router = express.Router();
const adminModel = require('../model/admin');

router.put('/',async (req,res) => {

    const pincode = req.body.pincode;
    const contact = req.body.contact;

    let atm = new Date();
    let date = atm.getDate()+'-'+(atm.getMonth()+1)+'-'+atm.getFullYear();
    let time = atm.getHours() + ":" + atm.getMinutes() + ":" + atm.getSeconds();
    let dateTime = date+' '+time;

    let alert = {
        contactinfo:contact,
        Time:dateTime
    };

    try{
        const resp = await branchModel.updateMany(
        { pincode: {$all:[pincode]} },
        { $push: { alerts : alert } }
        );

        const branches =  await branchModel.find(
           {pincode:{$all:[pincode]}}
        )

        if(resp.n === 0){
            alert = {
                contactinfo:contact,
                pincode:pincode
            };

            const admin = new adminModel({
                pincode:pincode,
                alert:alert,
                noFound:false
            });

            await admin.save();

            res.sendStatus(404);

        }
        else{
            res.json({branches:branches});
        }

    }catch(e){
        res.sendStatus(400);
    }


    try{
        
    if(resp !== 0){
        alert = {
            contactinfo:contact,
            Time:dateTime,
            pincode:pincode
        };

    }

        const admin = new adminModel({
            pincode:pincode,
            alert:alert,
            noFound:false
        });


        await admin.save();

    }
    catch(e){

    }


});

module.exports = router;