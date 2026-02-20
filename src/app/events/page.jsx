
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
    <Box sx={{ pb: '2%' }}>
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          minHeight: { xs: "80vh", md: "100vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: { xs: 8, md: 16 },
          pt: { xs: '15%', md: '10%' },
          px: { xs: '5%', sm: '8%', md: '5%' },
          mb: { xs: '10%', md: '5%' },
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: '#374151',
              mb: '2%',
              fontSize: { xs: '16px', sm: '18px', md: '24px' },
            }}
          >
            Level and showcase your talent. Join an event today!
          </Typography>
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              color: '#1f2937',
              fontSize: { xs: '28px', sm: '36px', md: '48px' },
              lineHeight: { xs: '1.3', md: '1.2' },
            }}
          >
            Join Inspiring Events &
          </Typography>
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              color: '#1f2937',
              fontSize: { xs: '28px', sm: '36px', md: '48px' },
            }}
          >
            Challenges!
          </Typography>
        </Box>
        {/* Swipe Down Button */}
        <Box textAlign="center">
          <SwipeDownButton text={"Swipe Down"} id={"EventList"} />
        </Box>
      </Box>

      {/* Events List */}
      <Box
        id="EventList"
        sx={{
          mb: { xs: '20%', md: '18%' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column' },
          gap: 8,
          px: { xs: '5%', sm: '8%', md: '14%' },
          justifyContent: 'space-evenly',
        }}
      >
        <EventContainer event={events} />
      </Box>
      <Box sx={{ color: '#374151' }}>
        <Footer />
      </Box>
    </Box>
  );
};
