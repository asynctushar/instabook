import { useMediaQuery, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CreatePostWidget from '../components/CreatePostWidget';
import UserWidget from '../components/UserWidget';

const Home = () => {
    const isMobileScreen = useMediaQuery("(max-width: 980px)");
    const { user } = useSelector(state => state.userState)
    return (
        <Box>
            <Box width="100%" padding="2rem 6%" gap=".5rem" justifyContent="space-between" display={isMobileScreen ? "block" : "flex"}>
                <Box flexBasis={isMobileScreen ? undefined : "26%"}>
                    <UserWidget user={user} />
                </Box>
                <Box flexBasis={isMobileScreen ? undefined : "42%"} mt={isMobileScreen ? "2rem" : undefined}>
                    <CreatePostWidget avatar={user.avatar} />
                </Box>
                {!isMobileScreen && (
                    <Box flexBasis={isMobileScreen ? undefined : "26%"}>
                    </Box>
                )}
            </Box>
        </Box>

    )
}
export default Home;