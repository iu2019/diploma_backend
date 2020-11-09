const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RequestError = require('../errors/request-err');
const NotFoundError = require('../errors/not-found-err');
const DuplicateError = require('../errors/duplicate-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const readUser = (req, res, next) => {

  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  if (
    password.length < 8
    || password.split('').every(
      (elem, index, array) => elem === array[0],
    )
  ) {
    next(new RequestError('Пароль не соответствует требованиям'));
    return;
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(201).send({
      data: {
        email: user.email, name: user.name,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new DuplicateError('Повторный email'));
      } else {
        next(new RequestError('Ошибка валидации полей пользователя'));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-duper-secret',
        { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .status(200)
        .send({ message: 'Удачный логин' });
    })
    .catch(next);
};

module.exports = {
  readUser, createUser, login,
};
