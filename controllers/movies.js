const { Error } = require('mongoose');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');
const {
  BadRequestMessage,
  ForbiddenMessage,
  MovieNotFoundMessage,
} = require('../utils/constants');

const getMovies = async (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const postMovie = async (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError(BadRequestMessage));
      } else {
        next(err);
      }
    });
};

const deleteMovie = async (req, res, next) => {
  const { movieID } = req.params;
  return Movie.findById(movieID)
    .orFail(() => {
      throw new NotFoundError(MovieNotFoundMessage);
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne({ _id: movieID })
          .then(res.status(200).send(movie))
          .catch(next);
      } else {
        next(new ForbiddenError(ForbiddenMessage));
      }
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError(BadRequestMessage));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, postMovie, deleteMovie };
