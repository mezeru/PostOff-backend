var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const credentialsModel = require('../model/credentials');
const bcrypt = require('bcrypt');
const generateToken = require('./generateToken')

passport.serializeUser((user,done)=> done(null,user));
passport.deserializeUser((user,done)=> done(null,user));

module.exports = passport.use(new LocalStrategy({
  usernameField:'name',
  passwordField:'password'
},
  async (name,password,done) => {
    try{

      branch = await credentialsModel.findOne({name: name}).catch(e => {
      });

      if(branch == null){
        return done(null,false,{message:"User Not Found"});
    }
    else{
      
      if (await bcrypt.compare(password,branch.password).catch(e => console.log(e))){

        const user = {
          name:name
        }
        return done(null,user);

      }
      else{

        done(null,false,{message:"Wrong Credentials"})

      }

  }


    }catch(e){
      done(e);
    }
  }
));

