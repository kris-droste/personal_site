const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Paragraph = require('../../models/Paragraph');

// @route    POST api/paragraphs
// @desc     Create a paragraph
// @access   Private
router.post(
  '/',
  [ auth, [
      check('priority', 'Priority should be numeric').isNumeric(),
    check('content', 'Content is required').not().isEmpty(),
    check(
      'content',
      'Please enter a message with at least 10 characters'
    ).isLength({ min: 10 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newParagraph = new Paragraph({
        priority: req.body.priority,
        content: req.body.content,
      });

      const paragraph = await newParagraph.save();
      res.json(paragraph);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/paragraphs
// @desc     Get all paragraphs
// @access   Public
router.get('/', async (req, res) => {
  try {
    const paragraphs = await Paragraph.find().sort({ priority: -1 });
    res.json(paragraphs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/paragraphs/:id
// @desc     Get paragraph by ID
// @access   Private
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const paragraph = await Paragraph.findById(req.params.id);

    if (!paragraph) {
      return res.status(404).json({ msg: 'Paragraph not found' })
    }

    res.json(paragraph);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/paragraphs/:id
// @desc     Delete a paragraph
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const paragraph = await Paragraph.findById(req.params.id);

    if (!paragraph) {
      return res.status(404).json({ msg: 'Paragraph not found' });
    }

    await paragraph.remove();
    res.json({ msg: 'Paragraph removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/paragraphs/:id
// @desc     Update a paragraph
// @access   Private
router.put('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    let paragraph = await Paragraph.findById(req.params.id);
    if (!paragraph) {
      return res.status(404).json({ msg: 'Paragraph not found' });
    }

    paragraph = await Paragraph.findOneAndUpdate(
      { priority: req.body.data.priority },
      { content: req.body.data.content },
      { new: true });

    return res.json(paragraph);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
