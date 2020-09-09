const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy
const UserModel = require("./schema")
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const { authenticate } = require("./authTools")
//google oAuth
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
            const tokens = await authenticate(user)
            done(null, tokens)
        } else {
            createdUser = await UserModel.create(newUser)
            const tokens = await authenticate(createdUser)
            done(null, { user, tokens })
        }
    } catch (error) {
        console.log(error)
    }
}))
//Linkedin oAuth
passport.use("linkedin", new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "http://localhost:4000/auth/linkedinRediret",
    scope: ['r_emailaddress', 'r_liteprofile'],

}, async function (profile, done) {



    const User = {
        linkedinId: profile.id,
        name: profile.name.givenName,
        surname: profile.name.familyName,
        //  bio: ' ',
        // title: ' ',
        // area: ' ',
        //  image: profile.photos[3].value,
        email: profile.emails[0].value,
        username: profile.emails[0].value,
    };

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
module.exports = passport;