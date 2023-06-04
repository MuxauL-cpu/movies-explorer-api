const movieRouter = require('express').Router();
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, movieDelete } = require('../utils/validations');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidation, postMovie);
movieRouter.delete('/:movieID', movieDelete, deleteMovie);

module.exports = movieRouter;
