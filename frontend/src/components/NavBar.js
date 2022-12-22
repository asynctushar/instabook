import { useTheme, useMediaQuery, Box, IconButton, FormControl, MenuItem, Select, Typography, InputBase } from '@mui/material';
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeMode } from '../redux/actions/appAction';
import FlexBetween from '../customs/FlexBetween';
import { Fragment, useState } from 'react';

const NavBar = () => {
    const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery('(max-width: 980px)');
    const theme = useTheme();
    // colors 
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
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
                    InstaBook
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
                    <FormControl variant="standard" value={"Tushar"} >
                        <Select value={"Tushar"}
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
                            <MenuItem value={"Tushar"}>
                                <Typography >
                                    Tushar
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => console.log("log out")}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <Fragment>
                    <IconButton onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)} sx={{fontSize: "25px"}}>
                        <Menu />
                    </IconButton>
                    {isMobileScreen && isMobileMenuToggle && (
                        <Box position="fixed" top="0" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor={background}>
                            <Box display="flex" justifyContent="flex-end" p="1.25rem 3.5rem">
                                <IconButton onClick={() => setIsMobileMenuToggle(!setIsMobileMenuToggle)} >
                                    <Close />
                                </IconButton>
                            </Box>
                            {/* mobile menu items */}
                            <FlexBetween flexDirection="column" justifyContent="center" gap="3rem" >
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
                                <FormControl variant="standard" value={"Tushar"} >
                                    <Select value={"Tushar"}
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
                                        <MenuItem value={"Tushar"}>
                                            <Typography >
                                                Tushar
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => console.log("log out")}>
                                            Log Out
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </FlexBetween>
                        </Box>
                    )}
                </Fragment>
            )}
        </FlexBetween>
    )
}
export default NavBar;