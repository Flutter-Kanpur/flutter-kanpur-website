'use client';

import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const SuccessScreen = () => {
  const router = useRouter();
  const isStrictMobile = useMediaQuery('(max-width:425px)');

  // ✅ 3D Depth Button Style matching your design system
  const depthButtonStyle = {
    borderRadius: '100px',
    px: 6,
    py: 1,
    color: '#000',
    textTransform: 'none',
    fontWeight: '500',
    fontFamily: 'var(--font-product-sans)',
    fontSize: '16px',
    // Multi-layered gradient for that high-end 3D look
    background: 'linear-gradient(180deg, #E0E0E0 0%, #FFFFFF 30%, #FFFFFF 100%)',
    border: '1px solid #E0E0E0',
    boxShadow: `
      0px 4px 10px rgba(0, 0, 0, 0.05), 
      inset 0px 1px 2px rgba(255, 255, 255, 0.8)
    `,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'linear-gradient(180deg, #D5D5D5 0%, #F5F5F5 30%, #F5F5F5 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.08)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      px: 4,
      textAlign: 'center',
      bgcolor: '#fff',
      // ✅ Sidebar offset for desktop
      ml: { xs: 0, md: '280px' },
      maxWidth: { md: 'calc(100% - 280px)' },
    }}>

      {/* 1. Scaled down Tick Asset */}
      <Box sx={{ width: { xs: '180px', md: '200px' }, mt: 10 }}>
        <img
          src="/assets/submittick.png"
          alt="Success"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>

      {/* 2. Success Messaging */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: '500',
          mb: 1,
          fontFamily: 'var(--font-product-sans)',
          color: '#000'
        }}
      >
        Application submitted
      </Typography>

      <Typography
        sx={{
          color: '#666',
          fontSize: '16px',
          lineHeight: 1.6,
          mb: 3,
          maxWidth: '450px',
          fontFamily: 'var(--font-product-sans)'
        }}
      >
        Thanks for your interest in contributing! Our team will review your application and contact you soon.
      </Typography>

      {/* 3. Subtle Status Indicator */}
      <Typography
        sx={{
          color: '#D1D1D1',
          fontStyle: 'italic',
          fontSize: '14px',
          mb: 7,
          fontFamily: 'var(--font-product-sans)'
        }}
      >
        Current status: Under review
      </Typography>

      {/* 4. ✅ 3D "Back to Profile" Button */}
      <Button
        onClick={() => router.push('/profile')}
        startIcon={<ArrowBackIcon sx={{ fontSize: '18px !important' }} />}
        sx={depthButtonStyle}
      >
        Back to Profile
      </Button>
    </Box>
  );
};

export default SuccessScreen;