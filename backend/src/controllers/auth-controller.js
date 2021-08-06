const UserService = require('../services/user-service');

class AuthController {
  static async register(req, res, next) {
    try {
      if (Object.entries(req.body).length < 4) {
        return res.status(400).send({ message: 'one or more parameters are missing' });
      }
      const { name, surname, login, password } = req.body;
      const userData = await UserService.register(name, surname, login, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return res.status(e.status).json(e.message);
    }
  }

  static async login(req, res, next) {
    try {
      if (Object.entries(req.body).length < 2) {
        return res.status(400).send({ message: 'one or more parameters are missing' });
      }
      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return res.status(e.status).json(e.message);
    }
  }

  static async logout(req, res, next) {
    try {
      console.log(Object.keys(req));
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = AuthController;
