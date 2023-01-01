const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    comment: {
        type: String,
        required: [true, "Please add comment."],
        trim: true,
        minlength: [4, "Comment length should be at least 4 characters."],
        maxlength: [100, "Comment length shouldn't exceed 100 characters."]
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: true
    }
}, { timestamps: true });


const Comment = mongoose.model("Comments", commentSchema);


module.exports = Comment;