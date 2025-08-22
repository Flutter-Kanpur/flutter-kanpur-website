'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Button,
  Divider,
  TextField,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import Footer from '@/components/footer/Footer';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const EventsPrize = () => {
  const steps = [
    { label: 'Overview', status: 'completed' },
    { label: 'Personal Information', status: 'completed' },
    { label: 'Prize Pool', status: 'current' },
    { label: 'Confirm', status: 'upcoming' },
    { label: 'Success', status: 'upcoming' },
  ];
  const rewards = [
    {
      title: 'Winner',
      subtitle: 'Prize in kind',
      reward: '₹10,000 + Goodies + Internship Opportunities',
    },
    {
      title: 'Runner-Up',
      subtitle: 'Prize in kind',
      reward: '₹5,000 + Swag Kit',
    },
    {
      title: 'Special Mentions',
      subtitle: 'Prize in kind',
      reward: 'Certificate of Excellence + Community Feature',
    },
    {
      title: 'All Participants',
      subtitle: 'Prize in kind',
      reward: 'E-Certificate + Networking Access',
    },
  ];

  const activeStep = steps.findIndex((s) => s.status === 'current');

  return (
    <Box sx={{ pb: 4, display: 'flex', alignItems: 'center', mt: '50px', flexDirection: 'column', }}>
      <Box
        sx={{
          width: { xs: '95%', md: '70%' },

          p: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,

        }}
      >
        <Box sx={{ borderRadius: 3, p: 3, bgcolor: '#0c1217', }}>
          {/* Progress Stepper */}
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            sx={{
              '& .MuiStepLabel-label': { color: '#fff', fontSize: '0.8rem' },

              "& .MuiStepLabel-label.Mui-active": {
                color: "#fff !important",
              },
              '& .Mui-completed .MuiStepLabel-label': {
                color: '#fff !important',
              },
              '& .MuiStepIcon-root': {
                color: '#fff',
              },
              '& .Mui-active .MuiStepIcon-root': {
                color: '#00bfff',
              },
              '& .Mui-completed .MuiStepIcon-root': {
                color: '#00bfff',
              },
              "& .MuiStepIcon-root.Mui-completed svg": {
                color: "#fff",
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* Prize Area */}
        <Box
          sx={{
            bgcolor: '#0c1217',
            borderRadius: 3,
            p: 3,
            color: '#b0b0b0',
            display: 'flex',
            gap: 3,
            flexDirection: 'column',
          }}
        >



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
            {rewards.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  elevation={0}
                  variant='contained'
                  sx={{
                    minWidth:'250px',
                    bgcolor: '#0f1c25',
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
          
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Box><Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                      <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                        {item.subtitle}
                      </Typography></Box>
                      <Box>
                        {/* Icon */}
                        <CardGiftcardIcon style={{ color: '#1e90ff', fontSize: '50px' }} />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        bgcolor: '#1E90FF',
                        p: 1.2,
                        borderRadius: 1,
                      }}
                    >
                      <Typography sx={{ color: 'white', fontWeight: 500 }}>
                        {item.reward}
                      </Typography>
                    </Box>
                  </Box>


                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body1" color='white'>* All the prizes and certificate will be released within 7 days after the event is over</Typography>



          {/* Button */}
          <Box sx={{ mt: 4, ml: 4, mb: 2, display: 'flex', gap: 2 }}>
            <ApplyNowButton
              text="NEXT"
              style={{ fontFamily: 'Carme' }}
              fontSize="12px"
            />

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