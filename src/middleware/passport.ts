import passport from "passport";
import GoogleStrategy from "passport-google-oauth2"
import { UserModel } from "../schemas/user.model";
import LocalStrategy from 'passport-local';


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await UserModel.findOne({ userName: username})
    if (!user) {
        return done(null, false);
    }
    else {
        if (user.password === password) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
}));
passport.use(new GoogleStrategy({
    clientID: "589556932902-bkilqhvvcesvmcv1ukhfmv8hq6dqe2c1.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
    try{
        console.log(profile, 'profile')
        let existingUser = await UserModel.findOne({ 'google.id': profile.id});

        if(existingUser) {
            return done(null, existingUser)
        }
        console.log('Creating new user...')
        const newUser = new UserModel({
            google: {
                id: profile.id,
            },
            userName: profile.emails[0].value,
            password: null,
        });
        await newUser.save();
        console.log(newUser, 'newUser')
        return done(null, newUser)
    }catch (error) {

    }
    }))
export default passport;