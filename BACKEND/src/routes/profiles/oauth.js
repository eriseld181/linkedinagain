const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy
const UserModel = require("./schema")


passport.use("google", new GoogleStrategy({
    clientID: process.env.My_Google_Id,
    clientSecret: process.env.My_Google_Secret,
    callbackURL: "http://localhost:4000/profiles/googleRedirect",

}, async (request, accessToken, refreshToken, profile, done) => {
    const newUser = {
        googleId: profile.id,
        name: profile.name.givenName,
        surname: profile.name.familyName,
        email: profile.emails[0].value,
        refreshTokens: [],
    }
    try {
        const user = await UserModel.findOne({ googleId: profile.id })
        if (user) {
            done(null, user)
        } else {
            const createdUser = await UserModel.create(newUser)
            done(null, createdUser)
        }
    } catch (error) {

    }
}))
passport.serializeUser(function (user, done) {
    done(null, user)
})
passport.deserializeUser(function (user, done) {
    done(null, user)
})
