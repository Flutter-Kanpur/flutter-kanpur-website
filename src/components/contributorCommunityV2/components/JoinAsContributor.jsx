'use client';

import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RevampButton from '@/components/buttons/revampbutton/RevampButton';

const JoinAsContributor = () => {
  const router = useRouter();
  const isStrictMobile = useMediaQuery('(max-width:425px)');

  const backButtonStyle = {
    display: isStrictMobile ? 'none' : 'flex',
    alignItems: 'center',
    color: '#000',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: 'var(--font-product-sans)',
    background: 'linear-gradient(180deg, #E0E0E0 0%, #FFFFFF 30%, #FFFFFF 100%)',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    px: 1.5,
    py: 0.5,
    mb: 3,
    mt: 4,
    minWidth: 'auto',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      background: 'linear-gradient(180deg, #D5D5D5 0%, #F5F5F5 30%, #F5F5F5 100%)',
      borderColor: '#d0d0d0',
    },
    '& .MuiButton-startIcon': {
      marginRight: '4px'
    }
  };

  const desktopCardStyle = {
    bgcolor: '#FFFFFF',
    borderRadius: '24px',
    p: { xs: 3, md: 6 },
    textAlign: 'center',
    border: '1px solid #F0F0F0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: isStrictMobile
      ? 'none'
      : `inset 0 0 15px 2px rgba(227, 242, 253, 0.8), 0px 10px 40px rgba(0, 0, 0, 0.06), 0px 2px 10px rgba(0, 0, 0, 0.02)`,
    transition: 'all 0.3s ease',
    maxWidth: '700px',
    width: '100%',
    '&:hover': {
      transform: !isStrictMobile ? 'translateY(-6px)' : 'none',
      boxShadow: !isStrictMobile
        ? `inset 0 0 15px 2px rgba(227, 242, 253, 0.8), 0px 20px 50px rgba(0, 0, 0, 0.1)`
        : 'none',
    }
  };

  const mobileInfoCardStyle = {
    mx: 3,
    mt: 2,
    p: 3,
    bgcolor: '#EFF3FF',
    borderRadius: '28px',
    textAlign: 'center',
  };

  const tipCardBox = (
    <Box
      sx={{
        mx: 3,
        mt: isStrictMobile ? 3 : 0, // spacing for mobile when below
        mb: isStrictMobile ? 0 : 3, // spacing for desktop when above
        p: 2.5,
        bgcolor: '#DCFCE7',
        borderRadius: '16px',
        border: '1px solid #BBF7D0',
        maxWidth: '600px'
      }}
    >
      <Typography
        sx={{
          fontSize: '16px',
          color: '#166534',
          fontWeight: 400,
          textAlign: 'left',
          fontFamily: 'var(--font-product-sans)',
        }}
      >
        You don't need prior experience. We value willingness to learn and collaborate.
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#FFF',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: isStrictMobile ? 0 : 4
      }}
    >
      {/* 1. Desktop Navigation Area */}
      {!isStrictMobile && (
        <Box sx={{ alignSelf: 'flex-start', width: '100%', maxWidth: '1200px' }}>
          <Button
            onClick={() => router.back()}
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '12px !important' }} />}
            sx={backButtonStyle}
          >
            Back
          </Button>
        </Box>
      )}

      {/* 2. Scrollable Content Wrapper */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: isStrictMobile ? 'flex-start' : 'center',
          pt: isStrictMobile ? 2 : 0
        }}
      >
        {/* DESKTOP VIEW: Green Block on TOP */}
        {!isStrictMobile && tipCardBox}

        {/* Main Card (Blue on Mobile / 3D on Desktop) */}
        <Box sx={isStrictMobile ? mobileInfoCardStyle : desktopCardStyle}>
          {!isStrictMobile && (
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 3, fontFamily: 'var(--font-product-sans)' }}
            >
              Join as a Contributor
            </Typography>
          )}

          <Typography
            sx={{
              fontSize: { xs: '16px', md: '18px' },
              color: '#1a1a1a',
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: '550px',
              fontFamily: 'var(--font-product-sans)',
            }}
          >
            Help shape the Flutter Kanpur community by contributing your skills, ideas, or time. Contributors work closely with the community team on events, content, and products.
          </Typography>

          {!isStrictMobile && (
            <Box sx={{ mt: 5, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <RevampButton
                text="Apply to Contribute"
                width="320px"
                onClick={() => router.push('/profile/contributor/apply')}
              />
              <Typography
                sx={{
                  mt: 3,
                  fontSize: '15px',
                  color: '#000',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Learn more about contributors
              </Typography>
            </Box>
          )}
        </Box>

        {/* MOBILE VIEW: Green Block on BOTTOM */}
        {isStrictMobile && tipCardBox}
      </Box>

      {/* 4. Mobile Sticky Footer Area */}
      {isStrictMobile && (
        <Box
          sx={{
            px: 3,
            pb: 4,
            pt: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#FFF'
          }}
        >
          <RevampButton
            text="Apply to contribute"
            onClick={() => router.push('/profile/contributor/apply')}
          />
          <Typography
            sx={{
              mt: 2,
              fontSize: '16px',
              color: '#000',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
              fontFamily: 'var(--font-product-sans)',
            }}
          >
            Learn more about contributors
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default JoinAsContributor;