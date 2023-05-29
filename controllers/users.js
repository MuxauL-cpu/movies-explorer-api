const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const {
  BadRequestMessage,
  ConflictMessage,
  UserNotFoundMessage,
} = require('../utils/constants');

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          const newUser = user.toObject();
          delete newUser.password;
          res.status(201).send(newUser);
        })
        .catch((err) => {
          if (err instanceof Error.ValidationError) {
            next(new BadRequestError(BadRequestMessage));
          } else if (err.code === 11000) {
            next(new ConflictError(ConflictMessage));
          } else {
            next(err);
          }
        });
    });
};

const getCurrentUser = async (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(UserNotFoundMessage);
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUserInfo = async (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(UserNotFoundMessage);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ConflictMessage));
      } else if (err instanceof Error.CastError) {
        next(new BadRequestError(BadRequestMessage));
      } else {
        next(err);
      }
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getCurrentUser,
  updateUserInfo,
  login,
};
