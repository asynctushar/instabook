import userSlice from "../slices/userSlice";
import axios from 'axios';
import appSlice from "../slices/appSlice";

const { setUser, setLoader, removeUser, setSearchUsers, setSearchLoader, setUpdateStatus, setUpdateLoader, setDeleteLoader } = userSlice.actions;
const { setError } = appSlice.actions;

// get user from cookie
export const getUser = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/me');

        dispatch(setUser(data.user));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError("Please log in."));
        dispatch(setLoader(false));
    }
}

// register user
export const registerUser = (formData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/register', formData, { headers: { "Content-Type": "multipart/form-data" } });
        dispatch(setUser(data.user));
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
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setLoader(false));
    }
}
// update user
export const updateUser = (formData) => async (dispatch) => {
    try {
        dispatch(setUpdateLoader(true));
        const { data } = await axios.put('/api/v1/me', formData, { headers: { "Content-Type": "multipart/form-data" } });

        dispatch(setUser(data.user));
        dispatch(setUpdateStatus(true));
        dispatch(setUpdateLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setUpdateLoader(false));
    }
}

// change password
export const changePassword = (formData) => async (dispatch) => {
    try {
        dispatch(setUpdateLoader(true));
        const { data } = await axios.put('/api/v1/password/change', formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setUser(data.user));
        dispatch(setUpdateStatus(true));
        dispatch(setUpdateLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setUpdateLoader(false));
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

// add friend 
export const addFriend = (userId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/me/friend/add/${userId}`);

        dispatch(setUser(data.user));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// remove friend 
export const removeFriend = (userId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/me/friend/remove/${userId}`);

        dispatch(setUser(data.user));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// search user
export const searchUser = (keyword) => async (dispatch) => {
    try {
        dispatch(setSearchLoader(true));
        const { data } = await axios.get(`/api/v1/search?keyword=${keyword}`);

        dispatch(setSearchUsers(data.users));
        dispatch(setSearchLoader(false));
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setSearchLoader(false));
    }
}

// delete user 
export const deleteUser = () => async (dispatch) => {
    try {
        dispatch(setDeleteLoader(true))
        await axios.delete('/api/v1/me');

        dispatch(removeUser());
        dispatch(setDeleteLoader(false))
    } catch (err) {
        dispatch(setError(err.response.data.message));
        dispatch(setDeleteLoader(false));
    }
}


