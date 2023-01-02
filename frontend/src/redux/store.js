import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import postSlice from './slices/postSlice';
import appSlice from './slices/appSlice';
import chatSlice from './slices/chatSlice';

const reducer = {
    userState: userSlice.reducer,
    postState: postSlice.reducer,
    appState: appSlice.reducer,
    chatState: chatSlice.reducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;












