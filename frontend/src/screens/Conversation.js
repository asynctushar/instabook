import WidgetWrapper from '../customs/WidgetWrapper';
import { Fragment, useEffect, useState } from 'react';
import { List, Box, useTheme, Divider, Typography, InputBase, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createNewMessage, getAllConversations } from '../redux/actions/chatAction';
import SingleConversation from '../components/SingleConversation';
import Message from '../components/Message';
import axios from 'axios';
import Loader from '../components/Loader';
import appSlice from '../redux/slices/appSlice';

const Conversation = () => {
    const [conversation, setConversation] = useState(undefined)
    const [myMessage, setMyMessage] = useState('');
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { isLoading, conversations } = useSelector((state) => state.chatState);
    const [messages, setMessages] = useState(undefined);
    const { user } = useSelector((state) => state.userState);
    const { setError } = appSlice.actions;



    useEffect(() => {
        dispatch(getAllConversations());
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (conversation) {
            const getAllMessages = async (id) => {
                try {
                    const { data } = await axios.get(`/api/v1/conversation/${id}/messages`);

                    setMessages(data.messages);
                } catch (err) {
                    dispatch(setError(err.response.data.message));
                }
            }

            getAllMessages(conversation._id)
        }
    }, [conversation, conversations]);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleSetConversation = (conversation) => {
        setConversation(conversation);
    };

    const messageHandler = () => {
        const recieverId = conversation.members.filter((memb) => memb !== user._id)[0]
        dispatch(createNewMessage({ description: myMessage, recieverId }));
        setMyMessage("")
    }

    return (
        <WidgetWrapper m="2rem" height="80vh" maxHeight="80vh" display="flex" justifyContent="center">
            {isLoading ? <Loader /> : (
                <Fragment>
                    <Box width="20%">
                        <List>
                            {conversations?.map((conv) => (
                                <SingleConversation setError={setError} selectedConv={conversation} conversation={conv} key={conv._id} palette={palette} ownUserId={user._id} handleSetConversation={handleSetConversation} />
                            ))}
                        </List>
                    </Box>
                    <Divider orientation="vertical" flexItem={true} />
                    <Box width="78%" height="80vh" >
                        {!conversation ? (
                            <Typography textAlign="center" variant="h4" sx={{ mt: '10rem' }}> Open a conversation to chat </Typography>
                        ) : (
                            <Fragment>
                                <Box p="2rem" minHeight="60vh" height="60vh" backgroundColor={palette.primary.light} sx={{ overflowY: "scroll", '&::-webkit-scrollbar': { display: "none" } }}>
                                    {messages?.map((message) => (
                                        <Message message={message} key={message._id} palette={palette} ownUser={user} setError={setError} />
                                    ))}
                                </Box>
                                <Divider />
                                <Box display="flex" alignSelf="end" justifyContent="end" width="100%" backgroundColor={palette.primary.light} p="1rem">
                                    <Box width="40%" display="flex" justifyContent="space-between" backgroundColor={palette.neutral.light} border={`1px solid ${palette.neutral.main}`} borderRadius="9px" padding="1rem .5rem 1rem 1.5rem">
                                        <InputBase placeholder="Your message..." value={myMessage}
                                            onChange={(e) => setMyMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && messageHandler()}
                                        />
                                        <IconButton disabled={myMessage.length < 1 ? true : false} onClick={messageHandler} >
                                            <Send />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Fragment>
                        )}
                    </Box>
                </Fragment>
            )}
        </WidgetWrapper >
    )
}
export default Conversation;