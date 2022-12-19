const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Comment = require('../models/Comments');
const Post = require('../models/Post');
const ErrorHandler = require('../utils/errorHandler');
const getUserDetails = require('../utils/getUserDetails');

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
    await post.populate('comments');

    // get user details of comments
    const formattedComments = await Promise.all(post.comments.map(async (comment) => {
        const commentsuser = await getUserDetails(comment.user, req);

        return {
            user: commentsuser,
            id: comment.id,
            comment: comment.comment,
            post: comment.post
        }
    }));


    const user = await getUserDetails(post.user, req);
    const formattedPost = {
        id: post.id,
        description: post.description,
        picture: post.picture,
        likes: post.likes,
        comments: formattedComments,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user
    }


    res.status(201).json({
        success: true,
        message: "Comment created successfully.",
        post: formattedPost
    })
})

// delete comment 
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
    const commentId = req.params.comment;
    const postId = req.params.id;
    const userId = req.user.id;


    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorHandler("Comment not Found.", 404))
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
        message: "Comment deleted "
    })
})