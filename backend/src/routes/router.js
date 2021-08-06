const Router = require('express');
const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const router = new Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
