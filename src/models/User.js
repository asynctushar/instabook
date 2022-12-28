const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."],
        maxlength: [30, "Name can't exceed 30 characters."],
        minlength: [4, "Name should have minimum 4 characters."],
        Trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: [true, "Email already exist."],
        validate: [validator.isEmail, "Please enter a valid email."],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minlength: [8, "Password should have minimum 8 characters."],
        select: false,
        trim: true
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ],
    avatar: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    location: {
        type: String,
        required: [true, "Please enter your location."],
        trim: true
    },
    occupation: {
        type: String,
        required: [true, "Please enter your occupation."],
        trim: true
    },
    viewedProfile: Number,
    impressions: Number

}, { timestamps: true });

// delete user password before send off
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 8);
})

// check password 
userSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
}

// Generate auth token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

const User = mongoose.model("Users", userSchema);

module.exports = User;