const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const getFormattedUser = require('../utils/getFormattedUser');
const sendToken = require("../utils/sendToken");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


// Register new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, location, occupation } = req.body;
    const avatar = req.file;

    if (!avatar) {
        return next(new ErrorHandler("Please upload profile picture.", 400));
    }

    const user = await User.create({ name, email, password, location, occupation, avatar });

    // cloudinary
    const myCloud = await cloudinary.uploader.upload(avatar.path, {
        folder: '/instabook/avatars',
        width: 1000,
        height: 1000,
        crop: "scale",
    });

    // removing temp image file
    fs.rm(avatar.path, { recursive: true }, (err) => { });

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
    })

});
