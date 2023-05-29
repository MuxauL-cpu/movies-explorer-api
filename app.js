const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const routes = require('./routes');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
// eslint-disable-next-line import/no-unresolved
const { errorHandler } = require('./middlewares/errorHandler');
const { createUserValidation, loginValidation } = require('./utils/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);

app.use(auth);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Старт сервера');
});
