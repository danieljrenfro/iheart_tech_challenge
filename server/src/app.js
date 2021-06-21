require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const songsRouter = require('./routes/songs-router');

// This would need to be uncommented for the simple solution below.
// const songs = require('../songData.json');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

/* 
This would be a very simple way to implement the get request, however I'm implementing it through a route simply to demonstrate a more modularized approach for larger projects.

app.get('/api/songs', (req, res) => {
  res.json(songs);
}); 
*/

// This would be a better solution if you had multiple endpoints for a larger application or project:
app.use('/api/songs', songsRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error'}};
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;