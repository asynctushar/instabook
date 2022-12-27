import { Typography, useTheme, Box, IconButton } from '@mui/material';
import { ManageAccountsOutlined, Add, Remove } from '@mui/icons-material';
import FlexBetWeen from '../customs/FlexBetween';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = ({ user, type }) => {
    const ownUser = useSelector(state => state.userState.user);
    const navigate = useNavigate();
    const theme = useTheme();

    const navigateProfile = () => {
        if (ownUser.id === user.id) {
            navigate('/me')
        } else {
            navigate(`/user/${user.id}`)
        }
    }

    return (
        <FlexBetWeen gap="1rem">
            <FlexBetWeen gap=".5rem">
                <UserImage avatar={user.avatar} userId={user.id} />
                <Box>
                    <Typography onClick={() => navigateProfile()} variant="h4" color={theme.palette.neutral.dark} fontWeight="500" sx={{
                        ":hover": {
                            cursor: "pointer"
                        }
                    }} >
                        {user.name}
                    </Typography>
                    <Typography color={theme.palette.neutral.main}>
                        {/* {type === 'user' && user.friends.length} */}
                        {type === 'post' && user.location}
                        {type === 'friendList' && user.occupation}
                    </Typography>
                </Box>
            </FlexBetWeen>
            {user.isFriend === (undefined) && type === "user" && <ManageAccountsOutlined />}
            {user.isFriend === false && <IconButton><Add /></IconButton>}
            {user.isFriend === true && <IconButton><Remove /></IconButton>}
        </FlexBetWeen>
    )
}
export default User;