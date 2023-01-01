const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Conversations'
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    description: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true });

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;