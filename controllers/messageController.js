const Message = require('../models/Message.model');

const getMessage = async (req, res) => {
    try {
        res.render('dms/dmpage', { userInSession: req.session.currentUser })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    getMessage
}