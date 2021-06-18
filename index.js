require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
const db = require('./database');
const enterData = require('./enterData');
const data = require('./parser');
const auth = require('./auth/auth')

app.use(express.json());

app.use(
    cors({
        origin:"*",
    })
)

db();

app.get('/',(req,res) =>{
    console.log();
})

// enterData(data).catch(e => {
//     console.log(e);
// });

app.use('/users',auth);


app.listen(port,() => {
    console.log("Server Is Listening @ ",port);
})