import { useParams, useNavigate } from "react-router-dom";
import WidgetWrapper from "../customs/WidgetWrapper";
import { Fragment, useEffect, useState, useRef } from 'react';
import { Box, useTheme, Divider, InputBase, IconButton, useMediaQuery, Dialog, Tooltip, Typography } from '@mui/material';
import { DarkMode, KeyboardArrowLeft, LightMode, Send } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createNewMessage, getAllConversations } from '../redux/actions/chatAction';
import Message from '../components/Message';
import axios from 'axios';
import appSlice from '../redux/slices/appSlice';
import { changeMode } from '../redux/actions/appAction';
import UserImage from "../components/UserImage";
import { io } from 'socket.io-client';
import ConversationBox from "../components/ConversationBox";

const Conversation = () => {
    const [myMessage, setMyMessage] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch();
    const [reciever, setReciever] = useState(undefined);
    const { palette } = useTheme();
    const [messages, setMessages] = useState(undefined);
    const [realtimeMessage, setRealTimeMessage] = useState(null);
    const ownUser = useSelector((state) => state.userState.user);
    const { conversations, isLoading } = useSelector((state) => state.chatState);
    const [isUserLoading, setIsUserLoading] = useState(true)
    const { setError } = appSlice.actions;
    const isMobileScreen = useMediaQuery("(max-width: 600px)");
    const navigate = useNavigate();
    const socket = useRef();

    useEffect(() => {
        dispatch(getAllConversations());
    }, [dispatch]);

    // socket connect
    useEffect(() => {
        socket.current = io("/");

        // get realtime message from socket
        socket.current.on("getMessage", (data) => {
            if (data.senderId === id) {
                setRealTimeMessage({
                    senderId: data.senderId,
                    description: data.description,
                    _id: Math.random(),
                    createdAt: Date.now()
                })
            }
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // add user reference to the server at socket connect
    useEffect(() => {
        socket.current.emit("addUser", ownUser._id);
    }, [ownUser])

    useEffect(() => {
        const getUserDetails = async (id) => {
            try {
                const { data } = await axios.get(`/api/v1/user/${id}`);

                setReciever(data.user);
                setIsUserLoading(false)
            } catch (err) {
                dispatch(setError(err.response.data.message));
                setIsUserLoading(false)
            }
        }

        getUserDetails(id);
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getAllMessages = async (id) => {
            try {
                const { data } = await axios.get(`/api/v1/user/${id}/messages`);

                setMessages(data.messages);
            } catch (err) {
                dispatch(setError(err.response.data.message));
            }
        }

        getAllMessages(id)
    }, [id, conversations]);  // eslint-disable-line react-hooks/exhaustive-deps

    // push realtime message to messages 
    useEffect(() => {
        if (realtimeMessage && messages) {
            setMessages([...messages, realtimeMessage])
        }
    }, [realtimeMessage]) // eslint-disable-line react-hooks/exhaustive-deps

    // send message to another user
    const messageHandler = () => {
        dispatch(createNewMessage(id, { description: myMessage }));

        // send real time message to that connected user if so
        socket.current.emit("sendMessage", {
            senderId: ownUser._id,
            recieverId: id,
            description: myMessage
        })
        setMyMessage("")
    }

    return (
        <WidgetWrapper m="2rem" height="80vh" maxHeight="80vh" display="flex" justifyContent="center">
            {!isLoading && (
                <Fragment>
                    <Box width={isMobileScreen ? "100%" : "20%"}>
                        <Box display="flex" flexDirection="column" height="80vh">
                            {conversations.map((conv) => (
                                <ConversationBox conversation={conv} key={conv._id} />
                            ))}
                        </Box >
                    </Box>
                    {!isMobileScreen && (
                        <Fragment>
                            <Divider orientation="vertical" flexItem={true} />
                            <Box width="78%" height="80vh" >

                                <Box p="2rem" minHeight="60vh" height="60vh" backgroundColor={palette.primary.light} sx={{ overflowY: "scroll", '&::-webkit-scrollbar': { display: "none" } }}>
                                    {!isUserLoading && (
                                        <Fragment>
                                            {messages?.length < 1 ? (
                                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt="1.5rem">
                                                    <UserImage avatar={reciever.avatar} userId={reciever.id} size="150px" />
                                                    <Typography
                                                        fontSize="1.8rem"
                                                        mt="2rem"
                                                        textTransform="capitalize"
                                                        variant="h4"
                                                        color={palette.neutral.dark}
                                                        fontWeight="500"
                                                        onClick={() => navigate(`/user/${reciever.id}`)}
                                                        sx={{
                                                            ":hover": {
                                                                cursor: "pointer"
                                                            }
                                                        }} >
                                                        {reciever.name}
                                                    </Typography>
                                                    <Typography textAlign="center" variant="h4" sx={{ mt: '4rem' }}> No conversation yet </Typography>
                                                </Box>
                                            ) : (
                                                messages?.map((message) => (
                                                    <Message reciever={reciever} message={message} key={message._id} palette={palette} ownUser={ownUser} setError={setError} />
                                                ))
                                            )}
                                        </Fragment>
                                    )}
                                </Box>
                                <Divider />
                                <Box display="flex" alignSelf="end" justifyContent="end" width="100%" backgroundColor={palette.primary.light} p="1rem">
                                    <Box width="40%" display="flex" justifyContent="space-between" backgroundColor={palette.neutral.light} border={`1px solid ${palette.neutral.main}`} borderRadius="9px" padding="1rem .5rem 1rem 1.5rem">
                                        <InputBase placeholder="Your message..." value={myMessage}
                                            onChange={(e) => setMyMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && messageHandler()}
                                        />
                                        <IconButton disabled={myMessage.length < 1 ? true : false} onClick={messageHandler} >
                                            <Send sx={{ color: palette.primary.dark }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Fragment>
                    )}
                    {isMobileScreen && (
                        <Dialog
                            fullScreen={true}
                            open={true}>
                            <Box>
                                <Box height="60px" backgroundColor={palette.primary.main} display="flex" alignItems="center" px="1rem" justifyContent="space-between">
                                    <IconButton size="large" onClick={() => {
                                        navigate('/me/conversations')
                                    }}>
                                        <KeyboardArrowLeft sx={{ color: palette.background.alt }} />
                                    </IconButton>
                                    <Tooltip title="Change Mode">
                                        <IconButton onClick={() => dispatch(changeMode())} >
                                            {palette.mode === "dark" ? (
                                                <DarkMode sx={{ fontSize: "25px" }} />
                                            ) : (
                                                <LightMode sx={{ color: palette.neutral.dark, fontSize: "25px" }} />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box p="1rem" minHeight="60vh" height="78vh" backgroundColor={palette.primary.light} sx={{ overflowY: "scroll", '&::-webkit-scrollbar': { display: "none" } }}>
                                    {!isUserLoading && (
                                        <Fragment>
                                            {messages?.length < 1 ? (
                                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt="2rem">
                                                    <UserImage avatar={reciever.avatar} userId={reciever.id} size="150px" />
                                                    <Typography
                                                        fontSize="1.5rem"
                                                        mt="2rem"
                                                        textTransform="capitalize"
                                                        variant="h4"
                                                        color={palette.neutral.dark}
                                                        fontWeight="500"
                                                        onClick={() => navigate(`/user/${reciever.id}`)}
                                                        sx={{
                                                            ":hover": {
                                                                cursor: "pointer"
                                                            }
                                                        }} >
                                                        {reciever.name}
                                                    </Typography>
                                                    <Typography textAlign="center" variant="h5" sx={{ mt: '4rem' }}> No conversation yet </Typography>
                                                </Box>
                                            ) : (
                                                messages?.map((message) => (
                                                    <Message reciever={reciever} message={message} key={message._id} palette={palette} ownUser={ownUser} isMobileScreen={isMobileScreen} />
                                                ))
                                            )}
                                        </Fragment>
                                    )}
                                </Box>
                                <Divider />
                                <Box display="flex" alignSelf="end" justifyContent="end" width="100%" backgroundColor={palette.primary.light} p="1rem">
                                    <Box width="100%" display="flex" justifyContent="space-between" backgroundColor={palette.neutral.light} border={`1px solid ${palette.neutral.main}`} borderRadius="9px" padding="1rem .5rem 1rem 1.5rem">
                                        <InputBase placeholder="Your message..." value={myMessage}
                                            onChange={(e) => setMyMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && messageHandler()}
                                        />
                                        <IconButton disabled={myMessage.length < 1 ? true : false} onClick={messageHandler} >
                                            <Send sx={{ color: palette.primary.dark }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Dialog>
                    )}
                </Fragment>
            )
            }
        </WidgetWrapper >
    )
}
export default Conversation;