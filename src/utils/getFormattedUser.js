const getFormattedUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        location: user.location,
        occupation: user.occupation
    }
}

module.exports = getFormattedUser;