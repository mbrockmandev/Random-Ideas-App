const express = require('express');
const Idea = require('../models/Idea');
const router = express.Router();

// get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// get a specific idea by id
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.status(200).json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }
});

// add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  res.status(200);
  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// update an idea
router.put('/:id', async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true },
    );
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// delete an idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
