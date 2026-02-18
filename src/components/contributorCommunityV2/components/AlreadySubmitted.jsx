'use client';

import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RevampButton from '@/components/buttons/revampbutton/RevampButton';
import BottomNav from '@/components/contributorCommunityV2/BottomNav';

const AlreadySubmitted = ({ data = {} }) => {
  const router = useRouter();
  const isStrictMobile = useMediaQuery('(max-width:425px)');

  // ✅ Reusable Font Constant
  const outfitFont = 'var(--font-product-sans)';

  const backButtonStyle = {
    display: isStrictMobile ? 'none' : 'flex',
    alignItems: 'center',
    color: '#000',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: outfitFont,
    background: 'linear-gradient(180deg, #E0E0E0 0%, #FFFFFF 30%, #FFFFFF 100%)',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    px: 1.5,
    py: 0.5,
    mb: 5,
    minWidth: 'auto',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  };

  const summaryCardStyle = {
    width: '100%',
    maxWidth: '400px',
    bgcolor: '#FFFFFF',
    borderRadius: '32px',
    p: 3,
    mt: 4,
    mb: 15, // ✅ Added margin below the last block for scroll clearance
    border: '1px solid #F0F0F0',
    boxShadow: `inset 0 0 15px 2px #EAEAEA, 0px 4px 20px rgba(0,0,0,0.03)`,
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    '&:last-child': { mb: 0 }
  };

  const labelStyle = {
    color: '#9e9e9e',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: outfitFont
  };

  const valueStyle = {
    color: '#000',
    fontSize: '13px',
    fontWeight: 600,
    textAlign: 'right',
    fontFamily: outfitFont
  };

  return (
    <Box sx={{
      width: '100%', bgcolor: '#fff', minHeight: '100vh',
      ml: { xs: 0, md: '280px' },
      maxWidth: { md: 'calc(100% - 280px)' },
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>

      {!isStrictMobile && (
        <Box sx={{ alignSelf: 'flex-start', px: 5, pt: 2, width: '100%' }}>
          <Button
            onClick={() => router.back()}
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '12px !important' }} />}
            sx={backButtonStyle}
          >
            Back
          </Button>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, fontFamily: outfitFont }}
          >
            Join as a Contributor
          </Typography>
        </Box>
      )}

      {/* ✅ Centered Content Area */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: isStrictMobile ? 'flex-start' : 'center',
        px: 3,
        pt: isStrictMobile ? 8 : 2,
        width: '100%'
      }}>

        <Box sx={{ width: { xs: '160px', md: '180px' }, }}>
          <img
            src="/assets/arrow.png"
            alt="Submitted"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 1.5,
            lineHeight: 1.2,
            maxWidth: '300px',
            fontFamily: outfitFont
          }}
        >
          You've already submitted the application
        </Typography>

        <Typography
          sx={{
            color: '#666',
            textAlign: 'center',
            fontSize: '14px',
            maxWidth: '300px',
            mb: 4,
            fontFamily: outfitFont
          }}
        >
          Our team will review your application and get back to you in 24hrs.
        </Typography>

        <RevampButton
          text="View application"
          width="200px"
          onClick={() => router.push('/profile/mycontribution/summary')}
        />

        <Box sx={summaryCardStyle}>
          <Box sx={rowStyle}>
            <Typography sx={labelStyle}>Full name</Typography>
            <Typography sx={valueStyle}>{data.fullName || '—'}</Typography>
          </Box>
          <Box sx={rowStyle}>
            <Typography sx={labelStyle}>Email address</Typography>
            <Typography sx={valueStyle}>{data.email || '—'}</Typography>
          </Box>
          <Box sx={rowStyle}>
            <Typography sx={labelStyle}>Current role</Typography>
            <Typography sx={valueStyle}>{data.currentRole || '—'}</Typography>
          </Box>
          <Box sx={rowStyle}>
            <Typography sx={labelStyle}>Experience Level</Typography>
            <Typography sx={valueStyle}>{data.experienceLevel || data.experience || '—'}</Typography>
          </Box>
          <Box sx={rowStyle}>
            <Typography sx={labelStyle}>Time</Typography>
            <Typography sx={valueStyle}>{data.timePerWeek || data.weeklyTime || '—'}</Typography>
          </Box>
        </Box>
      </Box>

      {isStrictMobile && <BottomNav />}
    </Box>
  );
};

export default AlreadySubmitted;