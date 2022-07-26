var express = require("express");
var router = express.Router();
const blogController = require("../controllers/blogController");

/* ---------- BLOG ROUTES ---------- */
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

/* ---------- BLOG COMMENT ROUTES ---------- */
/* GET - read all comments. */
router.get("/blog/:id/comments", blogController.comments);

/* POST - create new comment */
router.post("/blog/:id/comment", blogController.comment_post);

/* GET - read comment. */
router.get("/blog/:id1/comment/:id2", blogController.comment_get);

/* PUT - update comment. */
router.put("/blog/:id1/comment/:id2", blogController.comment_put);

/* DELETE - delete comment. */
router.delete("/blog/:id1/comment/:id2", blogController.comment_delete);

module.exports = router;
