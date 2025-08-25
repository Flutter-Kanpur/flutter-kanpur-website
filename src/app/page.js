import { Box } from "@mui/material";
import NavbarComponent from "@/components/navbar/navbar";
import HeroComponent from "@/components/hero/hero";
import AnnouncementCarousel from "@/components/carousel/AnnouncementCarousel";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutUs from "@/components/sections/AboutUs";
import BlogAndContact from "@/components/sections/BlogAndContact";
import MobileAppDownload from "@/components/sections/MobileAppDownload";

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StatsContainer from "@/components/containers/StatsContainer";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ flexDirection: "column", alignItems: "center" }}>

        <NavbarComponent />

        {/* Hero section */}
        <HeroComponent />

        {/* Announcements Section */}
        <AnnouncementCarousel />

        {/* Upcoming Events Section */}
        <UpcomingEvents />

      </Box>
    </>
  );
}


