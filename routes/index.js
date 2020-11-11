const router = require('express').Router();

const helmet = require('helmet');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const logger = require('../middlewares/logger');

const signRouter = require('./sign');
const usersRouter = require('./users');
const articlesRouter = require('./articles');

const errorHandler = require('../middlewares/errors');
const auth = require('../middlewares/auth');

const RequestError = require('../errors/request-err');

const { requestBodyValMsg, endpointNotFoundMsg } = require('../config/const');

router.use(helmet());
router.use(logger.requestLogger);
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const NotFoundError = require('../errors/not-found-err');

router.use((error, req, res, next) => {
  // Catch bodyParser error
  if (error.message === 'invalid json') {
    next(new RequestError(requestBodyValMsg));
  } else {
    next(error);
  }
});

router.use(signRouter);
router.use(auth);
router.use('/api/users', usersRouter);
router.use('/api/articles', articlesRouter);

router.use('*', () => {
  throw new NotFoundError(endpointNotFoundMsg);
});

router.use(logger.errorLogger); // подключаем логгер ошибок

router.use(errors()); // обработчик ошибок celebrate

router.use(errorHandler);

module.exports = router;
