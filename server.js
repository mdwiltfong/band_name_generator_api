const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = 8000;
const { sequelize, pool } = require("./configuration");
const app = express();
const bandRoute = require("./routes/bandRoute");
const { rockhall } = require("./controllers/rockhall");
const corsOptions = require("./cors-config");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { UserWrapper } = require("./models/modelFunctions/user");
app.use(
  session({
    secret: "secret-key",
    resave: false,
    cookie: {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      httpOnly: true,
    },
    saveUninitialized: false,
    store: new pgSession({
      pool: pool,
      tableName: "sessions",
    }),
    name: "test",
  })
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    // TODO: Create a DB wrapper to find users in this strategy
  })
);
app.use(cors(corsOptions));
/* app.use(passport.initialize());
app.use(passport.session()); */
app.use(express.json());

app.use("/band", bandRoute);
//app.use("/user");

app.get("/", (req, res) => {
  res.json("Welcome to the band generator app!");
});

app.get("/rockhall", rockhall);

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  /* return res.status(err.status || 500); */
  return res.status(400).send({ error: err.message });
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`server running in port ${PORT}`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
