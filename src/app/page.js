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
  
 
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StatsContainer from "@/components/containers/StatsContainer";

 
 
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ flexDirection: "column", alignItems: "center" }}>

        {/* Navbar */}
        <NavbarComponent />
 
        <HeroComponent stats={stats} latestAnnouncement={latestAnnouncement} />
 
        {/* Hero section */}
        <HeroComponent /> 

        {/* Announcements Section */}
        <AnnouncementCarousel />

        {/* Upcoming Events Section */}
        <UpcomingEvents />

        {/* Blog and contact */}
        <BlogAndContact />

        {/* mobile app download */}
        <MobileAppDownload />

        {/* about us */}
        <AboutUs />

      </Box>
    </>
  );
}

