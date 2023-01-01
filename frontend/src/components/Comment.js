import { Divider, Box, Typography, Tooltip, IconButton, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "../redux/slices/appSlice";
import { Delete } from "@mui/icons-material";
import { deleteComment } from "../redux/actions/postAction";

const Comment = ({ commentId }) => {
    const [comment, setComment] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const { setError } = appSlice.actions;
    const user = useSelector((state) => state.userState.user)

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
    }, [commentId]) // eslint-disable-line react-hooks/exhaustive-deps

    const deleteHandler = () => {
        dispatch(deleteComment(comment.post, comment._id));
    }

    return (
        <Box pt="1rem" pb="1.2rem">
            {!isLoading && (
                <Fragment>
                    <Divider />
                    <Box p="1rem 0">
                        <User userId={comment.user} at="comment" />
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" >
                            <Typography fontWeight="500" fontSize="18px" sx={{ px: '1rem', mt: "1.5rem", wordBreak: "break-word" }}>{comment.comment}</Typography>
                            {comment.user === user._id && (
                                <Fragment>
                                    <Tooltip title="delete comment" sx={{ alignSelf: "flex-start" }}>
                                        <IconButton sx={{ mt: "1rem", maxWidth: 'fit-content' }} onClick={() => setIsDialogOpen(true)}>
                                            <Delete style={{ fontSize: "1.7rem" }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Dialog
                                        fullWidth={true}
                                        open={isDialogOpen}
                                        onClose={() => setIsDialogOpen(false)}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle id="responsive-dialog-title">
                                            {"Do you want to delete your comment?"}
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button variant="contained" autoFocus onClick={() => setIsDialogOpen(false)} color="primary">
                                                No
                                            </Button>
                                            <Button variant="outlined" onClick={deleteHandler} autoFocus color="error">
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Fragment>
                            )}
                        </Box>
                    </Box>
                </Fragment>
            )}
        </Box>
    )
}
export default Comment;