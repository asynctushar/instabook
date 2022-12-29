import { ChatBubbleOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FlexBetween from "../customs/FlexBetween";
import WidgetWrapper from "../customs/WidgetWrapper";
import { likePost, unlikePost } from "../redux/actions/postAction";
import User from "./User";

const PostWidget = ({ post }) => {
    const { palette } = useTheme();
    const ownUser = useSelector(state => state.userState.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLiked = post.likes[ownUser._id]
    const likeCount = Object.keys(post.likes).length;

    const likeHandler = () => {
        dispatch(likePost(post._id));
    }

    const unlikeHandler = () => {
        dispatch(unlikePost(post._id));
    }

    const navigateToPost = () => {
        navigate(`/post/${post._id}`)
    }

    return (
        <WidgetWrapper m="1rem 0">
            <User userId={post.user} />
            <Typography color={palette.neutral.main} sx={{ mt: '1rem', wordWrap: "break-word" }}>{post.description}</Typography>
            {post.picture && (
                <img
                    width="100%"
                    height="auto"
                    style={{ borderRadius: ".75rem", marginTop: ".75rem", cursor: "pointer" }}
                    src={post.picture.url}
                    alt={post.picture.public_id}
                    onClick={navigateToPost}
                />
            )}
            <FlexBetween mt="1rem">
                <FlexBetween gap="1rem" >
                    <FlexBetween gap=".3rem" >
                        {isLiked ? (
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
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap=".3rem">
                        <Tooltip title="comment" >
                            <IconButton onClick={navigateToPost}>
                                <ChatBubbleOutlined style={{ fontSize: "1.7rem" }} />
                            </IconButton>
                        </Tooltip>
                        <Typography>{post.comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <Tooltip title="share" >
                    <IconButton>
                        <ShareOutlined style={{ fontSize: "1.7rem" }} />
                    </IconButton>
                </Tooltip>
            </FlexBetween>
        </WidgetWrapper>
    )
}
export default PostWidget;