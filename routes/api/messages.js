const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Message = require('../../models/Message');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/messages
// @desc     Send a message
// @access   Public
router.post(
  '/',
  [
    check('senderName', 'Your name is required').not().isEmpty(),
    check('senderEmail', 'Please include a valid email').isEmail(),
    check('subject', 'Message subject is required').not().isEmpty(),
    check('content', 'Message content is required').not().isEmpty(),
    check(
      'content',
      'Please enter a message with at least 10 characters'
    ).isLength({ min: 10 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { senderName, senderEmail, subject, content } = req.body;

    try {
      const message = new Message({
        senderName,
        senderEmail,
        subject,
        content
      });

      await message.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/messages
// @desc     Get all messages
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/messages/:id
// @desc     Get message by ID
// @access   Private
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ msg: 'Message not found' })
    }

    res.json(message);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


// @route    DELETE api/messages/:id
// @desc     Delete a message
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }

    await message.remove();
    res.json({ msg: 'Message removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
