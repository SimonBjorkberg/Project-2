const User = require('../models/User.model');
//put requrest
// find user in the database first
const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body // add the form of the new password
        const user = await User.findById(req.session.currentUser);
        if (!user || !newPassword ) {
            res.redirect('/error')
        }
        
    }
    catch (error) {
        console.log(error)
    }
}


const updateProfilePicture = async (req, res) => {
    try {
        const { currentProfilePicture, newProfilePicture } = req.body // add the form of the new password
        const user = await User.findById(req.session.currentUser);
        if (!user || !newProfilePicture ) {
            res.redirect('/error')
        }
        
    }
    catch (error ){
        console.log(error)
    }
}

module.exports = {
    updatePassword,
    updateProfilePicture
}