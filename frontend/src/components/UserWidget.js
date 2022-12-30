import { LocationOnOutlined, WorkOutlineOutlined, Twitter, LinkedIn } from '@mui/icons-material';
import { Divider, Box, useTheme, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, useMediaQuery, TextField } from '@mui/material';
import WidgetWrapper from '../customs/WidgetWrapper';
import FlexBetween from '../customs/FlexBetween';
import { Fragment, useEffect, useState } from 'react';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword, deleteUser } from '../redux/actions/userAction';
import userSlice from '../redux/slices/userSlice';
import Loader from './Loader';

const UserWidget = ({ user, at = "home", type = "own" }) => {
    const { palette } = useTheme();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { isUpdateLoading, isUpdated } = useSelector((state) => state.userState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setUpdateStatus = userSlice.actions.setUpdateStatus;
    const isMobileScreen = useMediaQuery("(max-width: 980px)");

    const deleteHandler = () => {
        dispatch(deleteUser());
    }

    useEffect(() => {
        if (isUpdated) {
            setIsPasswordDialogOpen(false);
            setUpdateStatus(false);
        }
    }, [isUpdated]); // eslint-disable-line react-hooks/exhaustive-deps

    const passwordChangeHandler = () => {
        if (oldPassword.length < 8 || newPassword.length < 8 || confirmPassword.length < 8) return;
        if (newPassword !== confirmPassword) return;

        dispatch(changePassword({
            oldPassword,
            newPassword,
            confirmPassword
        }))
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
                        <Button variant="outlined" size="large" color="primary" onClick={() => setIsPasswordDialogOpen(true)}>
                            Change Password
                        </Button>
                        <Dialog
                            fullWidth={true}
                            open={isPasswordDialogOpen}
                        >
                            <Box minHeight="400px" display="flex" flexDirection="column" justifyContent="center">
                                {isUpdateLoading ? <Loader /> : (
                                    <Fragment>
                                        <DialogTitle textAlign="center" variant="h3" fontWeight="500" color="primary" sx={{ mt: ".5rem" }}> Change Password</DialogTitle>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <TextField type="password" value={oldPassword} sx={{ width: "70%", m: ".7rem", fontWeight: "500" }} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                                            <TextField type="password" value={newPassword} sx={{ width: "70%", m: ".7rem", fontWeight: "500" }} placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                                            <TextField type="password" value={confirmPassword} sx={{ width: "70%", m: ".7rem", fontWeight: "500" }} placeholder="Confirm New Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </Box>
                                        <Box mb="2rem" mt="1rem" display="flex" gap="2rem" justifyContent="center">
                                            <Button size="large" variant="outlined" autoFocus onClick={() => setIsPasswordDialogOpen(false)} color="primary">
                                                Cancel
                                            </Button>
                                            <Button size="large" variant="contained" onClick={passwordChangeHandler} autoFocus color="primary">
                                                Confirm
                                            </Button>
                                        </Box>
                                    </Fragment>
                                )}
                            </Box>
                        </Dialog>
                        <Button variant="contained" size="large" color="primary" onClick={() => navigate('/me/update')}>Update profile</Button>
                    </Box>
                    <Box p="1rem 0">
                        <Button variant="contained" size="large" color="error"
                            onClick={() => setIsDeleteDialogOpen(true)}
                            fullWidth={isMobileScreen ? false : true}
                            sx={{ width: isMobileScreen ? "50%" : "inherite", margin: "0 auto", display: "block" }}
                        >Delete profile</Button>
                        <Dialog
                            fullWidth={true}
                            open={isDeleteDialogOpen}
                            onClose={() => setIsDeleteDialogOpen(false)}
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
                                <Button variant="contained" autoFocus onClick={() => setIsDeleteDialogOpen(false)} color="primary">
                                    No
                                </Button>
                                <Button variant="outlined" onClick={deleteHandler} autoFocus color="error">
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Fragment>
            )}

        </WidgetWrapper >
    )
}
export default UserWidget;