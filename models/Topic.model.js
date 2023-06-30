const { model, Schema } = require("mongoose");

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  threads: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

module.exports = model("Topic", topicSchema);