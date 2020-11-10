const router = require('express').Router();

const helmet = require('helmet');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const logger = require('../middlewares/logger');

const signRouter = require('./sign');
const usersRouter = require('./users');
const articlesRouter = require('./articles');

const errorRouter = require('./errors');
const auth = require('../middlewares/auth');

router.use(helmet());
router.use(logger.requestLogger);
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(signRouter);
router.use(auth);
router.use('/api/users', usersRouter);
router.use('/api/articles', articlesRouter);

router.use(errorRouter);

module.exports = router;
