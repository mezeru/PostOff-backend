require('dotenv').config();

const express = require('express');                                     // Express Js
const cors = require('cors');                                           // Cors (for Origin) 
const port = process.env.PORT || 3000;                                  // Defining PORT
const app = express();                                                  // Creating App
const db = require('./databaseConnect');                                 // Importing Database
const enterData = require('./enterData');                               // Function for enteringData
const data = require('./parser');                                       // Data Parsed
const authRouter = require('./autho/authenticateCred');                 // Login Routes
const authendicateToken = require('./autho/authenticateToken')
const enterCredentials = require('./enterCredentials');                 // Function for entering credentials
const customerRoute = require('./routes/router')
const passport = require('passport')
const passportStrat = require('./autho/passport-config');
const socketFunc = require('./socketFunc');
const branch = require('./model/branch');
const authenticateToken = require('./autho/authenticateToken');
const io = require('socket.io')(3001,{
    cors:({
        origin:"*"
    })
});


app.use(express.json());


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin*"); 
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.use(
    cors({
        origin:"*",                                                     // Origin ALl
    })
)

db();                                                                   // Connecting to Database

app.use(passport.initialize());

app.get('/',(req,res) =>{
    res.json({message:"Login"});
})

// enterData(data).catch(e => {                                         // Enter All the Data in MongoDB in the first run
//     console.log(e);
// });

// enterCredentials(data).catch(e => {                                  // Enter The Login Credentials in MongoDB in the first run
//     console.log(e);
// })



app.use('/users',authRouter);                                           // Login Authendication Routes

app.use('/customer',customerRoute);  

io.on('connection', socket => {

        socket.on('fetchData', async (name,token) =>{

            if(authendicateToken(token)){
            const alerts = await socketFunc(name);
            io.emit("sendAlerts",alerts);
            }
        });

    
});


app.listen(port,() => {
    console.log("Server Is Listening @ ",port);                         // Server Listening
})