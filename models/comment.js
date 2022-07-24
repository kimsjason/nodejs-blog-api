const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
