import { Add, ChatBubbleOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import FlexBetween from "../customs/FlexBetween";
import WidgetWrapper from "../customs/WidgetWrapper";
import User from "./User";

const PostWidget = ({ post }) => {
    const { palette } = useTheme();

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
                                <IconButton >
                                    <FavoriteOutlined style={{ fontSize: "1.7rem" }} sx={{ color: palette.primary.main }} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="like" >
                                <IconButton >
                                    <FavoriteBorderOutlined style={{ fontSize: "1.7rem" }} sx={{ color: palette.primary.main }} />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Typography>{127}</Typography>
                    </FlexBetween>
                    <FlexBetween gap=".3rem">
                        <Tooltip title="comment" >
                            <IconButton >
                                <ChatBubbleOutlined style={{ fontSize: "1.7rem" }} />
                            </IconButton>
                        </Tooltip>
                        <Typography>{23}</Typography>
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