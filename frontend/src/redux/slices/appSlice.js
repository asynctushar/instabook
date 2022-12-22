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
        }
    }
});


export default appSlice;