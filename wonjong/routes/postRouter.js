const express = require('express');
const postController = require('../controllers/postController');
const validationToken = require('../Middleware/auth');
const router = express.Router();

router.post('/postup', validationToken, postController.postUp);
router.get('/postallview', validationToken, postController.allPostViews);
router.patch('/postupdate/:postId', validationToken, postController.patchPost);
router.delete('/removepost/:postId', validationToken, postController.deletePost);
module.exports = {
  router,
};
