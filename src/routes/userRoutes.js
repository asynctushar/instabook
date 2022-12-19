const express = require('express');
const { registerUser, loginUser, getOwnUserDetails, getUserDetails, logoutUser, addFriend, removeFriend, getFriendList } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/me').get(isAuthenticatedUser, getOwnUserDetails);
router.route('/me/friend/add/:id').get(isAuthenticatedUser, addFriend);
router.route('/me/friend/remove/:id').get(isAuthenticatedUser, removeFriend);
router.route('/user/:id').get(isAuthenticatedUser, getUserDetails);

module.exports = router;