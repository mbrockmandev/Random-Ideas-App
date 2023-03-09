const express = require('express');
// const ideas = require('./Idea');
const port = 5001;

const app = express();

// root
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Random Ideas API' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => {
  `server listening on port ${port}`;
});
