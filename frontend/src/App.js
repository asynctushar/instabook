import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { themeSettings } from './customs/theme';
import { useSelector } from 'react-redux';
import Home from './screens/Home';
import LogIn from './screens/LogIn';

const App = () => {
    const { mode } = useSelector((state) => state.appState);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <Router>
            <ThemeProvider theme={theme} >
                <CssBaseline />
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LogIn />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
