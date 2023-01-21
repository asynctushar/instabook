import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import MetaData from '../customs/MetaData';
import { Fragment } from 'react';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Fragment>
            <MetaData title="Not Found" />
            <Box width="100%" height="calc(100vh - 80px)" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography sx={{ mb: "1.5rem", mt: "-8rem", fontSize: "1.5rem" }}>Page not found</Typography>
                <Button onClick={() => navigate('/')} variant="contained" color="error" sx={{ px: "2.4rem", py: "1rem" }}>Return Home</Button>
            </Box>
        </Fragment>
    )
}
export default NotFound;