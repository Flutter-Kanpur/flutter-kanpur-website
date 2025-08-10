import { Box, Typography } from "@mui/material";
import NavbarComponent from "@/components/navbar/navbar";
import HeroComponent from "@/components/hero/hero";
import StatsComponent from "@/components/stats/statsComponent";
import AnnouncementCarousel from "@/components/carousel/AnnouncementCarousel";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import { flutter_kanpur_statistics } from "@/constants/statistics";


export default function Home() {
  return (
    <>
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
    </>
  );
}

