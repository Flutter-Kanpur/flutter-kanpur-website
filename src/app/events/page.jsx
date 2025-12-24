
import React from 'react';
import Footer from '@/components/footer/Footer';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import EventContainer from '@/components/eventContainer/EventContainer';
import SwipeDownButton from '@/components/buttons/swipeDownButton/swipeDownButton';
import EventsDummyData from '@/constants/events';
import { fetchEventsData } from '@/services/fetch_data_from_firestore';


export default async function Events() {
  let eventsData = EventsDummyData;
  try {
    const data = await fetchEventsData('events');
    if (Array.isArray(data) && data.length > 0) {
      eventsData = data;
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  const events = eventsData.map(event => ({
    ...event,
    event_date: typeof event.event_date?.toDate === 'function'
      ? event.event_date.toDate().toISOString()
      : event.event_date
  }));

  return (
    <Box sx={{ pb: '2%', }}>
      {/* Header */}
      <Box sx={{
        textAlign: 'center',
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 16,
        pt: '10%',
        mb: '5%',
      }}>
        <Box>
          <Typography variant="h5" color="white" mb={'2%'}>
            Level up your skills and showcase your talent. Join an event today!
          </Typography>
          <Typography variant="h1" fontWeight="bold" color="white">
            Join Inspiring Events &
          </Typography>
          <Typography variant="h1" fontWeight="bold" color="white">
            Challenges!
          </Typography>
        </Box>
        {/* Swipe Down Button */}
        <Box textAlign="center" >
          <SwipeDownButton text={"Swipe Down"} id={"EventList"} />
        </Box>
      </Box>

      {/* Events List */}
      <Box id="EventList" sx={{
        mb: '18%', display: 'flex',
        flexDirection: { xs: 'column', md: 'column' },
        gap: 8, px: '14%',
        justifyContent: 'space-evenly'
      }}>

        <EventContainer event={events} />
      </Box>
      <Box sx={{ color: '#fff' }}>
        <Footer />
      </Box>
    </Box>
  );
};
