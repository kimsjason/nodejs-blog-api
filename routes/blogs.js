var express = require("express");
var router = express.Router();
const blogController = require("../controllers/blogController");

/* GET - read all blogs. */
router.get("/", blogController.blogs);

/* POST - create new blog */
router.post("/blog", blogController.blog_post);

/* GET - read blog. */
router.get("/blog/:id", blogController.blog_get);

/* PUT - update blog. */
router.put("/blog/:id", blogController.blog_put);

/* DELETE - delete blog. */
router.delete("/blog/:id", blogController.blog_delete);

module.exports = router;
