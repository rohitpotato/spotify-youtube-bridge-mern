const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../models/user');
const keys = require('./keys');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  }); 


  passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
        done(null, user)
      }).catch((e) => {
          console.log(e);
      });
  });


    passport.use(
    new SpotifyStrategy(
      {
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: keys.callbackURL
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
           User.findOne({ spotifyId: profile.id }).then((user) => {
            if(user) {
              user.accessToken = accessToken;
              user.expiresIn = expires_in;

              user.save().then((res) => {
                  console.log('done');
              }).catch((e) => {
                console.log(e);
              })
              return done(null, user);

            } else {

              const newUser = new User({
                spotifyId: profile.id,
                email: profile._json.email,
                name: profile.display_name,
                accessToken: accessToken,
                expiresIn: expires_in
              });

              newUser.save().then((user) => {
                console.log(user);
              }); 

            }
          }).catch((e) => {
            console.log(e);
          });
      }
    )
  );
}