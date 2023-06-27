const isAdmin = (req, res, next) => {
    if (req.session.currentUser && req.session.currentUser.role === 'admin') {
        next()
      } else {
        res.redirect('/error');
      }
}


module.exports = {
    isAdmin
}