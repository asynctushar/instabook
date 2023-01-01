const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const ErrorHandler = require('../utils/errorHandler');

// create comment in a post
exports.createComment = catchAsyncErrors(async (req, res, next) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
        return next(new ErrorHandler("Post not found.", 404))
    }

    const comment = await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        post: postId
    })

    post.comments.push(comment.id);

    await post.save();

    res.status(201).json({
        success: true,
        message: "Comment created successfully.",
        post
    })
})

// get specific comment
exports.getComment = catchAsyncErrors(async (req, res, next) => {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
        return next(new ErrorHandler("Comment not Found.", 404))
    }

    res.status(200).json({
        success: true,
        comment
    })
})

// delete comment 
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
    const commentId = req.params.comment;
    const postId = req.params.id;
    const userId = req.user.id;


    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorHandler("Post not Found.", 404))
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        return next(new ErrorHandler("Comment not Found.", 404))
    }

    if (userId !== comment.user.toString()) {
        return next(new ErrorHandler("You didn't create this comment.", 403));
    }

    await comment.delete();
    post.comments = post.comments.filter((comment) => comment.toString() !== commentId);
    await post.save();

    res.status(200).json({
        success: true,
        message: "Comment deleted ",
        post
    })
})