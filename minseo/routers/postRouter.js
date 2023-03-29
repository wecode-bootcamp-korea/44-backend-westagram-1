const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();
const validateToken = require('../middleware/auth');

router.post('', validateToken, postController.createPost);
router.get('', postController.getAllPosts);
router.get('/:userId', postController.getPostByUserId);

router.patch('/:postId', validateToken, postController.updatePost);
router.delete('/:postId', validateToken, postController.deletePost);

module.exports = {
  router,
};
