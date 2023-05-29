const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const { ServerNotFoundMessage } = require('../utils/constants');

router.use(authRouter);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
