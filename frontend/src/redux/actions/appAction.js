import appSlice from "../slices/appSlice";
const { setMode } = appSlice.actions;

export const changeMode = () => (dispatch) => {
    dispatch(setMode());
}