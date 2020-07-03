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
        title: req.body.text,
        body: req.body.body,
        author: user.name,
        avatar: user.avatar,
        user: req.user.id
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
router.get('/', auth, async (req, res) => {
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
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
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

// @route    PUT api/poems/like/:id
// @desc     Like a poem
// @access   Private
router.put('/like/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);

    // Check if the poem has already been liked
    if (poem.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Poem already liked' });
    }

    poem.likes.unshift({ user: req.user.id });

    await poem.save();

    return res.json(poem.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/poems/unlike/:id
// @desc     Unlike a poem
// @access   Private
router.put('/unlike/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);

    // Check if the poem has not yet been liked
    if (!poem.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Poem has not yet been liked' });
    }

    // remove the like
    poem.likes = poem.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await poem.save();

    return res.json(poem.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/poems/comment/:id
// @desc     Comment on a poem
// @access   Private
// @ts-ignore
router.post(
  '/comment/:id',
  [
    auth,
    checkObjectId('id'),
    [check('text', 'Text is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const poem = await Poem.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      poem.comments.unshift(newComment);

      await poem.save();

      res.json(poem.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/poems/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);

    // Pull out comment
    const comment = poem.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    poem.comments = poem.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await poem.save();

    return res.json(poem.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
