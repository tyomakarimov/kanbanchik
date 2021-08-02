const { User } = require('../data/models/models');

class userController {
  static async get(req, res, next) {
    const params = req.query;
    const user = await User.findOne({ where: { ...params } });
    if (!user) {
      return res.json({ message: 'user not found' });
    }
    return res.status(200).json(user);
  }
}

module.exports = userController;
