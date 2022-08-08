const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    published: { type: Boolean, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
