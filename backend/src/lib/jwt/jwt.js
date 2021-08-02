const jwt = require('jsonwebtoken');

class JWT {
  static generate(args) {
    return jwt.sign({ ...args }, process.env.JWT_SECRET_KEY, {
      expiresIn: '120s',
    });
  }
  static verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
}

module.exports = JWT;
