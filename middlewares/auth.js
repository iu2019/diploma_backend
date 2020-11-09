const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new AuthError('Необходима авторизация 1'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-duper-secret');
  } catch (err) {
    next(new AuthError('Необходима авторизация 2'));
  }
  req.user = payload;
  next();
};
