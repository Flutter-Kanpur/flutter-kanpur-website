'use client';

import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import ArRevampButton from '@/components/buttons/revampArrowButton/ArRevampButton';

const MyContributions = ({ onJoinClick }) => {
  const isStrictMobile = useMediaQuery('(max-width:425px)');

  const contentWrapper = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    px: 4,
    textAlign: 'center',
    // ✅ Adjusting desktop spacing for sidebar offset if needed
    ml: { xs: 0, md: '280px' },
    maxWidth: { md: 'calc(100% - 280px)' },
    mt: -5
  };

  return (
    <Box sx={contentWrapper}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          mb: 1.5,
          fontFamily: 'var(--font-product-sans)',
          color: '#000'
        }}
      >
        No contributions yet
      </Typography>

      <Typography
        sx={{
          color: '#757575',
          fontSize: '15px',
          lineHeight: 1.5,
          mb: 4,
          maxWidth: '280px',
          fontFamily: 'var(--font-product-sans)'
        }}
      >
        You haven’t joined as a contributor yet.
      </Typography>

     
      <ArRevampButton
        text="Join as a contributor"
        onClick={onJoinClick}
        width={isStrictMobile ? '100%' : '320px'}
      />

    </Box>
  );
};

export default MyContributions;