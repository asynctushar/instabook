const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }],
        validate: [(val) => val.length === 2, "Conversation can have two members."]
    }
}, { timestamps: true });


const Conversation = mongoose.model("Conversations", ConversationSchema);


module.exports = Conversation;