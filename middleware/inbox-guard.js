const inboxGuard = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else if (!req.session.currentUser) {
    return res.redirect('/')
  } else {
    res.redirect("/error");
  }
};

module.exports = {
  inboxGuard,
};
