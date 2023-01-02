const express = require('express');
const { createNewMessage, getAllConversations, getAllMessages } = require('../controllers/chatController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const Router = express.Router();

Router.route("/message/:id").post(isAuthenticatedUser, createNewMessage);
Router.route("/me/conversations").get(isAuthenticatedUser, getAllConversations);
Router.route("/user/:id/messages").get(isAuthenticatedUser, getAllMessages);

module.exports = Router;