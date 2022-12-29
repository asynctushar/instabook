import { useSearchParams } from 'react-router-dom';
import { useMediaQuery, Box, Typography, Divider } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdWidget from '../components/AdWidget';
import Loader from '../components/Loader';
import UserWidget from '../components/UserWidget';
import FriendListWidget from '../components/FriendListWidget';
import { searchUser } from '../redux/actions/userAction';
import WidgetWrapper from '../customs/WidgetWrapper';
import User from '../components/User';

const Search = () => {
    const keyword = useSearchParams()[0].get("keyword");
    const dispatch = useDispatch();
    const isMobileScreen = useMediaQuery("(max-width: 980px)");
    const { user, searchUsers, isSearchLoading } = useSelector(state => state.userState);

    useEffect(() => {
        dispatch(searchUser(keyword));

    }, [dispatch, keyword]);

    return (
        <Box width="100%" padding="2rem 6%" gap="2rem" justifyContent="space-between" display={isMobileScreen ? "block" : "flex"}>
            {!isMobileScreen && (
                <Box flexBasis={isMobileScreen ? undefined : "26%"}>
                    <UserWidget user={user} />
                </Box>
            )}

            <Box width={isMobileScreen ? undefined : "42%"}>
                {isSearchLoading ? <Loader /> : (
                    <WidgetWrapper height="fit-content" minHeight="150px" display="flex" flexDirection="column" justifyContent="space-between">
                        <Typography variant="h3" fontWeight="500" textAlign="center" sx={{ mb: '1rem' }}>Search Results</Typography>
                        <Fragment>
                            {searchUsers.length < 1 ? (
                                <Box>
                                    <Divider />
                                    <Typography textAlign="center" sx={{ m: "2rem auto" }}>Nothing found!</Typography>
                                </Box>) : searchUsers.map((user,) => (
                                    <Box key={user._id} mt="1rem">
                                        <Divider sx={{mb: "1rem"}}/>
                                        <User userId={user._id} />
                                    </Box>
                                ))}
                        </Fragment>
                    </WidgetWrapper>
                )}
            </Box>

            {!isMobileScreen && (
                <Box flexBasis={isMobileScreen ? undefined : "26%"}>
                    <AdWidget />
                    <FriendListWidget friends={user.friends} />
                </Box>
            )}
        </Box>
    );
}
export default Search;