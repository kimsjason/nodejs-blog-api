const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const openai = require("../config/openai-config");

// image upload support middleware
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3-config");
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "building-blogs",
    key: function (req, file, cb) {
      const folder = "images/";
      const uniqueFileName = Date.now() + "-" + file.originalname;
      cb(null, folder + uniqueFileName);
    },
  }),
});
const singleUpload = upload.single("image");

/* ---------- BLOG CONTROLLER FUNCTIONS ---------- */
/* GET - read all published blogs. */
exports.blogs = (req, res, next) => {
  Blog.find({ published: true })
    .populate("author", ["-password", "-email", "-firstName", "-lastName"])
    .exec((err, blogs) => {
      if (err) {
        return next(err);
      }

      res.json({ blogs });
    });
};

/* GET - read all blogs for a specific user. */
exports.users_blogs_get = (req, res, next) => {
  Blog.find({ author: req.params.id })
    .populate("author", "-password")
    .exec((err, blogs) => {
      if (err) {
        return next(err);
      }
      res.json({ blogs });
    });
};

/* GET - read blog. */
exports.blog_get = (req, res, next) => {
  Blog.findById(req.params.id)
    .populate("author", "-password")
    .populate("comments")
    .exec((err, blog) => {
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

/* POST - generate a blog with OpenAI's GPT-3 model. */
exports.openai_blog_post = async (req, res, next) => {
  const query = {
    model: "text-curie-001",
    prompt: `Generate a long blog based on the title: ${req.body.prompt}`,
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const completion = await openai.createCompletion(query);
  res.json({ text: completion.data.choices[0].text.trim() });
};

/* POST - create blog.  */
exports.blog_post = [
  (req, res, next) => {
    singleUpload(req, res, (err) => {
      if (err) next(err);
      else {
        next();
      }
    });
  },

  // validate and sanitize fields
  body("title", "Please enter a valid title.")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters.")
    .custom((title) => {
      return Blog.findOne({ title: title }).then((blog) => {
        if (blog) {
          return Promise.reject("A blog with that title already exists.");
        }
      });
    })
    .trim()
    .escape(),
  body("text")
    .isLength({ min: 100 })
    .withMessage("Blog must be at least 100 characters.")
    .trim()
    .escape(),

  (req, res, next) => {
    // extract validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are errors
      res.json(errors);
    } else {
      const newBlog = new Blog({
        title: req.body.title,
        text: req.body.text,
        image: req.file.key.slice(7),
        author: req.body.author,
        published: req.body.published,
      });

      newBlog.save((err, blog) => {
        if (err) {
          return next(err);
        }

        res.json({ blog });
      });
    }
  },
];

/* PUT - update blog. */
exports.blog_put = [
  (req, res, next) => {
    singleUpload(req, res, (err) => {
      if (err) next(err);
      else {
        next();
      }
    });
  },

  // validate and sanitize fields
  body("title", "Please enter a valid title.")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters.")
    .trim()
    .escape(),
  body("text")
    .isLength({ min: 100 })
    .withMessage("Blog must be at least 100 characters.")
    .trim()
    .escape(),

  (req, res, next) => {
    // extract validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // there are errors
      res.json({ errors });
    } else {
      Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        text: req.body.text,
        image: req.file.key.slice(7),
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
    }
  },
];

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

/* ---------- BLOG COMMENT CONTROLLER FUNCTIONS ---------- */
/* GET - read all comments for a specified blog. */
exports.comments = (req, res, next) => {
  Blog.findById(req.params.id).exec((err, blog) => {
    if (err) {
      return next(err);
    }

    if (!blog) {
      res.json({ error: "Blog does not exist." });
    } else {
      Comment.find({ _id: { $in: blog.comments } }).exec((err, comments) => {
        if (err) {
          return next(err);
        }

        res.json(comments);
      });
    }
  });
};

/* GET - read comment. */
exports.comment_get = (req, res, next) => {
  Blog.findById(req.params.id1).exec((err, blog) => {
    if (err) {
      return next(err);
    }

    if (!blog) {
      res.json({ error: "Blog does not exist." });
    } else {
      Comment.findById(req.params.id2).exec((err, comment) => {
        if (err) {
          return next(err);
        }

        if (!comment) {
          res.json({ error: "Comment doesn't exist" });
        } else {
          res.json({ comment });
        }
      });
    }
  });
};

/* POST - create comment.  */
exports.comment_post = [
  // validate and sanitize fields
  body("text").trim().escape(),

  (req, res, next) => {
    const newComment = new Comment({
      text: req.body.text,
      blog: req.body.blog,
      author: req.body.author,
    });

    Blog.findByIdAndUpdate(req.params.id, {
      $push: { comments: newComment },
    }).exec((err, blog) => {
      if (err) {
        return next(err);
      }

      if (!blog) {
        res.json({ error: "Blog does not exist." });
      } else {
        newComment.save((err, comment) => {
          if (err) {
            return next(err);
          }

          res.json({ comment });
        });
      }
    });
  },
];

/* PUT - update comment. */
exports.comment_put = (req, res, next) => {
  Blog.findById(req.params.id1).exec((err, blog) => {
    if (err) {
      return next(err);
    }

    if (!blog) {
      res.json({ error: "Blog does not exist." });
    } else {
      Comment.findByIdAndUpdate(req.params.id2, {
        text: req.body.text,
        author: req.body.author,
      }).exec((err, comment) => {
        if (err) {
          return next(err);
        }

        if (!comment) {
          res.json({ error: "Comment does not exist." });
        } else {
          res.json({ comment });
        }
      });
    }
  });
};

/* DELETE - delete comment. */
exports.comment_delete = (req, res, next) => {
  Blog.findByIdAndUpdate(req.params.id1, {
    $pull: { comments: req.params.id2 },
  }).exec((err, blog) => {
    if (err) {
      return next(err);
    }

    if (!blog) {
      res.json({ error: "Blog does not exist." });
    } else {
      Comment.findByIdAndDelete(req.params.id2).exec((err, comment) => {
        if (err) {
          return next(err);
        }

        if (!comment) {
          res.json({ error: "Comment does not exist." });
        } else {
          res.json({ comment });
        }
      });
    }
  });
};
