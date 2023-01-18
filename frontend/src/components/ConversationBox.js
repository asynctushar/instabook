import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import appSlice from '../redux/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const ConversationBox = ({ conversation, selectedUserId }) => {
    const ownUser = useSelector((state) => state.userState.user);
    const [user, setUser] = useState(undefined);
    const userId = conversation.members.filter((memb) => memb !== ownUser._id)[0];
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const { setError } = appSlice.actions;
    const isActive = selectedUserId === userId;

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
                <Link state={{id: userId}} style={{ marginBottom: ".5rem", marginRight: ".5rem", borderRadius: ".75rem", textDecoration: "none", color: isActive ? palette.neutral.light : palette.neutral.dark, fontWeight: "500", padding: "1rem", textAlign: "center", backgroundColor: isActive ? "#4f65f0" : palette.background.default, border: `1px solid ${palette.neutral.medium}` }} to="/me/conversation">{user?.name}</Link>
            )}
        </Fragment>
    )
}
export default ConversationBox;