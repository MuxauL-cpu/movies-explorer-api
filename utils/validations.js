const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('./constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().regex(regexUrl).required()
      .messages({ 'Incorrect link': 'Некорректно указана ссылка' }),
    trailerLink: Joi.string().uri().regex(regexUrl).required()
      .messages({ 'Incorrect link': 'Некорректно указана ссылка' }),
    thumbnail: Joi.string().uri().regex(regexUrl).required()
      .messages({ 'Incorrect link': 'Некорректно указана ссылка' }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieDelete = celebrate({
  params: Joi.object().keys({
    movieID: Joi.string().hex().length(24).required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  createMovieValidation,
  movieDelete,
  createUserValidation,
  updateUserValidation,
  loginValidation,
};
