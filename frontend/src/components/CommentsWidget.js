import { Box, Divider, Typography, useTheme, InputBase, Button, useMediaQuery } from "@mui/material";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import FlexBetween from "../customs/FlexBetween";
import WidgetWrapper from "../customs/WidgetWrapper";
import { createComment } from "../redux/actions/postAction";
import Comment from "./Comment";

const CommentsWidget = ({ comments, postId }) => {
    const [myComment, setMyComment] = useState('');
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isMobileScreen = useMediaQuery("(max-width: 700px)");

    const commentHandler = () => {
        dispatch(createComment({ comment: myComment, postId }));
        setMyComment("");
    }

    return (
        <WidgetWrapper width={!isMobileScreen ? "30%" : "unset"} height="fit-content" minHeight="230px" display="flex" flexDirection="column" justifyContent="space-between">
            <Typography variant="h3" fontWeight="500" textAlign="center" sx={{ mb: '1rem' }}>Comments</Typography>
            <Fragment>
                {comments.length < 1 ? (
                    <Box px="1rem">
                        <Divider />
                        <Typography textAlign="center" sx={{ m: "2rem auto" }}>No comment yet</Typography>
                    </Box>) : comments.map((comment) => (
                        <Comment commentId={comment} key={comment} isMyPost/>
                    ))}
            </Fragment>
            <FlexBetween gap="1.5rem" px=".5" mb="1rem" >
                <InputBase value={myComment} onChange={(e) => setMyComment(e.target.value)} placeholder="Write your comment..." sx={{
                    width: "80%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: '.4rem',
                    p: ".5rem 2rem"
                }} />
                <Button
                    disabled={myComment ? false : true}
                    variant="contained"
                    size="large"
                    onClick={commentHandler}
                    sx={{
                        color: palette.background.default,
                        backgroundColor: palette.primary.main,
                        borderRadius: '.4rem',
                        fontSize: "11px",
                        py: ".7rem",
                        ":disabled": {
                            backgroundColor: "#3cc8e4",
                            color: "#000"
                        }
                    }}>
                    Comment
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}
export default CommentsWidget;