const inboxGuard = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/error");
  }
};

module.exports = {
  inboxGuard,
};
