import dotenv from "dotenv";
import passport from "passport";
import pkg from "passport-google-token";
import { User } from "../models/user.model.js";

const GoogleTokenStrategy = pkg.Strategy;
dotenv.config();
console.log(process.env.GOOGLE_REDIRECT_URI);

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // fallback: maybe user was created via form signup
          user = await User.findOne({ email: profile.emails?.[0]?.value });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              email: profile.emails?.[0]?.value,
              name: profile.displayName,
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
