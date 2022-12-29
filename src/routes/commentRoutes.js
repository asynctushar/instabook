const express = require('express');
const { createComment, deleteComment, getComment } = require('../controllers/commentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const Router = express.Router();


Router.route("/post/:id/comment").post(isAuthenticatedUser, createComment);
Router.route("/comment/:id").get(isAuthenticatedUser, getComment);
Router.route("/post/:id/:comment").delete(isAuthenticatedUser, deleteComment);

module.exports = Router;