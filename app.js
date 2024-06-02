const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

const { ensureAuthenticated } = require("./passport");

const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());

const user = {
  name: "Arun Samuel",
  email: "arun@expensetracking.com",
  password: "987",
};
const users = [user];

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (userName, password, done) => {
      const matchedUser = users.find(
        (d) => d.email == userName && d.password == password
      );
      console.log({ matchedUser });
      if (matchedUser) {
        done(null, matchedUser);
      } else {
        done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Configure session management
app.use(
  session({
    secret: "your secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/health", (req, res) => res.status(200).json({ we: "are ok" }));

app.get("/",ensureAuthenticated, function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1;

  // Write response
  res.json({ views: req.session.views, "res.session": req.session });
});

app.get("/login",function (req, res, next) {
  res.send('<h2>Welcome to expense tracker.</h2><h4>Cookin Something Cool</h2>');
});

app.get("/isLoggedin", ensureAuthenticated, function (req, res, next) {
  res.json({ status: true, message: "You're loggedIn" });
});

app.post("/login", function (req, res, next) {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    console.log({ err, user, info });
    if (!user) {
      res.json({
        status: false,
        ...(info ? info : { message: "Invalid credentials" }),
      });
    } else {
      req.login(user, (err) => {
        if (err)
          res.json({
            status: false,
            ...(info ? info : { message: "Error in login" }),
          });
        res.json({
          status: true,
          ...(info ? info : { message: "LoggedIn successfully" }),
          user,
        });
      });
    }
  })(req, res, next);
});

app.post("/logout", ensureAuthenticated, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // res.redirect('/');
    res.json({ status: true, message: "Logged out successfully" });
  });
});

const server = app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}!; All set; http://localhost:${port}`
  )
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
