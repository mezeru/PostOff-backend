var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const credentialsModel = require('../model/credentials');
const bcrypt = require('bcrypt');

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

        done(null,false,)

      }

  }

    const token = generateToken(user);
    const refreshToken = jwt.sign(user , process.env.REFRESH_TOKEN_SECRET )

    try{
       const RefreshToken = new refreshTokenDb({
       refreshToken: refreshToken
       })

      const resp = await RefreshToken.save();
      }
      catch(e){
        console.log(e);
      }

    }catch(e){
      done(e);
    }
  }
));

