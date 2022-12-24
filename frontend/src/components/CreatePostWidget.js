import { InputBase, useTheme, Box, Typography, IconButton, Divider, useMediaQuery, Button } from "@mui/material";
import { useState, Fragment } from "react";
import FlexBetween from "../customs/FlexBetween";
import WidgetWrapper from "../customs/WidgetWrapper";
import UserImage from "./UserImage";
import Dropzone from 'react-dropzone';
import { DeleteOutline, EditOutlined, ImageOutlined, GifBoxOutlined, AttachFileOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";

const CreatePostWidget = ({ avatar }) => {
    const [image, setImage] = useState(false)
    const isMobileScreen = useMediaQuery('(max-width: 980px)');
    const { palette } = useTheme();
    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage avatar={avatar} />
                <InputBase placeholder="What's on your mind..." sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: '2rem',
                    p: "1rem 2rem"
                }} />
            </FlexBetween>
            {image && (
                <Box border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" mt="1rem" p="1rem" >
                    <Dropzone
                        acceptedFiles=".jpg, .jpeg, .png" multiple={false}>
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} width="100%" p="1rem"
                                    sx={{ ":hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <Typography>Add Profile Picture</Typography>
                                    ) : (
                                        <FlexBetween >
                                            <Typography> {image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(false)}>
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
                <FlexBetween gap=".5rem" onClick={() => setImage(!image)}>
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