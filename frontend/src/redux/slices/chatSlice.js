import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    conversations: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload.reverse();
        }
    }
});


export default chatSlice;