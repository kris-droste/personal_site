const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Work = require('../../models/Work');

// @route    POST api/works
// @desc     Create a work
// @access   Private
router.post(
  '/', [ auth,
  [
    check('displayedText', 'Displayed Text is required').not().isEmpty(),
    check('url', 'Content is required').not().isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newWork = new Work({
        url: req.body.url,
        displayedText: req.body.displayedText,
      });

      const work = await newWork.save();
      res.json(work);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/works
// @desc     Get all works
// @access   Public
router.get('/', async (req, res) => {
  try {
    const works = await Work.find().sort({ url: -1 });
    res.json(works);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/works/:id
// @desc     Get work by ID
// @access   Private
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({ msg: 'Work not found' })
    }

    res.json(work);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/works/:id
// @desc     Delete a work
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({ msg: 'Work not found' });
    }

    await work.remove();
    res.json({ msg: 'Work removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/works/:id
// @desc     Update a work
// @access   Private
router.put('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    let work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ msg: 'Work not found' });
    }

    work = await Work.findOneAndUpdate(
      { url: req.body.data.url },
      { displayedText: req.body.data.displayedText },
      { new: true });

    return res.json(work);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
