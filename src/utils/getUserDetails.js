const User = require("../models/User")

const getUserDetails = async (userId, req) => {

    // in case of own post
    let isFriend = null;

    // in case of others post
    if (userId.toString() !== req.user.id) {
        isFriend = req.user.friends.includes(userId);
    }
    const user = await User.findById(userId);

    return {
        id: user.id,
        name: user.name,
        isFriend,
        avatar: user.avatar
    }
}

module.exports = getUserDetails;