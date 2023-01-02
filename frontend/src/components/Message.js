import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { format } from 'timeago.js';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

const Message = ({ message, palette, ownUser, setError }) => {
    const scrollRef = useRef();
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        scrollRef?.current.scrollIntoView({ behavior: "smooth" });

        if (!user && message.senderId === ownUser._id) {
            setUser(ownUser)
        }

        if (!user && message.senderId !== ownUser._id) {
            const getUserDetails = async (id) => {
                try {
                    const { data } = await axios.get(`/api/v1/user/${id}`);

                    setUser(data.user);
                } catch (err) {
                    dispatch(setError(err.response.data.message));
                }
            }

            getUserDetails(message.senderId);
        }
    }, [message]);   // eslint-disable-line react-hooks/exhaustive-deps

    const onAvatarClick = () => {
        if (message.senderId === ownUser._id) {
            navigate('/me');
        } else {
            navigate(`/user/${message.senderId}`);
        }
    }

    return (
        <Box display="flex" alignItems={message.senderId === ownUser._id ? "end" : "start"} flexDirection="column" mb="1rem" ref={scrollRef} key={message._id}>
            <Box display="flex" gap=".5rem" justifyContent="space-between" alignItems="flex-start" maxWidth="400px">
                <Tooltip title={user?.name}>
                    <img onClick={onAvatarClick} style={{ objectFit: 'cover', width: "50px", height: "50px", borderRadius: "50%", cursor: "pointer" }} src={user?.avatar.url} alt="avatar" />
                </Tooltip>
                <Typography sx={{ backgroundColor: palette.primary.main, padding: "2rem", borderRadius: '1rem' }}>{message.description}</Typography>
            </Box>
            <Typography sx={{ ml: "6rem", mt: '4px' }}>{format(message.createdAt)}</Typography>
        </Box>
    )
}
export default Message;