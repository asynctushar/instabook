import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: undefined,
    isLoading: true,
    searchUsers: [],
    isSearchLoading: true
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
        setSearchUsers: (state, action) => {
            state.searchUsers = action.payload;
        },
        setSearchLoader: (state, action) => {
            state.isSearchLoading = action.payload;
        }
    }
});


export default userSlice;