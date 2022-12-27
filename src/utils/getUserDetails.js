const User = require("../models/User")

const getUserDetails = async (userId, req) => {

    // in case of own post
    let isFriend = undefined;

    // in case of others post
    if (userId.toString() !== req.user._id.toString()) {
        isFriend = req.user.friends.includes(userId);
    }
    const user = await User.findById(userId);

    return {
        id: user.id,
        name: user.name,
        isFriend,
        avatar: user.avatar,
        location: user.location,
        occupation: user.occupation
    }
}

module.exports = getUserDetails;