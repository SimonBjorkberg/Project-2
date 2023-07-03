const User = require('../models/User.model');
const Message = require('../models/Message.model');

const displayUsers = async (req, res) => {
  try {
    const userInSession = req.session.currentUser;
    const users = await User.find({ _id: { $ne: userInSession._id } }).select('username profilePicture');
    res.render('dm/messages', { users, userInSession: req.session.currentUser });
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
};

const chatController = async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    const recipientUsername = req.params.username;

    // Find the recipient user
    const recipientUser = await User.findOne({ username: recipientUsername });

    if (!recipientUser) {
      console.log('Recipient user not found');
      return res.redirect('/error');
    }

    // Find the conversation between the current user and the recipient user
    const conversation = await Message.find({
      $or: [
        { sender: currentUser._id, recipient: recipientUser._id },
        { sender: recipientUser._id, recipient: currentUser._id }
      ]
    }).sort('createdAt');

    res.render('dm/chat', { currentUser, recipientUser, conversation, userInSession: req.session.currentUser });
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
};

const sendMessage = async (req, res) => {
  const { content, recipient } = req.body;

  try {
    // Find the recipient user by username
    const recipientUser = await User.findOne({ username: recipient });

    if (!recipientUser) {
      console.log('Recipient user not found');
      return res.redirect('/error');
    }

    // Create a new message
    const message = new Message({
      sender: req.session.currentUser._id,
      recipient: recipientUser._id, // Use recipientUser._id instead of recipient
      content
    });

    // Save the message in the database
    await message.save();

    // Redirect back to the chat page
    res.redirect(`/chat/${recipient}`);
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
};

const displayChat = async (req, res) => {
  try {
    const { recipient } = req.params;
    const currentUser = req.session.currentUser._id;

    // Fetch the conversation messages between the current user and the recipient
    const conversation = await Message.find({
      $or: [
        { sender: currentUser, recipient },
        { sender: recipient, recipient: currentUser }
      ]
    }).sort('createdAt');

    // Render the chat template with the conversation messages
    res.render('chat', { conversation, recipientUser: { username: recipient } });
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
};

module.exports = {
  displayUsers,
  chatController,
  sendMessage,
  displayChat
};