const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: String,
    default: () => {
      const now = new Date();
      const options = { year: "numeric", month: "short", day: "2-digit" };
      return now.toLocaleDateString(undefined, options);
    },
  },
  updatedAt: {
    type: String,
    default: () => {
      const now = new Date();
      const options = { year: "numeric", month: "short", day: "2-digit" };
      return now.toLocaleDateString(undefined, options);
    },
  },
  threadParent: {
    type: Schema.Types.ObjectId,
    ref: "Thread",
  },
});

module.exports = model("Post", postSchema);
