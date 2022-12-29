import { Divider, Box, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import { useDispatch } from "react-redux";
import appSlice from "../redux/slices/appSlice";

const Comment = ({ commentId }) => {
    const [comment, setComment] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { setError } = appSlice.actions;

    useEffect(() => {
        const getCommentDetails = async (id) => {
            try {
                const { data } = await axios.get(`/api/v1/comment/${id}`);

                setComment(data.comment);
                setIsLoading(false);
            } catch (err) {
                dispatch(setError(err.response.data.message));
            }
        }

        getCommentDetails(commentId);
    }, [commentId])

    return (
        <Box px="1rem">
            {!isLoading && (
                <Fragment>
                    <Divider />
                    <Box p="1rem 0">
                        <User userId={comment.user} at="comment" />
                        <Typography fontWeight="500" fontSize="18px" sx={{ px: '1rem', mt: "1.5rem" }}>{comment.comment}</Typography>
                    </Box>
                </Fragment>
            )}
        </Box>
    )
}
export default Comment;