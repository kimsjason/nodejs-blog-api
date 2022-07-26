const User = require("../models/user");

/* GET - read all users. */
exports.users = (req, res, next) => {
  User.find().exec((err, users) => {
    if (err) {
      return next(err);
    }
    res.json({ users });
  });
};

/* GET - read user. */
exports.user_get = (req, res, next) => {
  User.findById(req.params.id).exec((err, user) => {
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
exports.user_post = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return next(err);
    }
    // valid - email isn't used
    if (!user) {
      User.findOne({ username: req.body.username }).exec((err, user) => {
        if (err) {
          return next(err);
        }
        // valid - username isn't used
        if (!user) {
          const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
          });
          newUser.save((err, user) => {
            if (err) {
              return next(err);
            }
            res.json({ user });
          });
        } else {
          res.json({ error: "Username is taken." });
        }
      });
    } else {
      res.json({ error: "That email is already being used." });
    }
  });
};

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
      res.json({ user });
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
      res.json({ user });
    }
  });
};
