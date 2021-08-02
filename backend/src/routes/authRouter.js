const authConstroller = require('../controllers/authController');
const Router = require('express');

const authRouter = new Router();

authRouter.post('/register', authConstroller.register);
authRouter.post('/login', authConstroller.login);

module.exports = authRouter;
