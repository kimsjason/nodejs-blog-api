const Blog = require("../models/blog");

/* GET - read all blogs. */
exports.blogs = (req, res, next) => {
  Blog.find().exec((err, blogs) => {
    if (err) {
      return next(err);
    }
    res.json({ blogs });
  });
};

/* GET - read blog. */
exports.blog_get = (req, res, next) => {
  Blog.findById(req.params.id).exec((err, blog) => {
    if (err) {
      return next(err);
    }
    if (!blog) {
      res.json({ error: "Blog doesn't exist" });
    } else {
      res.json({ blog });
    }
  });
};

/* POST - create blog.  */
exports.blog_post = (req, res, next) => {
  Blog.findOne({ title: req.body.title }).exec((err, title) => {
    if (err) {
      return next(err);
    }
    // valid - title isn't used
    if (!title) {
      const newBlog = new Blog({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        published: req.body.published,
      });
      newBlog.save((err, blog) => {
        if (err) {
          return next(err);
        }
        res.json({ blog });
      });
    } else {
      res.json({ error: "A blog with that title already exists." });
    }
  });
};

/* PUT - update blog. */
exports.blog_put = (req, res, next) => {
  Blog.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    published: req.body.published,
  }).exec((err, blog) => {
    if (err) {
      return next(err);
    }

    if (!blog) {
      res.json({ error: "Blog does not exist." });
    } else {
      res.json({ blog });
    }
  });
};

/* DELETE - delete blog. */
exports.blog_delete = (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id).exec((err, blog) => {
    if (err) {
      return next(err);
    }

    if (!blog) {
      res.json({ error: "Blog does not exist." });
    } else {
      res.json({ blog });
    }
  });
};
