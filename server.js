const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5002;
console.log('backend port:', port);
const connectDB = require('./config/db');
connectDB();
const app = express();

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
  cors({
    origin: ['http://localhost:5001', 'http://localhost:3001'],
    credentials: true,
  }),
);

// root
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Random Ideas API' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => {
  `server listening on port ${port}`;
});
