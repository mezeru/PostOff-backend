require('dotenv').config();
module.exports = function(){
    const mongoose = require('mongoose');
mongoose.connect(env.process.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error',(error) => {
    console.log(error); 
 });
 
db.once('open',() => {
     console.log("Connected to Database");
 });
}


