const errorRouter = require('express').Router();
const { errors } = require('celebrate');

const NotFoundError = require('../errors/not-found-err');

const logger = require('../middlewares/logger');

errorRouter.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

errorRouter.use(logger.errorLogger); // подключаем логгер ошибок

errorRouter.use(errors()); // обработчик ошибок celebrate

errorRouter.use((err, req, res, next) => { // Централизованный обработчик ошибок.
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

module.exports = errorRouter;
