const { Router } = require('express');

const songs = require('../../songData.json');

const songsRouter = Router();

songsRouter
  .route('/')
  .get((req, res, next) => {
    try {
      res.json(songs);
    } catch (error) {
      next(error);
    }
  });

module.exports = songsRouter;