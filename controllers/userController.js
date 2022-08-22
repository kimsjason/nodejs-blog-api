const fs = require("fs");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

/* GET - read all users. */
exports.users = (req, res, next) => {
  User.find()
    .select(["-password", "-email", "-firstName", "-lastName"])
    .exec((err, users) => {
      if (err) {
        return next(err);
      }
      res.json({ users });
    });
};

/* GET - read user. */
exports.user_get = (req, res, next) => {
  User.findById(req.params.id)
    .select(["-password", "-email", "-firstName", "-lastName"])
    .exec((err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.json({ error: "User doesn't exist" });
      } else {
        res.json({ user });
      }
    });
};

/* POST - create user.  */
exports.user_post = [
  // validate and sanitize input fields
  body("firstName", "Not a valid first name.")
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("Please enter your first name using only letters.")
    .trim()
    .escape(),
  body("lastName", "Not a valid last name.")
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("Please enter your last name using only letters.")
    .trim()
    .escape(),
  body("email", "Not a valid email.")
    .isEmail()
    .custom((email) => {
      return User.findOne({ email: email }).then((user) => {
        // user with email already exists
        if (user) {
          return Promise.reject(
            "Email is already registered with another account."
          );
        }
      });
    })
    .trim()
    .escape(),
  body("username", "Not a valid username.")
    .isLength({ min: 1 })
    .isAlphanumeric()
    .withMessage(
      "Usernames can only contain letters, numbers, underscores, and periods."
    )
    .custom((username) => {
      return User.findOne({ username: username }).then((user) => {
        if (user) {
          return Promise.reject("Username is already being used.");
        }
      });
    })
    .trim()
    .escape(),
  body("password", "Not a valid password.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .trim()
    .escape(),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    })
    .trim()
    .escape(),

  // process request after validation and sanitization
  (req, res, next) => {
    // extract validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        // generate random avatar
        fs.readdir("./public/avatars", (err, files) => {
          if (err) {
            return next(err);
          }
          const randomAvatar = files[Math.floor(Math.random() * files.length)];

          // create a User object with escaped and trimmed data
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            avatar: randomAvatar,
          });
          user.save();
          res.json(user);

          return files;
        });
      });
    }
  },
];

/* PUT - update user. */
exports.user_put = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  }).exec((err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.json({ error: "User does not exist." });
    } else {
      res.json(user);
    }
  });
};

/* DELETE - delete user. */
exports.user_delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id).exec((err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.json({ error: "User does not exist." });
    } else {
      res.json(user);
    }
  });
};
