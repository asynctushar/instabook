import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import postSlice from './slices/postSlice';
import commentSlice from './slices/commentSlice';
import appSlice from './slices/appSlice';

const reducer = {
    userState: userSlice.reducer,
    postState: postSlice.reducer,
    commentState: commentSlice.reducer,
    appState: appSlice.reducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;












