import { Box, useMediaQuery , Typography, Divider, useTheme} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../redux/actions/userAction";
import UserWidget from '../components/UserWidget';
import { getSingleUserPosts } from "../redux/actions/postAction";
import Loader from '../components/Loader';
import PostWidget from '../components/PostWidget';
import WidgetWrapper from '../customs/WidgetWrapper';

const UserProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userState.singleUser);
    const { singleUserPosts, isLoading } = useSelector(state => state.postState);
    const isMobileScreen = useMediaQuery('(max-width: 980px)');
    const { palette } = useTheme();

    useEffect(() => {
        dispatch(getSingleUserPosts(id));
        dispatch(getSingleUser(id));
    }, [dispatch, id]);

    return (
        <Box width="100%" padding="2rem 6%" gap="2rem" justifyContent="space-evenly" display={isMobileScreen ? "block" : "flex"}>

            <Box mb={isMobileScreen ? "2rem" : undefined } flexBasis={isMobileScreen ? undefined : "30%"}>
                {user && (
                    <UserWidget user={user} />
                )}
            </Box>

            <Box width={isMobileScreen ? undefined : "60%"}>
                <WidgetWrapper>
                    <Typography variant="h3" fontWeight={700} textAlign="center" color={palette.neutral.dark} sx={{ mb: '1rem' }} >Posts</Typography>
                    <Divider />
                    {isLoading ? (
                        <Box minHeight="50vh" display='flex' alignItems="center" mb="2rem">
                            <Loader />
                        </Box>
                    ) : singleUserPosts && singleUserPosts.map(post => (
                        <PostWidget post={post} key={post.id} />
                    ))}
                </WidgetWrapper>

            </Box>
        </Box>
    )
}

export default UserProfile;