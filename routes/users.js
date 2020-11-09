const usersRouter = require('express').Router();

const {
  readUser,
} = require('../controllers/users');

usersRouter.get('/me', readUser);

module.exports = usersRouter;
