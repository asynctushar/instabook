const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const ErrorHandler = require("../utils/errorHandler");
const getFormattedUser = require('../utils/getFormattedUser');
const sendToken = require("../utils/sendToken");
const cloudinary = require('cloudinary').v2;
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const getDataUri = require("../utils/getDataUri");


// Register new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, location, occupation } = req.body;
    const avatar = req.file;

    if (!avatar) {
        return next(new ErrorHandler("Please upload profile picture.", 400));
    }

    const user = await User.create({ name, email, password, location, occupation, avatar });

    // cloudinary
    const avatarUri = getDataUri(avatar);

    const myCloud = await cloudinary.uploader.upload(avatarUri.content, {
        folder: '/instabook/avatars',
        width: 1000,
        height: 1000,
        crop: "scale",
    });

    user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    }

    await user.save();
    await sendToken(user, 201, res);
});

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password.", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Incorrect login information.", 401))
    }

    const isMatchPassword = await user.comparePassword(password);
    if (!isMatchPassword) {
        return next(new ErrorHandler("Incorrect login information.", 401));
    }

    await sendToken(user, 200, res);
});

// update user profile 
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, location, occupation } = req.body;
    const avatar = req.file;
    let userData = { name, email, location, occupation }

    const user = await User.findByIdAndUpdate(req.user.id, userData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (avatar) {
        const avatarUri = getDataUri(avatar);

        const myCloud = await cloudinary.uploader.upload(avatarUri.content, {
            folder: '/instabook/avatars',
            width: 1000,
            height: 1000,
            crop: "scale",
        });

        // distroy previous avatar
        await cloudinary.uploader.destroy(user.avatar.public_id);

        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }

        user.save();
    }

    res.status(200).json({
        success: true,
        message: "User profile updated.",
        user
    })
})

// change password
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword) {
        return next(new ErrorHandler('Please Enter old password.', 400));
    }

    const user = await User.findById(req.user.id).select("+password");
    const isMatchPassword = await user.comparePassword(oldPassword);

    if (!isMatchPassword) {
        return next(new ErrorHandler("Old password is incorrect."), 400);
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("New password does not match with confirm password."), 400);
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
})

// get own user details
exports.getOwnUserDetails = catchAsyncErrors(async (req, res, next) => {
    await sendToken(req.user, 200, res);
})

// get others user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    const formattedUser = getFormattedUser(user);

    res.status(200).json({
        success: true,
        user: formattedUser
    })
});

//Logout a user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});

// Add friend 
exports.addFriend = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const user = req.user;

    if (user.id === id) {
        return next(new ErrorHandler("You can't add yourself as a friend.", 400))
    }

    const friend = await User.findById(id);
    if (!friend) {
        return next(new ErrorHandler("User not found in database."));
    }

    if (user.friends.includes(id)) {
        return next(new ErrorHandler("User is already in your friendlist", 400));
    }

    user.friends.unshift(id);
    friend.friends.unshift(user.id);

    await user.save();
    await friend.save();

    res.status(200).json({
        success: true,
        user,
        message: "User added to your friend list."
    })
})

// Remove a friend
exports.removeFriend = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let user = req.user;

    if (user.id === id) {
        return next(new ErrorHandler("You can't  add or remove yourself as a friend.", 400))
    }

    const friend = await User.findById(id);
    if (!friend) {
        return next(new ErrorHandler("User not found in database."));
    }

    if (!user.friends.includes(id)) {
        return next(new ErrorHandler("User isn't in your friendlist", 400));
    }

    user.friends = user.friends.filter((friend) => friend.toString() !== id);
    friend.friends = friend.friends.filter((friend) => friend.toString() !== user.id);

    user = await user.save();
    await friend.save();

    res.status(200).json({
        success: true,
        user,
        message: "User removed from your friend list."
    });
});

// search user
exports.searchUser = catchAsyncErrors(async (req, res, next) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return next(new ErrorHandler("Please enter keyword query.", 400));
    }

    const users = await User.find({
        name: {
            $regex: keyword,
            $options: "i"
        }
    })

    res.status(200).json({
        success: true,
        users
    });
})

// delete user profile
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    let userFriends = [];
    // find user friends
    await Promise.all(req.user.friends.map(async (friendId) => {
        const friend = await User.findById(friendId);

        userFriends.push(friend);
    }));

    // remove user from userfriend's friendlist 
    await Promise.all(userFriends.map(async (friend) => {
        friend.friends = friend.friends.filter((id) => id.toString() !== req.user.id);

        await friend.save();
    }))

    const userPosts = await Post.find({
        user: req.user.id
    });

    // delete userposts's comments
    await Promise.all(userPosts.map(async (post) => {
        const userPostsComments = await Comment.find({
            post: post.id
        })

        await Promise.all(userPostsComments.map(async (userPostComment) => {
            await userPostComment.delete();
        }))
    }))

    const userComments = await Comment.find({
        user: req.user.id
    })

    // delete user's all comments
    await Promise.all(userComments.map(async (userComment) => {
        const userCommentsPost = await Post.findById(userComment.post)

        if (userCommentsPost) {
            userCommentsPost.comments = userCommentsPost.comments.filter((commentId) => commentId.toString() !== userComment.id);
            await userCommentsPost.save();
        }

        await userComment.delete();
    }))

    // delete user's all posts
    await Promise.all(userPosts.map(async (userPost) => {
        if (userPost.picture.public_id) {
            await cloudinary.uploader.destroy(userPost.picture.public_id);
        }

        await userPost.delete();
    }))

    // delete user's all conversation and messages
    const conversations = await Conversation.find({
        members: { $in: [req.user.id] }
    });

    await Promise.all(conversations.map(async (conversation) => {
        const messages = await Message.find({
            conversationId: conversation._id
        });

        await Promise.all(messages.map(async (message) => await message.delete()));
        return await conversation.delete();
    }))

    await cloudinary.uploader.destroy(req.user.avatar.public_id);
    await User.findByIdAndDelete(req.user.id);

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})
