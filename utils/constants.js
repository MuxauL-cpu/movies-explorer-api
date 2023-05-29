const NotFound = 404;
const Forbidden = 403;
const BadRequest = 400;
const AuthError = 401;
const Conflict = 409;
const regexUrl = /^https?:\/\/(www\.)?[a-zA-Z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/i;

module.exports = {
  NotFound,
  BadRequest,
  AuthError,
  Forbidden,
  Conflict,
  regexUrl,
};
