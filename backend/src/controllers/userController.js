const { User } = require('../data/models/models');

class userController {
  static async get(req, res, next) {
    const params = req.query;
    const user = await User.findOne({ where: { ...params } });
    if (!Object.entries(user).length) {
      return res.status(404).json({ message: 'user not found' });
    }
    return res.status(200).json(user);
  }
}

module.exports = userController;
