const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    default: () => {
      const now = new Date();
      const options = { year: "numeric", month: "short", day: "2-digit" };
      return now.toLocaleDateString(undefined, options);
    },
  },
});

module.exports = model("Message", messageSchema);
