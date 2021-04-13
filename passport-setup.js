const passport = require("passport");
const { userModel } = require("./dbrepo/index");

var GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser(function (user, done) {
  // done(null, user.id);
  done(null, user);
});

//
// passport.deserializeUser(function (id, done) {
passport.deserializeUser(function (user, done) {
  // User.findById(id, function (err, user) {
  done(null, user);
  //   });
});
//  GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "254667206131-4kbt2shjf3tkith644e7s5sqknp9absn.apps.googleusercontent.com",
      clientSecret: "-bfSK4mZs67PaJtg-308SeCk",
      // callbackURL: "http://localhost:5000/auth/google/callback",
      callbackURL: "https://food-mania.herokuapp.com/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // below function for database to create new user or find the existing user
      userModel.findOne(
        { email: profile.emails[0].value },
        function (err, user) {
          if (!user) {
            var newUser = new userModel({
              name: profile.name.givenName,
              email: profile.emails[0].value.toLowerCase(),
              password: "abc",
              role: "user",
            });
            newUser.save((err, saved) => {
              if (!err) {
                console.log(saved);
                done(err, saved);
              } else {
                done(err);
              }
            });
          } else {
            console.log("passport 31 profile", profile);
            done(null, user);
            // done(err);
          }
        }
      );
    }
  )
);

// FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: "2746198235692944",
      clientSecret: "7bf68c5a80cc7efa4463b270b96b65c3",
      callbackURL: "https://food-mania.herokuapp.com/auth/facebook/callback",
      profileFields: ["id", "displayName", "name", "emails"],
    },
    function (request, accessToken, refreshToken, profile, done) {
      // below function for database to create new user or find the existing user
      console.log("profile in passportjs ", profile);
      userModel.findOne(
        { email: profile.emails[0].value },
        function (err, user) {
          if (!user) {
            console.log("76", user);
            var newUser = new userModel({
              email: profile.emails[0].value.toLowerCase(),
              name: profile.displayName,
              password: "abc",
              role: "user",
            });
            newUser.save((err, saved) => {
              if (!err) {
                console.log(saved);
                done(err, saved);
              } else {
                done(err);
              }
            });
          } else {
            console.log("passport 31 profile", profile);
            done(null, user);
            // done(err);
          }
        }
      );
      // console.log("98 fb", profile);
      // return done(null, profile);
    }
  )
);
