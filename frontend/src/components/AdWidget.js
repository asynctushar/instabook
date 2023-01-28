import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../customs/FlexBetween";
import WidgetWrapper from "../customs/WidgetWrapper";
const advertisementLink = "https://www.bkash.com/uploaded_contents/campaigns/large_images/Reward-Lifestyle-Website-Banner-1458x540_jpeg_1670412228500.webp";

const AdWidget = () => {
    const { palette } = useTheme();
    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" >
                    Sponsored
                </Typography>
                <Typography color={palette.neutral.medium}>
                    Create Ad.
                </Typography>
            </FlexBetween>
            <img src={advertisementLink} alt="advertisement" width="100%" height="auto" style={{ borderRadius: ".75rem", margin: ".75rem 0" }} />
            <FlexBetween>
                <Typography color={palette.neutral.main}>Bkash and Grameenphone.</Typography>
                <Typography color={palette.neutral.medium}>bkash.com</Typography>
            </FlexBetween>
            <Typography color={palette.neutral.medium} m=".5rem 0 ">
            New bKash app is here with all the services and offers to simplify life. Download now and open your own bKash account from the app.
            </Typography>
        </WidgetWrapper>
    )
}
export default AdWidget;