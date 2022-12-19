const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { createPost, getPost, getFeedPosts, getOwnPosts, getUserPosts, likepost, unLikePost, deletePost } = require('../controllers/postController');

const router = express.Router();

router.route('/post/create').post(isAuthenticatedUser, createPost);
router.route('/post/:id').get(isAuthenticatedUser, getPost);
router.route('/post/:id/like').put(isAuthenticatedUser, likepost);
router.route('/post/:id/unlike').put(isAuthenticatedUser, unLikePost);
router.route('/post/:id/delete').delete(isAuthenticatedUser, deletePost);
router.route('/user/:id/posts').get(isAuthenticatedUser, getUserPosts);
router.route('/me/posts').get(isAuthenticatedUser, getOwnPosts);
router.route('/posts').get(isAuthenticatedUser, getFeedPosts);

module.exports = router;