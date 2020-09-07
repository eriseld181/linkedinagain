const passport = require('passport')
const GoogleStrategy = reuire("passport-google-oauth20").Strategy

passport.use("google", new GoogleStrategy({
    clientId: process.env.Google_Id
}))