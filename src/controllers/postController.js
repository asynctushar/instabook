const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Post = require('../models/Post');
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

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
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

    const post = await Post.findById(id);
    if (!post) {
        return next(new ErrorHandler("Post not found."))
    }

    const user = await getUserDetails(post.user, req);

    const formattedPost = {
        id: post.id,
        description: post.description,
        picture: post.picture,
        likes: post.likes,
        comments: post.comments,
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

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
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

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
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
        return next(new ErrorHandler("User not found."))
    }

    const userAllposts = await Post.find({
        user: id
    })

    // all user posts with user details
    const formattedAllPosts = await Promise.all(userAllposts.map(async (post) => {
        const postAuthor = await getUserDetails(post.user, req);

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
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
    const isLiked = post.likes.get(userId);

    if (isLiked) {
        return next(new ErrorHandler("You already liked this post", 400));
    }

    post.likes.set(userId, true);

    await post.save();

    res.status(200).json({
        success: true,
        post
    })
});

// UnLike post 
exports.unLikePost = catchAsyncErrors(async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (!isLiked) {
        return next(new ErrorHandler("You didn't like this post", 400));
    }

    post.likes.delete(userId, true);

    await post.save();

    res.status(200).json({
        success: true,
        post
    })
});

// delete post 
exports.deletePost = catchAsyncErrors(async (req, res, next) => {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorHandler("Post not found."))
    }

    const isOwner = post.user.toString() === req.user.id;

    if (!isOwner) {
        return next(new ErrorHandler("You didn't create this post."))
    }

    await post.delete();

    res.status(200).json({
        success: true,
        message: 'Post deleted successfully.'
    })
})
