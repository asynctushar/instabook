const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");

// Register new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, avatar, location, occupation } = req.body;

    // add cloudinary later

    const user = await User.create({ name, email, password, avatar, location, occupation });

    sendToken(user, 201, res);
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

    sendToken(user, 200, res);
})
