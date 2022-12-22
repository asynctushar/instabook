import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {},
    isLoading: true
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
        }
    }
});


export default userSlice;