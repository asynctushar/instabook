import { useParams, useNavigate } from 'react-router-dom';
import { Box, useMediaQuery, IconButton, Typography, Tooltip, useTheme, Button } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import WidgetWrapper from '../customs/WidgetWrapper';
import User from '../components/User';
import FlexBetween from '../customs/FlexBetween';
import { FavoriteOutlined, FavoriteBorderOutlined, ShareOutlined } from '@mui/icons-material';
import { getSinglePost, likePost, unlikePost } from '../redux/actions/postAction';
import CommentsWidget from '../components/CommentsWidget';

const Post = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ownUser = useSelector((state) => state.userState.user);
    const { singlePost, isLoading } = useSelector((state) => state.postState);
    const isMobileScreen = useMediaQuery("(max-width: 700px)");
    const { palette } = useTheme();


    useEffect(() => {
        dispatch(getSinglePost(id))
    }, [id, dispatch]);

    const likeHandler = () => {
        dispatch(likePost(singlePost._id));
    }

    const unlikeHandler = () => {
        dispatch(unlikePost(singlePost._id));
    }

    return (
        <Fragment>
            {isLoading || singlePost === undefined ? <Loader /> : (
                <Box display={isMobileScreen ? "block" : "flex"} justifyContent="space-evenly" gap="1rem" m="2rem">
                    {!isMobileScreen && <Button onClick={() => navigate(-1)} size="large" variant="contained" sx={{ alignSelf: "flex-start" }}>Back</Button>}
                    <WidgetWrapper width={isMobileScreen ? undefined : "50%"} mb={isMobileScreen ? "1rem" : "unset"} height="fit-content">
                        <User userId={singlePost.user} />
                        <Typography color={palette.neutral.main} sx={{ mt: '1rem', wordWrap: "break-word" }}>{singlePost.description}</Typography>
                        {singlePost.picture && (
                            <img
                                width="100%"
                                height="auto"
                                style={{ borderRadius: ".75rem", marginTop: ".75rem", cursor: "pointer" }}
                                src={singlePost.picture.url}
                                alt={singlePost.picture.public_id}
                            />
                        )}
                        <FlexBetween mt="1rem">
                            <FlexBetween gap="1rem" >
                                <FlexBetween gap=".3rem" >
                                    {singlePost.likes[ownUser._id] ? (
                                        <Tooltip title="unlike" >
                                            <IconButton onClick={unlikeHandler} >
                                                <FavoriteOutlined style={{ fontSize: "1.7rem" }} sx={{ color: palette.primary.main }} />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="like" >
                                            <IconButton onClick={likeHandler}>
                                                <FavoriteBorderOutlined style={{ fontSize: "1.7rem" }} sx={{ color: palette.primary.main }} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Typography>{Object.keys(singlePost.likes).length}</Typography>
                                </FlexBetween>
                            </FlexBetween>
                            <Tooltip title="share" >
                                <IconButton>
                                    <ShareOutlined style={{ fontSize: "1.7rem" }} />
                                </IconButton>
                            </Tooltip>
                        </FlexBetween>
                    </WidgetWrapper>
                    <CommentsWidget comments={singlePost.comments} postId={singlePost._id} />
                </Box>
            )
            }
        </Fragment >
    )
}
export default Post;