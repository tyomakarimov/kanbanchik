const AuthConstroller = require('../controllers/auth-controller');
const Router = require('express');

const authRouter = new Router();

authRouter.post('/register', AuthConstroller.register);
authRouter.post('/login', AuthConstroller.login);
authRouter.post('/logout', AuthConstroller.logout);

module.exports = authRouter;
