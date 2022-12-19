const getFriendList = async (user) => {
    await user.populate("friends")

    const formattedFriends = user.friends.map((friend) => {
        return {
            id: friend.id,
            name: friend.name,
            avatar: friend.avatar,
            isFriend: true
        }
    })

    return formattedFriends
}

module.exports = getFriendList;