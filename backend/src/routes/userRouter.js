const userConstroller = require('../controllers/userController');
const Router = require('express');

const userRouter = new Router();

userRouter.get('/user', userConstroller.get);

module.exports = userRouter;
