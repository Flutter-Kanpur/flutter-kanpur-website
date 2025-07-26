import CustomButton from "@/components/buttons/customNavbarButton/customButton";
import { Box, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StatsContainer from "@/components/containers/StatsContainer";

export default function Home() {
  let light = true; // This can be toggled based on user preference or state
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <Typography>
          landing page icons
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "14.4px" }}>
          <CustomButton selected={true} text="Home" />
          <CustomButton selected={false} text="Jobs" />
          <CustomButton selected={false} text="Community" />
          <CustomButton selected={false} text="Events" />
          <CustomButton selected={false} text="Login" />
          <NotificationsIcon style={{ cursor: "pointer", color: "#E5E8EC", fontSize: 20 }} />
        </Box>
      </Box>
      
      {/* Stats Container at Bottom */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flex: 1,
        paddingBottom: "50px"
      }}>
        <StatsContainer 
          number="10,000+" 
          label="Community Members" 
        />
      </Box>
    </Box>
  );
}
