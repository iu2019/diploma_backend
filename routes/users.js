const router = require('express').Router();

const {
  readUser,
} = require('../controllers/users');

router.get('/me', readUser);

module.exports = router;
