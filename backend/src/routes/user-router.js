const UserController = require('../controllers/user-controller');
const Router = require('express');

const userRouter = new Router();

userRouter.get('/', UserController.get);
userRouter.get('/refresh-token', UserController.refresh);

module.exports = userRouter;
