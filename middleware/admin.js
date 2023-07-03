const isAdmin = (req, res, next) => {
  if (req.session.currentUser && req.session.currentUser.role === "admin") {
    next();
  } else {
    return res.render('error', { userInSession: req.session.currentUser })
  }
};

module.exports = {
  isAdmin,
};
