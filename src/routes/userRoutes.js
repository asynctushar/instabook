const express = require('express');
const { registerUser, loginUser, getOwnUserDetails, getUserDetails, logoutUser, addFriend, removeFriend, getFriendList, searchUser, deleteUser, updateUser, changePassword } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const imageUpload = require('../middlewares/imageUpload');

const router = express.Router();

router.route('/register').post(imageUpload('avatar'), registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/me').get(isAuthenticatedUser, getOwnUserDetails).delete(isAuthenticatedUser, deleteUser).put(isAuthenticatedUser, imageUpload('avatar'), updateUser);
router.route('/password/change').put(isAuthenticatedUser, changePassword)
router.route('/me/friend/add/:id').get(isAuthenticatedUser, addFriend);
router.route('/me/friend/remove/:id').get(isAuthenticatedUser, removeFriend);
router.route('/user/:id').get(isAuthenticatedUser, getUserDetails);
router.route('/search').get(isAuthenticatedUser, searchUser);

module.exports = router;