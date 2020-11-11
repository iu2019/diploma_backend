const serverErrMsg = require('../config/const');

const errorHandler = (err, req, res, next) => { // Централизованный обработчик ошибок.
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? serverErrMsg
        : message,
    });
  next();
};

module.exports = errorHandler;
