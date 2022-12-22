import { useTheme, useMediaQuery, Box, IconButton, FormControl, MenuItem, Select, Typography, InputBase, Backdrop } from '@mui/material';
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeMode } from '../redux/actions/appAction';
import FlexBetween from '../customs/FlexBetween';
import { Fragment, useState } from 'react';
import { logOutUser } from '../redux/actions/userAction';

const NavBar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.userState);
    const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery('(max-width: 980px)');
    const theme = useTheme();
    // colors 
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const primaryDark = theme.palette.primary.dark;
    const alt = theme.palette.background.alt;

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt} >
            <FlexBetween gap="1.75rem">
                <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary" onClick={() => navigate('/')} sx={{
                    transition: 'all .3s',
                    ":hover": {
                        color: primaryDark,
                        cursor: 'pointer'
                    }
                }}>
                    Instabook
                </Typography>
                {!isMobileScreen && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding=".1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {!isMobileScreen ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(changeMode())} >
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    {isAuthenticated &&
                        <FormControl variant="standard" value={user.name} >
                            <Select value={user.name}
                                sx={{
                                    backgroundColor: neutralLight, width: '150px', borderRadius: ".25rem", p: ".25rem 1rem",
                                    ".MuiSvgIcon-root": {
                                        pr: '.25rem',
                                        width: '3rem'
                                    },
                                    ".MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={user.name}>
                                    <Typography >
                                        {user.name}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    dispatch(logOutUser());
                                    setIsMobileMenuToggle(false);
                                }
                                }>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    }
                </FlexBetween>
            ) : (
                <Fragment>
                    <IconButton onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)} sx={{ fontSize: "25px" }}>
                        {!isMobileMenuToggle ? < Menu /> : <Close />}
                    </IconButton>
                    {isMobileScreen && isMobileMenuToggle && (
                            <Box position="absolute" top="80px" right="0" height="auto" zIndex="10" maxWidth="500px" minWidth="300px" pb="2rem" backgroundColor={alt}>
                                {/* mobile menu items */}
                                <FlexBetween flexDirection="column" justifyContent="center" gap="3rem" >
                                    <IconButton onClick={() => {
                                        dispatch(changeMode());
                                        setIsMobileMenuToggle(false);
                                    }
                                    } >
                                        {theme.palette.mode === "dark" ? (
                                            <DarkMode sx={{ fontSize: "25px" }} />
                                        ) : (
                                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                                        )}
                                    </IconButton>
                                    <Message sx={{ fontSize: "25px" }} />
                                    <Notifications sx={{ fontSize: "25px" }} />
                                    <Help sx={{ fontSize: "25px" }} />
                                    {isAuthenticated &&
                                        <FormControl variant="standard" value={user.name} >
                                            <Select value={user.name}
                                                sx={{
                                                    backgroundColor: neutralLight, width: '150px', borderRadius: ".25rem", p: ".25rem 1rem",
                                                    ".MuiSvgIcon-root": {
                                                        pr: '.25rem',
                                                        width: '3rem'
                                                    },
                                                    ".MuiSelect-select:focus": {
                                                        backgroundColor: neutralLight
                                                    }
                                                }}
                                                input={<InputBase />}
                                            >
                                                <MenuItem value={user.name}>
                                                    <Typography >
                                                        {user.name}
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => {
                                                    dispatch(logOutUser());
                                                    setIsMobileMenuToggle(false);
                                                }}>
                                                    Log Out
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    }
                                </FlexBetween>
                            </Box>
                    )}
                </Fragment>
            )
            }
        </FlexBetween >
    )
}
export default NavBar;