class ApiError extends Error {
  status;
  errors;

  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static UserUnauthorizedError() {
    return new ApiError(401, 'Not authorized user');
  }

  static UserAlreadyExistsError() {
    return new ApiError(409, 'user with such login already exists');
  }

  static UserNotFoundError() {
    return new ApiError(404, 'user not found');
  }

  static IncorrectPasswordError() {
    return new ApiError(401, 'incorrect password');
  }
}

module.exports = ApiError;
