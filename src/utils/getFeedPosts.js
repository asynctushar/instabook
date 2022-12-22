const Post = require("../models/Post");

const getFeedPosts = async (req) => {
    const allposts = await Post.find();

    // all posts with user details
    const formattedAllPosts = await Promise.all(allposts.map(async (post) => {
        const user = await getUserDetails(post.user, req);
        const isLiked = post.likes.get(req.user.id);

        return {
            id: post.id,
            description: post.description,
            picture: post.picture,
            likes: post.likes,
            isLiked,
            comments: post.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: user
        }
    }));

    return formattedAllPosts.reverse();
}


module.exports = getFeedPosts;