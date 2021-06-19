require('dotenv').config();

const express = require('express');                                     // Express Js
const cors = require('cors');                                           // Cors (for Origin) 
const port = process.env.PORT || 3000;                                  // Defining PORT
const app = express();                                                  // Creating App
const db = require('./database');                                       // Importing Database
const enterData = require('./enterData');                               // Function for enteringData
const data = require('./parser');                                       // Data Parsed
const authRouter = require('./autho/authenticateCred');            // Login Routes
const authendicateToken = require('./autho/authenticateToken')
const enterCredentials = require('./enterCredentials');                 // Function for entering credentials

app.use(express.json());

app.use(
    cors({
        origin:"*",                                                     // Origin ALl
    })
)

db();                                                                   // Connecting to Database

app.get('/', authendicateToken , (req,res) =>{
    res.sendStatus(200);
})

// enterData(data).catch(e => {                                         // Enter All the Data in MongoDB
//     console.log(e);
// });

// enterCredentials(data).catch(e => {                                  // Enter The Login Credentials in MongoDB
//     console.log(e);
// })

app.use('/users',authRouter);                                                 // Login Authendication Routes


app.listen(port,() => {
    console.log("Server Is Listening @ ",port);                         // Server Listening
})