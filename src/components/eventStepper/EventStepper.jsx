'use client';

import {
  Box,  Stepper, Step,  StepLabel,
} from '@mui/material';


const EventStepper = ({steps,activeStep}) => {
  return (
    
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
                );};
                export default EventStepper;