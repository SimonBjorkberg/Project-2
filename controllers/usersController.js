const User = require('../models/User.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.render('users/allUsers', { users })
    }
    catch (error) {
        console.log(error)
    }
}


const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body
        await User.findByIdAndDelete(userId)
        console.log("User was deleted succesfully")
        res.redirect('users/allUsers')
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllUsers,
    deleteUser
}