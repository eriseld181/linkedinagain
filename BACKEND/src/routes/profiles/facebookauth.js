const passport = require('passport')
const UserModel = require("./schema")

passport.use("facebook", new FacebookStrategy({
    clientID: "1694586257357906",
    clientSecret: "685019242cc2fa23138a27815acbdd46",
    callbackURL: "http://localhost:4000/auth/facebook/login"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.serializeUser(function (user, cd) {
    cd(null, user)
})
passport.deserializeUser(function (user, cd) {
    cd(null, user)
})
