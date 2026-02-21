'use client';

import { useRouter } from "next/navigation";
import { Box, Typography, Grid } from '@mui/material';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import EventCount from '@/components/eventCount/EventCount';
import ViewDetailsButton from '@/components/buttons/ViewDetailsButton/viewDetailsButton';
import Image from 'next/image';
import { px } from "framer-motion";

const EventContainer = ({ event }) => {
  const router = useRouter();

  const ViewDetailsClick = (id) => {
    router.push(`/eventsoverview/${id}`);
  };

  // const ApplyNowClick = () => {
  //   router.push("/eventsoverview"); 
  // };
  // (event, "eve")

  return (
    <Grid container spacing={3}>
      {event.map((event, index) => (
        <Box
          key={event.id || index}
          sx={{
            display: 'flex',
            flexDirection: { xs: "column", md: "row" },
            justifyContent: 'space-between',
            gap: { xs: 4, md: 8 },
            alignItems: 'center',
            background: 'none',
            color: 'white',
            width: "100%",
            mt: { xs: '8%', md: '5%' },
          }}
        >
          {/* Left */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 calc(65%-32px)" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <EventCount id={index + 1} />
            <Typography
              sx={{
                fontSize: { xs: "28px", sm: "32px", md: "42px" },
              }}
              fontWeight="bold"
              gutterBottom
              mb={3}
            >
              {event.event_title}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px" },
              }}
              color="white"
            >
              {event.event_short_description}
            </Typography>
            <Box
              mt={'5%'}
              mr={{ xs: '0', md: '15%' }}
              display="flex"
              justifyContent={{ xs: "flex-start", md: "flex-start" }}
            >
              <ApplyNowButton
                disabled={false}
                onClick={() => ViewDetailsClick(event.id)}
                text="View Event Details"
                textTransform="none"
                width={{ xs: "90vw", sm: "200px" }}
                height="44px"
                fontSize="14px"
              />
            </Box>
          </Box>
          {/* Right */}
          <Box
            sx={{
              width: { xs: "100%", md: "auto" },
              flex: { xs: "1 1 100%", md: "0 0 auto" },
              maxWidth: { xs: "100%", md: "400px" },
              maxHeight: { xs: "250px", md: "330px" },
            }}
          >
            <img
              src={event.event_banner}
              alt={event.event_title}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "250px",
                maxWidth: "100%",
                backgroundClip: "border-box",
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default EventContainer;