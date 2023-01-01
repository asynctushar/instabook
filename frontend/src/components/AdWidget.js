import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../customs/FlexBetween";
import WidgetWrapper from "../customs/WidgetWrapper";
const advertisementLink = "https://scontent.fjsr16-1.fna.fbcdn.net/v/t1.6435-9/132302243_3661917537218101_8828490776456474611_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeG7r1Lx6yfBcg2JNTChuVg169ym7Lrjxz_r3KbsuuPHP13rncbGu4leONNOB5Ddz7wCReEqsH9DSj4guJlaIv-b&_nc_ohc=sO6toUGBUxwAX-58JUZ&_nc_ht=scontent.fjsr16-1.fna&oh=00_AfCSkLY-zjwnLu532xtTgjOAbosvLwX9SFdkOoLp219BGg&oe=63CEAFEF";

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