import CustomButton from "@/components/buttons/customNavbarButton/customButton";
import { Box, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Home() {
  let light = true; // This can be toggled based on user preference or state
  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
      <Typography>
        landing page icons
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "14.4px" }}>
        <CustomButton selected={true} text="Home" />
        <CustomButton selected={false} text="Jobs" />
        <CustomButton selected={false} text="Community" />
        <CustomButton selected={false} text="Events" />
        <CustomButton selected={false} text={light === true ? "Light" : "Dark"} icons={true} light={true} />
        <NotificationsIcon style={{ cursor: "pointer", color: "#E5E8EC", fontSize: 20 }} />
      </Box>
    </Box>
  );
}
