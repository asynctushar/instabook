import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../customs/WidgetWrapper";
import User from "./User";

const FriendListWidget = ({ friends }) => {
    const { palette } = useTheme();

    return (
        <WidgetWrapper m="1rem 0">
                <Typography color={palette.neutral.darak} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }} >
                    Friend List
                </Typography>
                <Box display="flex" flexDirection="column" gap="1.5rem"  >
                    {friends && friends.map((friend) => (
                        <User userId={friend} key={friend} at="friendList" />
                    ))}
                </Box>
        </WidgetWrapper>
    )
}
export default FriendListWidget;