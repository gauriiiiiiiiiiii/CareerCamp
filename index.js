const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const path = require("path");
const fs = require("fs");
// Remove dotenv, now using env_config.json
// require("dotenv").config();

const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const sassMiddleware = require("sass-middleware");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const flash = require("connect-flash");

const env = require("./config/environment");
const db = require("./config/mongoose");
const route = require("./routes/index");
const customMiddleware = require("./config/middleware");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

// Middleware - CORS
app.use(cors());

// Middleware - SASS (only in development)
// (Optional: add if you want to support SCSS in dev)

// Middleware - Encoders
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Static Files (fix path issue)
app.use(express.static(path.join(__dirname, env.asset_path || "public/assets")));
app.use("/storage", express.static(path.join(__dirname, "storage")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// View Engine
app.use(expressLayouts);
app.use(logger("dev"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Ensure assetPath is available in EJS views
const viewHelpers = require("./config/view-helpers")(app);

// Session Setup with MongoStore (fix crash)
app.use(
  session({
    name: "career_camp",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // 100 minutes
    },
    store: MongoStore.create({
      mongoUrl: env.db,
      autoRemove: "disabled",
    }),
  })
);

// PassportJS
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Flash Messages
app.use(flash());
app.use(customMiddleware.setFlash);
app.use(customMiddleware.createFolders);

// Routes
app.use("/", route);

// Server
app.listen(port, (err) => {
  if (err) return console.log("Error:", err);
  console.log(`🚀 Server is running successfully on port ${port}`);
});
