const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.registerUser = catchAsyncErrors((req, res, next) => {
    if (!req.body.name) {
        return next(new ErrorHandler('Please enter user name', 400));
    }

    res.status(201).json({
        message: 'Account Register Successfully'
    })
})
