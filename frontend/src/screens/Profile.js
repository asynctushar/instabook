import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserWidget from '../components/UserWidget';
import Loader from '../components/Loader';
import PostWidget from '../components/PostWidget';
import FriendListWidget from "../components/FriendListWidget";
import WidgetWrapper from "../customs/WidgetWrapper";
import { getOwnUserPosts } from "../redux/actions/postAction";
import CreatePostWidget from "../components/CreatePostWidget";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userState.user);
    const { friends, isLoading, ownUserPosts } = useSelector(state => state.postState);
    const isMobileScreen = useMediaQuery('(max-width: 980px)');
    const { palette } = useTheme();

    useEffect(() => {
        dispatch(getOwnUserPosts());
    }, [dispatch]);

    return (
        <Box width="100%" padding="2rem 6%" gap="2rem" justifyContent="space-evenly" display={isMobileScreen ? "block" : "flex"}>

            <Box flexBasis={isMobileScreen ? undefined : "30%"}>
                {user && (
                    <UserWidget user={user} />
                )}
                <FriendListWidget friends={friends} />
            </Box>

            <Box width={isMobileScreen ? undefined : "60%"}>
                <CreatePostWidget avatar={user.avatar} />
                <WidgetWrapper mt="1.5rem">
                    <Typography variant="h3" fontWeight={700} textAlign="center" color={palette.neutral.dark} sx={{ mb: '1rem' }} >Posts</Typography>
                    <Divider />
                    {isLoading ? (
                        <Box minHeight="50vh" display='flex' alignItems="center" mb="2rem">
                            <Loader />
                        </Box>
                    ) : ownUserPosts && ownUserPosts.map(post => (
                        <PostWidget post={post} key={post.id} />
                    ))}
                </WidgetWrapper>
            </Box>
        </Box>
    )
}

export default Profile;