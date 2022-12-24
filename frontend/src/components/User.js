import { Typography, useTheme, Box, IconButton } from '@mui/material';
import { ManageAccountsOutlined, Add, Remove } from '@mui/icons-material';
import FlexBetWeen from '../customs/FlexBetween';
import UserImage from './UserImage';

const User = ({ user }) => {
    const theme = useTheme();
    return (
        <FlexBetWeen gap="1rem">
            <FlexBetWeen gap=".5rem">
                <UserImage avatar={user.avatar}/>
                <Box>
                    <Typography variant="h4" color={theme.palette.neutral.dark} fontWeight="500" sx={{
                        ":hover": {
                            cursor: "pointer"
                        }
                    }} >
                        {user.name}
                    </Typography>
                    <Typography color={theme.palette.neutral.main}>{7} friends</Typography>
                </Box>
            </FlexBetWeen>
            {user.isFriend === (null || undefined) && <ManageAccountsOutlined />}
            {user.isFriend === false && <IconButton><Add /></IconButton>}
            {user.isFriend === true && <IconButton><Remove /></IconButton>}
        </FlexBetWeen>
    )
}
export default User;