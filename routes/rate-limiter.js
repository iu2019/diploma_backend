const limiterRouter = require('express').Router();

const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

limiterRouter.use(apiLimiter);
module.exports = limiterRouter;
