'use client';

import React from 'react';
import {Box,Typography,Grid,} from '@mui/material';
import Footer from '@/components/footer/Footer';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import rewards from '@/lib/rewards';
import EventStepper from '@/components/eventStepper/EventStepper';
import PrizeContainer from '@/components/prizeContainer/PrizeContainer';

const EventsPrize = () => {
  const steps = [
    { label: 'Overview', status: 'completed' },
    { label: 'Personal Information', status: 'completed' },
    { label: 'Prize Pool', status: 'current' },
    { label: 'Confirm', status: 'upcoming' },
    { label: 'Success', status: 'upcoming' },
  ];
  const activeStep = steps.findIndex((s) => s.status === 'current');
  return (
    <Box sx={{ pb: 4, display: 'flex', alignItems: 'center', mt: '50px', flexDirection: 'column', }}>
      <Box
        sx={{ width: { xs: '95%', md: '70%' }, p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 4, }}>
        <EventStepper steps={steps} activeStep={activeStep} />
        {/* Prize Area */}
        <Box
          sx={{bgcolor: '#0c1217', borderRadius: 3, p: 3, color: '#b0b0b0', display: 'flex', gap: 3, flexDirection: 'column', }}>
          {/* Heading */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'white' }}>
              Rewards and Prizes
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Job Offer Letter
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {rewards.map((reward, index) => (
              <PrizeContainer key={index} title={reward.title} subtitle={reward.subtitle} reward={reward.reward} />
            ))}
          </Grid>

          <Typography variant="body1" color='white'>* All the prizes and certificate will be released within 7 days after the event is over</Typography>

          {/* Button */}
          <Box sx={{ mt: 4, ml: 4, mb: 2, display: 'flex', gap: 2 }}>
            <ApplyNowButton text="NEXT" style={{ fontFamily: 'Carme' }} fontSize="12px" />
            <Typography>Go Back</Typography>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box sx={{ width: '100%', mt: 4 }}>
        <Footer />
      </Box>
    </Box>
  );
};
export default EventsPrize;