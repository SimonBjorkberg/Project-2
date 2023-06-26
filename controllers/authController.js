const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const cloudinary = require("cloudinary").v2;

// ################
// LOG IN GET ROUTE
// ################
const login = async (req, res, next) => {
  try {
    res.render("auth/login");
  } catch (err) {
    console.log("err", err);
  }
};

// #################
// LOG IN POST ROUTE
// #################
const loginPost = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.render("auth/login", { errorMessage: "User not found" });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect(`/profile/${username}`);
    } else {
      req.session.loginErrorMessage = 'Incorrect password'; // Set the error message in the session
      res.redirect('/login');
    }
  } catch (err) {
    console.log("err", err);
  }
};

// #################
// SIGN UP GET ROUTE
// #################
const signUp = async (req, res, next) => {
  try {
    res.render("auth/signup");
  } catch (err) {
    console.log("err", err);
  }
};

// ##################
// SIGN UP POST ROUTE
// ##################
const signUpPost = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      let errorMessage = "";
      if (user.username === username) {
        errorMessage = "Username already taken";
      } else {
        errorMessage = "Email already registered";
      }
      return res.render("auth/signup", { errorMessage });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return res.redirect(`/profile/${username}`);
  } catch (err) {
    console.log("err", err);
  }
};

// ###################
// USER PROFILE ROUTES
// ###################
const userProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.render("not-found");
    }
    if (
      req.session.currentUser &&
      req.session.currentUser.username === user.username
    ) {
      return res.render("users/user-profile", {
        auth: true,
        username: user.username,
        email: user.email,
        avatar: user.profilePicture,
        userInSession: req.session.currentUser,
      });
    }
    res.render("users/user-profile", {
      auth: false,
      username: user.username,
      email: user.email,
      avatar: user.profilePicture,
      userInSession: req.session.currentUser,
    });
  } catch (err) {
    console.log("err", err);
    next(err);
  }
};

// ############
// LOGOUT ROUTE
// ############
const logOut = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  } catch (err) {
    console.log("err", err);
  }
};

// ############
// SEARCH ROUTE
// ############
const search = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.search });
    if (user === null) {
      res.redirect("/not-found");
    } else {
      res.redirect(`/profile/${user.username}`);
    }
  } catch (err) {
    console.log("err", err);
  }
};

// #########################
// UPDATE PASSWORD GET ROUTE
// #########################
const updatePassword = async (req, res, next) => {
  try {
    if (req.params.username === req.session.currentUser.username) {
      res.render("auth/change-password", {
        userInSession: req.session.currentUser,
      });
    } else {
      next();
    }
  } catch (err) {
    console.log("err", err);
  }
};

// ##########################
// UPDATE PASSWORD POST ROUTE
// ##########################
const updatePostPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.session.currentUser);

    if (bcrypt.compareSync(currentPassword, user.password) && bcrypt.compareSync(newPassword, user.password)) {
      return res.render(`auth/change-password`, {
        errorMessage: "Can not change to the same password",
        userInSession: user,
      });
    }

    if (bcrypt.compareSync(currentPassword, user.password)) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      return res.render(`auth/change-password`, {
        message: "Password Changed",
        userInSession: user,
      });
    } else {
      res.render("auth/change-password", {
        errorMessage: "Incorrect current Password",
        userInSession: user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// ############################
// UPDATE PROFILE PICTURE ROUTE
// ############################
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
    console.log(error);
  }
};

// #######
// EXPORTS
// #######
module.exports = {
  login,
  loginPost,
  signUp,
  signUpPost,
  userProfile,
  logOut,
  search,
  updatePassword,
  updatePostPassword,
  updateProfilePicture,
};
