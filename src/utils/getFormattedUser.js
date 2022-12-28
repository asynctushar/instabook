const getFormattedUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        location: user.location,
        occupation: user.occupation,
        impressions: user.impressions,
        viewedProfile: user.viewedProfile,
    }
}

module.exports = getFormattedUser;