const UserService = require('../services/user-service');

class UserController {
  static async get(req, res, next) {
    const params = req.query;
    try {
      const user = await UserService.get(params);
      return res.status(200).json(user.login);
    } catch (e) {
      return res.send(null);
    }
  }
  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return res.json(e.message);
    }
  }
}

module.exports = UserController;
