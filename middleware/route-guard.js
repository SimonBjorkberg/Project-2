const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};

const isUser = (req, res, next) => {
  if (req.session.currentUser.username === req.params.username) {
    next();
  }
  else {
    return res.redirect('/')
  }
}

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isUser,
};
