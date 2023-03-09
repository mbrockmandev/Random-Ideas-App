const express = require('express');
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: 'positive newsletter a news letter that is posi',
    tag: 'tech',
    username: 'tony stark',
    date: '2023-01-05',
  },
  {
    id: 2,
    text: 'negative newsletter which focuses on bad stuff',
    tag: 'tech',
    username: 'tony stark',
    date: '2023-01-05',
  },
  {
    id: 3,
    text: 'a neutral news letter and stuff',
    tag: 'tech',
    username: 'tony stark',
    date: '2023-01-05',
  },
];

// get all ideas
router.get('/', (req, res) => {
  res.json({ success: true, data: ideas });
});

// get a specific idea by id
router.get('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }
  res.json({ success: true, data: idea });
});

module.exports = router;
