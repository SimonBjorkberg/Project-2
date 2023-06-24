const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
  image: {
    type: String,
    default: "/images/default.png",
    timestamps: true
  }, 
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);
