const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const authErrMsg = require('../config/const');
const jwtKey = require('../config/jwt-key');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new AuthError(authErrMsg));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : jwtKey);
  } catch (err) {
    next(new AuthError(authErrMsg));
  }
  req.user = payload;
  next();
};
