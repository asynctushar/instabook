import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    error: undefined
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state, action) => {
            state.error = undefined;
        }
    }
});


export default appSlice;