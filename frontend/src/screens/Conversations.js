import WidgetWrapper from '../customs/WidgetWrapper';
import { Fragment, useEffect } from 'react';
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConversations } from '../redux/actions/chatAction';
import ConversationBox from '../components/ConversationBox';

const Conversations = () => {
    const isMobileScreen = useMediaQuery("(max-width: 600px)");
    const { conversations, isLoading } = useSelector((state) => state.chatState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllConversations());
    }, [dispatch]);

    return (
        <WidgetWrapper m="2rem" height="80vh" maxHeight="80vh" display="flex" justifyContent="center">
            {!isLoading && (
                <Fragment>
                    {conversations.length < 1 ? (
                        <Typography textAlign="center" variant="h4" sx={{ mt: '10rem' }}> No conversation yet </Typography>
                    ) : (
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
                                        <Typography textAlign="center" variant="h4" sx={{ mt: '10rem' }}> Open a conversation to chat </Typography>
                                    </Box>
                                </Fragment>
                            )}
                        </Fragment>
                    )}
                </Fragment>
            )}
        </WidgetWrapper >
    )
}
export default Conversations;