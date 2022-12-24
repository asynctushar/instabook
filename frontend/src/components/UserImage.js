import { Box } from '@mui/material';
const tempImage = "https://res.cloudinary.com/dlwimftr7/image/upload/v1671801973/instabook/avatars/IMG-20220723-WA0004_xgp5vv.jpg"

const UserImage = ({ avatar, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img src={avatar.url} alt={avatar.public_id} width={size} height={size} style={{ objectFit: 'cover', borderRadius: "50%" }} />
        </Box>
    )
}
export default UserImage;