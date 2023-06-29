const Thread = require("../models/Thread.model");

const canEditThread = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const thread = await Thread.findById(threadId).populate("author");
    if (
      thread.author.username === req.session.currentUser.username ||
      req.session.currentUser.role === "admin"
    ) {
      next();
    } else {
      return res.redirect(`/threads/${threadId}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  canEditThread,
};
