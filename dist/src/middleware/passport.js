"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = __importDefault(require("passport-google-oauth2"));
const user_model_1 = require("../schemas/user.model");
const passport_local_1 = __importDefault(require("passport-local"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
passport_1.default.use('local', new passport_local_1.default(async (username, password, done) => {
    const user = await user_model_1.UserModel.findOne({ userName: username });
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
passport_1.default.use(new passport_google_oauth2_1.default({
    clientID: "589556932902-bkilqhvvcesvmcv1ukhfmv8hq6dqe2c1.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile, 'profile');
        let existingUser = await user_model_1.UserModel.findOne({ 'google.id': profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        console.log('Creating new user...');
        const newUser = new user_model_1.UserModel({
            google: {
                id: profile.id,
            },
            userName: profile.emails[0].value,
            password: null,
        });
        await newUser.save();
        console.log(newUser, 'newUser');
        return done(null, newUser);
    }
    catch (error) {
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map