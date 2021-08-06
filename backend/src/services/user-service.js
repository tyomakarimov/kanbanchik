const uuid = require('uuid');
const { User } = require('../data/models/models');
const CryptoService = require('./crypto-service');
const TokenService = require('./token-service');
const ApiError = require('../errors/api-error');
const UserDto = require('../dtos/user-dto');

class UserService {
  static async register(name, surname, login, password) {
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      throw ApiError.UserAlreadyExistsError();
    }
    const userId = uuid.v4();
    const hashedPassword = CryptoService.hash(password);
    const user = await User.create({
      id: userId,
      name,
      surname,
      login,
      password: hashedPassword,
    });
    const userDto = new UserDto(user);
    const tokens = TokenService.generate({ ...userDto });
    await TokenService.save(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  static async login(login, password) {
    const user = await User.findOne({ where: { login } });
    if (!user) {
      throw ApiError.UserNotFoundError();
    }
    const isPassEqual = CryptoService.verify(password, user.password);
    if (!isPassEqual) {
      throw ApiError.IncorrectPasswordError();
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generate({ ...userDto });
    await TokenService.save(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  static async logout(refreshToken) {
    const token = await TokenService.remove(refreshToken);
    return token;
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UserUnauthorizedError();
    }
    const userData = TokenService.verifyRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.find(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UserNotFoundError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = TokenService.generate({ ...userDto });

    await TokenService.save(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  static async get(params) {
    const user = await User.findOne({ where: { ...params } });
    if (!user) {
      throw ApiError.UserNotFoundError();
    }
    return JSON.stringify(user);
  }
}

module.exports = UserService;
