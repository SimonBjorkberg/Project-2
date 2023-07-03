const User = require('../models/User.model');

const getAllUsers = async (req, res) => {
    try {
        const userInSession = req.session.currentUser;
        const users = await User.find({ _id: { $ne: userInSession._id } }).select('username profilePicture')
        console.log(users)
        res.render('users/allUsers', { users, userInSession: req.session.currentUser })
    }
    catch (error) {
        console.log(error)
        return res.render('error', { userInSession: req.session.currentUser })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body
        await User.findByIdAndDelete(userId)
        console.log("User was deleted succesfully")
        res.redirect('/users')
    }
    catch (error) {
        console.log(error)
        return res.render('error', { userInSession: req.session.currentUser })
    }
}


module.exports = {
    getAllUsers,
    deleteUser
}