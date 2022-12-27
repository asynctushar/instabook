import axios from "axios";
import postSlice from "../slices/postSlice";
import appSlice from "../slices/appSlice";

const { setPosts, setLoader, setSingleUserPosts, setOwnUserPosts } = postSlice.actions;
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

// get own posts
export const getOwnUserPosts = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/me/posts');

        dispatch(setOwnUserPosts(data.posts));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err.response.data.message));
    }
}

// get single user posts
export const getSingleUserPosts = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/user/${id}/posts`);

        dispatch(setSingleUserPosts(data.posts));
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

        dispatch(setPosts(data.posts));
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

        dispatch(setPosts(data.posts));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// unlike a post
export const unlikePost = (postId) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/post/${postId}/unlike`);

        dispatch(setPosts(data.posts));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}
