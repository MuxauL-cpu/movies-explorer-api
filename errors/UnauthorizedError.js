const { AuthError } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AuthError;
  }
}

module.exports = UnauthorizedError;
