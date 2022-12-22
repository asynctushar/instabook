import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light'
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
        }
    }
});


export default appSlice;