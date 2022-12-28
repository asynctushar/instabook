import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const UserImage = ({ avatar, size = "60px", userId }) => {
    const user = useSelector(state => state.userState.user);
    const navigate = useNavigate();

    const navigateProfile = () => {
        if (userId === user._id) {
            navigate('/me')
        } else {
            navigate(`/user/${userId}`)
        }
    }
    
    return (
        <Box width={size} height={size} sx={{":hover": {cursor: "pointer"} }} onClick={() =>  navigateProfile()}>
            <img src={avatar.url} alt={avatar.public_id} width={size} height={size} style={{ objectFit: 'cover', borderRadius: "50%" }} />
        </Box>
    )
}
export default UserImage;