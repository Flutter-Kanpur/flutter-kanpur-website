import NavbarComponent from "@/components/navbar/navbar";
import HeroComponent from "@/components/hero/hero";
import AnnouncementCarousel from "@/components/carousel/AnnouncementCarousel";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutUs from "@/components/sections/AboutUs";
import BlogAndContact from "@/components/sections/BlogAndContact";
import MobileAppDownload from "@/components/sections/MobileAppDownload";
import { fetchDataFromFirestore } from "@/services/fetch_data_from_firestore";

// Force dynamic rendering to avoid build-time Firebase issues
export const dynamic = 'force-dynamic';

export default async function Home() {

  // Default fallback data
  const defaultStats = [
    { id: 1, title: '500+', description: 'Community Members' },
    { id: 2, title: '50+', description: 'Events Hosted' },
    { id: 3, title: '10+', description: 'Community Leads' }
  ];

  let stats = defaultStats;
  let latestAnnouncement = { annoucements: [] };

  try {
    const fetchedStats = await fetchDataFromFirestore('homescreen_data', 'stats_data');
    if (fetchedStats && Array.isArray(fetchedStats)) {
      stats = fetchedStats;
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Use default stats
  }

  try {
    const fetchedAnnouncement = await fetchDataFromFirestore('homescreen_data', 'latest_announcement');
    if (fetchedAnnouncement && fetchedAnnouncement.annoucements) {
      latestAnnouncement = fetchedAnnouncement;
    }
  } catch (error) {
    console.error('Error fetching latest announcement:', error);
    // Use default announcement
  }

  return (
    <div style={{ flexDirection: "column", alignItems: "center" }}>

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

    </div>
  );
}
