import { LocationOnOutlined, WorkOutlineOutlined, Twitter, EditOutlined, LinkedIn } from '@mui/icons-material';
import { Divider, Box, useTheme, Typography } from '@mui/material';
import WidgetWrapper from '../customs/WidgetWrapper';
import FlexBetween from '../customs/FlexBetween';
import User from './User';

const UserWidget = ({ user }) => {
    const { palette } = useTheme();

    return (
        <WidgetWrapper >
            <User user={user} type="user" />
            <Divider sx={{ mt: '1.2rem' }} />
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb=".5rem" >
                    <LocationOnOutlined fontSize="large" sx={{ color: palette.neutral.main }} />
                    <Typography color={palette.neutral.medium} >
                        {user.location}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" >
                    <WorkOutlineOutlined fontSize="large" sx={{ color: palette.neutral.main }} />
                    <Typography color={palette.neutral.medium} >
                        {user.occupation}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Box p="1rem 0">
                <FlexBetween mb=".5rem" >
                    <Typography color={palette.neutral.medium} >{"Clicks"}</Typography>
                    <Typography color={palette.neutral.main} >{user.viewes}</Typography>
                </FlexBetween>
                <FlexBetween >
                    <Typography color={palette.neutral.medium} >{"Impressions "}</Typography>
                    <Typography color={palette.neutral.main} >{user.impressions}</Typography>
                </FlexBetween>
            </Box >
            <Divider  />
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={palette.main} mb="1rem"  >
                    Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb=".5rem" >
                    <FlexBetween gap="1rem">
                        <Twitter sx={{ color: palette.neutral.main, fontSize: "1.5rem" }} />
                        <Box  >
                            <Typography color={palette.neutral.main} fontWeight="500">Twitter</Typography>
                            <Typography color={palette.neutral.medium} >Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: palette.neutral.main }} />
                </FlexBetween>
                <FlexBetween gap="1rem" >
                    <FlexBetween gap="1rem">
                    <LinkedIn sx={{ color: palette.neutral.main, fontSize: "1.5rem" }} />
                        <Box  >
                            <Typography color={palette.neutral.main} fontWeight="500">Twitter</Typography>
                            <Typography color={palette.neutral.medium} >Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: palette.neutral.main }} />
                </FlexBetween>
            </Box >
        </WidgetWrapper >
    )
}
export default UserWidget;