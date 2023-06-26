const User = require('../models/User.model');
const bcrypt = require("bcryptjs");
const cloudinary = require('cloudinary').v2;


const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findById(req.session.currentUser);

    if (bcrypt.compareSync(currentPassword, user.password)) {
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      return res.redirect(`/profile/${user.username}`);
    }
    else {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
}


const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.session.currentUser; 
    const file = req.file; // Get the uploaded file from the request

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    // Update the user's profile picture URL in the database
    await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    );

    return res.redirect("/users/user-profile");
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
    updatePassword,
    updateProfilePicture
}