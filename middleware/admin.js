const isAdmin = (req, res, next) => {
  if (req.session.currentUser && req.session.currentUser.role === "admin") {
    next();
  } else if (!req.session.currentUser) {
    return res.redirect('/')
  } else {
    return res.render('unauthorized', { userInSession: req.session.currentUser })
  }
};

module.exports = {
  isAdmin,
};
