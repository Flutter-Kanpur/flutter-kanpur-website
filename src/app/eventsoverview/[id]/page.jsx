
import React from 'react';
import { Box } from '@mui/material';
import Footer from '@/components/footer/Footer';
import EventOverviewContainer from '@/components/eventoverviewcontainer/EventOverviewContainer';
import { fetchEventsById } from '@/services/fetch_data_from_firestore';


export default async function Eventsoverview({ params }) {

  const { id } = params;
  // let eventsData = EventsDummyData;
  let eventsData;

  const data = await fetchEventsById('events', id);
  if (data) {
    eventsData = data;
  }



  if (!eventsData) {
    return (
      <Box sx={{ bgcolor: '#010A10', color: 'white', minHeight: '100vh' }}>
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          Event not found
        </Box>
      </Box>
    );
  }


  const eventDate = data.event_date.toDate();

  function getOrdinal(num) {
    const suffixes = ["th", "st", "nd", "rd"];
    const val = num % 100;
    return num + (suffixes[(val - 20) % 10] || suffixes[val] || suffixes[0]);
  }

  const day = eventDate.getDate();
  const month = eventDate.toLocaleString("default", { month: "long" });
  const year = eventDate.getFullYear();
  const time = eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const formattedDate = `${month} ${getOrdinal(day)}, ${year}`;

  const formattedEvent = {
    ...eventsData,
    event_date: formattedDate + ' at ' + time,
  };

  return (
    <Box sx={{ display: 'flex', color: "#fff", marginLeft: "32px", marginRight: "32px", flexDirection: "column", alignItems: "center", justifyContent: 'center', }}>
      <EventOverviewContainer event={formattedEvent} />
      <Footer />
    </Box>
  );
};