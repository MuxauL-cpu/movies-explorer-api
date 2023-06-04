const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { AuthMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(AuthMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    return next(new UnauthorizedError(AuthMessage));
  }

  req.user = payload;

  return next();
};
