const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  readArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

const urlPattern = new RegExp(/^http[s]?:\/\/((([\w-]+\.)*\w{2,3})|((([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-5])))(:[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])?((\/[\w-]+)*\/?#?)$/);

articlesRouter.get('/', readArticles);

articlesRouter.post('/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(2).max(30),
      title: Joi.string().required().min(2).max(60),
      text: Joi.string().required().min(2).max(1000),
      date: Joi.string().required().min(8),
      source: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlPattern),
      image: Joi.string().required().pattern(urlPattern),
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

module.exports = articlesRouter;
