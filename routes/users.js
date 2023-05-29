const userRouter = require('express').Router();
const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');
const { updateUserValidation } = require('../utils/validations');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValidation, updateUserInfo);

module.exports = userRouter;
