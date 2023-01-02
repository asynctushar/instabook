import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';

const Message = ({ message, palette, ownUser, reciever, isMobileScreen }) => {
    const scrollRef = useRef();
    const navigate = useNavigate();
    const user = message.senderId === ownUser._id ? ownUser : reciever

    useEffect(() => {
        scrollRef?.current.scrollIntoView({ behavior: "smooth" });
    }, [message]);   // eslint-disable-line react-hooks/exhaustive-deps

    const onAvatarClick = () => {
            navigate(`/user/${message.senderId}`);
    }

    return (
        <Box display="flex" alignItems={message.senderId === ownUser._id ? "end" : "start"} flexDirection="column" mb="1rem" ref={scrollRef} key={message._id}>
            <Box display="flex" gap=".5rem" justifyContent="space-between" alignItems="flex-start" maxWidth="400px">
                {message.senderId !== ownUser._id && (
                    <Tooltip title={user?.name}>
                        <img
                            onClick={onAvatarClick}
                            style={{
                                objectFit: 'cover',
                                width: isMobileScreen ? "35px" : "50px",
                                height: isMobileScreen ? "35px" : "50px",
                                borderRadius: "50%", cursor: "pointer"
                            }}
                            src={user?.avatar.url}
                            alt="avatar"
                        />
                    </Tooltip>
                )}
                <Typography sx={{ backgroundColor: palette.primary.main, padding: "1rem", borderRadius: '1rem' }}>{message.description}</Typography>
            </Box>
            <Typography sx={{ ml: "6rem", mt: '4px' }}>{format(message.createdAt)}</Typography>
        </Box>
    )
}
export default Message;