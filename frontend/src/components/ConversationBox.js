import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import appSlice from '../redux/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const ConversationBox = ({ conversation }) => {
    const ownUser = useSelector((state) => state.userState.user);
    const [user, setUser] = useState(undefined);
    const userId = conversation.members.filter((memb) => memb !== ownUser._id)[0];
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const { setError } = appSlice.actions;

    useEffect(() => {
        const getUserDetails = async (id) => {
            try {
                const { data } = await axios.get(`/api/v1/user/${id}`);

                setUser(data.user);
            } catch (err) {
                dispatch(setError(err.response.data.message));
            }
        }

        getUserDetails(userId);
    }, [conversation])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Fragment>
            {user && (
                <NavLink style={({ isActive }) => ({ textDecoration: "none", color: palette.neutral.dark, fontWeight: "500", padding: "1rem", textAlign: "center", backgroundColor: isActive ? palette.primary.main : "unset", borderBottom: `1px solid ${palette.neutral.medium}` })} to={`/message/${userId}`}>{user?.name}</NavLink>
            )}
        </Fragment>
    )
}
export default ConversationBox;