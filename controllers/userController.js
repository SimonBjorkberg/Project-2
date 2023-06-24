const User = require('../models/User.model');
const bcrypt = require("bcryptjs");

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword) {
      return res.redirect('/users/user-profile');
    }
    const user = await User.findById(req.session.currentUser);
    if (!user) {
      return res.redirect('/users/user-profile');
    }
    if (bcrypt.compareSync(currentPassword, user.password)) {
      alert("This password is already being used");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.redirect('/users/user-profile');
  } catch (error) {
    console.log(error);
  }
}


const updateProfilePicture = async (req, res) => {
    try {
        const { currentProfilePicture, newProfilePicture } = req.body // add the form of the new password
        const user = await User.findById(req.session.currentUser);
        if (!user || !newProfilePicture ) {
            res.redirect('/error')
        }
        
    }
    catch (error ){
        console.log(error)
    }
}

module.exports = {
    updatePassword,
    updateProfilePicture
}