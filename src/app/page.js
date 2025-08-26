import { Box } from "@mui/material";
import NavbarComponent from "@/components/navbar/navbar";
import HeroComponent from "@/components/hero/hero";
import AnnouncementCarousel from "@/components/carousel/AnnouncementCarousel";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutUs from "@/components/sections/AboutUs";
import BlogAndContact from "@/components/sections/BlogAndContact";
import MobileAppDownload from "@/components/sections/MobileAppDownload";
import { fetchStatsData, fetchLatestAnnouncement } from "@/lib/firebase/server-actions";

export default async function Home() {
  // Fetch data on the server
  const stats = await fetchStatsData();
  const latestAnnouncement = await fetchLatestAnnouncement();
  
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ flexDirection: "column", alignItems: "center" }}>
        <NavbarComponent />

        <HeroComponent stats={stats} latestAnnouncement={latestAnnouncement} />

        {/* Announcements Section */}
        <AnnouncementCarousel />

        {/* Upcoming Events Section */}
        <UpcomingEvents />

      </Box>
    </>
  );
}


