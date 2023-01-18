import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserWidget from '../components/UserWidget';
import Loader from '../components/Loader';
import PostWidget from '../components/PostWidget';
import FriendListWidget from "../components/FriendListWidget";
import WidgetWrapper from "../customs/WidgetWrapper";
import CreatePostWidget from "../components/CreatePostWidget";
import { getSingleUserPosts } from '../redux/actions/postAction';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import appSlice from '../redux/slices/appSlice'
import NotFound from "./NotFound";

const Profile = ({ type }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(undefined);
    const ownUser = useSelector((state) => state.userState.user);
    const isAuthenticated = useSelector(state => state.userState.isAuthenticated);
    const { isLoading, posts } = useSelector(state => state.postState);
    const isMobileScreen = useMediaQuery('(max-width: 980px)');
    const [isUserLoading, setIsUserLoading] = useState(true);
    const { setError } = appSlice.actions;
    const { palette } = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }

        if (type === "own") {
            setUser(ownUser);
            setIsUserLoading(false);
        } else {
            const getUserDetails = async () => {
                try {
                    const { data } = await axios.get(`/api/v1/user/${id}`);

                    setUser({
                        ...data.user,
                        _id: data.user.id
                    });
                    setIsUserLoading(false);
                } catch (err) {
                    dispatch(setError(err.response.data.message));
                    setIsUserLoading(false);
                }
            }

            getUserDetails();
        }
    }, [id, type, isAuthenticated, navigate]);  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (user) {
            dispatch(getSingleUserPosts(user._id));
        }
    }, [dispatch, type, user, id]);

    return (
        <Fragment>
            {isUserLoading ? <Loader /> : (
                <Fragment>
                    {type !== 'own' && !user ? (
                        <NotFound />
                    ) : (
                        <Box width="100%" padding="2rem 6%" gap="2rem" justifyContent="space-evenly" display={isMobileScreen ? "block" : "flex"}>

                            <Box flexBasis={isMobileScreen ? undefined : "30%"}>
                                {user && (
                                    <UserWidget user={user} type={type} at="profile" />
                                )}
                                {type === 'own' && <FriendListWidget friends={user.friends} />}
                            </Box>

                            <Box width={isMobileScreen ? undefined : "60%"}>
                                {type === "own" && <CreatePostWidget avatar={user.avatar} userId={user._id} />}

                                <WidgetWrapper mt={type === "own" || isMobileScreen ? "1.5rem" : undefined}>
                                    <Typography variant="h3" fontWeight={700} textAlign="center" color={palette.neutral.dark} sx={{ mb: '1rem' }} >Posts</Typography>
                                    <Divider />
                                    {isLoading ? (
                                        <Box minHeight="50vh" display='flex' alignItems="center" mb="2rem">
                                            <Loader />
                                        </Box>
                                    ) : (
                                        <Fragment>
                                            {posts && posts.length < 1 ? (
                                                <Typography textAlign="center" sx={{ m: "2rem auto" }}>No post yet...</Typography>
                                            ) : (posts.map(post => (
                                                <PostWidget post={post} key={post._id} />
                                            )))}
                                        </Fragment>
                                    )}
                                </WidgetWrapper>
                            </Box>
                        </Box>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile;