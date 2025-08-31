'use client';

import { Box, Typography } from '@mui/material';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import EventCount from '../eventCount/EventCount';
import ViewDetailsButton from '../buttons/ViewDetailsButton/viewDetailsButton';
import Image from 'next/image';


const EventContainer = ({ id,title,description,image}) => {
  return (
<Box

            key={id}
            sx={{
              mb: 8,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 8,
              alignItems: 'center',
              background: 'none',
              color: 'white',
              width: "100%"
            }}
          >
            {/* Left */}
            <Box flex={"0 0 calc(70%-32px)" } >
              <EventCount id={id} />
              <Typography variant="h4" fontWeight="bold" gutterBottom mb={3}>
                {title}
              </Typography>
              <Typography variant="body1" color="white">
                {description}
              </Typography>
              <Box mt={5} display="flex" justifyContent={"space-between"}>
                <ViewDetailsButton text={"View Details"} />
                <ApplyNowButton fontSize="14px" />
              </Box>
            </Box>

            {/* Right */}
            <Box flex={"0 1 calc(30%-32px)"}>
              <Image src={image} width={455} height={388} alt={title} />
            </Box>
          </Box>

                );};
                export default EventContainer;