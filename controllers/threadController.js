const Thread = require('../models/thread.model');

// ###################################
// function that creates a new thread
// ###################################

exports.createThread = async (req, res) => {
  try {
    const { title, content, author } = req.body
    const newThread = new Thread({ title, content, author: req.session.currentUser })
    const savedThread = await newThread.save()
    // res.status(201).json(savedThread)
    res.redirect('/')
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new thread' })
  }
}

// ######################################
// function that gets a thread by its ID
// ######################################

exports.getThread = async (req, res) => {
  try {
    const { threadId } = req.params
    const thread = await Thread.findById(threadId)
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' })
    }
    res.json(thread)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get thread' })
  }
}

// ###################################
// function that updates thread by ID
// ###################################

exports.updateThread = async (req, res) => {
  try {
    const { threadId } = req.params
    const { title, content } = req.body
    const updatedThread = await Thread.findByIdAndUpdate(threadId, { title, content }, { new: true })
    if (!updatedThread) {
        return res.status(404).json({ error: 'Thread not found' })
      }
      res.json(updatedThread)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update thread' })
    }
  }

// ###################################
// function that deletes thread by ID
// ###################################

exports.deleteThread = async (req, res) => {
  try {
    const { threadId } = req.params
    const deletedThread = await Thread.findByIdAndDelete(threadId)
    if (!deletedThread) {
      return res.status(404).json({ error: 'Thread not found' })
    }
    res.json({ message: 'Thread deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete thread' })
  }
}