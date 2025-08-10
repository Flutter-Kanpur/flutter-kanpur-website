import { Box, Typography } from "@mui/material";
import NavbarComponent from "@/components/navbar/navbar";
import HeroComponent from "@/components/hero/hero";
import StatsComponent from "@/components/stats/statsComponent";
import AnnouncementCarousel from "@/components/carousel/AnnouncementCarousel";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutUs from "@/components/sections/AboutUs";
import BlogAndContact from "@/components/sections/BlogAndContact";
import MobileAppDownload from "@/components/sections/MobileAppDownload";
import { flutter_kanpur_statistics } from "@/constants/statistics";


export default function Home() {
  return (
    <>
      {/* Mobile Screen - White Background */}
      <Box sx={{
        display: { xs: 'flex', md: 'none' },
        width: '100vw',
        height: '100vh',
        background: '#FFFFFF',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#000000',
            textAlign: 'center',
            fontFamily: 'Encode Sans, sans-serif',
            padding: '20px'
          }}
        >
          Please view this website on desktop for the best experience.
        </Typography>
      </Box>

      {/* Desktop Content */}
      <Box sx={{
        display: { xs: 'none', md: 'block' }
      }}>
        {/* Hero Section */}
        <Box sx={{ 
          background: `
            radial-gradient(circle at 50% 40%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.05) 30%, transparent 50%),
            radial-gradient(circle at 50% 40%, #010A10 0%, #010A10 100%)
          `,
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <NavbarComponent />
          <HeroComponent />
          
          {/* Stats Container */}
          <Box sx={{ 
            width: "80%", 
            height: "60px",
            alignItems: "center", 
            flexDirection: "row", 
            marginTop: "180px",
            display: "flex", 
            justifyContent: "space-evenly",

          }}>
            {flutter_kanpur_statistics.map((stats) => (
              <StatsComponent key={stats.id} heading={stats.title} description={stats.description} />
            ))}
          </Box>
        </Box>
        
        {/* Announcements Section */}
        <Box sx={{ 
          background: "#010A10",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <Box sx={{ width: "100%", padding: "0 20px" }}>
            <Typography
              sx={{
                fontSize: { xs: "28px", md: "36px" },
                fontWeight: "700",
                color: "#FFFFFF",
                textAlign: "center",
                marginBottom: "20px",
                fontFamily: "Encode Sans, sans-serif"
              }}
            >
              Latest Announcements!
            </Typography>
            
            <AnnouncementCarousel />
          </Box>
        </Box>
        
        {/* Upcoming Events Section */}
        <UpcomingEvents />
        
        {/* About Us Section */}
        <AboutUs />
        
        {/* Blog and Contact Section */}
        <BlogAndContact />
        
        {/* Mobile App Download Section */}
        <MobileAppDownload />
      </Box>
    </>
  );
}

