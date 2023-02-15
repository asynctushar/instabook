const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const getDataUri = require('../utils/getDataUri');

// create a post
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    const { description } = req.body;
    let picture = req.file;

    const post = await Post.create({
        user: req.user.id,
        description,
        likes: {}
    });

    // add cloudinary later
    if (picture) {
        const pictureUri = getDataUri(picture);

        const myCloud = await cloudinary.uploader.upload(pictureUri.content, {
            folder: '/instabook/pictures',
            crop: "scale",
        });

        post.picture = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    await post.save();

    res.status(201).json({
        success: true,
        message: "Post created successfully.",
        post
    })
});


// get a specific post
exports.getPost = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const post = await (await Post.findById(id));
    if (!post) {
        return next(new ErrorHandler("Post not found.", 404))
    }

    res.status(200).json({
        success: true,
        post
    })
});

// get all post at feed
exports.getFeedPosts = catchAsyncErrors(async (req, res, next) => {
    const allposts = await Post.find();

    res.status(201).json({
        success: true,
        posts: allposts
    })
});

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

    res.status(201).json({
        success: true,
        posts: userAllposts
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
        return next(new ErrorHandler("Post not found.", 404))
    }

    const isOwner = post.user.toString() === req.user.id;

    if (!isOwner) {
        return next(new ErrorHandler("You didn't create this post."))
    }

    if (post.picture.public_id) {
        await cloudinary.uploader.destroy(post.picture.public_id);
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
