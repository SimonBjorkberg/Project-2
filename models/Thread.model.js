const { model, Schema } = require("mongoose");

const threadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  topicParent: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
  },
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
});

module.exports = model("Thread", threadSchema);
