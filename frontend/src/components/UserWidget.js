import { LocationOnOutlined, WorkOutlineOutlined, Twitter, LinkedIn } from '@mui/icons-material';
import { Divider, Box, useTheme, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import WidgetWrapper from '../customs/WidgetWrapper';
import FlexBetween from '../customs/FlexBetween';
import { Fragment, useState } from 'react';
import User from './User';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { deleteUser } from '../redux/actions/userAction';

const UserWidget = ({ user, at = "home", type = "own" }) => {
    const { palette } = useTheme();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteHandler = () => {
        dispatch(deleteUser());
    }

    return (
        <WidgetWrapper >
            <User userId={user._id} at={at} />
            <Divider sx={{ mt: at === "profile" ? "3rem" : "1rem" }} />
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb=".5rem" >
                    <LocationOnOutlined fontSize="large" sx={{ color: palette.neutral.main }} />
                    <Typography color={palette.neutral.medium} >
                        {user.location}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" >
                    <WorkOutlineOutlined fontSize="large" sx={{ color: palette.neutral.main }} />
                    <Typography color={palette.neutral.medium} >
                        {user.occupation}
                    </Typography>
                </Box>
            </Box>
            {type === "own" && at === "profile" && (
                <Fragment>
                    <Divider />
                    <Box p="1rem 0">
                        <FlexBetween mb=".5rem" >
                            <Typography color={palette.neutral.medium} >{"Email"}</Typography>
                            <Typography color={palette.neutral.main} >{user.email}</Typography>
                        </FlexBetween>
                        <FlexBetween mb=".5rem" >
                            <Typography color={palette.neutral.medium} >{"Clicks"}</Typography>
                            <Typography color={palette.neutral.main} >{user.viewes}</Typography>
                        </FlexBetween>
                        <FlexBetween >
                            <Typography color={palette.neutral.medium} >{"Impressions "}</Typography>
                            <Typography color={palette.neutral.main} >{user.impressions}</Typography>
                        </FlexBetween>
                    </Box >
                </Fragment>
            )}
            <Divider />
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={palette.main} mb="1rem"  >
                    Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb=".5rem" >
                    <FlexBetween gap="1rem">
                        <Twitter sx={{ color: palette.neutral.main, fontSize: "1.5rem" }} />
                        <Box  >
                            <Typography color={palette.neutral.main} fontWeight="500">Twitter</Typography>
                            <Typography color={palette.neutral.medium} >Social Network</Typography>
                        </Box>
                    </FlexBetween>
                </FlexBetween>
                <FlexBetween gap="1rem" >
                    <FlexBetween gap="1rem">
                        <LinkedIn sx={{ color: palette.neutral.main, fontSize: "1.5rem" }} />
                        <Box  >
                            <Typography color={palette.neutral.main} fontWeight="500">Twitter</Typography>
                            <Typography color={palette.neutral.medium} >Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                </FlexBetween>
            </Box >
            {type === "own" && at === "profile" && (
                <Fragment>
                    <Divider />
                    <Box display="flex" justifyContent="center" gap="2rem" p="1rem 0" mt="1rem">
                        <Button variant="outlined" size="large" color="error" onClick={() => setIsDialogOpen(true)}>Delete profile</Button>
                        <Dialog
                            fullWidth={true}
                            open={isDialogOpen}
                            onClose={() => setIsDialogOpen(false)}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Do you want to delete your profile?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your post, comment and chat history will alse be deleted.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" autoFocus onClick={() => setIsDialogOpen(false)} color="primary">
                                    No
                                </Button>
                                <Button variant="outlined" onClick={deleteHandler} autoFocus color="error">
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button variant="contained" size="large" color="primary" onClick={() => navigate('/me/update')}>Update profile</Button>
                    </Box>
                </Fragment>
            )}

        </WidgetWrapper >
    )
}
export default UserWidget;