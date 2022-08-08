const passport = require("passport");
const { body } = require("express-validator");

/* POST - user login */
exports.login_post = [
  // validate and sanitize fields
  body("username").trim().escape(),
  body("password").trim().escape(),

  // authenticate user credentials
  passport.authenticate("local"),
  (req, res, next) => {
    if (!req.user) {
      res.json({ error: "Username and password do not match." });
    } else {
      req.logIn(req.user, (err) => {
        if (err) {
          return next(err);
        }

        // remove password before sending to client
        delete req.user._doc.password;
        res.json({ user: req.user, isAuthenticated: true });
      });
    }
  },
];

exports.logout_post = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.json({ user: null, isAuthenticated: false });
  });
};
