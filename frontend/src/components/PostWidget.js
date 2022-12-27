import { ChatBubbleOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import FlexBetween from "../customs/FlexBetween";
import WidgetWrapper from "../customs/WidgetWrapper";
import { likePost, unlikePost } from "../redux/actions/postAction";
import User from "./User";

const PostWidget = ({ post }) => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const likeCount = Object.keys(post.likes).length;

    const likeHandler = () => {
        dispatch(likePost(post.id));
    }

    const unlikeHandler = () => {
        dispatch(unlikePost(post.id));
    }

    return (
        <WidgetWrapper m="1rem 0">
            <User user={post.user} type="post" />
            <Typography color={palette.neutral.main} sx={{ mt: '1rem', wordWrap: "break-word" }}>{post.description}</Typography>
            {post.picture.public_id && (
                <img
                    width="100%"
                    height="auto"
                    style={{ borderRadius: ".75rem", marginTop: ".75rem" }}
                    src={post.picture.url}
                    alt={post.picture.public_id}
                />
            )}
            <FlexBetween mt="1rem">
                <FlexBetween gap="1rem" >
                    <FlexBetween gap=".3rem" >
                        {post.isLiked ? (
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
                            <IconButton >
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