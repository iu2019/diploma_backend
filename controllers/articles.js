const Article = require('../models/article');
const ServerError = require('../errors/server-err');
const RequestError = require('../errors/request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  serverErrMsg, requestErrMsg, articleNotFoundErrMsg, deleteFailMsg, deleteForbiddenMsg,
} = require('../config/const');

const readArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      if (!article) {
        throw new ServerError(serverErrMsg);
      }
      res.send({ data: article });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const id = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner: id,
  })
    .then((article) => {
      res.status(201).send({ data: article });
    })
    .catch(() => {
      next(new RequestError(requestErrMsg));
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .select('+owner')
    .orFail(() => {
      throw new NotFoundError(articleNotFoundErrMsg);
    })
    .then((article) => {
      if (req.user._id === article.owner.toString()) {
        const articleDeleted = article;
        Article.deleteOne(article)
          .orFail(() => {
            throw new ServerError(deleteFailMsg);
          })
          .then(() => res.send({ data: articleDeleted }))
          .catch(next);
      } else {
        throw new ForbiddenError(deleteForbiddenMsg);
      }
    })
    .catch(next);
};

module.exports = {
  readArticles, createArticle, deleteArticle,
};
