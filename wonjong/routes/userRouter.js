const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.get('/:userId', userController.userAllPostView);

module.exports = {
  router,
};
