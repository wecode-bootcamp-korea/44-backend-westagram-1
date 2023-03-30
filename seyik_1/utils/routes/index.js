const express = require('express');
const router = express.Router();

//router만 쓰기때문에 밑에 코드는 사용하지않는다.
//const app = express();

const userRouter = require('./userRouter');
router.use('/users', userRouter.router);

const postRouter = require('./postRouter');
router.use('/posts', postRouter.router);

const likeRouter = require('./likeRouter');
router.use('/likes', likeRouter.router);

module.exports = router;
