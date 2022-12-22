const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Post = require('../models/Post');
const Comment = require('../models/Comments');
const getUserDetails = require('../utils/getUserDetails');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/User');
const getFeedPosts = require('../utils/getFeedPosts');
const getPost = require('../utils/getPost');

// create a post
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    const { description, picture, } = req.body;

    // add cloudinary later

    await Post.create({
        user: req.user.id,
        description,
        likes: {}
    })

    const posts = await getFeedPosts(req);

    res.status(201).json({
        success: true,
        message: "Post created successfully.",
        postCount: posts.length,
        posts
    })
});


// get a specific post
exports.getPost = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const post = await (await Post.findById(id)).populate('comments');
    if (!post) {
        return next(new ErrorHandler("Post not found.", 404))
    }

    const formattedPost = await getPost(post, req);

    res.status(200).json({
        success: true,
        post: formattedPost
    })
});

// get all post at feed
exports.getFeedPosts = catchAsyncErrors(async (req, res, next) => {
    const posts = await getFeedPosts(req);

    res.status(201).json({
        success: true,
        postCount: posts.length,
        posts
    })
});

// get own posts
exports.getOwnPosts = catchAsyncErrors(async (req, res, next) => {
    const userAllposts = await Post.find({
        user: req.user.id
    });

    // all user posts with user details
    const formattedUserAllPosts = await Promise.all(userAllposts.map(async (post) => {
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
        posts: formattedUserAllPosts.reverse()
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
    const formattedUserAllPosts = await Promise.all(userAllposts.map(async (post) => {
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
        posts: formattedUserAllPosts.reverse()
    })
});

// need to update  on useposts ands own posts if so
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


    // specific post and feed post
    const formattedPost = await getPost(post, req);
    const posts = await getFeedPosts(req);

    res.status(200).json({
        success: true,
        post: formattedPost,
        posts
    })
});

// need to update on user posts and own posts if so
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


    // specific post and feed posts 
    const formattedPost = await getPost(post, req);
    const posts = await getFeedPosts(req);

    res.status(200).json({
        success: true,
        post: formattedPost,
        posts
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
