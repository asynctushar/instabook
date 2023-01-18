import axios from 'axios';
import chatSlice from "../slices/chatSlice";
import appSlice from "../slices/appSlice";
const { setError } = appSlice.actions;
const { setConversations } = chatSlice.actions;

// get all conversations
export const getAllConversations = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/v1/me/conversations');

        dispatch(setConversations(data.conversations));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}

// new Message 
export const createNewMessage = (recieverId, formData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/v1/message/${recieverId}`, formData, { headers: { "Content-Type": "application/json" } });

        dispatch(setConversations(data.conversations));
    } catch (err) {
        dispatch(setError(err.response.data.message));
    }
}