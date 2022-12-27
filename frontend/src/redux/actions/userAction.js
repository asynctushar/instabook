import userSlice from "../slices/userSlice";
import axios from 'axios';
import appSlice from "../slices/appSlice";
import postSlice from '../slices/postSlice';

const { setUser, setLoader, removeUser, setFriend, setSingleUser } = userSlice.actions;
const { setError } = appSlice.actions;
const { setPosts } = postSlice.actions;

// get user from cookie
export const getUser = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/me');

        dispatch(setUser(data.user));
        dispatch(setFriend(data.friends));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// register user
export const registerUser = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/register', formData, { headers: { "Content-Type": "multipart/form-data" } });
        dispatch(setUser(data.user));
        dispatch(setFriend(data.friends));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// login user
export const logInUser = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/login', formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setUser(data.user));
        dispatch(setFriend(data.friends));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// logout user
export const logOutUser = () => async (dispatch) => {
    try {
        dispatch(setLoader(true))
        await axios.get('/api/v1/logout');

        dispatch(removeUser());
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}

// get single user 
export const  getSingleUser = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/user/${id}`);

        dispatch(setSingleUser(data.user));
    } catch (err) {
        dispatch(setError(err.response.data.message))
    }
}

// add friend 
export const addFriend = (userId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/me/friend/add/${userId}`);
        
        dispatch(setPosts(data.posts));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// remove friend 
export const removeFriend = (userId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/me/friend/remove/${userId}`);
        
        dispatch(setPosts(data.posts));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

