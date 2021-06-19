require('dotenv').config();

const express = require('express');                                     // Express Js
const cors = require('cors');                                           // Cors (for Origin) 
const port = process.env.PORT || 3000;                                  // Defining PORT
const app = express();                                                  // Creating App
const db = require('./database');                                       // Importing Database
const enterData = require('./enterData');                               // Function for enteringData
const data = require('./parser');                                       // Data Parsed
const auth = require('./autho/authenticateCred');                                    // Authendicator Routes
const enterCredentials = require('./enterCredentials');                 // Function for entering credentials
const authToken = require('./autho/authenticateToken'); 

app.use(express.json());

app.use(
    cors({
        origin:"*",                                                     // Origin ALl
    })
)

db();                                                                   // Connecting to Database

app.get('/', authToken , (req,res) =>{
    res.json({res:"Allowed"});
})

// enterData(data).catch(e => {                                         // Enter All the Data in MongoDB
//     console.log(e);
// });

// enterCredentials(data).catch(e => {                                  // Enter The Login Credentials in MongoDB
//     console.log(e);
// })

app.use('/users',auth);                                                 // Login Authendication Routes


app.listen(port,() => {
    console.log("Server Is Listening @ ",port);                         // Server Listening
})