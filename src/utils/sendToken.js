const getFriendList = require("./getFriendList");

const sendToken = async (user, statusCode, res) => {
    const token = user.generateAuthToken();

    const friends = await getFriendList(user)

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        friends
    })
}

module.exports = sendToken;