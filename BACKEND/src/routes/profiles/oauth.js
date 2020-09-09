const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy
const UserModel = require("./schema")
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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

    try {
        console.log(profile)
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
    callbackURL: "http://localhost:4000/profiles/linkedinRedirect",
    scope: ['r_emailaddress', 'r_liteprofile'],

}, async (request, accessToken, refreshToken, profile, done) => {
    const newUser = {
        linkedinId: profile.id,
        name: profile.givenName,
        username: profile.emails[0].value,
        surname: profile.familyName,
        email: profile.emails[0].value,
        refreshTokens: [],
    }
    try {
        console.log(profile)
        const user = await UserModel.findOne({ linkedinId: profile.id })
        console.log(user)
        if (user) {
            done(null, user)
        } else {
            const createdUser = new UserModel(newUser)
            await createdUser.save()
            const token = await authenticate(createdUser)

            done(null, { createdUser, token })
        }
    } catch (error) {
        console.log(error)
    }

}))
//Facebook oAuth
passport.use("facebook", new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:4000/profiles/facebookRedirect",
    profileFields: [
        'id',
        'email',
        'link',
        'locale',
        'name',
        'timezone',
        'updated_time',
        'verified',
        'gender',
        'displayName',
    ],
},
    async (request, accessToken, refreshToken, profile, done) => {
        // const newUser = {
        //     facebookId: profile.id,
        //     name: profile.name.givenName,
        //     surname: profile.name.familyName,
        //     email: profile.emails[0].value,
        //     username: profile.emails[0].value,
        //     //  bio: ' ',
        //     title: ' ',
        //     area: ' ',
        //     refreshTokens: [],
        //}
        try {
            console.log(profile)
            // const user = await UserModel.findOne({ facebookId: profile.id })
            // console.log(user)
            // if (user) {
            //     done(null, user)
            // } else {
            //     const createdUser = new UserModel(newUser)
            //     await createdUser.save()
            //     const token = await authenticate(createdUser)

            //     done(null, { createdUser, token })
            // }
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