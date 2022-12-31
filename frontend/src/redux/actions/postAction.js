import axios from "axios";
import postSlice from "../slices/postSlice";
import appSlice from "../slices/appSlice";

const { setPosts, setLoader, setPost, updatePost, setSinglePost, setDeleteStatus } = postSlice.actions;
const { setError } = appSlice.actions;

// get feed posts
export const getAllFeedPosts = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/posts');

        dispatch(setPosts(data.posts));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get user posts
export const getSingleUserPosts = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/user/${id}/posts`);

        dispatch(setPosts(data.posts));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// create posts 
export const createNewPost = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/post/create', formData, { headers: { "Content-Type": "multipart/form-data" } });

        dispatch(setPost(data.post));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// like a post
export const likePost = (postId) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/post/${postId}/like`);

        dispatch(updatePost(data.post));
        dispatch(setSinglePost(data.post));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// unlike a post
export const unlikePost = (postId) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/post/${postId}/unlike`);

        dispatch(updatePost(data.post));
        dispatch(setSinglePost(data.post))
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// get single Post 
export const getSinglePost = (postId) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/post/${postId}`);

        dispatch(setSinglePost(data.post));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// comment on a post
export const createComment = ({ postId, comment }) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/v1/post/${postId}/comment`, { comment }, { headers: { "Content-Type": "application/json" } });

        dispatch(setSinglePost(data.post));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// delete a post 
export const deletePost = (postId) => async (dispatch) => {
    try {
        await axios.delete(`/api/v1/post/${postId}/delete`);

        dispatch(setSinglePost(undefined));
        dispatch(setDeleteStatus(true))
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// delete a post 
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/post/${postId}/${commentId}`);

        dispatch(setSinglePost(data.post));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}