const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
require("dotenv").config();

// ---------------- LOCAL STRATEGY ----------------
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // by default LocalStrategy uses "username"
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "No account registered with this email" });
        }

        if (!user.password) {
          // User signed up with Google only
          return done(null, false, { message: "Please log in with Google" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ---------------- GOOGLE STRATEGY ----------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerid: profile.id });

        const email = profile.emails?.[0]?.value;

        // if no googleId match, but email exists -> link accounts
        if (!user && email) {
          user = await User.findOne({ email });
          if (user) {
            user.providerid = profile.id;
            user.name = user.name || profile.displayName;
            user.avatar = user.avatar || profile.photos?.[0]?.value;
            await user.save();
          }
        }

        // if still no user -> create new
        if (!user) {
          user = await User.create({
            providerid: profile.id,
            email,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ---------------- SESSION HANDLING ----------------
passport.serializeUser((user, done) => {
  done(null, user.id); // session will store user.id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password -__v");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
