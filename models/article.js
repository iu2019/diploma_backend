const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 60,
    required: true,
  },
  text: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: true,
  },
  date: {
    type: String,
    minlength: 8,
    maxlength: 20,
    required: true,
  },
  source: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: [true, 'Здесь нужна ссылка'],
    validate: (value) => validator.isURL(value, {

      message: 'Must be a Valid URL',
      protocols: ['http', 'https', 'ftp'],
      require_tld: true,
      require_protocol: true,
    }),
  },
  image: {
    type: String,
    required: [true, 'Здесь нужна ссылка'],
    validate: (value) => validator.isURL(value, {

      message: 'Must be a Valid URL',
      protocols: ['http', 'https', 'ftp'],
      require_tld: true,
      require_protocol: true,
    }),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('article', articleSchema);