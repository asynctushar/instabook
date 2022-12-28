import { useMediaQuery, Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdWidget from '../components/AdWidget';
import CreatePostWidget from '../components/CreatePostWidget';
import Loader from '../components/Loader';
import PostWidget from '../components/PostWidget';
import UserWidget from '../components/UserWidget';
import FriendListWidget from '../components/FriendListWidget';
import { useNavigate } from 'react-router-dom';
import { getAllFeedPosts } from '../redux/actions/postAction';

const Home = () => {
    const dispath = useDispatch();
    const isMobileScreen = useMediaQuery("(max-width: 980px)");
    const { user, isAuthenticated } = useSelector(state => state.userState);
    const navigate = useNavigate();
    const { posts, isLoading } = useSelector(state => state.postState);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }

        dispath(getAllFeedPosts());
    }, [dispath, isAuthenticated, navigate])

    return (
        <Box width="100%" padding="2rem 6%" gap="2rem" justifyContent="space-between" display={isMobileScreen ? "block" : "flex"}>
            {!isMobileScreen && (
                <Box flexBasis={isMobileScreen ? undefined : "26%"}>
                    <UserWidget user={user} />
                </Box>
            )}

            <Box width={isMobileScreen ? undefined : "42%"}>
                <CreatePostWidget avatar={user.avatar} userId={ user._id}/>
                {isLoading ? <Loader /> : posts.map(post => (
                    <PostWidget post={post} key={post._id} type="feed" />
                ))}
            </Box>

            {!isMobileScreen && (
                <Box flexBasis={isMobileScreen ? undefined : "26%"}>
                    <AdWidget />
                    <FriendListWidget friends={user.friends} />
                </Box>
            )}
        </Box>

    )
}
export default Home;