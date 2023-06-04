const NotFound = 404;
const Forbidden = 403;
const BadRequest = 400;
const AuthError = 401;
const Conflict = 409;
const regexUrl = /^https?:\/\/(www\.)?[a-zA-Z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/i;

const ForbiddenMessage = 'Ошибка доступа, нельзя удалять чужие фильмы.';
const MovieNotFoundMessage = 'Фильм с данным id не найден.';
const UserNotFoundMessage = 'Пользователь не найден.';
const BadRequestMessage = 'Были введены некорректные данные';
const ConflictMessage = 'Пользователь уже существует';
const ServerNotFoundMessage = 'Сервер не найден.';
const AuthMessage = 'Необходима авторизация.';

module.exports = {
  NotFound,
  BadRequest,
  AuthError,
  Forbidden,
  Conflict,
  regexUrl,
  ForbiddenMessage,
  MovieNotFoundMessage,
  BadRequestMessage,
  ConflictMessage,
  UserNotFoundMessage,
  ServerNotFoundMessage,
  AuthMessage,
};
