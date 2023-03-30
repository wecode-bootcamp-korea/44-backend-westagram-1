const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/postup', postController.postUp);
router.get('/postallview', postController.allPostViews);
router.patch('/postupdate', postController.patchPost);
router.delete('/removepost/:postId', postController.deletePost);
module.exports = {
  router,
};
