const jwt = require('jsonwebtoken');
const JWT = require('../lib/jwt/jwt');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'not authorized' });
    }
    const decoded = JWT.verify(token);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'invalid token' });
  }
};
