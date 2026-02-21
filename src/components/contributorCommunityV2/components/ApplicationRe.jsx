'use client';

import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArRevampButton from '@/components/buttons/revampArrowButton/ArRevampButton';

const ApplicationUnderReview = ({ data = {} }) => {
  const router = useRouter();
  const isStrictMobile = useMediaQuery('(max-width:425px)');

  const outfitFont = 'var(--font-product-sans)';

  const getSubmittedDate = () => {
    if (data.createdAt) {
      try {
        const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } catch {
        return '—';
      }
    }
    return '—';
  };

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // ✅ Sidebar offset for desktop
      ml: { xs: 0, md: '280px' },
      maxWidth: { md: 'calc(100% - 280px)' },
    }}>

      {/* 1. Top Content Area */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        textAlign: 'center'
      }}>

        {/* Clock Illustration */}
        <Box sx={{ width: '160px', mt: 4, mb: 5 }}>
          <img
            src="/assets/review.png"
            alt="Under Review"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontFamily: outfitFont }}>
          Application under review
        </Typography>

        <Typography sx={{ color: '#666', fontSize: '15px', mb: 4, maxWidth: '280px', fontFamily: outfitFont }}>
          Thanks for applying to be a contributor.
        </Typography>


        <ArRevampButton
          text="View application details"
          width="240px"
          onClick={() => router.push('/profile/mycontribution/summary')}
        />

        {/* 2. Status Details Section */}
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography sx={{ color: '#B0B0B0', fontWeight: 400, fontSize: '14px', mb: 0.5, fontFamily: 'var(--font-product-sans)' }}>Status:</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '16px', fontFamily: 'var(--font-product-sans)' }}>Under review</Typography>
          </Box>

          <Box>
            <Typography sx={{ color: '#B0B0B0', fontWeight: 400, fontSize: '14px', mb: 0.5, fontFamily: 'var(--font-product-sans)' }}>Submitted on:</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '16px', fontFamily: 'var(--font-product-sans)' }}>{getSubmittedDate()}</Typography>
          </Box>

          <Box>
            <Typography sx={{ color: '#B0B0B0', fontWeight: 400, fontSize: '14px', mb: 0.5, fontFamily: 'var(--font-product-sans)' }}>Estimated response:</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '16px', fontFamily: 'var(--font-product-sans)' }}>Within 5–7 days</Typography>
          </Box>
        </Box>
      </Box>


      <Box sx={{
        width: '90%',
        maxWidth: '400px',
        bgcolor: '#FFF9EB',
        borderRadius: '16px',
        p: 2,
        mt: 10,
        mb: isStrictMobile ? 12 : 5,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
      }}>
        <InfoOutlinedIcon sx={{ color: '#F59E0B', fontSize: '20px' }} />
        <Typography sx={{ color: '#EF9F20', fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-product-sans)' }}>
          We’ll notify you once there’s an update.
        </Typography>
      </Box>



    </Box>
  );
};

export default ApplicationUnderReview;