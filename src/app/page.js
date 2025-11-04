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
  let blogs = [];
  let latestAnnouncement = { annoucements: [] };
  let events = { upcoming_events: [], past_events: [] };

  // Fetch stats data with error handling
  try {
    const fetchedStats = await fetchDataFromFirestore('homescreen_data', 'stats_data');
    if (fetchedStats) {
      stats = fetchedStats;
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Use default stats
  }

  // Fetch latest announcement with error handling
  try {
    const fetchedAnnouncement = await fetchDataFromFirestore('homescreen_data', 'latest_announcement');
    if (fetchedAnnouncement && fetchedAnnouncement.annoucements) {
      latestAnnouncement = fetchedAnnouncement;
    }
  } catch (error) {
    console.error('Error fetching latest announcement:', error);
    // Use default announcement
  }


  // Fetch blogs data with error handling
  try {
    const fetchedBlogsData = await fetchDataFromFirestore('homescreen_data', 'blogs_data');
    if (fetchedBlogsData) {
      blogs = fetchedBlogsData;
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }

  // fetch upcoming events data with error handling
  try {

    const fetchedEventsData = await fetchDataFromFirestore('homescreen_data', 'events');
    if (fetchedEventsData) {
      events = fetchedEventsData;
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  return (
    <div style={{ flexDirection: "column", alignItems: "center" }}>

      {/* Hero section */}
      <HeroComponent stats={stats} latestAnnouncement={latestAnnouncement.annoucements} />

      {/* Announcements Section */}
      <AnnouncementCarousel announcements={latestAnnouncement.annoucements} />

      {/* Upcoming Events Section */}
      <UpcomingEvents events={events} />

      {/* Blog and contact */}
      <BlogAndContact blogs={blogs.blogs} />

      {/* about us */}
      <AboutUs />

      {/* mobile app download */}
      <MobileAppDownload />

    </div>
  );
}
