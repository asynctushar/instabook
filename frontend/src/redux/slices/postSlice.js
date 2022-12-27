import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    posts: [],
    singleUserPosts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSingleUserPosts: (state, action) => {
            state.singleUserPosts = action.payload;
        },
        setOwnUserPosts: (state, action) => {
            state.ownUserPosts = action.payload;
        }
    }
});


export default postSlice;