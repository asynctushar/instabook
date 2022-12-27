import { Typography, useTheme, Box, IconButton } from '@mui/material';
import { ManageAccountsOutlined, Add, Remove } from '@mui/icons-material';
import FlexBetWeen from '../customs/FlexBetween';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, removeFriend } from '../redux/actions/userAction';

const User = ({ user, type }) => {
    const ownUser = useSelector(state => state.userState.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();

    const navigateProfile = () => {
        if (ownUser.id === user.id) {
            navigate('/me')
        } else {
            navigate(`/user/${user.id}`)
        }
    }

    const addFriendHandler = () => {
        dispatch(addFriend(user.id))
    }

    const removeFriendHandler = () => {
        dispatch(removeFriend(user.id))
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
            {user.isFriend === false && <IconButton onClick={addFriendHandler}><Add /></IconButton>}
            {user.isFriend === true && <IconButton onClick={removeFriendHandler}><Remove /></IconButton>}
        </FlexBetWeen>
    )
}
export default User;