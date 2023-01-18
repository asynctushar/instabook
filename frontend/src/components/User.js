import { Typography, useTheme, Box, IconButton, useMediaQuery, Button, Tooltip } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import FlexBetWeen from '../customs/FlexBetween';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, removeFriend } from '../redux/actions/userAction';
import { useEffect, useState } from 'react';
import appSlice from '../redux/slices/appSlice'
import axios from 'axios';

const User = ({ userId, at = "post" }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFriend, setIsFriend] = useState(undefined);
    const [type, setType] = useState("other");
    const ownUser = useSelector(state => state.userState.user);
    const { setError } = appSlice.actions;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobileScreen = useMediaQuery("(max-width: 980px)");
    const { palette } = useTheme();

    useEffect(() => {
        if (userId === ownUser._id) {
            setUser(ownUser);
            setType('own');
            setIsLoading(false);
        } else {
            setType("other")
            const getUserDetails = async (id) => {
                try {
                    const { data } = await axios.get(`/api/v1/user/${id}`);

                    setUser({
                        ...data.user,
                        _id: data.user.id
                    });
                    setIsFriend(ownUser.friends.includes(id));
                    setIsLoading(false);
                } catch (err) {
                    dispatch(setError(err.response.data.message));

                }
            }

            getUserDetails(userId);
        }
    }, [userId, ownUser]);  // eslint-disable-line react-hooks/exhaustive-deps

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
            {!isLoading && (
                <FlexBetWeen gap=".5rem" flexDirection={at === "profile" ? "column" : "row"} m={at === 'profile' ? "auto" : undefined}>
                    <UserImage avatar={user.avatar} userId={user._id} size={at === "profile" ? (isMobileScreen ? "200px" : "100px") : "60px"} />
                    <Box mt={at === "profile" && isMobileScreen ? "2rem" : undefined}>
                        <Typography fontSize={at === "profile" && isMobileScreen ? "2rem" : undefined} textTransform="capitalize" onClick={() => navigateProfile()} variant="h4" color={theme.palette.neutral.dark} fontWeight="500" sx={{
                            ":hover": {
                                cursor: "pointer"
                            }
                        }} >
                            {user.name}
                        </Typography>
                        <Typography color={theme.palette.neutral.main}>
                            {at === 'home' && user.friends.length + " friends"}
                            {at === 'post' && user.location}
                            {at === 'comment' && user.location}
                            {at === 'friendList' && user.occupation}
                        </Typography>
                    </Box>
                    {at === "profile" && type === "other" && (
                        <FlexBetWeen gap={isMobileScreen ? "1.5rem" : "1rem"} m="1.5rem auto">
                            {isFriend === false && <Button size={isMobileScreen ? "large" : "medium"} variant="contained" onClick={addFriendHandler}
                                sx={{
                                    color: palette.background.alt,
                                    backgroundColor: palette.primary.main,
                                }}>Add Friend</Button>}
                            {isFriend === true && <Button size={isMobileScreen ? "large" : "medium"} variant="contained" onClick={removeFriendHandler}
                                sx={{
                                    color: palette.background.alt,
                                    backgroundColor: palette.primary.main,
                                }}> Unfriend</Button>}
                            <Button onClick={() => navigate('/me/conversation', { state: { id: user.id } })} size={isMobileScreen ? "large" : "medium"} variant="contained">Message</Button>
                        </FlexBetWeen>
                    )}
                </FlexBetWeen>
            )}
            {at !== "profile" && isFriend === false && <Tooltip title="Add friend"><IconButton onClick={addFriendHandler}><Add /></IconButton></Tooltip>}
            {at !== "profile" && isFriend === true && <Tooltip title="Unfriend" ><IconButton onClick={removeFriendHandler}><Remove /></IconButton></Tooltip>}

        </FlexBetWeen >
    )
}



export default User;