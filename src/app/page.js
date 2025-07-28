'use client';

import CustomButton from "@/components/buttons/customNavbarButton/customButton";
import { Box, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StatsContainer from "@/components/containers/StatsContainer";
import JoinCommunityButton from "@/components/buttons/JoinCommunityButton";
import ApplyNowButton from "@/components/buttons/ApplyNowButton";

export default function Home() {
  let light = true; // This can be toggled based on user preference or state
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
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
      
      {/* Apply Now Button */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flex: 1,
        paddingBottom: "20px"
      }}>
        <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <Box
            component="img"
            src="/assets/btn_background.svg"
            alt="Button Animation"
            sx={{
              position: "absolute",
              left: "-60px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "124px",
              height: "117px",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <ApplyNowButton 
            onClick={() => console.log('Apply Now button clicked!')} 
            style={{ zIndex: 1, position: "relative" }}
          />
        </Box>
      </Box>

      {/* Join Community Button */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flex: 1,
        paddingBottom: "40px"
      }}>
        <JoinCommunityButton 
          onClick={() => console.log('Join Community button clicked!')}
        />
      </Box>

      {/* Stats Container at Bottom */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: "row", 
        padding:"auto",
        justifyContent: "space-evenly", 
        alignItems: "center", 
        flex: 1,
        paddingBottom: "50px"
      }}>
        <StatsContainer 
          number="3" 
          label="Community Leaders" 
        />
        <StatsContainer 
          number="80+" 
          label="Community Members" 
        />
      
         <StatsContainer 
          number="2" 
          label="Hackathons & Event Hosted" 
        />
      </Box>
    </Box>
  );
}
