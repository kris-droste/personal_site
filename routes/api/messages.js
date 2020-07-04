const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Message = require('../../models/Message');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/messages
// @desc     Create a message
// @access   Private
// @ts-ignore
router.post(
  '/',
  [[check('content', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    console.log('errors: ', errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newMessage = new Message({
        subject: req.body.subject,
        content: req.body.content,
        senderName: req.body.senderName,
        senderPhone: req.body.senderPhone,
        senderEmail: req.body.senderEmail,
      });
      console.log('newMessage: ', newMessage);

      const message = await newMessage.save();

      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
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
      return res.status(404).json({ msg: 'Message not found' });
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
