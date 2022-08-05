var express = require("express");
var router = express.Router();
const loginController = require("../controllers/loginController");

/* POST - login page. */
router.post("/login", loginController.login_post);

/* POST - logout page. */
router.post("/logout", loginController.logout_post);

module.exports = router;
