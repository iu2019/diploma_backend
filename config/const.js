// constrollers/article
const serverErrMsg = 'На сервере произошла ошибка'; // reused: middlwares/errors
const requestErrMsg = 'Ошибка валидации полей пользователя'; // reused: controllers/users
const deleteFailMsg = 'Сбой сервера - удаление неуспешно';
const deleteForbiddenMsg = 'Нельзя удалить чужую статью';
const articleNotFoundErrMsg = 'Нет статьи с таким id';

// controllers/users
const userNotFoundMsg = 'Пользователь не найден';
const pwdFormatMsg = 'Пароль не соответствует требованиям';
const duplicateEmailMsg = 'Повторный email';
const successfulLoginMsg = 'Удачный логин';

// middlwares/auth
const authErrMsg = 'Необходима авторизация';

// models/article
const urlValMsg = 'Здесь нужна ссылка';

// models/user
const credentialsErrMsg = 'Неправильные почта или пароль';
const emailValMsg = 'Здесь нужен email';

// routes/articles

const linkValMsg = 'Поле link не является валидным URL';
const imageValMsg = 'Поле image не является валидным URL';

// routes/index

const requestBodyValMsg = 'Неверное тело запроса';
const endpointNotFoundMsg = 'Ресурс не найден';

module.exports = {
  serverErrMsg,
  requestErrMsg,
  deleteFailMsg,
  deleteForbiddenMsg,
  articleNotFoundErrMsg,
  userNotFoundMsg,
  pwdFormatMsg,
  duplicateEmailMsg,
  successfulLoginMsg,
  authErrMsg,
  urlValMsg,
  credentialsErrMsg,
  emailValMsg,
  linkValMsg,
  imageValMsg,
  requestBodyValMsg,
  endpointNotFoundMsg,
};
