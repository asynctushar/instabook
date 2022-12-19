const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Post = require('../models/Post');
const Comment = require('../models/Comments');
const getUserDetails = require('../utils/getUserDetails');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/User');

// create a post
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    const { description, picture, } = req.body;

    // add cloudinary later

    await Post.create({
        user: req.user.id,
        description,
        likes: {}
    })

    const allposts = await Post.find();


    // all posts with user details
    const formattedAllPosts = await Promise.all(allposts.map(async (post) => {
        const user = await getUserDetails(post.user, req);
        const isLiked = post.likes.get(req.user.id);

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
            isLiked,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: user
        }
    }));

    res.status(201).json({
        success: true,
        message: "Post created successfully.",
        postCount: allposts.length,
        posts: formattedAllPosts.reverse()
    })
});


// get a specific post
exports.getPost = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const post = await (await Post.findById(id)).populate('comments');
    if (!post) {
        return next(new ErrorHandler("Post not found.", 404))
    }

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
    const isLiked = post.likes.get(req.user.id);

    const formattedPost = {
        id: post.id,
        description: post.description,
        picture: post.picture,
        likes: post.likes,
        isLiked,
        comments: formattedComments,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user
    }

    res.status(200).json({
        success: true,
        post: formattedPost
    })
});

// get all post at feed
exports.getFeedPosts = catchAsyncErrors(async (req, res, next) => {
    const allposts = await Post.find();

    // all posts with user details
    const formattedAllPosts = await Promise.all(allposts.map(async (post) => {
        const user = await getUserDetails(post.user, req);
        const isLiked = post.likes.get(req.user.id);

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
            isLiked,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: user
        }
    }));

    res.status(201).json({
        success: true,
        postCount: allposts.length,
        posts: formattedAllPosts.reverse()
    })
});

// get own posts
exports.getOwnPosts = catchAsyncErrors(async (req, res, next) => {
    const userAllposts = await Post.find({
        user: req.user.id
    });

    // all user posts with user details
    const formattedAllPosts = await Promise.all(userAllposts.map(async (post) => {
        const user = await getUserDetails(post.user, req);
        const isLiked = post.likes.get(req.user.id);

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
            isLiked,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: user
        }
    }));

    res.status(201).json({
        success: true,
        postCount: userAllposts.length,
        posts: formattedAllPosts.reverse()
    })
})

// get user posts
exports.getUserPosts = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found.", 404))
    }

    const userAllposts = await Post.find({
        user: id
    })

    // all user posts with user details
    const formattedAllPosts = await Promise.all(userAllposts.map(async (post) => {
        const postAuthor = await getUserDetails(post.user, req);
        const isLiked = post.likes.get(req.user.id);

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
            isLiked,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: postAuthor
        }
    }));

    res.status(201).json({
        success: true,
        postCount: userAllposts.length,
        posts: formattedAllPosts.reverse()
    })
});

// Like post
exports.likepost = catchAsyncErrors(async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    let isLiked = post.likes.get(userId);

    if (isLiked) {
        return next(new ErrorHandler("You already liked this post", 400));
    }

    post.likes.set(userId, true);
    await post.save();

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
    isLiked = post.likes.get(req.user.id);

    const formattedPost = {
        id: post.id,
        description: post.description,
        picture: post.picture,
        likes: post.likes,
        isLiked,
        comments: formattedComments,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user
    }


    res.status(200).json({
        success: true,
        post: formattedPost
    })
});

// UnLike post 
exports.unLikePost = catchAsyncErrors(async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    let isLiked = post.likes.get(userId);

    if (!isLiked) {
        return next(new ErrorHandler("You didn't like this post", 400));
    }

    post.likes.delete(userId, true);
    await post.save();

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
    isLiked = post.likes.get(req.user.id);

    const formattedPost = {
        id: post.id,
        description: post.description,
        picture: post.picture,
        likes: post.likes,
        isLiked,
        comments: formattedComments,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user
    }


    res.status(200).json({
        success: true,
        post: formattedPost
    })
});

// delete post 
exports.deletePost = catchAsyncErrors(async (req, res, next) => {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorHandler("Post not found.", 404))
    }

    const isOwner = post.user.toString() === req.user.id;

    if (!isOwner) {
        return next(new ErrorHandler("You didn't create this post."))
    }


    await post.delete();
    await Comment.findOneAndRemove({
        post: postId
    })

    res.status(200).json({
        success: true,
        message: 'Post deleted successfully.'
    })
})
