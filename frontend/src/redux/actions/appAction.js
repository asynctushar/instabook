import appSlice from "../slices/appSlice";
const { setMode, clearError } = appSlice.actions;

// change light mode
export const changeMode = () => (dispatch) => {
    dispatch(setMode());
}

export const clearErrorAction = () => (dispatch) => {
    dispatch(clearError());
}