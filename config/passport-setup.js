const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const oAuthConfig = require('./oauth-config');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    //Options for google strategy
    clientID: oAuthConfig.google.clientID,
    clientSecret: oAuthConfig.google.clientSecret,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    //Passport callback
    // console.log(`Passport callback function fired`);
    console.log(profile);

    //Check if user already exists in our db
    User.findOne({
        profileId: profile.id
    }).then((currentUser) => {
        if(currentUser) {
            //Already have the user
            console.log(`User already present: ${currentUser}`);
            done(null, currentUser);
        } else {
            //If not, create user in our db
            new User({
                username: profile.displayName,
                profileId: profile.id
            }).save().then((newUser) => {
                console.log(`New User Created: ${newUser}`);
                done(null, newUser);
            });
        }
    });
}));

passport.use(new FacebookStrategy({
    //Options for facebook strategy
    clientID: oAuthConfig.facebook.clientID,
    clientSecret: oAuthConfig.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect'
}, (accessToken, refreshToken, profile, done) => {
    //Passport callback
    //console.log(`Passport callback funnction fired`);
    console.log(profile);

    //Check if user already exists in our db
    User.findOne({
        profileId: profile.id
    }).then((currentUser) => {
        if(currentUser) {
            //Already have the user
            console.log(`User already present: ${currentUser}`);
            done(null, currentUser);
        } else {
            //If not, create user in our db
            new User({
                username: profile.displayName,
                profileId: profile.id
            }).save().then((newUser) => {
                console.log(`New User Created: ${newUser}`);
                done(null, newUser);
            });
        }
    });
}));