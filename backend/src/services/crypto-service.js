const crypto = require('crypto');

class CryptoService {
  static hash(password) {
    const salt = crypto.randomBytes(8).toString('hex');
    try {
      const key = crypto.scryptSync(password, salt, 64);
      return salt + ':' + key.toString('hex');
    } catch (e) {
      console.error(e);
    }
  }
  static verify(password, hash) {
    const [salt, rest] = hash.split(':');
    try {
      const key = crypto.scryptSync(password, salt, 64);
      return rest == key.toString('hex');
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = CryptoService;
