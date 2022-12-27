const getUserDetails = require('./getUserDetails');

const getPost = async (post, req) => {
    // get user details of comments
    const formattedComments = await Promise.all(post.comments.map(async (comment) => {
        const commentsuser = await getUserDetails(comment.user, req);

        return {
            user: commentsuser,
            id: comment.id,
            comment: comment.comment,
            post: comment.post
        }
    }));

    const user = await getUserDetails(post.user, req);
    const isLiked = post.likes.get(req.user.id);

    const formattedPost = {
        id: post.id,
        description: post.description,
        picture: post.picture,
        likes: post.likes,
        isLiked,
        comments: formattedComments,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user
    }

    return formattedPost;
}

module.exports = getPost;