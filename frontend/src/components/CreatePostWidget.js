import { InputBase, useTheme, Box, Typography, IconButton, Divider, useMediaQuery, Button } from "@mui/material";
import { useState, Fragment } from "react";
import FlexBetween from "../customs/FlexBetween";
import WidgetWrapper from "../customs/WidgetWrapper";
import UserImage from "./UserImage";
import Dropzone from 'react-dropzone';
import { useDispatch } from "react-redux";
import { DeleteOutline, EditOutlined, ImageOutlined, GifBoxOutlined, AttachFileOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { createNewPost } from "../redux/actions/postAction";
import appSlice from "../redux/slices/appSlice";

const CreatePostWidget = ({ avatar, userId }) => {
    const [image, setImage] = useState(null);
    const [post, setPost] = useState('');
    const [isImage, setIsImage] = useState(false);
    const isMobileScreen = useMediaQuery('(max-width: 980px)');
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { setError } = appSlice.actions;



    const postHandler = () => {
        if (post.length < 10) return dispatch(setError("Post must be minimum of 10 characters."));

        const formData = new FormData();

        formData.append("description", post);
        formData.append("picture", image);

        dispatch(createNewPost(formData));

        setImage(null);
        setIsImage(false);
        setPost('');
    }

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage avatar={avatar} userId={userId} />
                <InputBase value={post} onChange={(e) => setPost(e.target.value)} placeholder="What's on your mind..." sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: '2rem',
                    p: "1rem 2rem"
                }} />
            </FlexBetween>
            {isImage && (
                <Box border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" mt="1rem" p="1rem" >
                    <Dropzone
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        acceptedFiles=".jpg, .jpeg, .png" multiple={false}>
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} width="100%" p="1rem"
                                    sx={{ ":hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!isImage ? (
                                        <Typography>Add Profile Picture</Typography>
                                    ) : (
                                        <FlexBetween >
                                            <Typography sx={{ wordBreak: "break-word" }}> {image && image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {isImage && (
                                    <IconButton onClick={() => setImage(null)}>
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider sx={{ m: "1.25rem" }} />
            <FlexBetween>
                <FlexBetween gap=".5rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: palette.neutral.mediumMain }} />
                    <Typography color={palette.neutral.mediumMain} sx={{ ":hover": { cursor: "pointer", color: palette.neutral.medium } }}>
                        Image
                    </Typography>
                </FlexBetween>
                {!isMobileScreen ? (
                    <Fragment>
                        <FlexBetween gap=".25rem" >
                            <GifBoxOutlined sx={{ color: palette.neutral.mediumMain }} />
                            <Typography color={palette.neutral.mediumMain} >Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap=".25rem" >
                            <AttachFileOutlined sx={{ color: palette.neutral.mediumMain }} />
                            <Typography color={palette.neutral.mediumMain} >Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap=".25rem" >
                            <MicOutlined sx={{ color: palette.neutral.mediumMain }} />
                            <Typography color={palette.neutral.mediumMain} >Audio</Typography>
                        </FlexBetween>
                    </Fragment>
                ) : (
                    <FlexBetween gap=".25rem" >
                        <MoreHorizOutlined sx={{ color: palette.neutral.mediumMain }} />
                    </FlexBetween>
                )}
                <Button
                    disabled={post ? false : true}
                    variant="contained"
                    onClick={postHandler}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: '3rem',
                        ":hover": { color: palette.primary.main }
                    }}>
                    Post
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}
export default CreatePostWidget;