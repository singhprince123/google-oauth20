const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      //options for the google satrt
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect"
    },
    (accesToken, refreshToken, profile, done) => {
      console.log("passport callback function");
      console.log(profile);
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          console.log(`existing user: ${currentUser}`);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.image.url
          })
            .save()
            .then(newUser => {
              console.log(`new user = ${newUser}`);
              done(null, newUser);
            });
        }
      });

      //passport callback function
    }
  )
);
