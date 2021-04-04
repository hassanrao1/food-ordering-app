const passport = require("passport");
const { userModel } = require("./dbrepo/index");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

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

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "254667206131-4kbt2shjf3tkith644e7s5sqknp9absn.apps.googleusercontent.com",
      clientSecret: "-bfSK4mZs67PaJtg-308SeCk",
      callbackURL: "http://localhost:5000/auth/google/callback",
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
