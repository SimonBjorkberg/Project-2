const User = require('../models/User.model');
const Thread = require('../models/Thread.model')
const Post = require('../models/Post.model')

const getAllUsers = async (req, res) => {
    try {
        const userInSession = req.session.currentUser;
        const users = await User.find({ _id: { $ne: userInSession._id } }).select('username profilePicture')
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
        const user = await User.findById(userId)
        await Thread.findOneAndDelete({ author: user._id })
        await Post.findOneAndDelete({ author: user._id })
        await User.findByIdAndDelete(userId)
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