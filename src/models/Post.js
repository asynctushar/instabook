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
        minlength: [20, "Post should have at least 20 characters."],
        maxlength: [10000, "Post should have within 10k characters"],
        required: true,
    },
    picture: {
        public_id: {
            type: String,
            default: "not uploaded"
        },
        url: {
            type: String,
            default: "not uploaded"
        }
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: [
        {
            types: mongoose.Schema.Types.ObjectId,
            // ref: "Comments"
        }
    ]
}, { timestamps: true });

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;