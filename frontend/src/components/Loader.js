import { Box, CircularProgress, useTheme } from '@mui/material';

const Loader = () => {
    const theme = useTheme();

    return (
        <Box width="100%" height="calc(100% - 80px)" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress sx={{color: theme.palette.neutral.mediumMain}}/>
        </Box>
    )
}
export default Loader;