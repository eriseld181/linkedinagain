const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy
const UserModel = require("./schema")


passport.use("google", new GoogleStrategy({
    clientID: "290275464460-tsn2bahpfqmp6parsbpn1regv2a19o7d.apps.googleusercontent.com",
    clientSecret: "E1MoDYImyIKM5bX8UmBLwG97",
    callbackURL: "http://localhost:4000/profiles/googleRedirect",

}, async (request, accessToken, refreshToken, profile, done) => {
    const newUser = {
        googleId: profile.id,
        name: profile.name.givenName,
        username: profile.emails[0].value,
        surname: profile.name.familyName,
        email: profile.emails[0].value,
        refreshTokens: [],
    }
    console.log(profile)
    try {
        const user = await UserModel.findOne({ googleId: profile.id })
        if (user) {
            done(null, user)
        } else {
            const createdUser = await UserModel.create(newUser)
            done(null, createdUser)
        }
    } catch (error) {
        console.log(error)
    }
}))
passport.serializeUser(function (user, done) {
    done(null, user)
})
passport.deserializeUser(function (user, done) {
    done(null, user)
})
