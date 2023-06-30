const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },
  profilePicture: {
    type: String,
    default: "/images/default.png",
  }, 
},
{
  timestamps: true,
}
);

module.exports = model("User", userSchema);
