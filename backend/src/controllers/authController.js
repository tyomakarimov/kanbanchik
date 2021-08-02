const uuid = require('uuid');
const Crypto = require('../lib/crypto/crypto');
const JWT = require('../lib/jwt/jwt');
const { User } = require('../data/models/models');

class authController {
  static async register(req, res, next) {
    if (Object.entries(req.body).length < 4) {
      return res.status(400).send({ message: 'one or more parameters are missing' });
    }
    const { name, surname, login, password } = req.body;
    console.log(req.body);
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      return res.status(409).send({ message: 'user with such login already exists' });
    }
    const user = await User.create({
      id: uuid.v4(),
      name: name,
      surname: surname,
      login: login,
      password: Crypto.hash(password),
    });
    const jwt = JWT.generate({
      id: user.id,
      name: user.name,
      surname: user.surname,
      login: user.login,
    });
    return res.status(201).json({ jwt });
  }

  static async login(req, res, next) {
    if (Object.entries(req.body).length < 2) {
      return res.status(400).send({ message: 'one or more parameters are missing' });
    }
    const { login, password } = req.body;
    const candidate = await User.findOne({ where: { login } });
    if (!candidate) {
      return res.status(404).send('user not found');
    }
    const verified = Crypto.verify(password, candidate.password);
    if (!verified) {
      return res.status(401).send({ message: 'incorrect password' });
    }
    const jwt = JWT.generate({
      id: candidate.id,
      name: candidate.name,
      surname: candidate.surname,
      login: candidate.login,
    });
    return res.status(201).json({ jwt });
  }
}

module.exports = authController;
