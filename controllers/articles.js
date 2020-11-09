const Article = require('../models/article');
const ServerError = require('../errors/server-err');
const RequestError = require('../errors/request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const readArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      if (!article) {
        throw new ServerError('На сервере произошла ошибка');
      }
      res.send({ data: article });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const id = req.user._id;

  Article.create({ keyword, title, text, date, source, link, image, owner: id })
    .then((article) => {
      res.status(201).send({ data: article });
    })
    .catch(() => {
      next(new RequestError('Ошибка валидации полей пользователя'));
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .select('+owner')
    .orFail(() => {
      throw new NotFoundError('Нет статьи с таким id');
    })
    .then((article) => {
      if (req.user._id === article.owner.toString()) {
        const articleDeleted = article;
        Article.deleteOne(article)
          .orFail(() => {
            throw new ServerError('Сбой сервера - удаление неуспешно');
          })
          .then(() => res.send({ data: articleDeleted }))
          .catch(next);
      } else {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
    })
    .catch(next);
};

module.exports = {
  readArticles, createArticle, deleteArticle,
};
