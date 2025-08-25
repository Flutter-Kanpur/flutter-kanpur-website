import { Box } from "@mui/material";
import NavbarComponent from "@/components/navbar/navbar";
import HeroComponent from "@/components/hero/hero";
import AnnouncementCarousel from "@/components/carousel/AnnouncementCarousel";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutUs from "@/components/sections/AboutUs";
import BlogAndContact from "@/components/sections/BlogAndContact";
import MobileAppDownload from "@/components/sections/MobileAppDownload";


export default function Home() {
  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD

=======
>>>>>>> 578c8ca (feat: Integrate Firebase authentication and configuration)
          <AnnouncementCarousel />
=======
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

<<<<<<< HEAD
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
>>>>>>> a0c9f9a (onboarding added)
        </Box>
        
=======
      {/* Hero Section */}
      <Box sx={{ flexDirection: "column", alignItems: "center" }}>

        <NavbarComponent />

        {/* Hero section */}
        <HeroComponent />

>>>>>>> e26a517 (Refactor layout and components for improved styling and structure)
        {/* Announcements Section */}
        <AnnouncementCarousel />

        {/* Upcoming Events Section */}
        <UpcomingEvents />

      </Box>
<<<<<<< HEAD

=======
>>>>>>> 578c8ca (feat: Integrate Firebase authentication and configuration)
      {/* Upcoming Events Section */}
      <UpcomingEvents />
=======
>>>>>>> a0c9f9a (onboarding added)
    </>
  );
}


