const mongoose = require('mongoose');
const User = require('./User');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    description: {
        type: String,
        trim: true,
        minlength: [10, "Post should have at least 10 characters."],
        maxlength: [10000, "Post should have within 10k characters"],
        required: true,
    },
    picture: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
}, { timestamps: true });

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;