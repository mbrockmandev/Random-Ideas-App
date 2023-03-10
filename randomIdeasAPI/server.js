const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');
connectDB();
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// root
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Random Ideas API' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => {
  `server listening on port ${port}`;
});
