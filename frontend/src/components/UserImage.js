import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
const tempImage = "https://res.cloudinary.com/dlwimftr7/image/upload/v1671801973/instabook/avatars/IMG-20220723-WA0004_xgp5vv.jpg"

const UserImage = ({ avatar, size = "60px", userId }) => {
    const user = useSelector(state => state.userState.user);
    const navigate = useNavigate();

    const navigateProfile = () => {
        if (userId === user.id) {
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