var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET - read all users. */
router.get("/", userController.users);

/* POST - create new user */
router.post("/user", userController.user_post);

/* GET - read user. */
router.get("/user/:id", userController.user_get);

/* PUT - update user. */
router.put("/user/:id", userController.user_put);

/* DELETE - delete user. */
router.delete("/user/:id", userController.user_delete);

module.exports = router;
