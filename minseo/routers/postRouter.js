const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();
const validateToken = require('../middleware/auth');

router.post('/post', validateToken, postController.createPost);
router.get('/posts', postController.getAllPosts);
router.get('/user/posts/:userId', postController.getPostByUserId);

router.patch('/:userId/:postId', postController.updatePost);
router.delete('/:userId/:postId', postController.deletePost);

module.exports = {
  router,
};
