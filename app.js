const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const apiLimiter = require('./routes/rate-limiter');
const router = require('./routes/index');

const { PORT = 3000, MONGODB = 27017 } = process.env;
const app = express();

app.use(apiLimiter);

mongoose.connect(`mongodb://localhost: ${MONGODB}/newsdb`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.set('runValidators', true);

app.use('/', router);

app.listen(PORT, () => {});
