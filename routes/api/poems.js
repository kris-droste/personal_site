const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Poem = require('../../models/Poem');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/poems
// @desc     Create a poem
// @access   Private
// @ts-ignore
router.post(
  '/',
  [auth, [check('title', 'Title is required').not().isEmpty(), check('body', 'Body is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPoem = new Poem({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        user: user.id
      });

      const poem = await newPoem.save();

      res.json(poem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/poems
// @desc     Get all poems
// @access   Private
router.get('/', async (req, res) => {
  try {
    const poems = await Poem.find().sort({ date: -1 });
    res.json(poems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/poems/:id
// @desc     Get poem by ID
// @access   Private
router.get('/:id', [checkObjectId('id')], async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);

    if (!poem) {
      return res.status(404).json({ msg: 'Poem not found' });
    }

    res.json(poem);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/poems/:id
// @desc     Delete a poem
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);

    if (!poem) {
      return res.status(404).json({ msg: 'Poem not found' });
    }

    // Check user
    if (poem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await poem.remove();

    res.json({ msg: 'Poem removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/poems/:id
// @desc     Update a poem
// @access   Private
router.put('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    await poem.save();
    return res.json(poem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
