import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { themeSettings } from './customs/theme';
import { useSelector } from 'react-redux';
import Home from './screens/Home';
import LogIn from './screens/LogIn';
import { getUser } from './redux/actions/userAction';
import Loader from './components/Loader';
import NavBar from './components/NavBar';
import ProtectedRoute from './customs/ProtectedRoute';
import Profile from './screens/Profile';
import Post from './screens/Post';
import Search from './screens/Search';

const App = () => {
    const { mode } = useSelector((state) => state.appState);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const dispatch = useDispatch();
    const { isLoading, isAuthenticated } = useSelector(state => state.userState);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, isAuthenticated])

    return (
        <Router>
            <ThemeProvider theme={theme} >
                <CssBaseline />
                <NavBar />
                {isLoading ? <Loader /> : (
                    <div className="app">
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
                            <Route path="/login" element={<LogIn />} />
                        </Routes>
                    </div>
                )}
            </ThemeProvider>
        </Router>
    );
}

export default App;
