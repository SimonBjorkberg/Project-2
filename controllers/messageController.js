const mongoose = require('mongoose');
const Message = require('../models/Message.model');
const User = require('../models/User.model');

const getInbox = async (req, res) => {
    try {
        res.render('dms/dmpage', { userInSession: req.session.currentUser })
    }
    catch (error) {
        console.log(error)
    }
}

const sendMessage = async (req, res) => {
    const { content, recipient } = req.body;
    
    try {
      const recipientUser = await User.findOne({ username: recipient });
      if (!recipientUser) {
        console.log('Recipient doesnt exist');
        res.redirect('/error');
      }
  
      // create a new message
      const message = new Message({
        sender: req.session.currentUser._id,
        recipient: recipientUser._id,
        content: content
      });
      // save it in the database
      await message.save();
  
      return res.json({ message: 'Message was sent successfully' });
    } catch (error) {
      console.log(error);
    }
  };

const recievedMessage = async (req, res) => {
    try {
      const userId = req.session.currentUser._id
      console.log(userId)

      const receivedMessages = await Message.find({ recipient: userId }).populate('sender', 'username')
      // console.log(receivedMessages)

      const content = receivedMessages.map(message => ({
        sender: message.sender.username,
        content: message.content,
      }));
      console.log(content)

      res.json({ receivedMessages: content })

      if (receivedMessages.length === 0) {
        console.log('No messages were recieved')
      }

    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    getInbox,
    sendMessage,
    recievedMessage
}