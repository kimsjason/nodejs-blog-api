const passport = require("passport");
const { body } = require("express-validator");

/* POST - user login */
exports.login_post = [
  // validate and sanitize fields
  body("username").trim().escape(),
  body("password").trim().escape(),

  // authenticate user credentials
  (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        next(err);
      }

      if (!user) {
        res.json({ error: "Username and password do not match." });
      } else {
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }

          res.json({ isAuthenticated: true });
        });
      }
    })(req, res);
  },
];

exports.logout_post = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.json({ isAuthenticated: false });
  });
};
