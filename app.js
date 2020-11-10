const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
require('dotenv').config();

// const { celebrate, Joi, errors } = require('celebrate');

// const cookieParser = require('cookie-parser');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');

// const auth = require('./middlewares/auth');

const router = require('./routes/index');
const apiLimiter = require('./routes/rate-limiter');

// const { createUser, login } = require('./controllers/users');

// const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGODB = 27017 } = process.env;
const app = express();
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// const NotFoundError = require('./errors/not-found-err');

app.use(apiLimiter);
// app.use(helmet());

// app.use(requestLogger);
// app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://localhost: ${MONGODB}/newsdb`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.set('runValidators', true);

// app.post('/api/signin',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().pattern(/\S+/),
//     }),
//   }), login);

// app.post('/api/signup',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(8),
//       name: Joi.string().required().min(2).max(30),
//     }),
//   }),
//   createUser);

// app.use(auth);

app.use('/', router);

// app.use('*', () => {
//   throw new NotFoundError('Ресурс не найден');
// });

// app.use(errorLogger); // подключаем логгер ошибок

// app.use(errors()); // обработчик ошибок celebrate

// app.use((err, req, res, next) => { // Централизованный обработчик ошибок.
//   const { statusCode = 500, message } = err;

//   res.status(statusCode)
//     .send({
//       message: statusCode === 500
//         ? 'На сервере произошла ошибка'
//         : message,
//     });
//   next();
// });

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
