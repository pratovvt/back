const Router = require('express').Router;
const usersController = require('../controllers/users-controller')
const authMiddleware = require('../../middlewares/auth-middleware');
const userRouter = new Router();

userRouter.post('/create', usersController.create)
userRouter.get('/find/:id', usersController.findOne)
userRouter.get('/find', usersController.find)
userRouter.delete('/delete/:id', usersController.delete)
// userRouter.put('/update/:id', usersController.update)

userRouter.get('/logout', authMiddleware, usersController.logout)
userRouter.post('/sign_in', usersController.signin)
userRouter.post('/sign_in/new_token', authMiddleware, usersController.signinNewToken)

module.exports = userRouter;