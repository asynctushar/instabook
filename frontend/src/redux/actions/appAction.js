import appSlice from "../slices/appSlice";
const { setMode } = appSlice.actions;

// change light mode
export const changeMode = () => (dispatch) => {
    dispatch(setMode());
}