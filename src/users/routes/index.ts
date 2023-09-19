const Router = require('express').Router;
const usersController = require('../controllers/usersController')
const authMiddleware = require('../../middlewares/auth-middleware');
const userRouter = new Router();
userRouter.get('/logout', authMiddleware, usersController.logout)
userRouter.post('/sign_up', usersController.signup)
userRouter.post('/sign_in', usersController.signin)
userRouter.post('/sign_in/new_token', authMiddleware, usersController.signinNewToken)
userRouter.get('/info', authMiddleware, usersController.getMyInfo)

module.exports = userRouter;