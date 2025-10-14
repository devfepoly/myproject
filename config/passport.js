import PassportGoogle from "passport-google-oauth20";
import passport from "passport";
import dotenv from 'dotenv';
import * as userService from "../services/CRUDService/UserService.js"
dotenv.config();

var GoogleStrategy = PassportGoogle.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://" + process.env.HOST_NAME + ":" + process.env.PORT + "/auth/login/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
                        
            if (!email) {
                return done(new Error("Không thể lấy email từ tài khoản Google."), null);
            }

            let user = await userService.getUserByEmail(email);

            if (user) {
                if (user.provider === 'local') {
                    user = await userService.updateUserById(user.id, { provider: 'google' });
                }

                return done(null, user);
            } else {
                const password_hash = await bcrypt.hash(profile.id + process.env.JWT_SECRET, 10);

                const newUser = {
                    name: profile.displayName,
                    email: email,
                    password_hash,
                    provider: 'google',
                };

                const createdUser = await userService.createUser(newUser);

                return done(null, createdUser);
            }
        } catch (error) {
            console.error("Lỗi trong quá trình xác thực Google:", error);
            return done(error, null);
        }
    }
));

export default passport;
