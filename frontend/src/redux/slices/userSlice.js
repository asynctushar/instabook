import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: undefined,
    isLoading: true,
    friends: [],
    singleUser: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true;
        },
        removeUser: (state, action) => {
            state.user = [];
            state.isAuthenticated = false;
        },
        setFriend: (state, action) => {
            state.friends = action.payload;
        },
        setSingleUser: (state, action) => {
            state.singleUser = action.payload;
        }
    }
});


export default userSlice;