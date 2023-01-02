import { ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const SingleConversation = ({ conversation, palette, ownUserId, handleSetConversation, selectedConv, setError }) => {
    const userId = conversation.members.filter((memb) => memb !== ownUserId)[0];
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

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
        <ListItemButton divider={true}
            selected={selectedConv === conversation}
            onClick={(e) => handleSetConversation(conversation)}
            sx={{ p: "1rem 0", "&.Mui-selected": { backgroundColor: palette.primary.light } }}>
            <ListItemText sx={{ textAlign: "center", textTransform: 'capitalize' }}>{ user?.name}</ListItemText>
        </ListItemButton>
    )
}
export default SingleConversation;