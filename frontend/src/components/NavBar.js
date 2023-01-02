import { useTheme, useMediaQuery, Box, IconButton, FormControl, MenuItem, Select, Typography, InputBase, Tooltip } from '@mui/material';
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
    const [searchKeyword, setSearchKeyword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery('(max-width: 980px)');
    const theme = useTheme();
    // colors 
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const primaryDark = theme.palette.primary.dark;
    const alt = theme.palette.background.alt;

    const searchHandler = () => {
        navigate(`/search?keyword=${searchKeyword.trim()}`);
        setSearchKeyword('');
    }

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
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" padding=".1rem .5rem .1rem 1.5rem">
                    <InputBase placeholder="Search..." value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchHandler()}
                    />
                    <IconButton onClick={searchHandler} disabled={!searchKeyword.trim()}>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            {!isMobileScreen ? (
                <FlexBetween gap="2rem">
                    <Tooltip title="Change Mode">
                        <IconButton onClick={() => dispatch(changeMode())} >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Messages" >
                        <IconButton onClick={() => navigate('/me/conversations')}>
                            <Message sx={{ fontSize: "25px" }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Notifications" >
                        <Notifications sx={{ fontSize: "25px" }} />
                    </Tooltip>
                    <Tooltip title="Help" >
                        <Help sx={{ fontSize: "25px" }} />
                    </Tooltip>
                    {isAuthenticated &&
                        <FormControl variant="standard" value={user.name} >
                            <Select value={user.name}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
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
                                    <Typography textTransform="capitalize">
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
                        <Box position="absolute" top="80px" right="0" height="auto" zIndex="2" maxWidth="500px" minWidth="300px" pb="2rem" backgroundColor={alt}>
                            {/* mobile menu items */}
                            <FlexBetween flexDirection="column" justifyContent="center" gap="3rem" >
                                <Tooltip title="Change Mode">
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
                                </Tooltip>
                                <Tooltip title="Messages" >
                                    <IconButton onClick={() => {
                                        navigate('/me/conversations');
                                        setIsMobileMenuToggle(false);
                                    }
                                    }>
                                        <Message sx={{ fontSize: "25px" }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Notifications" >
                                    <Notifications sx={{ fontSize: "25px" }} />
                                </Tooltip>
                                <Tooltip title="Help" >
                                    <Help sx={{ fontSize: "25px" }} />
                                </Tooltip>
                                {isAuthenticated &&
                                    <FormControl variant="standard" value={user.name} >
                                        <Select value={user.name}
                                            MenuProps={{
                                                disableScrollLock: true,
                                            }}
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