const passport = require('passport')
const GoogleStrategy = reuire("passport-google-oauth20").Strategy

passport.use("google", new GoogleStrategy({
    clientId: process.env.Google_Id,
    clientSecret: process.env.Google_Secret,
    callBackURL: " http://localhost:4000/users/google-redirect"
}))