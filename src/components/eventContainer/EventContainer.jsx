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
  console.log(event, "eve")

  return (
    <Grid container spacing={3}>
      {event.map((event, index) => (
        <Box
          key={event.id || index}
          sx={{
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'space-between',
            gap: 8,
            alignItems: 'center',
            background: 'none',
            color: 'white',
            width: "100%",
            alignItems: 'center',
            mt: '5%',
          }}
        >
          {/* Left */}
          <Box flex={"0 0 calc(70%-32px)"}>
            <EventCount id={index + 1} />
            <Typography sx={{ fontSize: "42px" }} fontWeight="bold" gutterBottom mb={3}>
              {event.event_title}
            </Typography>
            <Typography sx={{ fontSize: "16px" }} color="white" fontSize={'20px'}>
              {event.event_short_description}
            </Typography>
            <Box mt={'5%'} mr={'15%'} display="flex" justifyContent={"space-between"}>
              <ApplyNowButton
                disabled={false}
                onClick={() => ViewDetailsClick(event.id)}
                text="View Event Details"
                textTransform="none"
                width="200px"
                height="44px"
                fontSize="14px"
              />
            </Box>
          </Box>
          {/* Right */}
          <Box sx={{ maxWidth: "400px", maxHeight: "330px" }}>
            <img src={event.event_banner} alt={event.event_title} style={{ width: "400px", height: "200px", backgroundClip: "border-box", borderRadius: '8px', }} />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default EventContainer;