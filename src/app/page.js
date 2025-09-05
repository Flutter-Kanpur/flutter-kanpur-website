import { Box } from "@mui/material";
import NavbarComponent from "@/components/navbar/navbar";
import HeroComponent from "@/components/hero/hero";
import AnnouncementCarousel from "@/components/carousel/AnnouncementCarousel";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutUs from "@/components/sections/AboutUs";
import BlogAndContact from "@/components/sections/BlogAndContact";
import MobileAppDownload from "@/components/sections/MobileAppDownload";
import { fetchDataFromFirestore } from "@/services/fetch_data_from_firestore";

export default async function Home() {
  // Fetch data on the server

  const stats = await fetchDataFromFirestore('homescreen_data', 'stats_data');
  const latestAnnouncement = await fetchDataFromFirestore('homescreen_data', 'latest_announcement');

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ flexDirection: "column", alignItems: "center" }}>

        {/* Navbar */}
        <NavbarComponent />

        {/* Hero section */}
        <HeroComponent stats={stats} latestAnnouncement={latestAnnouncement.annoucements} />

        {/* <HeroComponent /> */}

        {/* Announcements Section */}
        <AnnouncementCarousel announcements={latestAnnouncement.annoucements} />

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

