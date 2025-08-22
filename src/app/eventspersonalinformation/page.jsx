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
  Grid
} from '@mui/material';
import Footer from '@/components/footer/Footer';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';

const EventsPersonalInformation = () => {
  const steps = [
    { label: 'Overview', status: 'completed' },
    { label: 'Personal Information', status: 'current' },
    { label: 'Prize Pool', status: 'upcoming' },
    { label: 'Confirm', status: 'upcoming' },
    { label: 'Success', status: 'upcoming' },
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
        {/* Input Area */}
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
              Basic Information
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Personal Details
            </Typography>
          </Box>

          {/* Email */}
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" color='white'>Email <sup style={{ color: 'red' }}>*</sup> </Typography>
            <TextField
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ style: { color: 'gray' } }}
              sx={{ input: { color: 'white' }, border: 2, borderRadius: 3, borderColor: '#2E3942', mt: '5px' }}
            />
          </Box>



          {/* Phone Number */}
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" color='white'>Phone Number <sup style={{ color: 'red' }}>*</sup> </Typography>
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                required
                variant="outlined"
                value="+91"
                InputLabelProps={{ style: { color: 'gray' } }}
                sx={{ input: { color: 'white' }, border: 2, borderRadius: 3, borderColor: '#2E3942', mt: '5px', width: '8%' }}
              />
              <TextField
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{ style: { color: 'gray' } }}
                sx={{ input: { color: 'white' }, border: 2, borderRadius: 3, borderColor: '#2E3942', mt: '5px' }}
              />
            </Box>
          </Box>

          {/* First Name */}
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" color='white'>First Name <sup style={{ color: 'red' }}>*</sup> </Typography>
            <TextField
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ style: { color: 'gray' } }}
              sx={{ input: { color: 'white' }, border: 2, borderRadius: 3, borderColor: '#2E3942', mt: '5px' }}
            />
          </Box>

          {/* Last Name */}
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" color='white'>Last Name (if applicable)  </Typography>
            <TextField
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ style: { color: 'gray' } }}
              sx={{ input: { color: 'white' }, border: 2, borderRadius: 3, borderColor: '#2E3942', mt: '5px' }}
            />
          </Box>

          {/* Organization */}
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" color='white'>Organization/Institute Name <sup style={{ color: 'red' }}>*</sup> </Typography>
            <TextField
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ style: { color: 'gray' } }}
              sx={{ input: { color: 'white' }, border: 2, borderRadius: 3, borderColor: '#2E3942', mt: '5px' }}
            />
          </Box>

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

export default EventsPersonalInformation;