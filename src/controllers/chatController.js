const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Message = require('../models/Message');
const ErrorHandler = require('../utils/errorHandler');

// new message
exports.createNewMessage = catchAsyncErrors(async (req, res, next) => {
    const recieverId = req.params.id;
    const description = req.body.description;

    if (!description) {
        return next(new ErrorHandler("Please enter message description", 400));
    }

    if (recieverId === req.user.id) {
        return next(new ErrorHandler("You can't send message yourself.", 400));
    }

    const reciever = await User.findById(recieverId);
    if (!reciever) {
        return next(new ErrorHandler("Reciever not found", 404));
    }

    let conversation = await Conversation.findOne({
        members: { $all: [req.user.id, recieverId] }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            members: [req.user.id, recieverId]
        })
    }

    await Message.create({
        conversationId: conversation.id,
        senderId: req.user.id,
        description
    })

    const conversations = await Conversation.find({
        members: { $in: [req.user.id] }
    })

    res.status(201).json({
        success: true,
        message: "Conversation created successfully",
        conversations
    })
})

// get users all conversation
exports.getAllConversations = catchAsyncErrors(async (req, res, next) => {
    const conversations = await Conversation.find({
        members: { $in: [req.user.id] }
    })

    res.status(200).json({
        success: true,
        conversations
    })
});

// get messages of individual conversation
exports.getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const recieverId = req.params.id
    const conversation = await Conversation.findOne({
        members: { $all: [req.user.id, recieverId] }
    })

    if (!conversation) {
        res.status(200).json({
            success: true,
            messages: []
        });
        
    } else {
        const messages = await Message.find({
            conversationId: conversation._id
        })

        res.status(200).json({
            success: true,
            messages
        })
    }

})