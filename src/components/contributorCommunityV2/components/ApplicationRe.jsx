'use client';

import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Project Components
import RevampButton from '@/components/buttons/revampbutton/RevampButton';
import BottomNav from '@/components/contributorCommunityV2/BottomNav';

const ApplicationUnderReview = () => {
  const router = useRouter();
  const isStrictMobile = useMediaQuery('(max-width:425px)');

  const outfitFont = 'var(--font-product-sans)';

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
        <Box sx={{ width: '160px', mb: 4 }}>
          <img
            src="/assets/review_clock.png"
            alt="Under Review"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, fontFamily: outfitFont }}>
          Application under review
        </Typography>

        <Typography sx={{ color: '#666', fontSize: '15px', mb: 4, maxWidth: '280px', fontFamily: outfitFont }}>
          Thanks for applying to be a contributor.
        </Typography>

        {/* ✅ Glossy 3D Button */}
        <RevampButton
          text="View application details"
          width="240px"
          onClick={() => router.push('/profile/mycontribution/summary')}
        />

        {/* 2. Status Details Section */}
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography sx={{ color: '#9e9e9e', fontSize: '13px', mb: 0.5, fontFamily: outfitFont }}>Status:</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '15px', fontFamily: outfitFont }}>Under review</Typography>
          </Box>

          <Box>
            <Typography sx={{ color: '#9e9e9e', fontSize: '13px', mb: 0.5, fontFamily: outfitFont }}>Submitted on:</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '15px', fontFamily: outfitFont }}>Apr 12, 2026</Typography>
          </Box>

          <Box>
            <Typography sx={{ color: '#9e9e9e', fontSize: '13px', mb: 0.5, fontFamily: outfitFont }}>Estimated response:</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '15px', fontFamily: outfitFont }}>Within 5–7 days</Typography>
          </Box>
        </Box>
      </Box>

      {/* 3. Bottom Notice Alert */}
      <Box sx={{
        width: '90%',
        maxWidth: '400px',
        bgcolor: '#FFF9EB',
        borderRadius: '16px',
        p: 2,
        mb: isStrictMobile ? 12 : 5, // Space for BottomNav on mobile
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
      }}>
        <InfoOutlinedIcon sx={{ color: '#F59E0B', fontSize: '20px' }} />
        <Typography sx={{ color: '#D97706', fontSize: '13px', fontWeight: 500, fontFamily: outfitFont }}>
          We’ll notify you once there’s an update.
        </Typography>
      </Box>

      {/* 4. Mobile Navigation */}
      {isStrictMobile && <BottomNav />}
    </Box>
  );
};

export default ApplicationUnderReview;