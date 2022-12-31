import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    posts: [],
    singlePost: undefined,
    isDeleted: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.reverse();
        },
        setPost: (state, action) => {
            const copyPosts = [...state.posts];
            copyPosts.unshift(action.payload);

            state.posts = copyPosts;
        },
        updatePost: (state, action) => {
            const copyPosts = [...state.posts];

            state.posts = copyPosts.map((post) => {
                if (post._id === action.payload._id) return action.payload;

                return post;
            })
        },
        setSinglePost: (state, action) => {
            state.singlePost = action.payload;
        },
        setDeleteStatus: (state, action) => {
            state.isDeleted = action.payload;
        }
    }
});


export default postSlice;