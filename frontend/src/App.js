import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Alert, Snackbar, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo, useEffect, useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { themeSettings } from './customs/theme';
import { useSelector } from 'react-redux';
import Home from './screens/Home';
import LogIn from './screens/LogIn';
import { getUser } from './redux/actions/userAction';
import { clearErrorAction } from './redux/actions/appAction';
import Loader from './components/Loader';
import NavBar from './components/NavBar';
import ProtectedRoute from './customs/ProtectedRoute';
import Profile from './screens/Profile';
import Post from './screens/Post';
import Search from './screens/Search';
import NotFound from './screens/NotFound';
import UpdateProfile from './screens/UpdateProfile';
import Conversation from './screens/Conversation';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
    const { mode } = useSelector((state) => state.appState);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const dispatch = useDispatch();

    const { isLoading, isAuthenticated } = useSelector(state => state.userState);
    const { error } = useSelector((state) => state.appState);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const CustomAlert = forwardRef((props, ref) => <Alert elevation={6} variant="filled" {...props} ref={ref} />);
    const isMobileScreen = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (error) {
            setIsErrorOpen(true);
        }
    }, [error]);

    const handleErrorClose = () => {
        setIsErrorOpen(false);
        dispatch(clearErrorAction());
    }

    return (
        <HelmetProvider>
            <Router>
                <ThemeProvider theme={theme} >
                    <CssBaseline />
                    <NavBar />
                    {isLoading ? <Loader /> : (
                        <div className="app" >
                            <Routes>
                                <Route path="/" element={
                                    <ProtectedRoute >
                                        <Home />
                                    </ProtectedRoute>
                                } />
                                <Route path="/me" element={
                                    <ProtectedRoute >
                                        <Profile type="own" />
                                    </ProtectedRoute>
                                } />
                                <Route path="/me/update" element={
                                    <ProtectedRoute >
                                        <UpdateProfile />
                                    </ProtectedRoute>
                                } />
                                <Route path="/user/:id" element={
                                    <ProtectedRoute >
                                        <Profile type="other" />
                                    </ProtectedRoute>
                                } />
                                <Route path="/post/:id" element={
                                    <ProtectedRoute >
                                        <Post />
                                    </ProtectedRoute>
                                } />
                                <Route path="/search" element={
                                    <ProtectedRoute >
                                        <Search />
                                    </ProtectedRoute>
                                } />
                                <Route path="/me/conversation" element={
                                    <ProtectedRoute >
                                        <Conversation />
                                    </ProtectedRoute>
                                } />
                                <Route path="/login" element={<LogIn />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <Snackbar open={isErrorOpen} autoHideDuration={3000} onClose={handleErrorClose} anchorOrigin={{
                                vertical: "bottom",
                                horizontal: isMobileScreen ? "center" : "left"
                            }} >
                                <CustomAlert onClose={handleErrorClose} severity="error" className="w-fit mx-auto md:mr-auto ">{error}</CustomAlert>
                            </Snackbar>
                        </div>
                    )}
                </ThemeProvider>
            </Router>
        </HelmetProvider>
    );
}

export default App;
