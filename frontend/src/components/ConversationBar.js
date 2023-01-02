import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import ConversationBox from "./ConversationBox";

const ConversationBar = () => {
    const { conversations } = useSelector((state) => state.chatState);

    return (
        <Box display="flex" flexDirection="column" height="80vh">
            {conversations.map((conv) => (
                <ConversationBox conversation={conv} key={conv._id} />
            ))}
        </Box >
    )
}
export default ConversationBar;