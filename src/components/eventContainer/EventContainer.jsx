'use client';

import { useRouter } from "next/navigation";
import { Box, Typography, Grid } from '@mui/material';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import EventCount from '@/components/eventCount/EventCount';
import ViewDetailsButton from '@/components/buttons/ViewDetailsButton/viewDetailsButton';
import Image from 'next/image';

const EventContainer = ({ event }) => {
  const router = useRouter();

    const ViewDetailsClick = (id) => {
    router.push(`/eventsoverview/${id}`); 
  };

  // const ApplyNowClick = () => {
  //   router.push("/eventsoverview"); 
  // };

  return (
    <Grid container spacing={3}>
      {event.map((event, index) => (
        <Box

          key={event.id || index}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: 8,
            alignItems: 'center',
            background: 'none',
            color: 'white',
            width: "100%",
            alignItems: 'stretch',
          }}
        >
          {/* Left */}
          <Box flex={"0 0 calc(70%-32px)"}>
            <EventCount id={index + 1} />
            <Typography variant="h4" fontWeight="bold" gutterBottom mb={3}>
              {event.event_title}
            </Typography>
            <Typography variant="body1" color="white">
              {event.event_short_description}
            </Typography>
            <Box mt={5} mr={15} display="flex" justifyContent={"space-between"}>
              <ViewDetailsButton text={"View Details"} onClick={() => ViewDetailsClick(event.id)}/>
              {/* <ApplyNowButton fontSize="14px" disabled={false} onClick={ApplyNowClick}/> */}
            </Box>
          </Box>

          {/* Right */}
          <Box flex={"0 0 calc(30%-32px)"}>
            <Image src={event.event_banner} width={400} height={330} alt={event.event_title} style={{ objectFit: 'cover', borderRadius: '8px', height: '100%' }} />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default EventContainer;