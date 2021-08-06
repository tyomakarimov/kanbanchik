require('dotenv').config({ path: '../../../.env' });
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { Token } = require('../data/models/models');

class TokenService {
  static generate(args) {
    const accessToken = jwt.sign({ ...args }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '120s',
    });
    const refreshToken = jwt.sign({ ...args }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  static verifyAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  static verifyRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  static async save(userId, refreshToken) {
    let token = await Token.findOne({ where: { user_id: userId } });
    if (token) {
      token.key = refreshToken;
      return token.save();
    }
    console.log({ id: uuid.v4(), user_id: userId, key: refreshToken });
    token = await Token.create({ id: uuid.v4(), user_id: userId, key: refreshToken });
    return token;
  }

  static async remove(refreshToken) {
    const token = await Token.findOne({ where: { key: refreshToken } });
    return await token.destroy();
  }

  static async find(refreshToken) {
    const tokenData = await Token.findOne({ where: { key: refreshToken } });
    return tokenData;
  }
}

module.exports = TokenService;
