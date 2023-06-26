const Thread = require("../models/Thread.model");

// ###########
// INDEX ROUTE
// ###########
const index = async (req, res, next) => {
  try {
    const thread = await Thread.find({}).populate("author");
    res.render("index", {
      userInSession: req.session.currentUser,
      thread,
    });
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  index,
};
