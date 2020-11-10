const articlesRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { default: validator } = require('validator');

const {
  readArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

articlesRouter.get('/', readArticles);

articlesRouter.post('/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(2).max(30),
      title: Joi.string().required().min(2).max(60),
      text: Joi.string().required().min(2).max(1000),
      date: Joi.string().required().min(8),
      source: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value, { require_host: true })) {
          return value;
        }
        return helpers.message('Поле link не является валидным URL');
      }),
      image: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value, { equire_host: true })) {
          return value;
        }
        return helpers.message('Поле image не является валидным URL');
      }),
    }),
  }),
  createArticle);

articlesRouter.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }).unknown(true),
  }),
  deleteArticle);

articlesRouter.use(errors());

module.exports = articlesRouter;
